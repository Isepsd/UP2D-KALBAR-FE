import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomStore from 'devextreme/data/custom_store';
import 'whatwg-fetch';
import axios from 'axios';
import { putByPath, postByPath, deleteByPath } from '@app/services/main.service';
import DataGrid, { Editing, Scrolling, Sorting } from 'devextreme-react/data-grid';
import Pagination from '@app/components/Pagination/Pagination';
import qs from 'query-string';
// import fileDownload from 'js-file-download';
// import { exportingData, reloadingData } from '@app/store/reducers/app';
// import { setLoading } from '@app/store/reducers/ui';
// import moment from 'moment';
// import { notificationTemplate } from '@app/helper/notificationTemplate';
// import { addNotification } from '@app/store/notification/notification.action';
/** COMPONENTS */

type Props = {
  pathService: any,
  primaryKey: string,
  children: any
  module: string
  parentField?: string
  allowAdding?: boolean
  allowDeleting?: boolean
  allowUpdating?: boolean
  getAllData: any
  getGenerate: any
  getAllDataExport: any
};

function TableGrid({
  pathService,
  primaryKey,
  children,
  module,
  allowAdding = false,
  allowDeleting = false,
  allowUpdating = false,
  getAllData,
  getGenerate,
  getAllDataExport
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
  const id = Date.now() / 1000;
 

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
          id={id}
          showBorders={true}
          dataSource={ordersData}
          repaintChangesOnly={true}
        >
          <Sorting mode="multiple" />
          <Editing
            refreshMode={'reshape'}
            mode='cell'
            allowAdding={allowAdding}
            allowDeleting={allowDeleting}
            allowUpdating={allowUpdating}
          />

          <Scrolling mode='virtual' />
          {children}
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

export default TableGrid