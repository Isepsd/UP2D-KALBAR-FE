import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'whatwg-fetch';
import axios from 'axios';
import { getAllByPath, putByPath, postByPath, getAllDownload, deleteByPath } from '@app/services/main.service';
import qs from 'query-string';
import fileDownload from 'js-file-download';
import { exportingData, reloadingData, generatingData } from '@app/store/reducers/app';
import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { customParamsService } from '@app/helper/browser.helper';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import Pagination from '@app/components/Pagination/Pagination';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

interface ITableDataPengukuranBeban {
  pathServiceCountNull?: any,
  pathService: any,
  primaryKey: string,
  children: any
  label: string
  module: string
  parentField?: string
  callBackCount?: any
  roleActions?: any
  customFilter?: any
  customParams?: any
  allowAdding?: boolean
  allowDeleting?: boolean
  allowUpdating?: boolean
  ChangeColorRow?: boolean
}
export function TableDataPengukuranBeban({
  roleActions,
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
}: ITableDataPengukuranBeban) {
  const { exportData, reloadData, generateData } = useSelector((state: any) => state.app);
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
    info: null
  });
  const [loading, setLoading] = useState<boolean>()
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true)
    let filter = customParamsService(customFilter, queryParams);
    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        // page: -1,
        limit: pagination.perPage,
        id_parent_lokasi: queryParams?.__parent_lokasi ? queryParams?.__parent_lokasi : null,
        // datum_date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
        // datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
        ...filter,
        ...customParams,
        sort_by: "datum,no_urut_cell"
      };

      if (queryParams?.time) {
        params.datum = queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null;
      } else if (queryParams?.date) {
        params.datum_date = queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD")
      }

      const req: any = await getAllByPath(pathService, params, source.token);

      const { results, total } = req;
      // console.log("roleAction get ass", roleActions);

      if (callBackCount && roleActions?.generate) {
        callBackCount(total < 1, params)
      }

      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(total / pagination?.perPage),
        totalData: total,
      }));
      let data = results.map((item: any, index: number) => {
        item.number = pagination.currentPage * pagination.perPage + (index + 1);
        item.nama_gardu_induk = item?.ref_parent_lokasi?.nama_gardu_induk
        item.kode_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi
        item.penyulang_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi
        item.kode_penyulang = item?.ref_lokasi?.kode_lokasi
        item.nama_lokasi = item?.ref_lokasi?.nama_lokasi
        item.pemilik = item?.ref_lokasi?.pemilik
        item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi
        item.up3 = item?.ref_lokasi?.up3_1 ? item?.ref_lokasi?.up3_1?.nama_lokasi : null
        item.datetime = moment(item?.datum).format("DD MMM YYYY HH:mm")
        return item;
      });
      setLoading(false);
      setData(data)
      // return data;
    } catch (err: any) {
      setLoading(false)
      setData(null)
    }
  };


  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filter = customParamsService(customFilter, queryParams);

    const params = {
      page: -1,
      limit: -1,
      id_parent_lokasi: queryParams?.__parent_lokasi ? queryParams?.__parent_lokasi : null,
      // datum_date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
      // datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
      export: true,
      export_type: exportData?.type,
      ...filter,
      ...customParams,
      sort_by: "datum,no_urut_cell"
    };
    // if (queryParams?.time) {
    //   params.datum = queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null;
    // } else if (queryParams?.date) {
    params.datum_date = queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD")
    // }

    try {
      let req: any = await getAllDownload(
        pathService,
        params,
        source.token
      );

      /** RESET EXPORT */
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
      dispatch(exportingData(null));
    } catch (err: any) {

      let message: string = err?.response ? `, ${err?.response?.data?.message}` : err?.response?.data?.config?.statusText;
      // console.log("message", message);

      dispatchNotification(`Gagal export / download data/ Data kosong`, 'danger');

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
        ...customParams
      };

      const req: any = await postByPath(`${pathService}/generate`, params, source.token);

      if (generateData) {
        dispatch(generatingData(null))
        dispatch(reloadingData(moment().valueOf()))
      }
      if (req?.status === 404 || req?.status === 400) {
        dispatchNotification(`Gagal Generate data ${req?.message}`, 'danger');
      }
      return req.results;
    } catch (err: any) {
      let message: string = err?.response ? `, ${err?.response?.data?.message}` : err?.response?.data?.config?.statusText;

      dispatchNotification(`Gagal Generate data ${message}`, 'danger');
      // dispatchNotification(`Gagal Generate data`, 'danger');
      setLoading(false);
      if (generateData) {
        dispatch(generatingData(null))
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

  useEffect(() => {
    // getCountDataNull();    
    getAllData()
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
      source.cancel()
      setOrdersData(null);
      setData(null);
    }
  }, [
    queryParams.page,
    pagination.perPage,
    queryParams?.date,
    queryParams?.time,
    queryParams?.__parent_lokasi,
    queryParams?.__pembangkit,
    queryParams?.__gardu_induk,
    queryParams?.__trafo_gi,
    queryParams?.__penyulang,
    queryParams?.__keypoint,
    queryParams?.__gh,
    reloadData,
  ]);
  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };

  return (
    <>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
        forced={true}
        onChangeItemPerPage={onChangeItemPerPage}
      />
    </>
  )
}