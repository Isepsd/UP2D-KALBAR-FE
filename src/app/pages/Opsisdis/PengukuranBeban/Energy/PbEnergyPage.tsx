import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'



// import { useApp } from '@app/context/AppContext';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDownload, postByPath } from '@app/services/main.service';
import moment from 'moment';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { exportingData, generatingData } from '@app/store/reducers/app';
import { setLoading } from '@app/store/reducers/ui';
import fileDownload from 'js-file-download';
import qs from 'query-string';
import Filter from './Filter';
import ModalForm from '@app/components/Modals/ModalForm';
import PbEnergyUpload from './PbEnergyUpload';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import TableDataJQWidget from '@app/modules/Table/TableDataJQWidget';
import { AMR_COLUMN_JQWIDGET, AMR_GROUP_JQWIDGET } from '@app/configs/jqwidget/amr.column.config';

export default function PbEnergyPage() {
  const label = "Telemetring Energi"
  const url: any = API_PATH().opsisdis.pengukuran_beban.energy;
  const source = axios.CancelToken.source();
  const { exportData, generateData } = useSelector((state: any) => state.app);
  const queryParams = qs.parse(location.search);
  const { currentUser } = useSelector((state: any) => state.auth);
  const [columns] = useState<any>(AMR_COLUMN_JQWIDGET());
  const dispatch = useDispatch();
  const [dataRows, setDataRows] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Upload Data Beban Energy`,
  });


  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data.map((item: any) => {
      item.datetime = moment(item?.tgl).format("DD MMM YYYY HH:mm")
      item.customer_name = item?.ref_customer?.nama
      // item.kwh_real = (item.kwh - item.kwh_prev) * item?.fk
      // item.kvarh_real = (item.kvarh - item.kvarh_prev) * item?.fk
      // item.rate1_real = (item.rate1 - item.rate1_prev) * item?.fk
      // item.rate2_real = (item.rate2 - item.rate2_prev) * item?.fk
      // item.rate3_real = (item.rate3 - item.rate3_prev) * item?.fk
      return item;
    });
    setDataRows(dataTableValue)
  }

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);
    const params = {
      page: "-1",
      limit: "-1",
      customer_rid: queryParams?.customer_rid ? queryParams?.customer_rid : null,
      date: queryParams?.date ? `${queryParams?.date}` : null,
      export: true,
      export_type: exportData?.type,
      sort_by: "datum"
    };

    try {
      let req: any = await getAllDownload(
        url,
        params,
        source.token
      );

      /** RESET EXPORT */
      dispatch(exportingData(null));
      setLoading(false);
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

      setLoading(false);

      // console.log("err", err?.response);


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
        customer_rid: queryParams?.customer_rid ? queryParams?.customer_rid : null,
        tgl: queryParams?.date ? `${queryParams?.date}` : null,
      };

      const req: any = await postByPath(`${url}/generate`, params, source.token);

      if (generateData) {
        dispatch(generatingData(null))
      }
      setLoading(false);
      return req.results;
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal Generate data`, 'danger');
      setLoading(false);
      if (generateData) {
        dispatch(generatingData(null))
      }
    }
  };


  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }))
  }

  useEffect(() => {
    if (exportData) {
      getAllDataExport();
    }
  }, [exportData]);

  useEffect(() => {
    if (generateData) {
      getGenerate();
    }
  }, [generateData]);

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("pengukuran-beban-energy")
    const roleAct = {
      upload: ROLE_ACTION(roleAccess, 'upload'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
  }, [])


  return (
    <div>
      <TableDataListAction
        add={false}
        column={false}
        module={label}
        filterLayout="card"
        isUpload={roleActions?.upload}
        onShowModal={onShowModal}
        exporting={true}
        exportOptions={[{ label: 'MS-Excel', type: 'xlsx' }]}
      >
        <Filter />
      </TableDataListAction>
      <div>
        <TableDataJQWidget
          columnsConfig={columns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={url}
          primaryKey={'id'}
          deleteConfirmation
          filterParams={{ sort_by: 'datum' }}
          validExport={false}
          paging={{ show: true }}
          columnsGroupConfig={AMR_GROUP_JQWIDGET()}
        />
        {/* <TableDevExpress
          columnsConfig={dataColumns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={url}
          primaryKey={'id'}
          deleteConfirmation
          filterParams={{ sort_by: 'datum' }}
          validExport={false}
          paging={{ show: true }}
        /> */}
        <ModalForm modalProps={modal}>
          <PbEnergyUpload />
        </ModalForm>
      </div>
    </div>
  )
}
