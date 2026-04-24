import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OPSISDIS_UPDATEPROG_JADWALHAR_COLUMN_JQX } from "@app/configs/react-table/opsisdis.column.config";
import TableDataJqxGridNewButtonjdlpemeliharaan from '@app/modules/Table/TableDataJqxGridNewButtonjdlpemeliharaan';
import CardWidget from '@app/components/Card/CardWidget';
import { Col, Row } from 'react-bootstrap';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import UpdateJadwalHarFormPage from './UpdateJadwalHarFormPage'
import UpdateFilter from './UpdateFilter'
import UpdateJadwalHarDetailPage from './UpdateJadwalHarDetailPage'
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import moment from 'moment';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';


export default function UpdateJadwalHarJQ() {
  const originalDataRef = useRef<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [jadwal, setjadwal] = useState<any>([]);
  const [filterParams, setFilterParams] = useState<any>({ approvel_apd: 1, approvel_area: 1 });

  // State to track whether changesubmit is being used
  const [notification, setNotification] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const source = axios.CancelToken.source();
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

  const dataSelected = useRef<any>();
  const [detailsHar, setDetailsHar] = useState<any>();
  const [penyulangID, setpenyulangID] = useState<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  const location = useLocation();
  const navigate = useNavigate();
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
      };


      const req: any = await getAllByPath(API_PATH().opsisdis.jadwal_pemeliharaan.har, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      setLoading(false)
      setjadwal(unit)
    } catch (err: any) {
      setjadwal(null)
      setLoading(false)
    }
  };

  const getAllDatamaster = async (updatedParams: any) => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 10,

        ...filterParams,
        ...updatedParams
      };
      const req: any = await getAllByPath(API_PATH().opsisdis.jadwal_pemeliharaan.har, params, source.token);
      const results = req?.results || [];
      const unit = results.map((item: any) => ({
        label: item?.name,
        value: item?.id_pointtype,
        jenis: item?.jenispoint,
      }));
      setLoading(false);
      return unit; // Mengembalikan data unit langsung dari fungsi ini
    } catch (err) {
      setLoading(false);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  };

  const changesubmit = async (newFilterValues?: any) => {
    setIsSubmitting(true);
    const updatedParams = { ...filterParams, ...newFilterValues };
    setFilterParams(updatedParams);

    try {
      await getAllDatamaster(updatedParams);
      originalDataRef.current = [];

    } catch (error: any) {
      console.error("Error fetching data:", error);

    } finally {
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    const params = {
      page: 1,
      limit: 10,
      ...filterParams,
    };
    getAllDatamaster(params);
    originalDataRef.current = []; // Clear cache to force data refetch

    return () => {
      // source.cancel('Operation canceled due to new request.');
    };
  }, [filterParams]);


  const handleFilterChange = (newFilterValues: any) => {
    setIsSubmitting(true); // Set flag to indicate data is being updated through changesubmit
    setFilterParams((prev: any) => ({ ...prev, ...newFilterValues })); // Gabungkan dengan existing params
    setIsSubmitting(false); // Reset flag after data is updated
  };
  const handleRespDataApi = useMemo(() => {
    return (data: any) => {
      const newData = data.map((item: any) => ({
        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        number: item?.number,
        respon_apd: item?.respon_apd,
        approvel_area: item?.approvel_area,
        approvel_apd: item?.approvel_apd,
        status_pekerjaan: item?.status_pekerjaan,
        no_pekerjaan: item?.no_pekerjaan,
        tanggal: item?.tanggal,
        tgl_periode: item?.tgl_periode,
        area: item?.area?.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        gardu: item?.gardu?.nama_lokasi,
        butuh_padam: item?.butuh_padam,
        wilayah: item?.wilayah,
        jenis_jadwal: item?.jenis_jadwal,
        jenis_pelayanan: item?.jenis_pelayanan,
        jam_pekerjaan: item?.jam_pekerjaan,
        pelaksana: item?.pelaksana.nama,
        pengawas: item?.pengawas?.nama,
        sifat_pekerjaan: item?.sifat_pekerjaan,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        user_created: item?.user_created?.fullname,
        datum_created: item?.datum_created
      }));

      // Check if data should be cached (initial load) or always update when submitting
      if (originalDataRef.current.length === 0 || isSubmitting) {
        originalDataRef.current = newData; // Always update cache when submitting
      }

      return originalDataRef.current;
    };
  }, [filterParams, isSubmitting]); // Depend on isSubmitting as well




  useEffect(() => {
    const roleAccess = ROLE_ACCESS("update-jadwal-har");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      posting: ROLE_ACTION(roleAccess, 'updateprog'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
  }, []);


  // const [filterValues, setFilterValues] = useState<any>({
  //   datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
  //   datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
  // });


  useEffect(() => {
    getAllData();
  }, []);


  const handleAdd = () => {
    setModalAdd((prevState) => ({
      ...prevState,
      show: true,
    }));

    const params = new URLSearchParams(location.search);
    params.delete('id');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };


  const handleEdit = (item: any) => {
    dataSelected.current = item.current;
    setModalEdit((prevState) => ({
      ...prevState,
      show: true,
    }));

    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.trans_jadwal_har_id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetailsHar(dataSelected?.current.trans_jadwal_har_id);
    setpenyulangID(dataSelected?.current.id_penyulang);
  };

  const handleClose = () => {
    setModalAdd({ ...modalAdd, show: false });
    setModalEdit({ ...modalEdit, show: false });
    setNotification(null); // Clear notification on close

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };



  return (
    <>
      {notification && (
        <div className="alert alert-success" role="alert">
          {notification}
        </div>
      )}
      <TopBarLoader isLoading={loading} />
      <CardWidget title="FILTER">
        <UpdateFilter  />
      </CardWidget>

      {roleActions.create && roleActions.update && roleActions.delete && jadwal && (
        <Row>
          <Col md={12}>
            <JqxTabs theme="light">
              <ul style={{ marginLeft: 10 }} key="1">
                <li>
                  <i className="fa-solid fa-server"></i> Update Jadwal Pemeliharaan
                </li>
              </ul>
              <div key="2">
                <TableDataJqxGridNewButtonjdlpemeliharaan
                  // addbtn={roleActions.create}
                  // updatebtn={roleActions.update}
                  // deletebtn={roleActions.delete}
                  SetUpdateprog={roleActions.update}
                  onClickSetUpdateprog={handleEdit}
                  onClickAdd={handleAdd}
                  path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                  filterParams={filterParams}
                  dataFieldsColsConfig={OPSISDIS_UPDATEPROG_JADWALHAR_COLUMN_JQX()}
                  primaryKey={"trans_jadwal_har_id"}
                  respDataApi={handleRespDataApi}
                  filterable={true}
                  onRowSelected={handleRowSelected}
                  exportbtn={true}
                  minWidth={150}
                  maxWidth={200}
                  onFilterChange={handleFilterChange}
                />
                <hr className="my-4" />
              </div>
            </JqxTabs>
          </Col>
        </Row>
      )}

      <hr className="my-4" />
      <Row>
        <Col md={12} className="mb-4">
          <UpdateJadwalHarDetailPage filterParams={{ trans_jadwal_har_id: detailsHar, id_penyulang: penyulangID }} />
        </Col>
      </Row>

      <ModalFormWO modalProps={{ ...modalAdd, setShow: handleClose }}>
        <UpdateJadwalHarFormPage originalDataRef={originalDataRef} changesubmit={changesubmit} handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>

      <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <UpdateJadwalHarFormPage originalDataRef={originalDataRef} changesubmit={changesubmit} handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
    </>
  );
}
