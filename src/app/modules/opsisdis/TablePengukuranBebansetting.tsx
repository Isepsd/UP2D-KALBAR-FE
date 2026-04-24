import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import axios from "axios";
import {
  getAllByPath,
  putByPath,
  postByPath,
  getAllDownload,
  deleteByPath,
} from "@app/services/main.service";
import DataGrid, {
  Editing,
  Scrolling,
  Sorting,
  ColumnFixing,
} from "devextreme-react/data-grid";
// import Pagination from '@app/components/Pagination/Pagination';
import qs from "query-string";
import fileDownload from "js-file-download";
import {
  exportingData,
  reloadingData,
  generatingData,
} from "@app/store/reducers/app";
import moment from "moment";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import { customParamsService } from "@app/helper/browser.helper";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import keys from "lodash/keys";
import Pagination from "@app/components/Pagination/Pagination";
/** COMPONENTS */

type Props = {
  pathServiceCountNull?: any;
  pathService: any;
  primaryKey: string;
  children: any;
  label: string;
  module: string;
  parentField?: string;
  callBackCount?: any;
  customFilter?: any;
  customParams?: any;
  allowAdding?: boolean;
  allowDeleting?: boolean;
  allowUpdating?: boolean;
  ChangeColorRow?: boolean;
};

function TablePengukuranBeban({
  pathServiceCountNull,
  pathService,
  primaryKey,
  children,
  callBackCount,
  label,
  module,
  allowAdding = false,
  allowDeleting = false,
  allowUpdating = true,
  customFilter = [],
  customParams = {},
}: // ChangeColorRow = false
  Props) {
  /** DATA RESP */
  const { exportData, reloadData, generateData } = useSelector(
    (state: any) => state.app
  );
  const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [ordersData, setOrdersData] = useState<any>();
  const [data, setData] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
    info: null,
  });
  const [loading, setLoading] = useState<boolean>();
  // const [optionsData, setOptionsData] = useState<any>();
  const dispatch = useDispatch();
  // const allowedPageSizes = [10, 25, 50, 100, "all"];

  // const columns: any = [
  //   { field: "nama_parent", caption: "Unit Pembangkit" },
  //   { field: "nama_lokasi", caption: "Pembangkit" }
  // ]

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    let filter = customParamsService(customFilter, queryParams);
    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        limit: pagination?.perPage,
        id_parent_lokasi: queryParams?.__parent_lokasi
          ? queryParams?.__parent_lokasi
          : null,
        // datum_date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
        // datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
        ...filter,
        ...customParams,
        sort_by: "datum,no_urut_cell",
      };

      if (queryParams?.time) {
        params.datum = queryParams?.time
          ? `${queryParams?.date} ${queryParams?.time}`
          : null;
      } else if (queryParams?.date) {
        params.datum_date = queryParams?.date
          ? queryParams?.date
          : moment().format("YYYY-MM-DD");
      }

      const req: any = await getAllByPath(pathService, params, source.token);

      const { results, total } = req;

      if (callBackCount) {
        callBackCount(total < 1, params);
      }

      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(total / pagination?.perPage),
        totalData: total,
      }));
      let data = results.map((item: any, index: number) => {
        item.number = pagination.currentPage * pagination.perPage + (index + 1);
        item.nama_gardu_induk = item?.ref_parent_lokasi?.nama_gardu_induk;
        item.kode_gardu_induk =
          item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi;
        item.penyulang_gardu_induk =
          item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi;
        item.kode_penyulang = item?.ref_lokasi?.kode_lokasi;
        item.nama_lokasi = item?.ref_lokasi?.nama_lokasi;
        item.pemilik = item?.ref_lokasi?.pemilik;
        item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi;
        item.kode_parent = item?.ref_parent_lokasi?.kode_lokasi;
        item.up3 = item?.ref_lokasi?.up3_1
          ? item?.ref_lokasi?.up3_1?.nama_lokasi
          : null;
        item.datetime = moment(item?.datum).format("DD MMM YYYY HH:mm");
        return item;
      });
      setLoading(false);
      setData(data);
      // return data;
    } catch (err: any) {
      setLoading(false);
      setData(null);
    }
  };

  /** GET DATA PAGINATION */
  const getCountDataNull = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let filter = customParamsService(customFilter, queryParams);

    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        limit: pagination.perPage,
        id_parent_lokasi: queryParams?.__parent_lokasi
          ? queryParams?.__parent_lokasi
          : null,
        ...filter,
        ...customParams,
        sort_by: "datum,no_urut_cell",
      };

      if (queryParams?.time) {
        params.datum = queryParams?.time
          ? `${queryParams?.date} ${queryParams?.time}`
          : null;
      } else if (queryParams?.date) {
        params.datum_date = queryParams?.date
          ? queryParams?.date
          : moment().format("YYYY-MM-DD");
      }
      const req: any = await getAllByPath(
        pathServiceCountNull,
        params,
        source.token
      );

      const { results } = req;

      let info: any = `Arus (A)=${results?.i ? results?.i : 0}, Tegangan (kV)=${results?.v ? results?.v : 0
        }, Daya Aktif (KW)= ${results?.p ? results?.p : 0} `;

      setPagination((prevState: any) => ({
        ...prevState,
        info: info,
      }));
    } catch (err: any) {
      //console.log("err", err);
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filter = customParamsService(customFilter, queryParams);

    const params = {
      page: -1,
      limit: -1,
      id_parent_lokasi: queryParams?.__parent_lokasi
        ? queryParams?.__parent_lokasi
        : null,
      // datum_date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
      // datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
      export: true,
      export_type: exportData?.type,
      ...filter,
      ...customParams,
      sort_by: "datum,no_urut_cell",
    };
    // if (queryParams?.time) {
    //   params.datum = queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null;
    // } else if (queryParams?.date) {
    params.datum_date = queryParams?.date
      ? queryParams?.date
      : moment().format("YYYY-MM-DD");
    // }

    try {
      let req: any = await getAllDownload(pathService, params, source.token);

      /** RESET EXPORT */
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
      dispatch(exportingData(null));
    } catch (err: any) {
      let message: string = err?.response
        ? `, ${err?.response?.data?.message}`
        : err?.response?.data?.config?.statusText;
      console.log("message", message);

      dispatchNotification(
        `Gagal export / download data/ Data kosong`,
        "danger"
      );

      dispatch(exportingData(null));
    }
  };

  const getGenerate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filter = customParamsService(customFilter, queryParams);

    setLoading(true);
    try {
      const params = {
        id_user_entri: currentUser.id_user,
        id_parent_lokasi: queryParams?.__parent_lokasi,
        datum: queryParams?.date,
        ...filter,
        ...customParams,
      };

      const req: any = await postByPath(
        `${pathService}/generate`,
        params,
        source.token
      );

      if (generateData) {
        dispatch(generatingData(null));
        dispatch(reloadingData(moment().valueOf()));
      }
      if (req?.status === 404 || req?.status === 400) {
        dispatchNotification(`Gagal Generate data ${req?.message}`, "danger");
      }
      return req.results;
    } catch (err: any) {
      let message: string = err?.response
        ? `, ${err?.response?.data?.message}`
        : err?.response?.data?.config?.statusText;

      dispatchNotification(`Gagal Generate data ${message}`, "danger");
      // dispatchNotification(`Gagal Generate data`, 'danger');
      setLoading(false);
      if (generateData) {
        dispatch(generatingData(null));
      }
    }
  };

  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };

  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, source.token);

      // dispatch(reloadingData(moment().valueOf()))
      if (req?.status === 404) {
        dispatchNotification(`${req?.message}`, "danger");
      }
      if (req?.status === 200) {
        const index = data?.findIndex(
          (item: any) => item[primaryKey] === req?.results[primaryKey]
        );
        //console.log("index", index);
        let datas: any = data;
        let items: any = datas[index];
        datas[index] = {
          ...items,
          f: req?.results?.f,
          i: req?.results?.i,
          p: req?.results?.p,
          q: req?.results?.q,
          cosq: req?.results?.cosq,
          v: req?.results?.v,
          v_status: req?.results?.v_status,
          i_status: req?.results?.i_status,
          no_urut_cell: req?.results?.no_urut_cell,
        };
        //console.log("datas")
        //console.log(datas)
        updateTable(datas);
        dispatchNotification(`${req?.message}`, "success");
      }
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;

      dispatchNotification(`${message}`, "danger");
      setLoading(false);
    }
  };

  const sendRequest = (
    url: string,
    method = "POST",
    dataCell: any = {},
    id: any = null
  ) => {
    let req: any;
    try {
      switch (method) {
        case "POST":
          dataCell.id_user_update = currentUser?.id_user;
          req = postByPath(`${url}`, dataCell, source.token);
          return req.message;
          break;
        case "PUT":
          dataCell.id_user_update = currentUser?.id_user;

          if (keys(dataCell)[0] == 'i') {
            dataCell.i_status = 1;
          }else if (keys(dataCell)[0] == 'v') {
            dataCell.v_status = 1;
          } 
        //   console.log(keys(dataCell)[3]);

        // console.log("post update ",dataCell);

          const existRowUpdate: any = data.find(
            (item: any) => item[primaryKey] == id
          );
          const iMaxValue = parseFloat(existRowUpdate.i_max);
          const fieldRowUpdate = keys(dataCell)[0];
          const newValueRow: any = parseFloat(dataCell[fieldRowUpdate]);

          if (
            fieldRowUpdate == "cosq" &&
            (newValueRow < 0 || newValueRow > 1)
          ) {
            dispatchNotification(`Nilai cosq harus 0 - 1`, "danger");
            return;
          }

          if (newValueRow > iMaxValue) {
            dispatchNotification(
              `Nilai tidak boleh lebih dari I Max`,
              "danger"
            );
          } else if (newValueRow < 0) {
            dispatchNotification(`Nilai minimal 0`, "danger");
          } else {
            // //console.log("dataCell")
            // //console.log(dataCell)
            req = updateData(`${url}`, dataCell, id);
            req = putByPath(`${url}`, dataCell, id, source.token);
            return req.message;
          }
          break;
        case "DELETE":
          req = deleteByPath(`${url}`, id, source.token);
          return req.message;
          break;
        case "GET":
          req = getAllData();
          break;
      }
    } catch (error) {
      //console.log("error", error);
      return error;
    }
  };

  useEffect(() => {
    getCountDataNull();
    getAllData();
    // setOrdersData(
    //   new CustomStore({
    //     key: primaryKey,
    //     load: () => getAllData(),
    //     insert: (values: any) =>
    //       sendRequest(pathService, 'POST', values),
    //     update: (key: any, values: any) =>
    //       sendRequest(pathService, 'PUT', values, key),
    //     remove: (key: any) =>
    //       sendRequest(pathService, 'DELETE', null, key),
    //   })
    // );
    return () => {
      source.cancel();
      setOrdersData(null);
      setData(null);
    };
  }, [
    queryParams.page,
    pagination?.perPage,
    queryParams?.date,
    queryParams?.time,
    queryParams?.__parent_lokasi,
    queryParams?.__pembangkit,
    queryParams?.__gardu_induk,
    queryParams?.__trafo_gi,
    queryParams?.__penyulang,
    reloadData,
  ]);

  // const tableData = useMemo(() => data, [data]);

  const updateTable = (data: any) => {
    setOrdersData(
      new CustomStore({
        key: primaryKey,
        load: () => data,
        insert: (values: any) => sendRequest(pathService, "POST", values),
        update: (key: any, values: any) =>
          sendRequest(pathService, "PUT", values, key),
        remove: (key: any) => sendRequest(pathService, "DELETE", null, key),
      })
    );
  };

  useEffect(() => {
    //console.log("data useEffect", data);
    updateTable(data);

    return () => {
      source.cancel();
      setOrdersData(null);
    };
  }, [data]);

  useEffect(() => {
    if (exportData && exportData?.table == module) {
      getAllDataExport();
    }
  }, [exportData]);

  useEffect(() => {
    if (generateData && generateData?.table == module) {
      getGenerate();
    }
  }, [generateData]);

  // const handleRowPrepared = (e: any) => {

  //   if (e?.rowType == "data" && ChangeColorRow) {
  //     if (e?.data != "") {
  //       //console.log(e?.rowIndex);
  //       e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
  //       /*

  //       Beban dari Operator = bg-outline-dark"
  //       Beban dari SCADA/AMR = bg-trust
  //       Beban dari SCADA/AMR melebihi CT = bg-anger
  //       Beban dari SCADA/AMR sudah diupdate Operator = bg-joy
  //       Beban Minus dari SCADA/AMR = bg-anticipation
  //       Beban Minus = bg-surprise
  //       */
  //       if (e?.data.sinkron_data ==null && e?.data.id_user_update !=null) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-disgust");
  //       }else if (e?.data.sinkron_data =='SCADA' || e?.data.sinkron_data =='AMR' && e?.data.id_user_update ==null) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-trust");
  //       }else if (e?.data.sinkron_data =='SCADA' || e?.data.sinkron_data =='AMR' && e?.data.i > e?.data.i_max ) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-anger");
  //       }else if (e?.data.sinkron_data =='SCADA' || e?.data.sinkron_data =='AMR' && e?.data.id_user_update !=null) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-joy");
  //       }else if (e?.data.sinkron_data =='SCADA' || e?.data.sinkron_data =='AMR' && e?.data.i < 0) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-anticipation");
  //       }else if (e?.data.sinkron_data ==null && e?.data.id_user_update !=null && e?.data.i < 0) {
  //         e.rowElement.className = e.rowElement.className.concat(" bg-surprise");
  //       }

  //     }
  //   }
  // }

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className="mb-3">
        <DataGrid
          className="mt-3 table-responsive"
          id="grid"
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
          // columnWidth={70}
          rowAlternationEnabled={true}
          // onRowPrepared={handleRowPrepared}
          // onRowPrepared={handleRowPrepared()}
          columnAutoWidth={true}
          height={500}
        >
          <Sorting mode="multiple" />
          <ColumnFixing enabled={true} />
          <Scrolling mode="virtual" rowRenderingMode="virtual" />
          {/* <Paging defaultPageSize={10} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode={"compact"}
            showPageSizeSelector={true}
            showInfo={true}
            showNavigationButtons={true}
          /> */}
          <Editing
            refreshMode={"reshape"}
            mode="cell"
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
            allowUpdating={allowUpdating}
          />

          {/* <Scrolling mode='virtual' /> */}

          {/* <Column dataField='datetime' caption="Tanggal" minWidth={150} allowEditing={false} allowUpdating={false} ></Column> */}
          {/* {columns.map((item: any, index: number) => (
            <Column dataField={item?.field} allowEditing={false} allowUpdating={false} caption={item?.caption} key={index} />
          ))} */}
          {children}
        </DataGrid>
      </div>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
        forced={true}
        onChangeItemPerPage={onChangeItemPerPage}
      />
    </>
  );
}

export default TablePengukuranBeban;
