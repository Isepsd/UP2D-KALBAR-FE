import React, { useMemo, useState, useEffect, useCallback } from 'react';
import ReactTableUpdate from '@app/components/ReactTableUpdate';
import Pagination from '@app/components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '@app/context/AppContext';
import axios from 'axios';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import {
  deleteByPath,
  getAllByPath,
  getAllDownload,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { get, isObject, size, unionBy } from 'lodash';
import moment from 'moment';
import fileDownload from 'js-file-download';
import { exportingData } from '@app/store/reducers/app';
import { API_PATH } from '@app/services/_path.service';
import { Button, Modal } from 'react-bootstrap';
// import { getFilterQueryParams } from '@app/helper/params.helper';
// import { customParamsService } from '@app/helper/browser.helper';

export default function TableData({
  columnsConfig = [],
  filterParams = {},
  respDataApi,
  rowData,
  path,
  exportConfig,
  primaryKey,
  selected,
  action,
  paging = {},
  pagingPresistance = true,
  deleteConfirmation = {},
  rowSelect = false,
  rowSelectType = 'checkbox',
  trigger,
  module = null,
  ids = 'id',
  onEmpty,
  containerClass = 'my-3 table table-responsive',
  approvalAlias,
  onCheckedRows,
  styles,
  request = true,
  // columnFilters = false,
  onCloseModal,
  validExport = true,
  showNoResul = true
}: ITableData) {
  const source = axios.CancelToken.source();
  const { activePage, activeFilters, callbackForm, closeModal } = useSelector(
    (state: any) => state.ui
  );

  const { exportData, reloadData } = useSelector((state: any) => state.app);
  const { currentUser } = useSelector((state: any) => state.auth);

  const { searchValue, clickSubmit } = useApp();
  let [searchParams, setSearchParams] = useSearchParams();

  const currentPage = pagingPresistance ? searchParams.get('page') : 0;

  const label = module ? module : activePage?.display;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const [checkedRows, setCheckedRows] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkedRowsKey, setCheckedRowsKey] = useState<any>({});

  const [pagination, setPagination] = useState<any>({
    perPage: 10,
    offset: 0,
    currentPage: currentPage ? parseInt(currentPage) - 1 : 0,
    pageCount: 10,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
    ...paging,
  });

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: `Hapus data ${label ? label : ''}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Delete',
    classApproved: 'danger',
    textDecline: 'Cancel',
    ...deleteConfirmation,
  });


  const initFilters = {
    keyword: '',
  };

  const [filters, setFilters] = useState<any>(initFilters);

  const [actionData, setActionData] = useState<any>(action);

  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>(selected);

  useEffect(() => {
    respDataApi(respData);
  }, [respData]);

  useEffect(() => {
    if (action != actionData) setActionData(action);
  }, [action]);

  useEffect(() => {
    if (rowData) setData(rowData);
  }, [rowData]);
  // const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // const [filterrowparams, setfilterrowparams] = useState(''); // Untuk menyimpan nilai input pencarian
  const handleFilterChange = async (column: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined;

    // Pastikan untuk memperbarui state filter untuk setiap kolom
    setFilters((prev: any) => ({
      ...prev,
      [column.id]: value,  // Menyimpan nilai filter untuk kolom yang diubah
    }));

    // Set filter untuk kolom tertentu
    column.setFilter(value);

    // Reset pagination ke halaman pertama ketika filter berubah
    setPagination((prev: any) => ({
      ...prev,
      currentPage: 0,  // Reset ke halaman pertama pada perubahan filter
    }));

    // Buat params yang diperbarui, termasuk filter dan pagination
    const updatedParams = {
      ...filters,
      page: 1,  // Selalu mulai dari halaman 1 untuk filter baru
      limit: pagination.perPage,
      keyword: searchValue,
      ...filterParams,
      ...activeFilters?.filters,
      year_before: activeFilters?.filters?.year_before
        ? activeFilters?.filters?.year_before + '-01-01'
        : undefined,
      year_after: activeFilters?.filters?.year_after
        ? activeFilters?.filters?.year_after + '-01-01'
        : undefined,
      month_before: activeFilters?.filters?.month_before
        ? activeFilters?.filters?.month_before + '-01'
        : undefined,
      month_after: activeFilters?.filters?.month_after
        ? activeFilters?.filters?.month_after + '-01'
        : undefined,
      [column.id]: value,  // Menambahkan filter untuk kolom yang diubah
    };

    try {
      setLoading(true);
      const req: any = await getAllByPath(path, updatedParams, source.token);

      const { results, total } = req;
      const dataLength = results ? results.length : 0;
      if (dataLength > 0) {
        let data = results?.map((d: any, i: number) => {
          d.key = i;
          d.id = get(d, primaryKey);
          d.number = pagination.currentPage * pagination.perPage + (i + 1);
          return d;
        });
        setRespData(data);

        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: Math.ceil(total / pagination?.perPage),
          totalData: total,
        }));
      }
    } catch (error) {
      console.error('Filter request failed:', error);
    } finally {
      setLoading(false);
    }
  };


  /** GET DATA PAGINATION */
  const getAllData = async () => {
    if (request != true) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      // Jika filters.sort_by ada dan filterParams.sort_by belum ada, set filterParams.sort_by ke filters.sort_by
      if (filters.sort_by && !filterParams.sort_by) {
        filterParams.sort_by = filters.sort_by;
      }

      // Jika filters.sort_by ada, kita hapus filterParams.sort_by
      if (filters.sort_by) {
        delete filterParams.sort_by; // Hapus filterParams.sort_by setelah filters.sort_by diperbarui
      }

      // Menyiapkan params dengan filter dan sort_by
      const params = {
        ...filters,
        page: pagination.currentPage + 1,
        limit: pagination.perPage,
        sort_by: filters.sort_by, // Menambahkan sort_by ke dalam params
        keyword: searchValue,
        ...filterParams,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before
          ? activeFilters?.filters?.year_before + '-01-01'
          : undefined,
        year_after: activeFilters?.filters?.year_after
          ? activeFilters?.filters?.year_after + '-01-01'
          : undefined,
        month_before: activeFilters?.filters?.month_before
          ? activeFilters?.filters?.month_before + '-01'
          : undefined,
        month_after: activeFilters?.filters?.month_after
          ? activeFilters?.filters?.month_after + '-01'
          : undefined,
      };

      // Melakukan request untuk mendapatkan data
      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;
      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        let data = results?.map((d: any, i: number) => {
          d.key = i;
          d.id = get(d, primaryKey);
          d.number = pagination.currentPage * pagination.perPage + (i + 1);
          return d;
        });
        setRespData(data);

        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: Math.ceil(total / pagination?.perPage),
          totalData: total,
        }));
      } else {
        setRespData([]);
        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: 1,
          totalData: 0,
        }));
        if (onEmpty) {
          onEmpty(true);
        }
      }
      setLoading(false);
    } catch (err: any) {
      setRespData([]);
      setLoading(false);
    }
  };



  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    if (
      trigger !== null &&
      // activeFilters != null &&
      callbackForm?.getData !== false
    ) {
      getAllData();

    } else {
      setLoading(false);
    }

    return () => {
      source.cancel();
    };
  }, [
    pagination?.currentPage,
    pagination?.perPage,
    searchValue,
    trigger,
    path,
    activeFilters,
    callbackForm,
    // filters,
    // actionData,
    location.pathname
  ]);

  useEffect(() => {
    if (searchParams.get('page')) {
      searchParams.delete('page');
      searchParams.append('page', '1');
      setSearchParams(searchParams);
    }
    setPagination((prev: any) => ({ ...prev, currentPage: 0 }));
  }, [searchValue, clickSubmit]);


  const handleSort = useCallback(
    ({ sortBy }: any) => {
      const refreshData = async (params: any) => {
        try {
          setLoading(true);
          const req: any = await getAllByPath(path, params, source.token);
          const { results, total } = req;

          if (results) {
            setRespData(
              results.map((d: any, i: number) => ({
                ...d,
                key: i,
                id: get(d, primaryKey),
                number: (params.page - 1) * params.limit + (i + 1),
              }))
            );

            setPagination((prev: any) => ({
              ...prev,
              pageCount: Math.ceil(total / params.limit),
              totalData: total,
            }));
          }
        } catch (error) {
          console.error('Error during refresh:', error);
        } finally {
          setLoading(false);
        }
      };

      if (sortBy.length > 0) {
        const sortDirection = sortBy[0].desc ? '-' : '';
        const newSortBy = sortDirection + sortBy[0].id;

        if (newSortBy !== filters.sort_by) {
          const newFilters = { ...filters, sort_by: newSortBy };
          setFilters(newFilters);
          if (filterParams?.sort_by) filterParams.sort_by = newSortBy;

          const updatedParams = {
            ...filters,
            ...newFilters,
            page: 1,
            limit: filters.limit || 10,
            keyword: filters.keyword || '',

            ...filterParams,
            ...activeFilters?.filters,
            year_before: activeFilters?.filters?.year_before
              ? activeFilters?.filters?.year_before + '-01-01'
              : undefined,
            year_after: activeFilters?.filters?.year_after
              ? activeFilters?.filters?.year_after + '-01-01'
              : undefined,
            month_before: activeFilters?.filters?.month_before
              ? activeFilters?.filters?.month_before + '-01'
              : undefined,
            month_after: activeFilters?.filters?.month_after
              ? activeFilters?.filters?.month_after + '-01'
              : undefined,
          };
          refreshData(updatedParams);
        }
      } else {
        const resetFilters = { ...filters, sort_by: undefined };
        setFilters(resetFilters);
        const updatedParams = {
          ...filters,
          ...resetFilters,
          page: 1,
          limit: filters.limit || 10,
          keyword: filters.keyword || '',
          ...filterParams,

          ...activeFilters?.filters,
          year_before: activeFilters?.filters?.year_before
            ? activeFilters?.filters?.year_before + '-01-01'
            : undefined,
          year_after: activeFilters?.filters?.year_after
            ? activeFilters?.filters?.year_after + '-01-01'
            : undefined,
          month_before: activeFilters?.filters?.month_before
            ? activeFilters?.filters?.month_before + '-01'
            : undefined,
          month_after: activeFilters?.filters?.month_after
            ? activeFilters?.filters?.month_after + '-01'
            : undefined,
        };
        refreshData(updatedParams);
      }
    },
    [filters, filterParams, path, primaryKey, source.token]
  );


  // useEffect(() => {
  //   getAllData();
  // }, [pagination?.currentPage]);

  /** HANDLE RELOAD DATA CLICK */
  useEffect(() => {
    if (reloadData && reloadData?.includes('default')) {
      getAllData();
    } else if (module != null) {
      if (reloadData && reloadData?.includes(module)) {
        getAllData();
      }
    }
  }, [reloadData]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    const paramsExporting = exportConfig?.addParams
      ? exportConfig?.addParams
      : {};
    const paramsDefault = {
      ...filters,
      page: -1,
      limit: -1,
      keyword: searchValue,
      ...filterParams,
      ...activeFilters?.filters,
      ...paramsExporting,
      export: true,
      export_type: exportData?.type,
    };

    const params = isObject(exportConfig?.customParams)
      ? { ...exportConfig?.customParams, export: true, export_type: exportData }
      : paramsDefault;

    try {
      let req: any = await getAllDownload(
        exportConfig?.path ? exportConfig?.path : path,
        params,
        source.token
      );

      /** RESET EXPORT */
      dispatch(exportingData(null));

      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers['content-disposition'];
      const filename = content
        .replace('attachment; filename=', '')
        .replaceAll('"', '');
      fileDownload(
        dataBlob,
        `${label}_${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(exportData?.type)
          ? filename
          : `${filename}.${exportData?.type}`
        }`
      );
      dispatch(exportingData(null));
      setLoading(false);
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, 'danger');
      setLoading(false);
      dispatch(exportingData(null));
    }
  };

  useEffect(() => {
    if (exportData && exportData?.table == module && validExport) {
      getAllDataExport();
    }
  }, [exportData]);

  const tableData = useMemo(() => data, [data]);
  // const memoizedColumns = useMemo(() => dynamicColumns, [dynamicColumns]);
  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath(path, dataSelected.id, source.token);
      // console.log("deleteData");

      dispatchNotification(`Sukses menghapus data ${label}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal menghapus data ${label}`, 'danger');
    }
  };



  /** GET DATA PAGINATION */
  const getGarduDistribusi = async (
    data_jar_har: any,
    params: any,
    paramsJarHar: any
  ) => {
    if (request != true) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      // let filter = customParamsService(, activeFilters.filters);
      const prm = {
        id_jenis_ref_lokasi: 10,
        page: -1,
        limit: 2000,
        ...params,
      };

      const req: any = await getAllByPath(
        API_PATH().master.jaringan.ref_lokasi,
        prm,
        source.token
      );
      const { results } = req;
      setLoading(false);
      let gardu = [];
      if (results.length > 0) {
        gardu = results?.map((d: any) => {
          return d.id_ref_lokasi;
        });
      }
      insertTransJarHarDet(data_jar_har, gardu, paramsJarHar);
    } catch (err: any) {
      setLoading(false);
    }
  };

  /** DELETE HANDLING */
  const approveWP = async () => {
    setLoading(true);
    const id_user = {
      1: 'id_user_direksi',
      3: 'id_user_persetujuan',
      8: 'id_user_closing',
    };

    let toK3l: any = (dataSelected?.manuver && approvalAlias == 2) ? 3 : null

    let params: any = {
      status_persetujuan: toK3l ? toK3l : approvalAlias,
      id_user_update: currentUser.id_user,
    };

    const id_user_approve = get(id_user, approvalAlias);
    if (id_user_approve) params[id_user_approve] = currentUser.id_user;

    try {
      await putByPath(
        `${path}/aproval-wp`,
        params,
        dataSelected.id,
        source.token
      );
      dispatchNotification(`Sukses approve WP`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal approve WP`, 'danger');
    }
  };
  const postingRekapPadam = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let params: any = {
      id_trans_ep: dataSelected?.id_trans_ep,
      posting: 1,
      id_user_update: currentUser.id_user
    }
    try {
      await putByPath(API_PATH().opsisdis.rekap_padam.trans_ep, params, dataSelected.id_trans_ep, source.token);
      dispatchNotification(`Sukses posting rekap padam`, 'success');
    } catch (err: any) {
      dispatchNotification(`Gagal posting rekap padam`, 'danger');
    }
  };

  /** DELETE HANDLING */
  const approvejadwalPemeliharaan = async (type: any) => {
    setLoading(true);
    const params = {
      ...dataSelected,
      approval_area1: '',
      approval_apd1: '',
      id_user_update: currentUser?.id_user,
      keterangan: '',
      // id_trans_jadwal_har:dataSelected.id_trans_jadwal_har,
    };
    let message = '';

    switch (type) {
      case 'input-jadwal-pemeliharaan':
        message = '';
        params.status_pekerjaan = 'Rencana Pemeliharaan';
        break;
      case 'bagian':
      case 'bagian-jadwal-pemeliharaan':
        message = '';
        params.status_pekerjaan = 'Disetujui spv bagian';
        break;
      case 'ren':
      case 'ren-jadwal-pemeliharaan':
        message = '';
        params.status_pekerjaan = 'Disetujui ren';
        break;
      case 'opsis':
      case 'opsis-jadwal-pemeliharaan':
        message = '';
        params.status_pekerjaan = 'Di setujui opsis';
        break;

      default:
        break;
    }

    try {
      await putByPath(
        `${path}/status`,
        params,
        dataSelected.id_trans_jadwal_har,
        source.token
      );
      dispatchNotification(`Sukses ${message}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal  ${message}`, 'danger');
    }
  };

  /** DELETE HANDLING */
  const approveJarHar = (type: any) => {
    setLoading(true);
    let params: any = {
      // ...dataSelected,
      // approval_area1: '',
      // approval_apd1: '',
      // id_user_update: currentUser?.id_user,
      // keterangan: '',
      // id_trans_jadwal_har:dataSelected.id_trans_jadwal_har,
    };

    switch (type) {
      case 'opsis-jadwal-pemeliharaan':
        let jam = dataSelected?.jam_pekerjaan.split('-');
        params = {
          nama_laporan: 'pemeliharaan',
          id_trans_jadwal_har: dataSelected.id_trans_jadwal_har,
          tgl_laporan: moment().format('YYYY-MM-DD hh:mm:ss'),
          user_entri: currentUser?.id_user,
          tgl_user_entri: moment().format('YYYY-MM-DD hh:mm:ss'),
          status_laporan: 'open',
          jenis_laporan: 'pemeliharaan',
          pelaksana: dataSelected?.id_pelaksana
            ? dataSelected?.id_pelaksana
            : '',
          wilayah_padam: dataSelected?.wilayah_padam,
          status_apkt_kirim: 1,
          tgl_mulai_pelaksanaan: `${dataSelected?.tgl} ${jam[0]}`,
          tgl_selesai_pelaksanaan: `${dataSelected?.tgl} ${jam[1]}`,
        };
        // console.log("params", params);

        insertTransJarHar(params);

        break;

      default:
        break;
    }
  };


  const UpdateStatusGardu = async () => {
    setLoading(true);
    let params: any = {
      id_user_update: currentUser?.id_user,

      status_laporan: 'close',
    };
    try {
      await putByPath(
        `${path}`,
        params,
        dataSelected.id_apkt_trans_jar,
        source.token
      );
      dispatchNotification(`Sukses update status`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal  update status`, 'danger');
    }
  };

  const updateStatusListrik = async () => {
    setLoading(true);
    let params: any = {
      id_user_update: currentUser?.id_user,
      datum_created: moment().format('YYYY-MM-DD HH:mm:ss'),
      datetime_status_2: moment().format('YYYY-MM-DD HH:mm:ss'),
      datetime_status_1: dataSelected.datetime_status_2,
      Pointnumber: dataSelected.Pointnumber,
      status_2: dataSelected.status_2 == 'down' ? 'up' : 'down',
      status_1: dataSelected.status_2,
      color_1: dataSelected.color_2,
      color_2: dataSelected.color_1,
    };
    try {
      await putByPath(
        `${path}`,
        params,
        dataSelected.id_scd_statusgardu,
        source.token
      );
      dispatchNotification(`Sukses update status`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal  update status`, 'danger');
    }
  };
  const updateKirimAPKT = async () => {
    setLoading(true);
    let params: any = {
      id_user_update: currentUser?.id_user,
      tgl_apkt_kirim: moment().format('YYYY-MM-DD hh:mm:ss'),
      status_apkt_kirim: 1,
    };
    try {
      await putByPath(
        `${path}`,
        params,
        dataSelected.id_trans_jar_har,
        source.token
      );
      dispatchNotification(`Sukses update status`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal  update status`, 'danger');
    }
  };

  const insertTransJarHar = async (params: any) => {
    let message;
    try {
      let resp: any = await postByPath(
        `${API_PATH().apkt.trans_jar_har}`,
        params,
        source.token
      );
      // console.log("dataSelected",dataSelected);

      dispatchNotification(`Sukses${message ? message : ''}`, 'success');
      if (!dataSelected?.id_gardu) {
        getGarduDistribusi(
          resp?.results,
          {
            id_gardu_induk: dataSelected?.id_gardu_induk,
            id_penyulang: dataSelected?.id_penyulang,
          },
          params
        );
      } else {
        insertTransJarHarDet(resp?.results, [dataSelected?.id_gardu], params);
      }
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };

  const insertTransJarHarDet = async (
    data_jar_har: any,
    gardu: any,
    paramsJarHar: any
  ) => {
    let message;

    try {
      let params = {
        id_apkt_trans_jar: data_jar_har?.id_trans_jar_har,
        id_trans_jadwal_har: paramsJarHar?.id_trans_jadwal_har,
        gardu: gardu?.length > 0 ? gardu.toString() : '',
        status_apkt_kirim: 1,
        tgl_mulai_pelaksanaan: paramsJarHar?.tgl_mulai_pelaksanaan,
        tgl_selesai_pelaksanaan: paramsJarHar?.tgl_selesai_pelaksanaan,
      };
      await postByPath(
        `${API_PATH().apkt.trans_jar_det_har}`,
        params,
        source.token
      );
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };

  const notApproveJadwalPemeliharaan = async () => {
    setLoading(true);
    const params = {
      ...dataSelected,
      id_user_update: currentUser?.id_user,
      status_pekerjaan: 'input-jadwal-pemeliharaan',
    };
    let message = 'ditolak';
    params.status = '';

    try {
      await putByPath(
        `${path}/status/`,
        params,
        dataSelected.id_trans_jadwal_har,
        source.token
      );
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal  ${message ? message : ''}`, 'danger');
    }
  };
  const [showModal, setShowModal] = useState(false);
  const openDeleteDialog = (selectedData: any) => {
    setDataSelected(selectedData); // Set data yang akan dihapus
    setModalConfirm((prevState: any) => ({
      ...prevState,
      description: `Hapus data ${selectedData?.name || ''}`, // Menambahkan label

    }));
    setShowModal(true); // Tampilkan modal
  };
  const closeDeleteDialog = () => {
    setShowModal(false); // Sembunyikan modal
  };
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteByPath(path, dataSelected.id, source.token); // Hapus data
      setRespData((prevData: any) => prevData.filter((item: any) => item.id !== dataSelected.id)); // Hapus dari state
      closeDeleteDialog(); // Tutup dialog
      dispatchNotification(`Sukses menghapus data ${label}`, 'success');
      await getAllData(); // Refresh data
    } catch (err) {
      dispatchNotification(`Gagal menghapus data ${label}`, 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selected) {
      switch (actionData) {
        case 'delete':
          openDeleteDialog(selected); // Buka dialog konfirmasi
          break;
        case 'update-status-gardu':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'fa-regular fa-circle-question',
            description: `Apakah laporan akan di close ?`,
            subDescriotion: `Data tidak dapat dikembalikan`,
            textApproved: 'Ok',
            classApproved: 'primary',
            textDecline: 'Cancel',
            action: 'update-status-gardu',
            show: true,
          }));
          break;
        case 'kirim-apkt':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'fa-regular fa-circle-question',
            description: `Apakah kirim ke apkt ?`,
            subDescriotion: `Data tidak dapat dikembalikan`,
            textApproved: 'Ok',
            classApproved: 'primary',
            textDecline: 'Cancel',
            show: true,
            action: 'kirim-apkt',
          }));
          break;
        case 'update-status-listrik':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'fa-regular fa-circle-question',
            description: `Apakah anda yakin ?`,
            subDescriotion: `Tindakan ini akan merubah status listrik dari Nyala menjadi Padam atau dari Padam menjadi Nyala.`,
            textApproved: 'Ok',
            classApproved: 'primary',
            textDecline: 'Cancel',
            show: true,
            action: 'update-status-listrik',
          }));
          break;
        case 'approve-wp':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: "fa-regular fa-thumbs-up",
            description: `Apakah data tersebut akan di Approve ?`,
            subDescriotion: `Data akan di approve`,
            textApproved: 'Approve',

            classApproved: 'primary',
            textDecline: 'Tidak',
            action: 'approve-wp',
            show: true,
          }));
          break;
        case 'posting-rekap-padam':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: "fa-regular fa-thumbs-up",
            description: `Apakah data tersebut akan di Posting ?`,
            subDescriotion: `Data akan di posting`,
            textApproved: 'Posting',
            classApproved: 'primary',
            textDecline: 'Tidak',
            action: 'posting-rekap-padam',
            show: true,
          }));
          break;
        case 'input-jadwal-pemeliharaan':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'a-solid fa-thumbs-up',
            description: `Apakah data tersebut akan di kirim ke bagian ?`,
            subDescriotion: `Data akan di  kirim ke bagian`,
            textApproved: 'Posting',
            classApproved: 'primary',
            textDecline: 'Tidak',
            action: 'input-jadwal-pemeliharaan',
            show: true,
          }));
          break;
        case 'bagian-jadwal-pemeliharaan':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'a-solid fa-thumbs-up',
            description: `Apakah data tersebut akan di kirim ke REN ?`,
            subDescriotion: `Data akan di  kirim ke REN`,
            textApproved: 'Setujui',
            classApproved: 'primary',
            textDecline: 'Tolak',
            action: 'bagian-jadwal-pemeliharaan',
            show: true,
          }));
          break;
        case 'ren-jadwal-pemeliharaan':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'a-solid fa-thumbs-up',
            description: `Apakah data tersebut akan di kirim pelaksana ?`,
            subDescriotion: `Data akan dikirim ke OPSIS`,
            textApproved: 'Setujui',
            classApproved: 'primary',
            textDecline: 'Tolak',
            action: 'ren-jadwal-pemeliharaan',
            show: true,
          }));
          break;
        case 'opsis-jadwal-pemeliharaan':
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            icon: 'a-solid fa-thumbs-up',
            description: `Apakah data tersebut akan di kirim pelaksana ?`,
            subDescriotion: `Data akan dikirim ke pelaksana`,
            textApproved: 'Setujui',
            classApproved: 'primary',
            textDecline: 'Tolak',
            action: 'opsis-jadwal-pemeliharaan',
            show: true,
          }));
          break;
        case 'edit.modal':
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case 'create.modal':
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case 'edit':
          navigate(`edit/${get(selected, primaryKey)}`);
          break;
        case 'detail':
          navigate(`detail/${get(selected, primaryKey)}`);
          break;
        default:
          break;
      }
    }
  }, [actionData, selected]);


  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      setActionData(undefined); // solusinya nambahin ini

      switch (modalConfirm?.action) {
        case 'approve-wp':
          approveWP();
          break;
        case 'posting-rekap-padam':
          postingRekapPadam();
          break;
        case 'update-status-gardu':
          UpdateStatusGardu();
          break;
        case 'kirim-apkt':
          updateKirimAPKT();
          break;
        case 'input-jadwal-pemeliharaan':
        case 'bagian-jadwal-pemeliharaan':
        case 'ren-jadwal-pemeliharaan':
        case 'sendBagian-jadwal-pemeliharaan':
          approvejadwalPemeliharaan(modalConfirm?.action);
          break;
        case 'opsis-jadwal-pemeliharaan':
          approvejadwalPemeliharaan(modalConfirm?.action);
          if (dataSelected?.butuh_padam) {
            approveJarHar(modalConfirm?.action);
          }
          break;
        case 'update-status-listrik':
          updateStatusListrik();
          break;
        default:
          deleteData();
          break;
      }
    } else if (approved == false) {
      setActionData(undefined); // solusinya nambahin ini
      // console.log('modalConfirm?.action', modalConfirm?.action);

      switch (modalConfirm?.action) {
        case 'bagian-jadwal-pemeliharaan':
        case 'ren-jadwal-pemeliharaan':
        case 'sendBagian-jadwal-pemeliharaan':
        case 'sendBagian-jadwal-pemeliharaan':
        case 'sendRen-jadwal-pemeliharaan':
        case 'sendOpsis-jadwal-pemeliharaan':
        case 'opsis-jadwal-pemeliharaan':
        case 'sendPelaksana-jadwal-pemeliharaan':
        case 'ren-jadwal-pemeliharaan':
        case 'sendBagian-jadwal-pemeliharaan':
          notApproveJadwalPemeliharaan();
          break;
      }
    }

    if (onCloseModal) {
      onCloseModal(undefined);
    }
  };

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState: any) => ({
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

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };


  const handleRowsChecked = (checked: any) => {
    if (rowSelectType === 'radio') {
      const selected = checked[0];

      if (selected) { // Tambahkan validasi di sini
        setCheckedRows([selected]);
        setCheckedRowsKey({ [selected?.key]: true }); // Gunakan optional chaining atau validasi
        saveToLocalStorage('checkedRows', [selected]);

        if (onCheckedRows) onCheckedRows([selected]);
      }
      return;
    }

    // Validasi item di checked sebelum map atau filter
    const validChecked = checked?.filter((item: any) => item && item.key);

    const checkSize = size(validChecked);
    const checkRows = size(
      checkedRows?.filter(
        (f: any) => f && f.page === pagination?.currentPage
      )
    );

    if (checkSize > 0 && checkSize < checkRows) {
      const exists = validChecked.map((item: any) => item?.id);
      const removed = checkedRows
        ?.filter(
          (f: any) =>
            f &&
            f.page === pagination?.currentPage &&
            !exists.includes(f?.id)
        )
        ?.map((item: any) => item?.id);

      const listsUpdate = checkedRows
        ?.filter((item: any) => item && !removed.includes(item?.id))
        ?.map((item: any) => ({ ...item }));

      const updateChecked = listsUpdate;
      setCheckedRows(updateChecked);
      saveToLocalStorage('checkedRows', updateChecked);

      let checkedKeys = {};
      updateChecked
        ?.filter((f: any) => f?.page === pagination?.currentPage)
        ?.forEach((item: any) => {
          checkedKeys = { ...checkedKeys, [item?.key]: true };
        });

      setCheckedRowsKey(checkedKeys);
      if (onCheckedRows) onCheckedRows(updateChecked);
      if (size(validChecked) === 0) {
        setCheckedRows([]);
        saveToLocalStorage('checkedRows', []);
      }
    } else if (checkSize >= 0) {
      const listsUpdate = validChecked?.map((item: any) => ({
        ...item,
        page: pagination?.currentPage,
      }));
      const updateChecked = unionBy(listsUpdate, checkedRows, 'id');
      setCheckedRows(updateChecked);
      saveToLocalStorage('checkedRows', updateChecked);

      let checkedKeys = {};
      updateChecked
        ?.filter((f: any) => f?.page === pagination?.currentPage)
        ?.forEach((item: any) => {
          checkedKeys = { ...checkedKeys, [item?.key]: true };
        });

      setCheckedRowsKey(checkedKeys);
      if (onCheckedRows) onCheckedRows(updateChecked);
    }
  };




  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action && onCloseModal) {
      onCloseModal(undefined);
    }
  }, [closeModal]);

  useEffect(() => {
    return () => {
      setData([]);
      setRespData([]);
    };
  }, []);

  // console.log("path",path);
  // console.log("filter patam",filterParams);


  return (
    <>
      <TopBarLoader isLoading={loading} />

      <ReactTableUpdate
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        onCheckedRows={handleRowsChecked}
        columns={columnsConfig}
        data={tableData}
        onSort={handleSort}
        columnFilters={true}
        containerClass={containerClass}
        loading={loading}
        selectedRows={checkedRowsKey}
        styles={styles}
        showNoResul={showNoResul}
        handleFilterChange={handleFilterChange}
      />

      {paging?.show != false && (
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={pagingPresistance}
          onChangeItemPerPage={onChangeItemPerPage}

        />
      )}

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}

      />
      {/* Modal Delete confirm */}
      <Modal show={showModal} onHide={closeDeleteDialog} size={modalConfirm.size}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={modalConfirm.icon}></i> {modalConfirm.description}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <i
              className="fa-solid fa-exclamation-circle" // Pilih ikon yang diinginkan
              style={{
                color: '#FF6347', // Warna merah soft pada ikon
                fontSize: '40px',  // Ukuran ikon lebih besar
                marginBottom: '15px', // Jarak antara ikon dan teks
              }}
            ></i>
            <p style={{
              color: '#FF7F7F', // Merah lembut untuk teks
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center',
            }}>
              Data Yang di Delete Tidak bisa di Kembalikan!!!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteDialog}>
            {modalConfirm.textDecline}
          </Button>
          <Button variant={modalConfirm.classApproved} onClick={confirmDelete}>
            {modalConfirm.textApproved}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
interface ITableData {
  columnsConfig: any;
  filterParams?: any;
  respDataApi: any;
  rowData: any;
  // columnFilters: any;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
  onCheckedRows?: any;
  selected?: any;
  path?: any;
  exportConfig?: IExportConfig;
  primaryKey: any;
  action?: string | undefined;
  onColumnsChanged?: any;
  paging?: IPaging;
  pagingPresistance?: boolean;
  deleteConfirmation?: any;
  trigger?: any;
  module?: any;
  ids?: any;
  onEmpty?: any;
  containerClass?: string;
  approvalAlias?: any;
  onCloseModal?: any;
  styles?: any;
  request?: boolean;
  validExport?: boolean;
  showNoResul?: boolean;
}

interface IPaging {
  perPage?: number;
  show?: boolean;
  offset?: number;
  currentPage?: number;
  pageCount?: number;
  totalData?: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}

interface IExportConfig {
  path?: string;
  addParams?: any;
  customParams?: any;
}
