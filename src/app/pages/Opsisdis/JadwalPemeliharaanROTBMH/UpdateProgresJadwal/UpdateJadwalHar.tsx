import React, { useState, useEffect } from "react";

/** CONFIG */
import { OPSISDIS_UPDATEPROG_ROTBMH_JADWALHAR_COLUMN } from "@app/configs/react-table/opsisdis.column.config";
import { timeFormatAlt } from "@app/helper/time.helper";
import UpdateJadwalHarDetailPageCopy from "./UpdateJadwalHarDetailPageCopy";
/** COMPONENTS */
import TableDataListAction from "@app/modules/Table/TableDataListActionDetailPage";
import UpdateFilter from "./UpdateFilter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
/** SERVICE */
// import UsulanJadwalHarDetailPagecopy from './UpdateJadwalHarDetailPageCopy'
import { API_PATH } from "@app/services/_path.service";
import UpdateJadwalHarFormPage from "./UpdateJadwalHarFormPage";
import { get } from "lodash";
// import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from "react-redux";

import ModalFormWO from "@app/components/Modals/ModalFormWO";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import CardWidget from "@app/components/Card/CardPage";
import TableDataUpdate from "@app/modules/Table/TableDataUpdate";
import moment from "moment";
import FilterCopyWaHarian from './FilterCopyWaHarian';

export default function SrStatusRTUPage() {
  // const pointTypeSearchParams = searchParams.get("trans_jadwal_har_id");

  const [modalAdd, setModalAdd] = useState({
    approved: false,
    size: "lg",
    title: `Tambah Data`,
    show: false, // Initial modal state
  });

  const [modalEdit, setModalEdit] = useState({
    approved: false,
    size: "lg",
    title: `Update Data`,
    show: false, // Initial modal state
  });
  const [dataSelected, setDataSelected] = useState<any>();
  /** DATA RESP */
  // const [action, setAction] = useState<string>();

  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(
    OPSISDIS_UPDATEPROG_ROTBMH_JADWALHAR_COLUMN()
  );
  const [dataColumns, setDataColumns] = useState<any>([]);
  const { closeModal } = useSelector((state: any) => state.ui);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();

  const [detailUpdatePost, setdetailUpdatePost] = useState<any>();

  const location = useLocation();
  const navigate = useNavigate();

  const [detailsHar, setDetailsHar] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      const butuhPadamText = item?.butuh_padam === 1 ? "YA" : "TIDAK";
      const butuhPadamBgColor = item?.butuh_padam === 1 ? "green" : "red"; // Hijau untuk YA, Merah untuk TIDAK
      const jamBuka = moment(item?.jam_buka);
        const jamTutup = moment(item?.jam_tutup);

        let durasiMenit = null;

        if (jamBuka.isValid() && jamTutup.isValid() && jamTutup.isAfter(jamBuka)) {
          durasiMenit = jamTutup.diff(jamBuka, "minutes");
        }
      dataTableValue.push({
        ...item,
        action: (
          <div className="d-flex gap-2">
            {roleActions?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit(item)}
              >
                <i className="fas fa-edit"></i> Update Progress
              </button>
            )}

            {/* {roleActions?.delete && (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(item)}
            >
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          )}
        */}
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
        butuh_padam: (
          <div
            style={{
              backgroundColor: butuhPadamBgColor, // Ganti warna latar belakang
              color: "white", // Teks warna putih agar kontras
              padding: "5px 10px",
              textAlign: "center",
              borderRadius: "5px",
            }}
          >
            {butuhPadamText} {/* Tampilkan 'YA' atau 'TIDAK' */}
          </div>
        ),
        wilayah: item?.wilayah,
        jenis_jadwal: item?.jenis_jadwal,
        jenis_pelayanan: item?.jenis_pelayanan,
        jam_pekerjaan: item?.jam_pekerjaan,
        id_pengawas: item?.id_pengawas,
        id_pelaksana: item?.id_pelaksana,
        sifat_pekerjaan: item?.sifat_pekerjaan,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        periode_awal: item?.periode_awal,
        periode_akhir: item?.periode_akhir,
        user_created: item?.user_created,

        tanggal_posting: `${timeFormatAlt(item?.tanggal_posting)}`,
        durasi_menit: durasiMenit ? `${durasiMenit} menit` : "-",
      });
    });

    setDataRows(dataTableValue);
  };
  const handleAdd = () => {
    setModalAdd((prevState) => ({
      ...prevState,
      show: true,
    }));

    const params = new URLSearchParams(location.search);
    params.delete("ids");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const onShowModalEdit = (item: any) => {
    setDataSelected(item);
    setdetailUpdatePost(item?.approvel_apd);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set("ids", item.trans_jadwal_har_id || "");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  //  /** DELETE HANDLING */
  //   const handleDelete = (item: any) => {
  //     setDataSelected(item);
  //     setAction('delete')
  //   };

  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("update-jadwal-har");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      posting: ROLE_ACTION(roleAccess, "posting"),
      create: ROLE_ACTION(roleAccess, "create"),
      update: ROLE_ACTION(roleAccess, "updateprog"),
      delete: ROLE_ACTION(roleAccess, "delete"),
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
    }
  };

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined);
    }
  }, [closeModal]);

  const handleClose = () => {
    setModalAdd((prevState: any) => ({ ...prevState, show: false }));
    setModalEdit((prevState: any) => ({ ...prevState, show: false }));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("ids");
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };
  return (
    <>
      <TableDataListAction
        add={false}
        onClickAdd={handleAdd}
        columns={columns}
        filterLayout="card"
        setColumns={setColumns}
        title="Opsisdis - Jadwal Pemeliharaan"
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
        filterParams={{
          datum_after: moment().add(-1, "day").format("YYYY-MM-DD"),
          datum_before: moment().format("YYYY-MM-DD"),
          status_pekerjaan_in:
            "RENCANA JADWAL PEKERJAAN, PELAKSANAAN, SUDAH DILAKSANAKAN, BATAL DILAKSANAKAN, SUDAH MANUVER",
        }}
      ></TableDataListAction>
      <Row className="align-items-stretch">
        <Col md={9} className="mb-4">
          <CardWidget className="h-100">
            <UpdateFilter />
          </CardWidget>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="card-widget h-100">
            <Card.Header className="text-uppercase">
              FILTER COPY WHATSAPP HARIAN
            </Card.Header>
            <Card.Body>
              <FilterCopyWaHarian />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <TableDataUpdate
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        primaryKey={"trans_jadwal_har_id"}
        rowSelect={true}
        action={action}
        rowSelectType={"radio"}
        onCheckedRows={handleSelectedRows}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
        filterParams={{
          sort_by: "-datum_created",
          datum_after: moment()
            .add(-3, "day")
            .startOf("day")
            .format("YYYY-MM-DD"),
          datum_before: moment()
            .add(14, "day")
            .endOf("day")
            .format("YYYY-MM-DD"),
          status_pekerjaan_in:
            "RENCANA JADWAL PEKERJAAN, PELAKSANAAN, SUDAH DILAKSANAKAN, BATAL DILAKSANAKAN, SUDAH MANUVER",
        }}
        selected={dataSelected}
        pagingPresistance={false}
        deleteConfirmation
        ids="ids"
      />

      <hr className="my-4" />
      <Row>
        <Col md={12} className="mb-4">
          <UpdateJadwalHarDetailPageCopy
            filterParams={{
              trans_jadwal_har_id: detailsHar?.trans_jadwal_har_id,
            }}
          />
        </Col>
      </Row>

      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
        <UpdateJadwalHarFormPage
          handleClose={handleClose}
          dataSelected={dataSelected}
        />
      </ModalFormWO>

      <ModalFormWO
        modalProps={{ ...modalEdit, setShow: handleClose, size: "xl" }}
      >
        <UpdateJadwalHarFormPage
          handleClose={handleClose}
          dataSelected={dataSelected}
          isAlreadyApproved={detailUpdatePost}
        />
      </ModalFormWO>
    </>
  );
}
