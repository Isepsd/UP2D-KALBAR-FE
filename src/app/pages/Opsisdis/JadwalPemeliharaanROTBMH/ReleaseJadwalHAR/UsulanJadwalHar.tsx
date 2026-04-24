import React, { useState, useEffect } from 'react';

/** CONFIG */
import { OPSISDIS_USULAN_JADWALHAR_COLUMN } from "@app/configs/react-table/opsisdis.column.config";
import UsulanJadwalHarFormPage from './UsulanJadwalHarFormPage'
/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import UsulanFilter from './UsulanFiltercopy'
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
/** SERVICE */
import UsulanJadwalHarDetailPagecopy from './UsulanJadwalHarDetailPagecopy'
import { API_PATH } from '@app/services/_path.service';

import { get } from "lodash";
// import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from 'react-redux';
import { timeFormatSec } from '@app/helper/time.helper';
import ModalFormWO from '@app/components/Modals/ModalFormWO';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import CardWidget from '@app/components/Card/CardPage';

export default function UsulanJadwalHar() {

  // const pointTypeSearchParams = searchParams.get("trans_jadwal_har_id");


  const [modalAdd, setModalAdd] = useState({
    approved: false,
    size: "lg",
    title: `Tambah Data`,
    show: false,  // Initial modal state
  });

  const [modalEdit, setModalEdit] = useState({
    approved: false,
    size: "lg",
    title: `Edit Data`,
    show: false, // Initial modal state
  });

  const [dataSelected, setDataSelected] = useState<any>();
  /** DATA RESP */
  // const [action, setAction] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(OPSISDIS_USULAN_JADWALHAR_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const { closeModal } = useSelector((state: any) => state.ui);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();
  const [filterValues] = useState<any>({
    id_inputer: String(currentUser.id_user)

  });
 

  const [detailsHar, setDetailsHar] = useState<any>();
  const [penyulangID, setpenyulangID] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        action: (
          <div>
            {roleActions?.update &&
              <button
                className="btn btn-primary me-2" // Apply primary style for Edit
                onClick={() => onShowModalEdit(item)}
              >
                Edit
              </button>
            }
            {roleActions?.delete &&
              <button
                className="btn btn-danger"  // Apply danger style for Delete
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            }
            {/* <button
                  className="btn btn-light"
                  onClick={() => copyWA(item)}
              >
                  Copy WA
              </button> */}
            {/* {roleActions?.insert_photo &&
                  <button
                      className="btn btn-light"
                      onClick={() => insertPhoto(item)}
                  >
                      Insert Photo
                  </button>
              } */}
          </div>
        ),
        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        number: item?.number,
        respon_apd: item?.respon_apd,
        approvel_area: item?.approvel_area,
        approvel_apd: item?.approvel_apd,
        status_pekerjaan: item?.status_pekerjaan,
        no_pekerjaan: item?.no_pekerjaan,
        tanggal: item?.tanggal,
        tgl_periode: item?.tgl_periode,
        nama_area: item?.nama_area,
        nama_gardu_induk: item?.nama_gardu_induk,
        nama_penyulang: item?.nama_penyulang,
        nama_gardu: item?.nama_gardu,
        // up3: item?.area?.nama_lokasi,
        // gi: item?.gardu_induk?.nama_lokasi,
        // peny: item?.penyulang?.nama_lokasi,
        // gd: item?.gardu?.nama_lokasi,
        butuh_padam: item?.butuh_padam,
        wilayah: item?.wilayah,
        jenis_jadwal: item?.jenis_jadwal,
        jenis_pelayanan: item?.jenis_pelayanan,
        jam_pekerjaan: item?.jam_pekerjaan,
        pengawas: item?.id_pengawas,
        pelaksana: item?.id_pelaksana,
        sifat_pekerjaan: item?.sifat_pekerjaan,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        user_created: item?.user_created,
        datum_created: `${timeFormatSec(item?.datum_created)}`,
      });
    });

    setDataRows(dataTableValue)
  }
  const handleAdd = () => {
    setModalAdd((prevState) => ({
      ...prevState,
      show: true,
    }));

    const params = new URLSearchParams(location.search);
    params.delete('ids');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };




  const onShowModalEdit = (item: any) => {
    setDataSelected(item);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set('ids', item.trans_jadwal_har_id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };


  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("usulan-jadwal-har")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      posting: ROLE_ACTION(roleAccess, 'posting'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
    // if (!roleAct?.delete && !roleAct?.update) {
    //   cols = cols?.filter((item: any) => {
    //     return item?.accessor != "action"
    //   })
    // }
    setDataColumns(cols);
  }, [columns]);

  const handleSelectedRows = (v: any) => {
    const selected = get(v, "0");
    if (selected) {
      setDetailsHar({
        trans_jadwal_har_id: selected.trans_jadwal_har_id,
      });
      setpenyulangID({
        id_penyulang: selected.id_penyulang,
      });

    }
  };

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  const handleClose = () => {
    setModalAdd((prevState: any) => ({ ...prevState, show: false }));
    setModalEdit((prevState: any) => ({ ...prevState, show: false }));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('ids');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };
  return (
    <>

      <TableDataListAction
        add={true}
        onClickAdd={handleAdd}
        columns={columns}
        filterLayout='card'
        setColumns={setColumns}
        title='Opsisdis - Jadwal Pemeliharaan'
      >

      </TableDataListAction>
      <CardWidget >
        <UsulanFilter />
      </CardWidget>
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        primaryKey={"trans_jadwal_har_id"}
        rowSelect={true}
        action={action}
        rowSelectType={"radio"}
        onCheckedRows={handleSelectedRows}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
        filterParams={{
          status_pekerjaan_in: 'DRAFT,USULAN PEKERJAAN,RENCANA JADWAL PEKERJAAN'
        }}
        selected={dataSelected}
        pagingPresistance={false}
        deleteConfirmation
        ids="ids"
      />

      <hr className="my-4" />
      <Row>
        <Col md={12} className="mb-4">
          <UsulanJadwalHarDetailPagecopy
            filterParams={{
              trans_jadwal_har_id: detailsHar?.trans_jadwal_har_id,
              id_penyulang: penyulangID?.id_penyulang
            }}

          />
        </Col>
      </Row>
      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
        <UsulanJadwalHarFormPage

          handleClose={handleClose}
          dataSelected={dataSelected}
          id_user_created={filterValues}
        />
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <UsulanJadwalHarFormPage

          handleClose={handleClose}
          dataSelected={dataSelected}
          id_user_created={filterValues}
        />
      </ModalFormWO>
    </>
  );
}
