import React, { FC, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download'
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from '@app/components';
import ReactTable from '@app/components/ReactTable';
import Pagination from '@app/components/Pagination/Pagination';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

import { managementUploadFile, getUploadTemp, deleteUploadTemp, uploadExcelTemp, uploadFileExcelTemp } from '@app/services/management-upload.service'
// import { head } from 'lodash';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { GARDU_DISTRIBUSI, GARDU_DISTRIBUSI_COLUMNS, GARDU_HUBUNG, GARDU_INDUK, PEMBANGKIT_COLUMNS, PENYULANG, SECTION, SEGMENT, TRAFO_GI, UNIT_PEMBANGKIT, ZONE, PENGAMANAN_SUTM } from '@app/configs/react-table/master-jaringan.columns.config';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import moment from 'moment';

type Props = {
  name: string;
  idRefJenisLokasi: number,
  nameRefJenisLokasi: string,
  jenisLokasi?: string
};

const FormUpload: FC<Props> = ({ name, idRefJenisLokasi, nameRefJenisLokasi, jenisLokasi }) => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [roleActions, setRoleActions] = useState<any>({});
  const refUploadFile = useRef<any>();
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const [loadingExcelTemp, setLoadingExcelTemp] = useState<boolean>(false)
  const [loadingDownloadExcel, setLoadingDownloadExcel] = useState<boolean>(false)
  const [loadingDownloadTemplate, setLoadingDownloadTemplate] = useState<boolean>(false)
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [dataExcel, setDataExcel] = useState<any>([])
  const [columns, setColumns] = useState<any>();
  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });

  /** DYNAMIC EXPORT DATA */
  const downloadXlsx = async (type = 'download-template') => {
    const path = `master/management-upload/${nameRefJenisLokasi}/${type}`
    if (type == 'download-template') {
      setLoadingDownloadTemplate(true)
    } else {
      setLoadingDownloadExcel(true)
    }
    try {
      let req: any = await managementUploadFile(path, source.token);
      const dataBlob = req?.data
      const headers = req?.headers
      let content: string = headers['content-disposition']
      const filename = content.replace("attachment; filename=", "").replaceAll('"', '')
      fileDownload(dataBlob, `${filename.replace(".xlsx", "")}_${moment().format('YYYYMMDDHHmmss')}.xlsx`)
      if (type == 'download-template') {
        setLoadingDownloadTemplate(false)
      } else {
        setLoadingDownloadExcel(false)
      }
    } catch (err: any) {
      if (type == 'download-template') {
        setLoadingDownloadTemplate(false)
      } else {
        setLoadingDownloadExcel(false)
      }
    }
  };

  const uploadExcel = async (file: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingUpload(true);
    try {
      const path = `master/management-upload/${nameRefJenisLokasi}/upload-excel-temporary`
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id_user', currentUser.id_user);

      await uploadFileExcelTemp(path, formData, source.token);
      setLoadingUpload(false);
      dispatchNotification(`Sukses upload ${nameRefJenisLokasi}`, 'success');
      getExcelTemp()
    } catch (err: any) {
      setLoadingUpload(false);
      dispatchNotification(`Terjadi Kesalahan : ${err?.response?.data?.message}`, 'danger');
    }
  }

  const getExcelTemp = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingExcelTemp(true);
    try {
      const params = {
        id_ref_jenis_lokasi: idRefJenisLokasi,
        id_user_entri: currentUser.id_user,
        fungsi_lokasi: jenisLokasi ? jenisLokasi : null,
        page: 1,
        limit: 10
      }

      const req: any = await getUploadTemp(params, source.token);
      const { results, total } = req;
      let dataRes: any = []
      // const dataRes = results.map((d: any) => {
      //   d.parent_lokasi = d?.parent_lokasi?.nama_lokasi || ''
      //   d.penyulang = d?.penyulang?.nama_lokasi || ''
      //   d.section = d?.section?.nama_lokasi || ''
      //   d.segment = d?.segment?.nama_lokai || ''
      //   d.uid = d?.uid?.nama_lokasi || ''
      //   d.ulp = d?.ulp?.nama_lokasi || ''
      //   d.up3_1 = d?.up3_1?.nama_lokasi || ''
      //   d.up3_2 = d?.up3_1?.nama_lokasi || ''
      //   d.zone = d?.zone?.nama_lokasi || ''
      //   d.ref_jenis_lokasi = d?.ref_jenis_lokasi?.nama_jenis_lokasi || ''
      //   return d;
      // });
      results.map((item: any) => {
        dataRes.push({
          number: item.number,
          id: item?.id,
          kode: item?.kode_lokasi,
          nama: item?.nama_lokasi,
          parent_lokasi: item?.parent_lokasi?.nama_lokasi,
          alamat: item?.alamat,
          tree_jaringan: (<BadgeStatus status={item?.tree_jaringan}></BadgeStatus>),
          lat: item?.lat,
          lon: item?.lon,
          status: (<BadgeStatus status={item?.status_listrik}></BadgeStatus>),
          event_upload: item?.event_upload,
          no_urut: item?.no_urut,
          id_i: item?.id_i ? item?.id_i : "",
          id_v: item?.id_v ? item?.id_v : "",
          id_p: item?.id_p ? item?.id_p : "",
          id_amr: item?.id_amr ? item?.id_amr : "",
          id_portal_ext: item?.id_portal_ext ? item?.id_portal_ext : "",
          url_webservice: item?.url_webservice ? item?.url_webservice : "",
          kode_lokasi: item?.kode_lokasi,
          jenis_gi: item?.jenis_gi,
          fungsi_scada: item?.fungsi_scada,
          unit_pembangkit: item?.unit_pembangkit?.nama_lokasi,
          up2b: item?.up2b?.nama_lokasi,
          kapasitas: item?.kapasitas ? item?.kapasitas : "",
          coverage: item?.coverage ? item?.coverage : "",
          status_trafo: item?.status_trafo ? item?.status_trafo : "",
          i_max: item?.i_max ? item?.i_max : "",
          ratio_ct: item?.ratio_ct ? item?.ratio_ct : "",
          fk_meter_pembanding: item?.fk_meter_pembanding ? item?.fk_meter_pembanding : "",
          primer_tegangan_max: item?.primer_tegangan_max ? item?.primer_tegangan_max : "",
          primer_tegangan_min: item?.primer_tegangan_min ? item?.primer_tegangan_min : "",
          sekunder_tegangan_min: item?.sekunder_tegangan_min ? item?.sekunder_tegangan_min : "",
          sekunder_tegangan_max: item?.sekunder_tegangan_max ? item?.sekunder_tegangan_max : "",
          sinkron_data: item?.sinkron_data ? item?.sinkron_data : "",
          jenis_layanan: item?.jenis_layanan ? item?.jenis_layanan : "",
          nama_sub_sistem: item?.nama_sub_sistem ? item?.nama_sub_sistem : "",
          def_nilai_cosq: item?.def_nilai_cosq ? item?.def_nilai_cosq : "",
          def_pengukuran_teg_sekunder: item?.def_pengukuran_teg_sekunder ? item?.def_pengukuran_teg_sekunder : "",
          def_pengukuran_teg_primer: item?.def_pengukuran_teg_primer ? item?.def_pengukuran_teg_primer : "",
          status_penyulang: item?.status_penyulang,
          jenis_penyulang: item?.jenis_penyulang,
          jumlah_pelanggan: item.jumlah_pelanggan,
          jenis_jaringan: item?.jenis_jaringan,
          panjang_jaringan: item?.panjang_jaringan ? item?.panjang_jaringan : "",
          faktor_kali: item?.faktor_kali ? item?.faktor_kali : "",
          dcc: item?.dcc ? item?.dcc : "",
          pemilik: item?.pemilik ? item?.pemilik : "",
          rekon_beban: (<BadgeStatus status={item?.rekon_beban} trueMsg='IYA' falseMsg='TIDAK'></BadgeStatus>),
          uid: item?.uid?.nama_lokasi,
          up3_1: item?.up3_1?.nama_lokasi,
          ulp_1: item?.ulp_1?.nama_lokasi,
          count_gardu: item?.count_gardu,
          gardu_induk: item?.gardu_induk?.nama_lokasi,
          trafo_gi: item?.trafo_gi?.nama_lokasi,
          penyulang: item?.penyulang?.nama_lokasi,
          zone: item?.zone?.nama_lokasi,
          no_tiang: item?.no_tiang,
          kva: item?.kva,
          phase: item?.phase,
          jenis_gardu: item?.jenis_gardu,
        });

      })
      setPagination((prevState) => ({
        ...prevState,
        pageCount: Math.ceil(
          total / pagination?.perPage
        ),
        totalData: total,
      }));
      setDataExcel(dataRes || [])
      setLoadingExcelTemp(false);
    } catch (err: any) {
      setLoadingExcelTemp(false);
    }
  }

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoadingDelete(true);

    try {
      const params = {
        id_ref_jenis_lokasi: idRefJenisLokasi,
        id_user_entri: currentUser.id_user,
      }
      await deleteUploadTemp(
        params,
        currentUser.id_user,
        source.token
      );
      setLoadingDelete(false);
      dispatchNotification(`Sukses undo ${nameRefJenisLokasi}`, 'success');
      getExcelTemp();
    } catch (err: any) {
      setLoadingDelete(false);
      dispatchNotification(`Gagal undo ${nameRefJenisLokasi}`, 'danger');
    }
  };

  /** UPLOAD SEKARANG HANDLING */
  const submitData = async () => {
    setLoadingSubmit(true);

    try {
      const params = {
        id_ref_jenis_lokasi: idRefJenisLokasi,
        id_user_entri: currentUser.id_user,
      }
      await uploadExcelTemp(
        params,
        source.token
      );
      setLoadingSubmit(false);
      dispatchNotification(`Sukses submit ${nameRefJenisLokasi}`, 'success');
      getExcelTemp();
    } catch (err: any) {
      setLoadingSubmit(false);
      const errorMessage = err?.response?.data?.message;
      const formattedErrorMessage = Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage;
      const finalErrorMessage = formattedErrorMessage.replace(/\[|\]|'/g, '');
      dispatchNotification(`Terjadi Kesalahan:\n${finalErrorMessage}`, 'danger');
      // dispatchNotification(`Terjadi Kesalahan : ${err?.response?.data?.message}`, 'danger');
      // dispatchNotification(`Gagal submit ${nameRefJenisLokasi}`, 'danger');
      getExcelTemp();
    }
  };

  const onChangeFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      uploadExcel(file)
    }
  };

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("management-upload")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      input: ROLE_ACTION(roleAccess, 'input'),
      upload: ROLE_ACTION(roleAccess, 'upload'),
      undo: ROLE_ACTION(roleAccess, 'undo'),
    };
    setRoleActions(roleAct);
  }, [])

  const getColumns = (nameRefJenisLokasi: any) => {
    let column: any = []
    switch (nameRefJenisLokasi) {
      case "unit-pembangkit":
        column = UNIT_PEMBANGKIT()
        break;
      case "pembangkit":
        column = PEMBANGKIT_COLUMNS()
        break;
      case "gardu-induk":
        column = GARDU_INDUK()
        break;
      case "trafo-gi":
        column = TRAFO_GI()
        break;
      case "penyulang":
        column = PENYULANG()
        break;
      case "zona":
        column = ZONE()
        break;
      case "section":
        column = SECTION()
        break;
      case "penyulang":
        column = PENYULANG()
        break;
      case "segment":
        column = SEGMENT()
        break;
      case "gardu-distribusi":
        column = GARDU_DISTRIBUSI()
        break;
      case "trafo-gardu-distribusi":
        column = GARDU_DISTRIBUSI_COLUMNS()
        break;
      case "gardu-hubung":
        column = GARDU_HUBUNG()
        break;
      case "keypoint":
        column = PENGAMANAN_SUTM()
        break;
    }
    column = [...column, { Header: 'Event Upload', accessor: 'event_upload', minWidth: '150px', show: true, disableFilters: true }]
    setColumns(column)
  }

  useEffect(() => {
    getColumns(nameRefJenisLokasi)
  }, [nameRefJenisLokasi]);
  useEffect(() => {
    getExcelTemp()
    return () => {
      source.cancel('Request Canceled');
    };
  }, [columns]);


  return (
    <>
      <TopBarLoader isLoading={loadingExcelTemp} />
      <Card className="mb-3">
        <Card.Header as="h5">{name}</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Button onClick={() => refUploadFile.current.click()} variant="info" className='me-1' isLoading={loadingUpload} disabled={!roleActions?.upload}>
              <i className='fa fa-upload me-2'></i>Upload Excel
            </Button>
            <input ref={refUploadFile} type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={onChangeFile} hidden />
            <Button onClick={() => downloadXlsx('download-excel')} variant="success" isLoading={loadingDownloadExcel} className='me-1'>
              <i className='fa fa-download me-1'></i>Download Excel
            </Button>
            <Button onClick={() => downloadXlsx('download-template')} variant="primary" isLoading={loadingDownloadTemplate} className='me-1'>
              <i className='fa fa-file-arrow-down me-1'></i>Download Template
            </Button>
            <Button onClick={deleteData} isLoading={loadingDelete} disabled={(pagination.totalData == 0 || !roleActions?.undo)} variant="danger" className='me-1'>
              <i className='fa fa-undo me-1'></i>Undo Upload
            </Button>
            <div className="me-1">
              <InputGroup >
                <InputGroup.Text id="basic-addon1">Jumlah Data</InputGroup.Text>
                <FormControl value={pagination.totalData}
                  placeholder="0"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled={true}
                  style={{ width: '80px' }}
                />
              </InputGroup>
            </div>
            <Button onClick={submitData} disabled={(pagination.totalData == 0 || !roleActions?.input)} isLoading={loadingSubmit} variant="warning" className='me-1'>
              <i className='fa fa-save me-2'></i>Input Sekarang
            </Button>
          </div>
          {columns &&
            dataExcel?.length > 0 && (
              <>
                <hr />
                <ReactTable
                  columns={columns}
                  data={dataExcel || []}
                  containerClass='my-3 table table-responsive'
                />
                <Pagination
                  pagination={pagination}
                  handlePaginationClick={handlePaginationClick}
                  isOptionsPerPage={false}
                />
              </>
            )
          }
        </Card.Body>
      </Card>
    </>
  )
}

export default FormUpload;

