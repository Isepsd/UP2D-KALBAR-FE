import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'


import {
  Column,
} from 'devextreme-react/data-grid';

// import { useApp } from '@app/context/AppContext';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableGrid from '@app/modules/Table/TableGrid';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByPath, getAllDownload, postByPath } from '@app/services/main.service';
import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { exportingData, generatingData } from '@app/store/reducers/app';
import { setLoading } from '@app/store/reducers/ui';
import fileDownload from 'js-file-download';
import qs from 'query-string';
import Filter from './Filter';
import Pagination from '@app/components/Pagination/Pagination';

export default function PbLoadProfilePage() {
  const label = "Telemetring Load Profile"
  const url: any = API_PATH().opsisdis.pengukuran_beban.profile;
  const source = axios.CancelToken.source();
  const { exportData, generateData } = useSelector((state: any) => state.app);
  const queryParams = qs.parse(location.search);
  const { currentUser } = useSelector((state: any) => state.auth);
  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });

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
        tgl: queryParams?.date ? `${queryParams?.date}${queryParams?.time ? ` ${queryParams?.time}` : ""}` : null,
        customer_rid: queryParams?.customer_rid ? queryParams?.customer_rid : null,
      };

      const req: any = await getAllByPath(url, params, source.token);

      const { results, total } = req;


      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(total / pagination?.perPage),
        totalData: total,
      }));
      let data = results.map((item: any, index: number) => {
        item.number = index + 1
        item.datetime = moment(item?.tgl).format("DD MMM YYYY HH:mm")
        item.customer_name = item?.ref_customer?.nama
        return item;
      });

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
      customer_rid: queryParams?.customer_rid ? queryParams?.customer_rid : null,
      tgl: queryParams?.date ? `${queryParams?.date} ${queryParams?.time}` : null,
      export: true,
      export_type: exportData?.type,
    };

    try {
      let req: any = await getAllDownload(
        url,
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
        customer_rid: queryParams?.customer_rid,
        tgl: queryParams?.date ? `${queryParams?.date} ${queryParams?.time}` : null,
      };

      const req: any = await postByPath(`${url}/generate`, params, source.token);

      if (generateData) {
        dispatch(generatingData(null))
      }
      return req.results;
    } catch (err: any) {
      dispatchNotification(`Gagal Generate data`, 'danger');
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
    getAllData()
  }, [queryParams?.date, queryParams?.customer_rid])

  return (

    <div >
      <TableDataListAction
        add={false}
        column={false}
        module={label}
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>
      <div>
        <TableGrid

          pathService={url}
          primaryKey="id"
          module={label}
          allowUpdating={true}
          getAllData={getAllData}
          getGenerate={getGenerate}
          getAllDataExport={getAllDataExport}
        >
          <Column dataField='number' caption="NO" allowUpdating={false} allowEditing={false} minWidth={50} />

          <Column dataField='datetime' caption="Tanggal" dataType='string' allowUpdating={false} allowEditing={false} minWidth={150} ></Column>

          <Column dataField='customer_rid' caption="Customer Rid" allowUpdating={false} allowEditing={false} minWidth={120} />
          <Column dataField='customer_name' caption="Customer Name" allowUpdating={false} allowEditing={false} minWidth={150} />
          <Column caption="Arus">
            <Column
              dataField="amp_r"
              caption="R"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="amp_s"
              caption="S"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="amp_t"
              caption="T"
              dataType='number'
              minWidth={50}
            />
          </Column>
          <Column caption="Phase">
            <Column
              dataField="phase_r"
              caption="R"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="phase_s"
              caption="S"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="phase_t"
              caption="T"
              dataType='number'
              minWidth={50}
            />
          </Column>
          <Column caption="Volt">
            <Column
              dataField="volt_r"
              caption="R"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="volt_s"
              caption="S"
              dataType='number'
              minWidth={50}
            />
            <Column
              dataField="volt_t"
              caption="T"
              dataType='number'
              minWidth={50}
            />
          </Column>
          <Column caption="Power">
            <Column dataField='power_active' caption="Actice" dataType='number' minWidth={100}></Column>
            <Column dataField='power_apparent' caption="Apparent" dataType='number' minWidth={100}></Column>
            <Column dataField='power_reactive' caption="Reactive" dataType='number' minWidth={100}></Column>
          </Column>
        </TableGrid>
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={true}
        />
      </div>
    </div>
  )
}
