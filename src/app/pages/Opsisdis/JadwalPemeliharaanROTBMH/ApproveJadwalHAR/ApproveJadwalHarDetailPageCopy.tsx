import React, { useState, useEffect } from 'react';

/** CONFIG */
import { OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN, OPSISDIS_DOKUMENHAR_COLUMN_JQ } from "@app/configs/react-table/opsisdis.column.config";

/** COMPONENTS */
import { Tabs, Tab } from 'react-bootstrap';
import TableDataDetailJadwal from '@app/modules/Table/TableDataDetailJadwal';
import TableDataListAction from '@app/modules/Table/TableDataListActionDetailPage';
/** SERVICE */
// import {  Form } from 'react-bootstrap';
import { API_PATH } from '@app/services/_path.service';
import ApproveJadwalHarDetailFormPage from "./ApproveJadwalHarDetailFormPage"
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import InputGarduForm from './InputGarduForm';

import { useSelector } from 'react-redux';
import ModalFormWO from '@app/components/Modals/ModalFormWO';
import { useLocation, useNavigate } from 'react-router-dom';
import { cdnUrl } from '@app/helper/cdn.helper';
// import { get } from "lodash";
export default function KinTelemeteringDetailPage({ filterParams }: any) {

  const [dataSelectedDetail, setDataSelectedDetail] = useState<any>();
  const [dataSelectedDetailGardu, setDataSelectedDetailGardu] = useState<any>();
  const [dataDetailRows, setDataDetailRows] = useState<any>([]);
  const [columnsDetail, SetcolumnsDetail] = useState<any>(OPSISDIS_DOKUMENHAR_COLUMN_JQ());
  const [dataColumnsDetail, setDataColumnsDetail] = useState<any>([])
  const [columnsDetailGardu, SetcolumnsDetailGardu] = useState<any>(OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN());
  const [dataColumnsDetailGardu, setDataColumnsDetailGardu] = useState<any>([])
  const [dataDetailRowsgardu, setDataDetailRowsgardu] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();

  function getPathFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname; // Mengembalikan path URL tanpa domain
    } catch (error) {
      console.error('Invalid URL:', url);
      return url; // Kembali ke URL asli jika tidak valid
    }
  }
  const { closeModal } = useSelector((state: any) => state.ui);
  /** MODAL JENIS POINT */
  const [modalUpload, setModalUpload] = useState<any>({
    approved: false,
    size: "lg",
    title: `Upload Data`,
    show: false, // Pastikan ini ada
  });

  const [modalEdit, setModalEdit] = useState<any>({
    approved: false,
    size: "lg",
    title: `Edit Data`,
    show: false, // Pastikan ini ada
  });

  const [modal2, setModal2] = useState<any>({
    approved: false,
    size: "lg",
    title: `Tambah Gardu`,
    // trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
  });

  const [modaledit2, setModalEdit2] = useState<any>({
    approved: false,
    size: "lg",
    title: `Gardu`,
    // trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleRespDetailApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        action: (
          <div className="d-flex gap-2">
            {roleActions?.updatedok && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
            )}
            {roleActions?.delete && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            )}
          </div>
        ),

        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        trans_jadwal_har_dok_id: item?.trans_jadwal_har_dok_id,
        nama_dok: item?.nama_file
          ? (
            <div
              dangerouslySetInnerHTML={{
                __html: `<a href="${cdnUrl(item?.nama_file)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${getPathFromUrl((item?.nama_dok))}</a>`,
              }}
            />
          )
          : '',
        nama_file: item?.nama_file,
        created_at: formatDate(item?.created_at),

      });
    });
    setDataDetailRows(dataTableValue);
  };




  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApigar = (data: any) => {
    let dataTableValue: any = [];
    // Memfilter data berdasarkan filterParams
    data?.forEach((item: any) => {

      dataTableValue.push({
        action: (
          <div className="d-flex gap-2">
            {roleActions?.false && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleEditClick2(item)}
              >
                Edit
              </button>
            )}
            {roleActions?.delete && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteGardu(item)}
              >
                Delete
              </button>
            )}
          </div>
        ),

        number: item?.number,
        trans_jadwal_har_gardu_id: item?.trans_jadwal_har_gardu_id,
        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        gardu: item?.gardu?.nama_lokasi,
        penyulang: item?.gardu?.nama_penyulang?.nama_lokasi,
        gardu_induk: item?.gardu?.nama_gardu_induk?.nama_lokasi,
        up3_1: item?.gardu?.nama_up3_1?.nama_lokasi,
        alamat: item?.gardu?.alamat,
      });

    });



    setDataDetailRowsgardu(dataTableValue);
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelectedDetail(item);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.trans_jadwal_har_dok_id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  const handleDelete = (item: any) => {
    setDataSelectedDetail(item);
    setAction('delete')
  };

  const handleDeleteGardu = (item: any) => {
    setDataSelectedDetailGardu(item);
    setAction('delete')
  };


  const handleUpload = () => {
    // Open the add modal
    setModalUpload((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Remove `id` parameter from URL
    const params = new URLSearchParams(location.search);
    params.delete('id');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleAddClick2 = () => {
    setModal2((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Remove `id` parameter from URL
    const params = new URLSearchParams(location.search);
    params.delete('id');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  /** HANDLE EDIT */
  const handleEditClick2 = (item: any) => {

    setDataSelectedDetailGardu(item)
    setModalEdit2((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.trans_jadwal_har_gardu_id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });

  };

  const handleClose = () => {
    // Close all modals
    setModal2((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    setModalEdit2((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    setModalUpload((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    setModalEdit((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    // Remove the 'id' and 'id_dok' parameters from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    searchParams.delete('ids');


    // Update the URL without reloading the page
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };


  useEffect(() => {

    let colsdetail: any = columnsDetail?.filter(({ show }: any) => show === true);
    let colsDetailGardu: any = columnsDetailGardu?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("usulan-jadwal-har")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, "create"),
      updatedok: ROLE_ACTION(roleAccess, "updatedok"),
      updategar: ROLE_ACTION(roleAccess, "updategar"),
      delete: ROLE_ACTION(roleAccess, "delete"),
      upload: ROLE_ACTION(roleAccess, "upload"),
    };
    setRoleActions(roleAct);

    // if (!roleAct?.delete && !roleAct?.update) {
    //   colsdetail = colsdetail?.filter((item: any) => {
    //     return item?.accessor != "action"
    //   })
    // }

    setDataColumnsDetailGardu(colsDetailGardu);
    setDataColumnsDetail(colsdetail);
  }, [columnsDetail, columnsDetailGardu]);
  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])


  return (
    <>
      {filterParams?.trans_jadwal_har_id && (
        <Tabs defaultActiveKey="table" id="detail-tabs" >
          <Tab eventKey="table" title="Gardu Pemeliharaan">
            <br />
            <TableDataListAction
              add={true}
              columns={columnsDetailGardu}
              onClickAdd={handleAddClick2}
              title="Detail Jadwal Har"
              setColumns={SetcolumnsDetailGardu}
              filterLayout="card"
              path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
              filterParams={{
                sort_by: '-datum',
                trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
              }}
            />
            <TableDataDetailJadwal
              columnsConfig={dataColumnsDetailGardu}
              respDataApi={handleRespDataApigar}
              rowData={dataDetailRowsgardu}
              path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
              primaryKey="trans_jadwal_har_gardu_id"
              deleteConfirmation
              action={action}
              selected={dataSelectedDetailGardu}
              filterParams={{
                sort_by: '-datum',
                trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
              }}
              trigger={filterParams?.trans_jadwal_har_id}
              ids="id"
              pagingPresistance={false}
            />
          </Tab>
          <Tab eventKey="details" title="Upload Dokumen">
            <br />
            <TableDataListAction
              add={false}
              columns={columnsDetail}
              onClickAdd={handleAddClick2}
              title="Detail Jadwal Har"
              setColumns={SetcolumnsDetail}
              filterLayout="card"
              path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
              filterParams={{
                sort_by: '-datum',
                trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
              }}
            />
            {roleActions?.upload && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleUpload()}
              >
                Upload File
              </button>
            )}
            <TableDataDetailJadwal
              columnsConfig={dataColumnsDetail}
              respDataApi={handleRespDetailApi}
              rowData={dataDetailRows}
              path={API_PATH().opsisdis.jadwal_pemeliharaan.dok}
              primaryKey="trans_jadwal_har_dok_id"
              deleteConfirmation
              action={action}
              selected={dataSelectedDetail}
              filterParams={{
                sort_by: '-datum',
                trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
              }}
              trigger={filterParams?.trans_jadwal_har_id}
              ids="id"
              pagingPresistance={false}
            />
          </Tab>
        </Tabs>
      )}
      <ModalFormWO modalProps={{ ...modalUpload, setShow: handleClose }}>
        <ApproveJadwalHarDetailFormPage
          handleClose={handleClose}
          trans_jadwal_har_id={filterParams?.trans_jadwal_har_id}
          approvel_apd={filterParams.approvel_apd}
        />
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modal2, setShow: handleClose }}>
        <InputGarduForm
          handleClose={handleClose}
          trans_jadwal_har_id={filterParams?.trans_jadwal_har_id}
          approvel_apd={filterParams.approvel_apd}
        // id_penyulang={id_penyulang}
        />
        <ModalFormWO modalProps={{ ...modaledit2, setShow: handleClose }}>
          <InputGarduForm
            handleClose={handleClose}
            trans_jadwal_har_id={filterParams?.trans_jadwal_har_id}
            approvel_apd={filterParams.approvel_apd} />
        </ModalFormWO>
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <ApproveJadwalHarDetailFormPage
          handleClose={handleClose}
          trans_jadwal_har_id={filterParams?.trans_jadwal_har_id}
          approvel_apd={filterParams.approvel_apd}
        />
      </ModalFormWO>
    </>
  );
}
