import React, { useState, useEffect } from "react";
import CustomStore from "devextreme/data/custom_store";
import { Column } from "devextreme-react/data-grid";
import Pagination from "@app/components/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalConfirm from "@app/components/Modals/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { useApp } from "@app/context/AppContext";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import {
  deleteByPath,
  getAllByPath,
  getAllDownload,
} from "@app/services/main.service";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { get, isObject } from "lodash";
import moment from "moment";
import fileDownload from "js-file-download";
import { exportingData } from "@app/store/reducers/app";
import DataGrid, {
  Scrolling,
  ColumnFixing,
} from "devextreme-react/data-grid";
import { v4 as uuid } from "uuid";
export default function TableDevExpress({
  columnsConfig = [],
  filterParams = {},
  respDataApi,
  rowData,
  path,
  exportConfig,
  primaryKey,
  selected,
  action,
  paging = {},
  pagingPresistance = true,
  deleteConfirmation = {},
  // rowSelect = false,
  // rowSelectType = 'checkbox',
  trigger,
  module = null,
  ids = "id",
  onEmpty,
  // containerClass = 'my-3 table table-responsive',
  // onCheckedRows,
  // styles,
  request = true,
  onCloseModal,
  validExport = true,
}: ITableData) {
  const source = axios.CancelToken.source();
  const { activePage, activeFilters, callbackForm, closeModal } = useSelector(
    (state: any) => state.ui
  );
  const { exportData, reloadData } = useSelector((state: any) => state.app);
  const [ordersData, setOrdersData] = useState<any>();
  const { searchValue } = useApp();
  let [searchParams, setSearchParams] = useSearchParams();

  const currentPage = pagingPresistance ? searchParams.get("page") : 0;

  const label = module ? module : activePage?.display;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  // const [checkedRows, setCheckedRows] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedRowsKey, setCheckedRowsKey] = useState<any>({});

  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: currentPage ? parseInt(currentPage) - 1 : 0,
    pageCount: 10,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
    ...paging,
  });

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: "sm",
    icon: "fa fa-trash",
    description: `Hapus data ${label ? label : ""}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: "Delete",
    classApproved: "danger",
    textDecline: "Cancel",
    ...deleteConfirmation,
  });

  // const initFilters = {
  //   keyword: '',
  //   sort_by: 'nama',
  // };

  // const [filters, setFilters] = useState<any>(initFilters);

  const [actionData, setActionData] = useState<any>(action);

  /** DATA RESP */
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>(selected);

  useEffect(() => {
    respDataApi(respData);
  }, [respData]);

  useEffect(() => {
    if (action != actionData) setActionData(action);
  }, [action]);

  useEffect(() => {
    if (rowData) {
      setOrdersData(
        new CustomStore({
          key: primaryKey,
          load: () => rowData,
        })
      );
    }
  }, [rowData]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    if (request != true) {
      return false;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // let filter = customParamsService(, activeFilters.filters);
      const params = {
        // ...filters,
        // page: pagination.currentPage + 1,
        page: paging?.currentPage ? paging?.currentPage : pagination.currentPage + 1,
        limit: paging?.perPage ? paging?.perPage : pagination.perPage,
        keyword: searchValue,
        ...filterParams,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before
          ? activeFilters?.filters?.year_before + "-01-01"
          : undefined,
        year_after: activeFilters?.filters?.year_after
          ? activeFilters?.filters?.year_after + "-01-01"
          : undefined,
        month_before: activeFilters?.filters?.month_before
          ? activeFilters?.filters?.month_before + "-01"
          : undefined,
        month_after: activeFilters?.filters?.month_after
          ? activeFilters?.filters?.month_after + "-01"
          : undefined,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;
      const dataLength = results ? results.length : 0;

      setLoading(false);

      if (dataLength > 0) {
        let data = results?.map((d: any, i: number) => {
          d.key = i;
          d.id = get(d, primaryKey);
          d.number = pagination.currentPage * pagination.perPage + (i + 1);
          return d;
        });
        setRespData(data);

        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: Math.ceil(total / pagination?.perPage),
          totalData: total,
        }));
      } else {
        setRespData([]);
        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: 1,
          totalData: 0,
        }));
        if (onEmpty) {
          onEmpty(true);
        }
      }
    } catch (err: any) {
      setRespData([]);
      setLoading(false);
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    console.log("activeFilters table dev express", activeFilters);

    if (
      trigger !== null &&
      activeFilters != null &&
      callbackForm?.getData !== false
    ) {
      getAllData();
    } else {
      setLoading(false);
    }
    return () => {
      source.cancel();
    };
  }, [
    pagination?.currentPage,
    pagination?.perPage,
    searchValue,
    trigger,
    // path,
    activeFilters,
    callbackForm,
    location.pathname,
    path,
  ]);

  /** HANDLE RELOAD DATA CLICK */
  useEffect(() => {
    if (reloadData && reloadData?.includes("default")) {
      getAllData();
    } else if (module != null) {
      if (reloadData && reloadData?.includes(module)) {
        getAllData();
      }
    }
  }, [reloadData]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    const paramsExporting = exportConfig?.addParams
      ? exportConfig?.addParams
      : {};
    const paramsDefault = {
      // ...filters,
      page: pagination.currentPage + 1,
      limit: pagination.perPage,
      keyword: searchValue,
      ...filterParams,
      ...activeFilters?.filters,
      ...paramsExporting,
      export: true,
      export_type: exportData?.type,
    };

    const params = isObject(exportConfig?.customParams)
      ? { ...exportConfig?.customParams, export: true, export_type: exportData }
      : paramsDefault;

    try {
      let req: any = await getAllDownload(
        exportConfig?.path ? exportConfig?.path : path,
        params,
        source.token
      );

      /** RESET EXPORT */
      dispatch(exportingData(null));

      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers["content-disposition"];
      const filename = content
        .replace("attachment; filename=", "")
        .replaceAll('"', "");
      fileDownload(
        dataBlob,
        `${label}_${moment().format("YYYY-MM-DD HH_mm_ss")}_${filename.includes(exportData?.type)
          ? filename
          : `${filename}.${exportData?.type}`
        }`
      );
      setLoading(false);
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, "danger");
      setLoading(false);
      dispatch(exportingData(null));
    }
  };

  useEffect(() => {
    if (exportData && exportData?.table == module && validExport) {
      getAllDataExport();
    }
  }, [exportData]);

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath(path, dataSelected.id, source.token);
      dispatchNotification(`Sukses menghapus data ${label}`, "success");
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal menghapus data ${label}`, "danger");
    }
  };

  useEffect(() => {
    if (selected) {
      switch (actionData) {
        case "delete":
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
          }));
          break;
        case "edit.modal":
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case "create.modal":
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case "edit":
          navigate(`edit/${get(selected, primaryKey)}`);
          break;
        case "detail":
          navigate(`detail/${get(selected, primaryKey)}`);
          break;
        default:
          break;
      }
    }
  }, [actionData, selected]);

  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      setActionData(undefined); // solusinya nambahin ini
      switch (modalConfirm?.action) {
        default:
          deleteData();
          break;
      }
    } else if (approved == false) {
      setActionData(undefined); // solusinya nambahin ini
      switch (modalConfirm?.action) {
        default:
          break;
      }
    }

    if (onCloseModal) {
      onCloseModal(undefined);
    }
  };

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };


  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action && onCloseModal) {
      onCloseModal(undefined);
    }
  }, [closeModal]);

  useEffect(() => {
    return () => {
      setRespData([]);
    };
  }, []);

  // console.log("columnsConfig", columnsConfig);
  // const allowedPageSizes = [10, 25, 50, 100, "all"];

  console.log("pagination?.perPage", pagination?.perPage);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className="mb-3">
        <DataGrid
          className="mt-3 table-responsive"
          id="grid"
          columnAutoWidth={true}
          // allowColumnReordering={true}
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
          // columnWidth={70}
          height={500}
        // rowAlternationEnabled={false}
        // onRowPrepared={handleRowPrepared()}
        >
          <ColumnFixing enabled={true} />
          {/* <Scrolling columnRenderingMode="virtual" /> */}

          <Scrolling mode="virtual" rowRenderingMode="virtual" />
          {/* <Paging defaultPageSize={1000} /> */}
          {/* <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode={"compact"}
            showPageSizeSelector={true}
            showInfo={true}
            showNavigationButtons={true}
          /> */}
          {/* <Column dataField="gi" caption="Gardu Induk" />
          <Column dataField="penyulang" caption="Penyulang" /> */}
          {columnsConfig.map((item: any, index: number) => (
            <Column
              dataField={item?.accessor || nanoid()}
              allowEditing={false}
              allowUpdating={false}
              caption={`${item?.Header}`}
              key={index}
              minWidth={item?.minWidth ? item?.minWidth : 100}
              cssClass={item?.customClass ? item?.customClass : "text-left"}
              fixed={item?.fixed ? item?.fixed : false}
            >
              {item?.columns?.map((items: any) => (
                <Column
                  dataField={`${items?.accessor || nanoid()}`}
                  allowEditing={false}
                  allowUpdating={false}
                  caption={items?.Header}
                  key={uuid()}
                  minWidth={item?.minWidth ? item?.minWidth : 100}
                  cssClass={
                    items?.customClass ? items?.customClass : "text-left"
                  }
                >
                  {items?.columns?.map((itm: any) => (
                    <Column
                      dataField={itm?.accessor || nanoid()}
                      allowEditing={false}
                      allowUpdating={false}
                      caption={itm?.Header}
                      key={uuid()}
                      minWidth={item?.minWidth ? item?.minWidth : 100}
                      cssClass={
                        itm?.customClass ? itm?.customClass : "text-left"
                      }
                    >
                      {itm?.accessor || nanoid()}
                    </Column>
                  ))}
                </Column>
              ))}
            </Column>
          ))}
        </DataGrid>
      </div>
      {paging?.show != false && (
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={false}
          onChangeItemPerPage={onChangeItemPerPage}
        />
      )}

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
interface ITableData {
  columnsConfig: any;
  filterParams?: any;
  respDataApi: any;
  rowData: any;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
  onCheckedRows?: any;
  selected?: any;
  path?: any;
  exportConfig?: IExportConfig;
  primaryKey: any;
  action?: string | undefined;
  onColumnsChanged?: any;
  paging?: IPaging;
  pagingPresistance?: boolean;
  deleteConfirmation?: any;
  trigger?: any;
  module?: any;
  ids?: any;
  onEmpty?: any;
  containerClass?: string;
  approvalAlias?: any;
  onCloseModal?: any;
  styles?: any;
  request?: boolean;
  validExport?: boolean;
}

interface IPaging {
  perPage?: any;
  show?: boolean;
  offset?: number;
  currentPage?: any;
  pageCount?: number;
  totalData?: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}

interface IExportConfig {
  path?: string;
  addParams?: any;
  customParams?: any;
}
