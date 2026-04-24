import React, { useState, useEffect } from "react";

/** CONFIG */
import { OPSISDIS_APPROVE_UID_JADWALHAR_ROTBMH_COLUMN } from "@app/configs/react-table/opsisdis.column.config";
import { timeFormatSec } from "@app/helper/time.helper";
import ApproveJadwalHarFormPage from "./ApproveJadwalHarUidFormPage";
/** COMPONENTS */
import TableDataApproveUID from "@app/modules/Table/TableDataApproveUID";
import TableDataListAction from "@app/modules/Table/TableDataListActionDetailPage";
import ApproveFilter from "./ApproveUidFilter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
/** SERVICE */
import ApproveJadwalHarDetailPageCopy from "./ApproveJadwalHarUidDetailPageCopy";
import { API_PATH } from "@app/services/_path.service";

import { get } from "lodash";
// import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from "react-redux";

import ModalFormWO from "@app/components/Modals/ModalFormWO";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import CardWidget from "@app/components/Card/CardWidget";
import moment from "moment";

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
    title: `Approve Data`,
    show: false, // Initial modal state
  });
  const [dataSelected, setDataSelected] = useState<any>();
  /** DATA RESP */
  // const [action, setAction] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(
    OPSISDIS_APPROVE_UID_JADWALHAR_ROTBMH_COLUMN()
  );
  const [dataColumns, setDataColumns] = useState<any>([]);
  const { closeModal } = useSelector((state: any) => state.ui);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();
  const [detailApprove, setdetailApprove] = useState<any>();
  const [detailApprovePost, setdetailApprovePost] = useState<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const [filterValues] = useState<any>({
    id_inputer: String(currentUser.id_user),
    fullname: String(currentUser.fullname),
  });

  const [detailsHar, setDetailsHar] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      const butuhPadamText = item?.butuh_padam === 1 ? "YA" : "TIDAK";
      const butuhPadamBgColor = item?.butuh_padam === 1 ? "green" : "red"; // Hijau untuk YA, Merah untuk TIDAK

      const formatDateTime = (isoDate: string) => {
        if (!isoDate) return "-"; // Jika tidak ada tanggal, tampilkan "-"
        const date = new Date(isoDate);
        const year = date.getUTCFullYear(); // Tahun
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Bulan dalam dua digit
        const day = date.getUTCDate().toString().padStart(2, "0"); // Tanggal dalam dua digit
        const hours = date.getUTCHours().toString().padStart(2, "0"); // Jam dalam dua digit
        const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Menit dalam dua digit
        const seconds = date.getUTCSeconds().toString().padStart(2, "0"); // Detik dalam dua digit
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      };
      dataTableValue.push({
        ...item,
        action: (
          <div className="d-flex gap-2">
            {roleActions?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit(item)}
              >
                <i className="fas fa-edit"></i> Approve
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
        approvel_uid: item?.approvel_uid,
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
        id_pelaksana: item?.id_pelaksana,
        id_pengawas: item?.id_pengawas,
        sifat_pekerjaan: item?.sifat_pekerjaan,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        periode_awal: item?.periode_awal,
        periode_akhir: item?.periode_akhir,
        tanggal_posting: formatDateTime(item?.tanggal_posting), // Format tanggal_posting ke "YYYY-MM-DD HH:MM:SS"
        tanggal_approvel: formatDateTime(item?.tanggal_approvel), // Format tanggal_posting ke "YYYY-MM-DD HH:MM:SS"
        user_created: item?.user_created,
        approval:
          item?.approvel_uid === 1 || item?.approvel_uid === 2
            ? item?.user_created
            : "-", // Tampilkan nama atau pesan default
        datum_created: `${timeFormatSec(item?.datum_created)}`,
        datum_updated: `${timeFormatSec(item?.datum_updated)}`,
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
    setdetailApprovePost(item?.approvel_uid);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set("ids", item.trans_jadwal_har_id || "");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  /** DELETE HANDLING */
  // const handleDelete = (item: any) => {
  //   setDataSelected(item);
  //   setAction('delete')
  // };

  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("approve-jadwal-har-uid");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      posting: ROLE_ACTION(roleAccess, "approve"),
      create: ROLE_ACTION(roleAccess, "create"),
      update: ROLE_ACTION(roleAccess, "update"),
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
      setdetailApprove({
        approvel_uid: selected.approvel_uid,
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
          sort_by: "-datum_created",
          datum_after: moment().add(-1, "day").format("YYYY-MM-DD"),
          datum_before: moment().format("YYYY-MM-DD"),
          status_pekerjaan_in:
            "RENCANA JADWAL PEKERJAAN, USULAN PEKERJAAN, BATAL DILAKSANAKAN",
          jenis_jadwal_in: "EMERGENCY, SIAGA, SUSULAN, TERENCANA",
          // kategori_rotbmh_not_in:
          //   "ROT, ROB",
          sifat_pekerjaan_2_not_in:
            "1, 3, 4",
        }}
      ></TableDataListAction>
      <CardWidget>
        <ApproveFilter />
      </CardWidget>
      <TableDataApproveUID
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
            "RENCANA JADWAL PEKERJAAN, USULAN PEKERJAAN, BATAL DILAKSANAKAN, USULAN PEKERJAAN (APPROVED UID)",
          jenis_jadwal_in: "EMERGENCY, SIAGA, SUSULAN, KOREKTIF, TERENCANA",
          // kategori_rotbmh_not_in:
          //   "ROT, ROB",
          sifat_pekerjaan_2_not_in:
            "1, 3, 4",
        }}
        selected={dataSelected}
        pagingPresistance={false}
        deleteConfirmation
        ids="ids"
      />

      <hr className="my-4" />
      <Row>
        <Col md={12} className="mb-4">
          <ApproveJadwalHarDetailPageCopy
            filterParams={{
              trans_jadwal_har_id: detailsHar?.trans_jadwal_har_id,
              approvel_uid: detailApprove?.approvel_uid,
            }}
          />
        </Col>
      </Row>

      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
        <ApproveJadwalHarFormPage
          id_user_created={filterValues}
          handleClose={handleClose}
          dataSelected={dataSelected}
        />
      </ModalFormWO>

      <ModalFormWO
        modalProps={{ ...modalEdit, setShow: handleClose, size: "xl" }}
      >
        <ApproveJadwalHarFormPage
          id_user_created={filterValues}
          handleClose={handleClose}
          dataSelected={dataSelected}
          isAlreadyApproved={detailApprovePost}
        />
      </ModalFormWO>
    </>
  );
}
