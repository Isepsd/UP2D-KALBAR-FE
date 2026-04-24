import React, { useMemo, useState, useEffect, useCallback } from 'react';
import ReactTable from '@app/components/ReactTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
// import { useApp } from '@app/context/AppContext';
import axios from 'axios';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import {
  deleteByPath,
  getAllByPath,
  getAllDownload,
  putByPath,
} from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { get, isObject } from 'lodash';
import moment from 'moment';
import fileDownload from 'js-file-download';
import { exportingData, reloadingData } from '@app/store/reducers/app';
import PaginationProp from '@app/components/Pagination/PaginationProp';

export default function TableDataPagination({
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
  rowSelect = false,
  rowSelectType = 'checkbox',
  selectedRows,
  trigger,
  module = null,
  ids = 'id',
  onEmpty,
  containerClass = 'my-3 table table-responsive',
  approvalAlias
}: ITableDataPagination) {
  const source = axios.CancelToken.source();
  const { activePage, activeFilters, callbackForm } = useSelector(
    (state: any) => state.ui
  );
  const { exportData, reloadData } = useSelector((state: any) => state.app);
  const { currentUser } = useSelector((state: any) => state.auth);

  let [searchParams, setSearchParams] = useSearchParams();

  const currentPage = 0

  const label = module ? module : activePage?.display;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();

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
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Hapus data ${label}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
    ...deleteConfirmation,
  });

  const initFilters = {
    keyword: '',
    sort_by: 'nama',
  };

  const [filters, setFilters] = useState<any>(initFilters);

  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>(selected);

  useEffect(() => {
    respDataApi(respData);
  }, [respData]);

  useEffect(() => {
    if (rowData) setData(rowData);
  }, [rowData]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const params = {
        ...filters,
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        // keyword: searchValue,
        ...filterParams,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before ? activeFilters?.filters?.year_before + "-01-01" : undefined,
        year_after: activeFilters?.filters?.year_after ? activeFilters?.filters?.year_after + "-01-01" : undefined,
        month_before: activeFilters?.filters?.month_before ? activeFilters?.filters?.month_before + "-01" : undefined,
        month_after: activeFilters?.filters?.month_after ? activeFilters?.filters?.month_after + "-01" : undefined,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results.map((d: any, i: number) => {
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
      setLoading(false);

      if (reloadData) {
        dispatch(reloadingData(null))
      }
    } catch (err: any) {
      setRespData([]);
      setLoading(false);
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    // console.log("path",path);
    // console.log("trigger",trigger);
    // console.log("trigger",trigger);
    // console.log("callbackForm?.getData",callbackForm?.getData);
    
    if (trigger !== null && trigger != null && callbackForm?.getData !== false) {
      getAllData();
    } else {
      // console.log("path else");
      
      setLoading(undefined);
    }

    return () => {
      source.cancel();
    };
  }, [
    pagination?.currentPage,
    // searchValue,
    trigger,
    path,
    activeFilters,
    callbackForm,
    location.pathname,
  ]);

  /** HANDLE RELOAD DATA CLICK */
  useEffect(() => {
    if (reloadData) {
      getAllData()
    }
  }, [reloadData])


  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    const paramsExporting = exportConfig?.addParams ? exportConfig?.addParams : {};
    const paramsDefault = {
      ...filters,
      page: pagination.currentPage + 1,
      limit: pagination.perPage,
      // keyword: searchValue,
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
      let content: string = headers['content-disposition'];
      const filename = content
        .replace('attachment; filename=', '')
        .replaceAll('"', '');
      fileDownload(
        dataBlob,
        `${label}_${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(exportData?.type) ? filename : `${filename}.${exportData?.type}`}`
      );
      setLoading(false)
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, 'danger');
      setLoading(false);
      dispatch(exportingData(null));
    }
  };

  useEffect(() => {
    if (exportData && exportData?.table == module) {
      getAllDataExport();
    }
  }, [exportData]);

  const tableData = useMemo(() => data, [data]);

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath(path, dataSelected.id, source.token);
      dispatchNotification(`Sukses menghapus data ${label}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal menghapus data ${label}`, 'danger');
    }
  };

  /** DELETE HANDLING */
  const approveWP = async () => {
    setLoading(true);

    const params = {
      status_persetujuan: approvalAlias,
      id_user_update: currentUser.id_user
    }

    try {
      await putByPath(`${path}/aproval-wp`, params, dataSelected.id, source.token);
      dispatchNotification(`Sukses approve WP`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal approve WP`, 'danger');
    }
  };

  useEffect(() => {
    if (selected) {
      switch (action) {
        case 'delete':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
          }));
          break;
        case 'update-status-gardu':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'fa-regular fa-circle-question',
            description: `Apakah laporan akan di close ?`,
            subDescriotion: `Data tidak dapat dikembalikan`,
            textApproved: 'Ok',
            classApproved: 'primary',
            textDecline: 'Cancel',
            show: true,
          }));
          break;
        case 'approve-wp':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'a-solid fa-thumbs-up',
            description: `Apakah data tersebut akan di Approve ?`,
            subDescriotion: `Data akan di approve`,
            textApproved: 'Approve',
            classApproved: 'primary',
            textDecline: 'Tidak',
            action: 'approve-wp',
            show: true,
          }));
          break;
        case 'edit.modal':
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case 'edit':
          navigate(`edit/${get(selected, primaryKey)}`);
          break;
        case 'detail':
          navigate(`detail/${get(selected, primaryKey)}`);
          break;
        default:
          break;
      }
    }
  }, [action, selected]);

  const callbackModalConfirm = (approved = false) => {
    if (approved) {
      switch (modalConfirm?.action) {
        case 'approve-wp':
          approveWP();
          break;
        default:
          deleteData();
          break;
      }
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

  const handleSort = useCallback(({ sortBy }: any) => {
    if (sortBy.length > 0) {
      setFilters((prevState: any) => ({
        ...prevState,
        sort_by: sortBy[0]['desc'] ? '-' : '' + sortBy[0]['id'],
      }));
    }
  }, []);

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    return () => {
      setData([]);
      setRespData([]);
    };
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <ReactTable
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        onCheckedRows={selectedRows}
        columns={columnsConfig}
        data={tableData}
        onSort={handleSort}
        containerClass={containerClass}
        loading={loading}
      />

      {
        paging?.show != false &&
        <PaginationProp
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={pagingPresistance}
        />
      }

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
interface ITableDataPagination {
  columnsConfig: any;
  filterParams?: any;
  respDataApi: any;
  rowData: any;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
  selected?: any;
  path: any;
  exportConfig?: IExportConfig;
  primaryKey: any;
  action?: string | undefined;
  onColumnsChanged?: any;
  paging?: any;
  pagingPresistance?: boolean;
  deleteConfirmation?: any;
  trigger?: any;
  module?: any;
  ids?: any;
  onEmpty?: any;
  containerClass?: string,
  approvalAlias?: any
}


interface IExportConfig {
  path?: string
  addParams?: any;
  customParams?: any;
}