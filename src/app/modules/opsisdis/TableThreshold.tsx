import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import axios from 'axios';
import { getAllByPath, putByPath, postByPath, getAllDownload, deleteByPath } from '@app/services/main.service';
import DataGrid, { Column, Editing,  Scrolling, Sorting } from 'devextreme-react/data-grid';
import Pagination from '@app/components/Pagination/Pagination';
import qs from 'query-string';
import fileDownload from 'js-file-download';
import { exportingData, generatingData } from '@app/store/reducers/app';
import { setLoading } from '@app/store/reducers/ui';
import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { dateTimeFormat } from '@app/helper/time.helper';
/** COMPONENTS */

type Props = {
  pathService: any,
  primaryKey: string,
  label: string
  module: string
};

function TableThreshold({
  pathService,
  primaryKey,
  label,
  module
}: Props) {
  /** DATA RESP */
  const { exportData, reloadData, generateData } = useSelector((state: any) => state.app);
  const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [ordersData, setOrdersData] = useState<any>();
  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });
  // const [optionsData, setOptionsData] = useState<any>();
  const dispatch = useDispatch();

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: queryParams.page ? queryParams.page : 1,
        limit: pagination.perPage,
        date: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
      };

      const req: any = await getAllByPath(pathService, params, source.token);

      const { results, total } = req;
      let data: any = results?.map((item: any, index: number) => {
        item.number = index + 1;
        item.nama = item?.ref_frek?.nama;
        item.datetime = item?.datum ? dateTimeFormat(item?.datum) : "-";
        return item;
      })
      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(total / pagination?.perPage),
        totalData: total,
      }));
      return data;
    } catch (err: any) {
      return []
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    const params = {
      page: 0,
      limit: 10000,
      datum: queryParams?.time ? `${queryParams?.date} ${queryParams?.time}` : null,
      export: true,
      export_type: exportData?.type,
    };

    try {
      let req: any = await getAllDownload(
        pathService,
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


  const getGenerate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    try {
      const params = {
        id_user_entri: currentUser.id_user,
        id_parent_lokasi: queryParams?.__parent_lokasi,
        datum: `${queryParams?.date} ${queryParams?.time}`,
      };

      const req: any = await postByPath(`${pathService}/generate`, params, source.token);

      if (generateData) {
        dispatch(generatingData(null))
      }
      return req.results;
    } catch (err: any) {
      let message: string = err?.response ? `, ${err?.response?.data?.message}` : " ";

      dispatchNotification(`Gagal Generate data ${message}`, 'danger');
      setLoading(false);
      if (generateData) {
        dispatch(generatingData(null))
      }
    }
  };

  // const getOptionsData = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       page: 1,
  //       limit: 1000,

  //     };

  //     const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);


  //     return req.results;
  //   } catch (err: any) {
  //     return []

  //   }
  // };


  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const sendRequest = (url: string, method = 'POST', data: any = {}, id: any = null) => {
    let req: any;
    try {
      switch (method) {
        case "POST":
          data.id_user_update = currentUser?.id_user
          req = postByPath(`${url}`, data, source.token)
          return req.message;
          break;
        case "PUT":
          data.id_user_update = currentUser?.id_user
          req = putByPath(`${url}`, data, id, source.token)
          return req.message;
          break;
        case "DELETE":
          req = deleteByPath(`${url}`, id, source.token)
          return req.message;
          break;
        case "GET":
          req = getAllData();
          break;

      }

    } catch (error) {
      // console.log("error", error);
      return error;
    }
  }

  useEffect(() => {

    // setOptionsData(
    //   new CustomStore({
    //     key: 'Value',
    //     loadMode: 'raw',
    //     load: () => getOptionsData(),
    //   })
    // );

    setOrdersData(
      new CustomStore({
        key: primaryKey,
        load: () => getAllData(),
        insert: (values: any) =>
          sendRequest(pathService, 'POST', values),
        update: (key: any, values: any) =>
          sendRequest(pathService, 'PUT', values, key),
        remove: (key: any) =>
          sendRequest(pathService, 'DELETE', null, key),
      })
    );
    return () => {
      source.cancel()
      setOrdersData(null);
      // setOptionsData(null)
    }
  }, [queryParams.page, queryParams?.time, queryParams?.__parent_lokasi, reloadData]);



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


  return (
    <>
      <div className='mb-3'>
        <DataGrid
          className="mt-3"
          id='grid'
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
        >
          <Sorting mode="multiple" />
          <Editing
            refreshMode={'reshape'}
            mode='cell'
            allowAdding={false}
            allowDeleting={false}
            allowUpdating={true}
          />
          <Scrolling mode='virtual' />
          
          <Column dataField="id_meter" caption="ID Meter" allowUpdating={false}
            allowEditing={false} />
          <Column caption="Nama Frekwensi" dataField="nama" allowUpdating={false}
            allowEditing={false} />
          <Column caption="Lokasi" dataField="lokasi" type="string"  allowUpdating={true}
            allowEditing={true}/>       
          <Column caption="Tanggal" dataField="datetime" allowUpdating={false}
            allowEditing={false} />
          <Column caption="Range Nilai" dataField="range_nilai" dataType='string' allowUpdating={false} allowEditing={false} />
          <Column caption="Jumlah" dataField="jumlah" dataType='number' allowUpdating={false}
            allowEditing={false} />


        </DataGrid>

      </div>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
        forced={true}
      />
    </>
  );
}

export default TableThreshold