import React, { FC, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download'
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from '@app/components';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

import { managementUploadFile, getUploadTemp, deleteUploadTemp, uploadExcelTemp, uploadFileExcelTemp } from '@app/services/management-upload.service'
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { MANAGEMENT_UPLOADS_JQX } from './uploads.columns.config';
import moment from 'moment';

type Props = {
  name: string;
  idRefJenisLokasi: number,
  nameRefJenisLokasi: string,
  filterParams: any,
};

const FormUpload: FC<Props> = ({ name, idRefJenisLokasi, nameRefJenisLokasi, filterParams }) => {
  const path = `master/management-upload/temp`
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
  const [dataExcel, setDataExcel] = useState<any>(0)

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
      const params = { ...filterParams, page: 1, limit: 10 }

      const req: any = await getUploadTemp(params, source.token);
      const { total } = req;
      setDataExcel(total || [])
      setLoadingExcelTemp(false);
    } catch (err: any) {
      setLoadingExcelTemp(false);
      dispatchNotification(`Terjadi Kesalahan : ${err?.response?.data?.message}`, 'danger');
    }
  }

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoadingDelete(true);

    try {
      const params = { ...filterParams }
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
      getExcelTemp();
    }
  };

  const onChangeFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      uploadExcel(file)
    }
  };


  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("management-upload")
    const roleAct = {
      input: ROLE_ACTION(roleAccess, 'input'),
      upload: ROLE_ACTION(roleAccess, 'upload'),
      undo: ROLE_ACTION(roleAccess, 'undo'),
    };
    setRoleActions(roleAct);
  }, [])


  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        id: item?.id,
        event_upload: item?.event_upload,
        validasi: item?.validasi,
        id_ref_lokasi: item?.id_ref_lokasi,
        nama_lokasi: item?.nama_lokasi,
        kode_lokasi: item?.kode_lokasi,

        id_parent_lokasi: item?.id_parent_lokasi,
        id_ref_jenis_lokasi: item?.id_ref_jenis_lokasi,
        id_uid: item?.id_uid,
        id_up2b: item?.id_up2b,
        id_up2d: item?.id_up2d,
        id_up3b: item?.id_up3b,
        id_up3_1: item?.id_up3_1,
        id_up3_2: item?.id_up3_2,
        id_ulp_1: item?.id_ulp_1,
        id_ulp_2: item?.id_ulp_2,
        id_upt: item?.id_upt,
        id_ultg: item?.id_ultg,
        sub_sistem: item?.sub_sistem,
        id_unit_pembangkit: item?.id_unit_pembangkit,
        id_pembangkit: item?.id_pembangkit,
        id_ref_jenis_pembangkit: item?.id_ref_jenis_pembangkit,
        id_gardu_induk: item?.id_gardu_induk,
        id_trafo_gi: item?.id_trafo_gi,
        id_penyulang: item?.id_penyulang,
        id_gardu_hubung: item?.id_gardu_hubung,
        id_zone: item?.id_zone,
        id_section: item?.id_section,
        id_segment: item?.id_segment,
        id_gardu_distribusi: item?.id_gardu_distribusi,
        id_trafo_gd: item?.id_trafo_gd,

        parent_lokasi: item?.parent_lokasi?.nama_lokasi,
        ref_jenis_lokasi: item?.ref_jenis_lokasi?.nama_jenis_lokasi,
        unit_induk: item?.uid?.nama_lokasi,
        up2b: item?.up2b?.nama_lokasi,
        up2d: item?.up2d?.nama_lokasi,
        up3b: item?.up3b?.nama_lokasi,
        up3_1: item?.up3_1?.nama_lokasi,
        up3_2: item?.up3_2?.nama_lokasi,
        ulp_1: item?.ulp_1?.nama_lokasi,
        ulp_2: item?.ulp_2?.nama_lokasi,
        upt: item?.upt?.nama_lokasi,
        ultg: item?.ultg?.nama_lokasi,
        subsistem: item?.subsistem?.nama_lokasi,
        unit_pembangkit: item?.unit_pembangkit?.nama_lokasi,
        pembangkit: item?.pembangkit?.nama_lokasi,
        ref_jenis_pembangkit: item?.ref_jenis_pembangkit?.nama,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        trafo_gi: item?.trafo_gi?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        gardu_hubung: item?.gardu_hubung?.nama_lokasi,
        zone: item?.zone?.nama_lokasi,
        section: item?.section?.nama_lokasi,
        segment: item?.segment?.nama_lokasi,
        gardu_distribusi: item?.gardu_distribusi?.nama_lokasi,
        trafo_gd: item?.trafo_gd?.nama_lokasi,

        id_ref_province: item?.id_ref_province,
        id_ref_regency: item?.id_ref_regency,
        id_ref_district: item?.id_ref_district,
        id_user_entri: item?.id_user_entri,
        id_user_update: item?.id_user_update,
        tgl_entri: item?.tgl_entri,
        tgl_update: item?.tgl_update,
        status_listrik: item?.status_listrik,
        tree_jaringan: item?.tree_jaringan,
        fungsi_lokasi: item?.fungsi_lokasi,
        no_tiang: item?.no_tiang,
        zona: item?.zona,
        alamat: item?.alamat,
        coverage: item?.coverage,
        kva: item?.kva,
        phase: item?.phase,
        lat: item?.lat,
        lon: item?.lon,
        status_penyulang: item?.status_penyulang,
        no_urut: item?.no_urut,
        fungsi_scada: item?.fungsi_scada,
        kapasitas: item?.kapasitas,
        pemilik: item?.pemilik,
        status_trafo: item?.status_trafo,
        ratio_ct: item?.ratio_ct,
        ratio_vt: item?.ratio_vt,
        fk_meter_pembanding: item?.fk_meter_pembanding,
        primer_tegangan_max: item?.primer_tegangan_max,
        primer_tegangan_min: item?.primer_tegangan_min,
        sekunder_tegangan_min: item?.sekunder_tegangan_min,
        sekunder_tegangan_max: item?.sekunder_tegangan_max,
        jenis_layanan: item?.jenis_layanan,
        jenis_gi: item?.jenis_gi,
        jenis_peralatan: item?.jenis_peralatan,
        jenis_gardu: item?.jenis_gardu,
        jenis_jaringan: item?.jenis_jaringan,
        jenis_trafo: item?.jenis_trafo,
        sinkron_data: item?.sinkron_data,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        id_i: item?.id_i,
        id_v: item?.id_v,
        id_p: item?.id_p,
        id_amr: item?.id_amr,
        id_portal_ext: item?.id_portal_ext,
        url_webservice: item?.url_webservice,
        rekon_beban: item?.rekon_beban,
        i_max: item?.i_max,
        faktor_meter: item?.faktor_meter,
        faktor_kali: item?.faktor_kali,
        dcc: item?.dcc,
        def_pengukuran_teg_primer: item?.def_pengukuran_teg_primer,
        def_pengukuran_teg_sekunder: item?.def_pengukuran_teg_sekunder,
        def_nilai_cosq: item?.def_nilai_cosq,
        ufr: item?.ufr,
        jumlah_jurusan: item?.jumlah_jurusan,
        jumlah_pelanggan: item?.jumlah_pelanggan,
        pelanggan_tm: item?.pelanggan_tm,
        pelanggan_vip: item?.pelanggan_vip,
        panjang_jaringan: item?.panjang_jaringan,
        id_ref_fungsi_lokasi: item?.id_ref_fungsi_lokasi,
        nama_eam: item?.nama_eam,

      });
    });
    return dataTableValue;
  }

  const isFieldToHide = (datafield: string, fieldsToHide: string[]): boolean => {
    return fieldsToHide.includes(datafield);
  };

  const hideColumns = (columns: any[], fieldsToHide: string[], text: string): any[] => {
    return columns.map(col => {
      if (isFieldToHide(col.datafield, fieldsToHide)) {
        return { ...col, hidden: true, checked: false };
      } else if (col.datafield === 'nama_lokasi') {
        return { ...col, hidden: false, checked: true, text: 'NAMA ' + text };
      } else if (col.datafield === 'kode_lokasi') {
        return { ...col, hidden: false, checked: true, text: 'KODE ' + text };
      } else {
        return { ...col, hidden: false, checked: true };
      }
    });
  };

  const getColumns = (nameRefJenisLokasi: any) => {
    const baseColumns = MANAGEMENT_UPLOADS_JQX()

    let columns: any = [];
    switch (nameRefJenisLokasi) {
      case "unit-pembangkit":
        columns = hideColumns(baseColumns.columns, [
          'kode_lokasi', 'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section',
          'zone', 'gardu_hubung', 'penyulang', 'subsistem', 'trafo_gi', 'pelanggan_vip',
          'gardu_induk', 'ref_jenis_pembangkit', 'pembangkit', 'unit_pembangkit', 'fungsi_lokasi', 'zona',
          'coverage', 'jumlah_pelanggan', 'panjang_jaringan', 'jenis_jaringan',
          'jenis_peralatan', 'jenis_trafo', 'status_penyulang', 'jenis_gardu', 'jenis_layanan',
          'count_gardu', 'kapasitas', 'kva', 'i_max', 'def_pengukuran_teg_primer',
          'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
          'fk_meter_pembanding', 'phase', 'dcc', 'pemilik', 'fungsi_scada', 'jenis_gi',
          'path1', 'path2', 'path3', 'id_i', 'id_v', 'id_p', 'id_amr', 'id_portal_ext', 'url_webservice', 'rekon_beban', // hide mapping data
        ], 'UNIT PEMBANGKIT');
        break;
      case "pembangkit":
        columns = hideColumns(baseColumns.columns, [
          'kode_lokasi', 'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section',
          'zone', 'gardu_hubung', 'penyulang', 'subsistem', 'trafo_gi', 'pelanggan_vip',
          'gardu_induk', 'ref_jenis_pembangkit', 'pembangkit', 'fungsi_lokasi', 'zona',
          'coverage', 'jumlah_pelanggan', 'panjang_jaringan', 'jenis_jaringan',
          'jenis_peralatan', 'jenis_trafo', 'status_penyulang', 'jenis_gardu', 'jenis_layanan',
          'count_gardu', 'kapasitas', 'kva', 'i_max', 'def_pengukuran_teg_primer',
          'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
          'fk_meter_pembanding', 'phase', 'dcc', 'pemilik', 'fungsi_scada', 'jenis_gi',
        ], 'PEMBANGKIT');
        break;
      case "gardu-induk":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section', 'zone', 'gardu_hubung', 'penyulang', 'subsistem', 'trafo_gi',
          'gardu_induk', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona', 'coverage', 'jumlah_pelanggan', 'panjang_jaringan', 'jenis_jaringan',
          'jenis_peralatan', 'jenis_trafo', 'status_penyulang', 'jenis_gardu', 'jenis_layanan', 'count_gardu', 'kapasitas', 'kva', 'i_max', 'def_pengukuran_teg_primer',
          'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt', 'fk_meter_pembanding', 'phase', 'dcc', 'pemilik', 'pelanggan_vip',
          'id_i', 'id_v', 'id_p', 'id_amr', 'id_portal_ext', 'url_webservice',
        ], 'GARDU INDUK');
        break;
      case "trafo-gi":
        columns = hideColumns(baseColumns.columns, [
          'kode_lokasi', 'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section',
          'zone', 'gardu_hubung', 'penyulang', 'trafo_gi', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'status_penyulang', 'jenis_gardu', 'count_gardu',
        ], 'TRAFO GI');
        break;
      case "penyulang":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section', 'zone', 'penyulang', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'PENYULANG');
        break;
      case "gardu-hubung":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_hubung', 'gardu_distribusi', 'segment', 'section', 'zone', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'dcc', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'GARDU HUBUNG');
        break;
      case "keypoint":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_hubung', 'gardu_distribusi', 'segment', 'section', 'zone', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'dcc', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'KEYPOINT');
        break;
      case "zona":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section', 'zone', 'ref_jenis_pembangkit', 'fungsi_lokasi',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'dcc', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'ZONE');
        break;
      case "section":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_distribusi', 'segment', 'section', 'ref_jenis_pembangkit', 'fungsi_lokasi',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'dcc', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'SECTION');
        break;
      case "segment":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'gardu_distribusi', 'section', 'ref_jenis_pembangkit', 'fungsi_lokasi',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'jenis_gardu', 'dcc', 'jenis_layanan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
        ], 'SEGMENT');
        break;
      case "gardu-distribusi":
        columns = hideColumns(baseColumns.columns, [
          'trafo_gd', 'gardu_distribusi', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona', 'fungsi_scada', 'jenis_gi', 'phase', 'status_penyulang', 'coverage',
          'jenis_jaringan', 'jenis_peralatan', 'jenis_trafo', 'dcc', 'jenis_layanan', 'pelanggan_vip', 'panjang_jaringan', 'i_max', 'pemilik',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt', 'count_gardu',
          'path1', 'path2', 'path3', 'id_i', 'id_v', 'id_p', 'id_amr', 'id_portal_ext', 'url_webservice', 'rekon_beban', // hide mapping data        
        ], 'GARDU DISTRIBUSI');
        break;
      case "trafo-gardu-distribusi":
        columns = hideColumns(baseColumns.columns, [
          'no_tiang', 'trafo_gd', 'ref_jenis_pembangkit', 'fungsi_lokasi', 'zona',
          'panjang_jaringan', 'count_gardu', 'pemilik', 'lat', 'lon', 'fungsi_scada', 'jenis_gi', 'kva', 'status_penyulang', 'coverage', 'i_max',
          'jumlah_pelanggan', 'jenis_jaringan', 'jenis_peralatan', 'jenis_gardu', 'dcc', 'jenis_layanan', 'jumlah_pelanggan', 'pelanggan_vip',
          'kapasitas', 'fk_meter_pembanding', 'def_pengukuran_teg_primer', 'def_pengukuran_teg_sekunder', 'def_nilai_cosq', 'ratio_ct', 'ratio_vt',
          'path1', 'path2', 'path3', 'id_i', 'id_v', 'id_p', 'id_amr', 'id_portal_ext', 'url_webservice', 'rekon_beban', // hide mapping data
        ], 'TRAFO GD');
        break;
      default:
        columns = baseColumns.columns;
        break;
    }
    return {
      ...baseColumns,
      columns: columns,
    };
  }

  useEffect(() => {
    getExcelTemp()
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);


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
            <Button onClick={deleteData} isLoading={loadingDelete} disabled={(dataExcel == 0 || !roleActions?.undo)} variant="danger" className='me-1'>
              <i className='fa fa-undo me-1'></i>Undo Upload
            </Button>
            <div className="me-1">
              <InputGroup >
                <InputGroup.Text id="basic-addon1">Jumlah Data</InputGroup.Text>
                <FormControl value={dataExcel}
                  placeholder="0"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  disabled={true}
                  style={{ width: '80px' }}
                />
              </InputGroup>
            </div>
            <Button onClick={submitData} disabled={(dataExcel == 0 || !roleActions?.input)} isLoading={loadingSubmit} variant="warning" className='me-1'>
              <i className='fa fa-save me-2'></i>Input Sekarang
            </Button>
          </div>
          {dataExcel > 0 && roleActions?.input && roleActions?.undo && roleActions?.upload && (
            <>
              <hr />
              <TableDataJqxGridNew

                //TABLE DATA
                path={path}
                filterParams={filterParams}
                // dataFieldsColsConfig={MANAGEMENT_UPLOADS_JQX()}
                dataFieldsColsConfig={getColumns(nameRefJenisLokasi)}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                selectionmode={'multiplecellsadvanced'}
                // onRowSelected={handleRowSelected}
                exportbtn={false}
                showHideCol={true}
              />

            </>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default FormUpload;

