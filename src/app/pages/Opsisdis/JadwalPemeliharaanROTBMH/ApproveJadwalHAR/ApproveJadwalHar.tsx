import React, { useState, useEffect, FC } from "react";

/** CONFIG */
import { OPSISDIS_APPROVE_JADWALHAR_ROTBMH_COLUMN } from "@app/configs/react-table/opsisdis.column.config";
import { timeFormatSec } from "@app/helper/time.helper";
import ApproveJadwalHarFormPage from "./ApproveJadwalHarFormPage";
/** COMPONENTS */
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListActionDetailPage";
import ApproveFilter from "./ApproveFilter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
/** SERVICE */
import ApproveJadwalHarDetailPageCopy from "./ApproveJadwalHarDetailPageCopy";
import { API_PATH } from "@app/services/_path.service";

import { get } from "lodash";
// import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from "react-redux";

import ModalFormWO from "@app/components/Modals/ModalFormWO";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import CardWidget from "@app/components/Card/CardPage";
import moment from "moment";
import UsulanJadwalHarFormPageEdit from "./UsulanJadwalHarFormPageEdit";
// import Approve2JadwalHarFormPage from "./Approve2JadwalHarFormPage";
// import Approve3JadwalHarFormPage from "./Approve3JadwalHarFormPage";

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

  // const [modalEdit2, setModalEdit2] = useState({
  //   approved: false,
  //   size: "lg",
  //   title: `Approve Data`,
  //   show: false, // Initial modal state
  // });

  // const [modalEdit3, setModalEdit3] = useState({
  //   approved: false,
  //   size: "lg",
  //   title: `Approve Data`,
  //   show: false, // Initial modal state
  // });

  const [modalCek, setModalCek] = useState({
    approved: false,
    size: "lg",
    title: `Cek Data`,
    show: false, // Initial modal state
  });
  const [dataSelected, setDataSelected] = useState<any>();
  /** DATA RESP */
  // const [action, setAction] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(
    OPSISDIS_APPROVE_JADWALHAR_ROTBMH_COLUMN()
  );
  const [dataColumns, setDataColumns] = useState<any>([]);
  const { closeModal } = useSelector((state: any) => state.ui);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();
  const [detailPosting, setdetailPosting] = useState<any>();
  // const [detailPosting2, setdetailPosting2] = useState<any>();
  // const [detailPosting3, setdetailPosting3] = useState<any>();
  const [detailApprove, setdetailApprove] = useState<any>();
  const [detailApprovePost, setdetailApprovePost] = useState<any>();
  const [detailApprovePost1, setdetailApprovePost1] = useState<any>();
  const [detailApprovePost2, setdetailApprovePost2] = useState<any>();
  const [detailCeklis, setdetailCeklis] = useState<any>();
  const [detailUID, setUID] = useState<any>();
  
  const CeklisUID = (item: any) => {
    console.log("kategori:", item?.sifat_pekerjaan_2);
    console.log("approvel_uid:", item?.approvel_uid);

    const kategori = Number(item?.sifat_pekerjaan_2);
    const tanggalUsulan = item?.approvel_uid;

    if (![2, 5].includes(kategori)) return true;
    if (!tanggalUsulan) return false;

    return true;
  };


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
      const completeness = checkIsComplete(item, REQUIRED_FIELDS);
      const butuhPadamText = item?.butuh_padam === 1 ? "YA" : "TIDAK";
      const butuhPadamBgColor = item?.butuh_padam === 1 ? "green" : "red"; // Hijau untuk YA, Merah untuk TIDAK
      interface ExpandableTextCellProps {
        value: string;
        limit?: number;
      }
      const ExpandableTextCell: FC<ExpandableTextCellProps> = ({
        value,
        limit = 20,
      }) => {
        const [expanded, setExpanded] = useState(false);

        if (!value) return null;

        const isLong = value.length > limit;
        const displayText =
          !expanded && isLong ? value.slice(0, limit) + "..." : value;

        return (
          <div>
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "5px",
                  padding: 0,
                  fontSize: "0.85em",
                }}
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}
          </div>
        );
      };

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
      const row = {
        ...item,
        is_data_lengkap: completeness.isComplete ? 1 : 0,
        
      };

      dataTableValue.push({
        ...row,
        action: (
          <div className="d-flex gap-2">
            {roleActions?.update && (
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => onShowModalCek(row)}
              >
                <i className="fas fa-edit"></i> Cek
              </button>
            )}
            {roleActions?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit(row)}
              >
                <i className="fas fa-edit"></i> Approve
              </button>
            )}
            {/* {roleActions?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit2(row)}
              >
                <i className="fas fa-edit"></i> Approve 2
              </button>
            )}
            {roleActions?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit3(row)}
              >
                <i className="fas fa-edit"></i> Approve 3
              </button>
            )} */}

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
        id_pelaksana: item?.id_pelaksana,
        id_pengawas: item?.id_pengawas,
        sifat_pekerjaan: <ExpandableTextCell value={item?.sifat_pekerjaan} />,
        jtm: <ExpandableTextCell value={item?.jtm} />,
        keterangan: <ExpandableTextCell value={item?.keterangan} />,
        periode_awal: item?.periode_awal,
        periode_akhir: item?.periode_akhir,
        tanggal_posting: formatDateTime(item?.tanggal_posting), // Format tanggal_posting ke "YYYY-MM-DD HH:MM:SS"
        tanggal_approvel: formatDateTime(item?.tanggal_approvel), // Format tanggal_posting ke "YYYY-MM-DD HH:MM:SS"
        user_created: item?.user_created,
        approval:
          item?.approvel_apd === 1 || item?.approvel_apd === 2
            ? item?.user_created
            : "-", // Tampilkan nama atau pesan default
        datum_created: `${timeFormatSec(item?.datum_created)}`,
        datum_updated: `${timeFormatSec(item?.datum_updated)}`,
        // is_data_lengkap: completeness.isComplete ? 1 : 0,
        // keterangan_kelengkapan: <ExpandableTextCell value={completeness.isComplete
        //   ? "DATA LENGKAP"
        //   : `Belum terisi: ${completeness.emptyFields.join(", ")}`} />,
        keterangan_kelengkapan: (
          <ExpandableTextCell
            value={
              item?.ceklis_lengkap === 1
                ? "Sudah di ceklis"
                : completeness.isComplete
                ? "DATA LENGKAP belum di ceklis"
                : `Belum terisi: ${completeness.emptyFields.join(", ")}`
            }
          />
        ),
        nama_posko: item?.nama_posko,  
        nama_pemilik_pekerjaan: item?.nama_pemilik_pekerjaan,
        sifat_pekerjaan_2: item?.sifat_pekerjaan_2,
        keterangan_detail_jenis_pekerjaan: item?.keterangan_detail_jenis_pekerjaan,
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
    setdetailPosting(item?.approvel_area);
    setdetailApprovePost(item?.approvel_apd);
    setdetailApprovePost1(item?.approvel_uid);
    setdetailApprovePost2(item?.jenis_jadwal);
    setdetailCeklis(item?.ceklis_lengkap);
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set("ids", item.trans_jadwal_har_id || "");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // const onShowModalEdit2 = (item: any) => {
  //   setDataSelected(item);
  //   setdetailPosting(item?.approvel_area);
  //   setdetailPosting2(item?.approvel_2);
  //   setdetailApprovePost(item?.approvel_apd);
  //   setdetailApprovePost1(item?.approvel_uid);
  //   setdetailApprovePost2(item?.jenis_jadwal);
  //   setModalEdit2((prevState: any) => ({
  //     ...prevState,
  //     show: true,
  //   }));
  //   const params = new URLSearchParams(location.search);
  //   params.set("ids", item.trans_jadwal_har_id || "");
  //   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  // };

  // const onShowModalEdit3 = (item: any) => {
  //   setDataSelected(item);
  //   setdetailPosting(item?.approvel_area);
  //   setdetailPosting2(item?.approvel_2);
  //   setdetailPosting3(item?.approvel_3);
  //   setdetailApprovePost(item?.approvel_apd);
  //   setdetailApprovePost1(item?.approvel_uid);
  //   setdetailApprovePost2(item?.jenis_jadwal);
  //   setModalEdit3((prevState: any) => ({
  //     ...prevState,
  //     show: true,
  //   }));
  //   const params = new URLSearchParams(location.search);
  //   params.set("ids", item.trans_jadwal_har_id || "");
  //   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  // };

  const onShowModalCek = (item: any) => {
    setDataSelected(item);
    setdetailPosting(item?.approvel_area);
    setdetailApprovePost(item?.approvel_apd);
    setdetailApprovePost1(item?.approvel_uid);
    setdetailApprovePost2(item?.jenis_jadwal);
    setdetailCeklis(item?.ceklis_lengkap);
    setUID(CeklisUID(item));
    setModalCek((prevState: any) => ({
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

    let roleAccess = ROLE_ACCESS("usulan-jadwal-har");
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
        approvel_apd: selected.approvel_apd,
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
    // setModalEdit2((prevState: any) => ({ ...prevState, show: false }));
    // setModalEdit3((prevState: any) => ({ ...prevState, show: false }));
    setModalCek((prevState: any) => ({ ...prevState, show: false }));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("ids");
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const REQUIRED_FIELDS = [
    "status_pekerjaan",
    "tanggal",
    "periode_awal",
    "periode_akhir",
    "nama_area",
    "nama_gardu_induk",
    "nama_penyulang",
    // "nama_gardu",
    // "butuh_padam",
    // "saidi",
    // "saifi",
    "wilayah",
    "jenis_jadwal",
    "jenis_pelayanan",
    "jam_pekerjaan",
    "id_pengawas",
    "id_pelaksana",
    "jtm",
    "keterangan",
    // "approval",
    "tanggal_posting",
    // "tanggal_approvel",
    // "jumlah_gardu_padam",

    "sifat_pekerjaan",
    // "nama_posko",
    // "nama_pemilik_pekerjaan",
    // "sifat_pekerjaan_2",
    // "keterangan_detail_jenis_pekerjaan",
  ];
  const checkIsComplete = (item: any, fields: string[]) => {
  const emptyFields = fields.filter((field) => {
    const value = item?.[field];

    return (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  });

  return {
    isComplete: emptyFields.length === 0,
    emptyFields,
  };
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
            "DRAFT,USULAN PEKERJAAN,RENCANA JADWAL PEKERJAAN,USULAN PEKERJAAN (APPROVED UID), PELAKSANAAN, SUDAH DILAKSANAKAN, SUDAH MANUVER, BATAL DILAKSANAKAN",
          // kategori_rotbmh_not_in:
          //   "ROT, ROB",
        }}
      ></TableDataListAction>
      <CardWidget>
        <ApproveFilter />
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
            "DRAFT, USULAN PEKERJAAN, RENCANA JADWAL PEKERJAAN,USULAN PEKERJAAN (APPROVED UID),USULAN PEKERJAAN (REVISI), PELAKSANAAN, SUDAH DILAKSANAKAN, SUDAH MANUVER, BATAL DILAKSANAKAN",
          // kategori_rotbmh_not_in:
          //   "ROT, ROB",
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
              approvel_apd: detailApprove?.approvel_apd,
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
          isAlreadyPosting={detailPosting}
          isAlreadyApproved={detailApprovePost}
          isAlreadyApproved1={detailApprovePost1}
          isAlreadyApproved2={detailApprovePost2}
          isAlreadyLengkap={dataSelected?.is_data_lengkap}
          isAlreadyCeklis={detailCeklis}
        />
      </ModalFormWO>
      <ModalFormWO
        modalProps={{ ...modalCek, setShow: handleClose, size: "xl" }}
      >
        <UsulanJadwalHarFormPageEdit
          handleClose={handleClose}
          dataSelected={dataSelected}
          id_user_created={filterValues}
          isAlreadyCeklis={detailCeklis}
          isUID={detailUID}
        />
      </ModalFormWO>
      {/* <ModalFormWO
        modalProps={{ ...modalEdit2, setShow: handleClose, size: "xl" }}
      >
        <Approve2JadwalHarFormPage
          id_user_created={filterValues}
          handleClose={handleClose}
          dataSelected={dataSelected}
          isAlreadyPosting={detailPosting}
          isAlreadyPosting2={detailPosting2}
          isAlreadyApproved={detailApprovePost}
          isAlreadyApproved1={detailApprovePost1}
          isAlreadyApproved2={detailApprovePost2}
          isAlreadyLengkap={dataSelected?.is_data_lengkap}
        />
      </ModalFormWO>
      <ModalFormWO
        modalProps={{ ...modalEdit3, setShow: handleClose, size: "xl" }}
      >
        <Approve3JadwalHarFormPage
          id_user_created={filterValues}
          handleClose={handleClose}
          dataSelected={dataSelected}
          isAlreadyPosting={detailPosting}
          isAlreadyPosting2={detailPosting2}
          isAlreadyPosting3={detailPosting3}
          isAlreadyApproved={detailApprovePost}
          isAlreadyApproved1={detailApprovePost1}
          isAlreadyApproved2={detailApprovePost2}
          isAlreadyLengkap={dataSelected?.is_data_lengkap}
        />
      </ModalFormWO> */}
    </>
  );
}
