import React, { useState, useEffect, FC } from "react";

/** CONFIG */
import { OPSISDIS_USULAN_JADWALHAR_ROTBMH_COLUMN } from "@app/configs/react-table/opsisdis.column.config";
import UsulanJadwalHarFormPage from "./UsulanJadwalHarFormPage";
import UsulanJadwalHarFormPageEdit from "./UsulanJadwalHarFormPageEdit";
/** COMPONENTS */
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from "@app/modules/Table/TableDataListActionDetailPage";
import UsulanFilter from "./UsulanFiltercopy";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
/** SERVICE */
import UsulanJadwalHarDetailPagecopy from "./UsulanJadwalHarDetailPagecopy";
import { API_PATH } from "@app/services/_path.service";
import { getAllByPath } from "@app/services/main.service";
import { get } from "lodash";
// import ModalForm from '@app/components/Modals/ModalForm';
import { useSelector } from "react-redux";
import { timeFormatSec } from "@app/helper/time.helper";
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import CardWidget from "@app/components/Card/CardPage";
import moment from "moment";
import axios from "axios";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
// import PostingForm from "./PostingForm";

export default function UsulanJadwalHar() {
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
    title: `Edit Data`,
    show: false, // Initial modal state
  });

  const [dataSelected, setDataSelected] = useState<any>();
  const [lastInputData, setlastInputData] = useState<any>();
  // console.log('nyobaan', lastInputData)
  /** DATA RESP */
  // const [action, setAction] = useState<string>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(
    OPSISDIS_USULAN_JADWALHAR_ROTBMH_COLUMN()
  );
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [action, setAction] = useState<string>();
  const [id_area, setid_area] = useState<any>("");
  // console.log('apa', id_area)
  const [loading, setLoading] = useState<any>(true);
  const source = axios.CancelToken.source();
  const location = useLocation();
  const navigate = useNavigate();
  const [filterValues] = useState<any>({
    id_inputer: String(currentUser.id_user),
    fullname: String(currentUser.fullname),
  });
  // console.log('login pake id', currentUser)

  const [detailsHar, setDetailsHar] = useState<any>();
  const [penyulangID, setpenyulangID] = useState<any>();
      const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);

        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      };
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];

    data?.forEach((item: any) => {
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
      // Proses data untuk data table
      dataTableValue.push({
        ...item,
        action: (
          // <div>
          <div className="d-flex gap-2">
            {roleActions?.update && (item?.release_rotbmh === 0 || item?.release_rotbmh === '' || item?.release_rotbmh === null) && (
              <button
                // className="btn btn-primary me-2" // Apply primary style for Edit
                className="btn btn-sm btn-primary"
                onClick={() => onShowModalEdit(item)}
              >
                Edit
              </button>
            )}
            {/* {roleActions?.delete && (item?.kategori_rotbmh === 'ROM' || item?.kategori_rotbmh === 'ROH' || item?.kategori_rotbmh === 'EMERGENCY' || item?.kategori_rotbmh === '' || item?.kategori_rotbmh === null) && ( */}
            {roleActions?.delete && (item?.release_rotbmh === 0 || item?.release_rotbmh === '' || item?.release_rotbmh === null) && (
              <button
                // className="btn btn-danger" // Apply danger style for Delete
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            )}
            {/* {roleActions?.update && (item?.kategori_rotbmh === 'ROT' || item?.kategori_rotbmh === 'ROB') && (
              <button
                className="btn btn-sm"
                style={{ backgroundColor: "#6c757d", color: "white" }} // Custom gray color for Posting button
                onClick={() => handlePosting(item)}
              >
                <i className="fas fa-paper-plane"></i> 
                Release
              </button>
            )} */}
          </div>
        ),
        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        number: item?.number,
        respon_apd: item?.respon_apd,
        approvel_area: item?.approvel_area,
        approvel_apd: item?.approvel_apd,
        status_pekerjaan: item?.status_pekerjaan,
        no_pekerjaan: item?.no_pekerjaan,
      
        tgl_periode: item?.tgl_periode,
       tanggal: formatDate(item?.tanggal),
periode_awal: formatDate(item?.periode_awal),
periode_akhir: formatDate(item?.periode_akhir),
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
        saidi: item?.saidi,
        saifi: item?.saifi,
        jenis_jadwal: item?.jenis_jadwal,
        jenis_pelayanan: item?.jenis_pelayanan,
        jam_pekerjaan: item?.jam_pekerjaan,
        pengawas: item?.id_pengawas,
        pelaksana: item?.id_pelaksana,
        sifat_pekerjaan: <ExpandableTextCell value={item?.sifat_pekerjaan} />,
        jtm: <ExpandableTextCell value={item?.jtm} />,
        keterangan: <ExpandableTextCell value={item?.keterangan} />,
        keterangan_detail_jenis_pekerjaan: <ExpandableTextCell value={item?.keterangan_detail_jenis_pekerjaan} />,
        user_created: item?.user_created,
        datum_created: `${timeFormatSec(item?.datum_created)}`,
      });
    });

    // Ambil data berdasarkan id_inputer dan urutkan berdasarkan datum_created
    const latestData = data
      ?.filter((item: any) => {
        // Memastikan data hanya diambil berdasarkan ID User yang sesuai dengan filter
        return filterValues?.id_inputer === item?.user_created?.id_user;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a?.datum_created).getTime();
        const dateB = new Date(b?.datum_created).getTime();
        return dateB - dateA; // Urutkan berdasarkan tanggal terbaru
      })[0]; // Ambil data pertama yang terbaru

    // console.log("Data Terbaru untuk ID User yang sedang login:", latestData);

    if (latestData) {
      setlastInputData(latestData); // Update state dengan data terbaru
    } else {
      // console.log("Tidak ada data yang ditemukan.");
    }
    setDataRows(dataTableValue); // Update data table dengan dataTableValue
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
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set("ids", item.trans_jadwal_har_id || "");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // const [detailPosting, setdetailPosting] = useState<any>();
  // const [detailKategori, setdetailKategori] = useState<any>();
  // const [modalPosting, setModalPosting] = useState<any>({
  //     approved: false,
  //     size: "s",
  //     title: `Release Data`,
  //   });  
  // const handlePosting = (item: any) => {
  //   if (item.current?.release_rotbmh === "1") {
  //     alert("Data yang sudah direlease tidak bisa direlease kembali.");
  //     return; // Stop further execution if already posted
  //   }

  //   setDataSelected(item);
  //   setdetailPosting(item.release_rotbmh);
  //   setdetailKategori(item.kategori_rotbmh);
  //   setModalPosting((prevState: any) => ({
  //     ...prevState,
  //     show: true,
  //   }));

  //   // Add `id` parameter to URL
  //   const params = new URLSearchParams(location.search);
  //   params.set("ids", item.trans_jadwal_har_id || "");
  //   navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  // };
  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction("delete");
  };

  /** GET DATA gardu induk */
  const getAllData = async () => {
    setLoading(true); // Set loading saat mulai fetch data

    await new Promise((resolve) => setTimeout(resolve, 300));
    const id_roles = currentUser.roleId;

    try {
      const params = {
        page: 1,
        limit: 100,
      };

      const req: any = await getAllByPath(
        API_PATH().admin.role,
        params,
        source.token
      );

      if (req?.results) {
        const results = req.results; // Pastikan results ada
        if (Array.isArray(results)) {
          // Jika results berupa array
          const foundRole = results.find((item) => item.id_roles === id_roles);
          if (foundRole) {
            setid_area(foundRole.id_ref_lokasi_up3);
          } else {
            setid_area(null);
          }
        }
      } else {
        setid_area(null);
      }
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setid_area(null);
    } finally {
      setLoading(false); // Set loading selesai setelah try-catch
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);

    let roleAccess = ROLE_ACCESS("usulan-jadwal-har");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      posting: ROLE_ACTION(roleAccess, "posting"),
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
      setpenyulangID({
        id_penyulang: selected.id_penyulang,
      });
    }
  };

  const handleClose = () => {
    setModalAdd((prevState: any) => ({ ...prevState, show: false }));
    setModalEdit((prevState: any) => ({ ...prevState, show: false }));
    // setModalPosting((prevState: any) => ({ ...prevState, show: false }));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("ids");
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    handleClose(); // Panggil handleClose saat komponen pertama kali dimuat
  }, []); // Kosongkan dependensi untuk hanya memanggil sekali pada mount

  return (
    <>
      <TopBarLoader isLoading={loading} />

      <TableDataListAction
        add={true}
        onClickAdd={handleAdd}
        columns={columns}
        filterLayout="card"
        setColumns={setColumns}
        title="Opsisdis - Jadwal Pemeliharaan"
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh}
        filterParams={{
          status_pekerjaan_in: "DRAFT,USULAN PEKERJAAN",
          datum_after: moment()
            .add(-3, "day")
            .startOf("day")
            .format("YYYY-MM-DD"),
          datum_before: moment()
            .add(14, "day")
            .endOf("day")
            .format("YYYY-MM-DD"),
          // id_area: id_roles
        }}
      ></TableDataListAction>
      <CardWidget>
        <UsulanFilter />
      </CardWidget>
      {(id_area || id_area === null) && (
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
            status_pekerjaan_in: "DRAFT,USULAN PEKERJAAN,RELEASE PEKERJAAN",
            ...(id_area !== null ? { id_area: id_area } : {}),
          }}
          selected={dataSelected}
          pagingPresistance={false}
          deleteConfirmation
          ids="ids"
        />
      )}
      <hr className="my-4" />
      <Row>
        <Col md={12} className="mb-4">
          <UsulanJadwalHarDetailPagecopy
            filterParams={{
              trans_jadwal_har_id: detailsHar?.trans_jadwal_har_id,
              id_penyulang: penyulangID?.id_penyulang,
            }}
          />
        </Col>
      </Row>
      <ModalFormWO
        modalProps={{ ...modalAdd, setShow: handleClose, size: "xl" }}
      >
        <UsulanJadwalHarFormPage
          handleClose={handleClose}
          dataSelected={dataSelected}
          id_user_created={filterValues}
          lastInputData={lastInputData}
        />
      </ModalFormWO>

      <ModalFormWO
        modalProps={{ ...modalEdit, setShow: handleClose, size: "xl" }}
      >
        <UsulanJadwalHarFormPageEdit
          handleClose={handleClose}
          dataSelected={dataSelected}
          id_user_created={filterValues}
        />
      </ModalFormWO>
      {/* <ModalFormWO modalProps={{ ...modalPosting, setShow: handleClose }}>
        <PostingForm
          handleClose={handleClose}
          isAlreadyPosted={detailPosting}
          isROTB={detailKategori}
          dataSelected={dataSelected}
        />
      </ModalFormWO> */}
    </>
  );
}
