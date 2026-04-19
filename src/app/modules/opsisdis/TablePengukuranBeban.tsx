import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'whatwg-fetch';
import axios from 'axios';
import { getAllByPath, putByPath, postByPath, getAllDownload } from '@app/services/main.service';
import qs from 'query-string';
import fileDownload from 'js-file-download';
import { exportingData, reloadingData, generatingData } from '@app/store/reducers/app';
import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { customParamsService } from '@app/helper/browser.helper';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import Pagination from '@app/components/Pagination/Pagination';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
/** COMPONENTS */

type Props = {
  pathServiceCountNull?: any,
  pathService: any,
  primaryKey: string,
  children?: any
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
  columnsGroupConfig?: any
  columnsConfig?: any
  respDataApi?: any
  rowData?: any
};

function TablePengukuranBeban({
  roleActions,
  pathService,
  callBackCount,
  label,
  module,
  allowUpdating = true,
  customFilter = [],
  customParams = {},
  columnsGroupConfig,
  columnsConfig,
  respDataApi,
  rowData,
  primaryKey
  // ChangeColorRow = false
}: Props) {
  /** DATA RESP */
  const { exportData, reloadData, generateData } = useSelector((state: any) => state.app);
  const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
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

  const [sourcesData, setSourcesData] = useState<any>({
    // datafields: columnsConfig?.datafield,
    datatype: 'array',
    id: 'm\\:properties>d\\:OrderID',
    pagenum: 3,
    // pager: (pagenum: any, pagesize: any, oldpagenum: any): void => {
    // callback called when a page or page size is changed.
    // },
    pagesize: pagination,
    localdata: []
  })
  const [loading, setLoading] = useState<boolean>()
  const dispatch = useDispatch();


  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true)
    let filter = customParamsService(customFilter, queryParams);
    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        limit: pagination.perPage,
        id_parent_lokasi: queryParams?.__parent_lokasi ? queryParams?.__parent_lokasi : null,
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
      message;

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

  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, source.token)

      if (req?.status === 404) {
        dispatchNotification(`${req?.message}`, 'danger');
      }
      if (req?.status === 200) {
        dispatchNotification(`${req?.message}`, 'success');
      }
      getAllData()
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;

      dispatchNotification(`${message}`, 'danger');
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllData()

    return () => {
      source.cancel()
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

  useEffect(() => {
    if (data)
      respDataApi(data)
    return () => {
      source.cancel()
    }
  }, [data]);

  useEffect(() => {
    if (rowData) {
      setSourcesData((prev: any) => {
        return {
          ...prev,
          localdata: rowData || []
        }
      })
    }
    return () => {
      source.cancel()
    }
  }, [rowData]);

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

  const columngroups = [
    { text: 'Product Details', align: 'center', name: 'ProductDetails' },
  ]
  const sources = new jqx.dataAdapter(sourcesData)
  const onCellendedit = (item: any) => {
    const { args } = item;

    if (args?.oldvalue != args?.value) {
      updateData(
        pathService,
        {
          [args?.datafield]: args?.value,
          id_user_update: currentUser?.id_user
        },
        args?.row[primaryKey]
      )
    }

  }
  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className='mb-3 mt-2'>
        <JqxGrid
          pageable={false}
          editable={allowUpdating}
          width={'100%'}
          height={'90%'}
          source={sources}
          columns={columnsConfig?.columns}
          altrows={true}
          columnsresize={true}
          columngroups={columnsGroupConfig ? columnsGroupConfig : columngroups}
          onCellendedit={onCellendedit}
        />
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

export default TablePengukuranBeban