import React, { useState, useEffect, useRef } from "react";
import Pagination from "@app/components/Pagination/PaginationTelemetering";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalConfirm from "@app/components/Modals/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { useApp } from "@app/context/AppContext";
import axios from "axios";
import { notificationTemplate } from "@app/helper/notificationTemplate";
// import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
import { addNotification } from "@app/store/notification/notification.action";
import {
  deleteByPath,
  getAllByPath,
  getAllDownload,
  postByPath,
  putByPath,
} from "@app/services/main.service";

// import JqxButton from "jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { get, isObject } from "lodash";
import moment from "moment";
import fileDownload from "js-file-download";
import {
  exportingData,
  reloadingData,
  generatingData,
} from "@app/store/reducers/app";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
// import NoDataIllustration from '@app/components/Illustration/NoDataIllustration';
// import { Title } from '@app/styled/tasks.styled';
// import styled from 'styled-components';
import qs from "query-string";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { nanoid } from "@reduxjs/toolkit";
// const NoData = styled.div`
//   /* width: 5rem; */
//   /* padding: 1.1rem; */
//   /* background: var(--black-25); */
//   border-radius: 1rem;
//   margin:0 auto;
// `;

export default function TableGangguanSistemUp3Mingguan({
  columnsConfig = [],
  columnsGroupConfig = null,
  filterParams = {},
  respDataApi,
  rowData,
  path,
  infoLabels,
  ForinfoLabels = false,
  exportingOptions = "all",
  exportConfig,
  primaryKey,
  selected,
  action,
  reloadbtn = true,
  filterable = false,
  paging = {},
  exportbtn = false,
  pagingPresistance = true,
  deleteConfirmation = {},
  // rowSelect = false,
  // rowSelectType = 'checkbox',
  trigger,
  module = null,
  ids = "id",
  onEmpty,
  // containerClass = 'my-3 table table-responsive',
  // onCheckedRows,
  // styles,
  request = true,
  onCloseModal,

  validExport = true,
  editAble = false,
}: ITableData) {
  const source = axios.CancelToken.source();
  const { activePage, activeFilters, callbackForm, closeModal } = useSelector(
    (state: any) => state.ui
  );
  let filtersRowParams: any = {};
  const Grid = useRef<JqxGrid>(null);
  const { exportData, reloadData, generateData } = useSelector(
    (state: any) => state.app
  );
  const { searchValue } = useApp();
  const queryParams = qs.parse(location.search);
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useSelector((state: any) => state.auth);
  const currentPage = pagingPresistance ? searchParams.get("page") : 0;
  const exportOptionsDefault = [
    { label: "CSV", type: "csv" },
    { label: "MS-Excel", type: "xlsx" },
  ];

  const label = module ? module : activePage?.display;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  // const [checkedRows, setCheckedRows] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [pagination, setPagination] = useState<any>({
    perPage: 100,
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
    size: "sm",
    icon: "fa-regular fa-trash-can",
    description: `Hapus data ${label ? label : ""}`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: "Delete",
    classApproved: "danger",
    textDecline: "Cancel",
    ...deleteConfirmation,
  });

  // const initFilters = {
  //   keyword: '',
  //   sort_by: 'nama',
  // };

  // const [filters, setFilters] = useState<any>(initFilters);

  const [actionData, setActionData] = useState<any>(action);

  /** DATA RESP */
  const [respData, setRespData] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>(selected);

  useEffect(() => {
    respDataApi(respData);
  }, [respData]);

  useEffect(() => {
    if (action != actionData) setActionData(action);
  }, [action]);

  // useEffect(() => {
  //   if (rowData) {

  //   }

  // }, [rowData]);
  const handleOnFilter = () => {
    const filterGroups = Grid.current?.getfilterinformation();
    let queryParam = {};

    if (filterGroups) {
      console.log("Filter Groups:", filterGroups); // Log filter groups

      for (let i = 0; i < filterGroups.length; i++) {
        const filterGroup = filterGroups[i];
        console.log(`Filter Group ${i}:`, filterGroup); // Log each filter group

        const filters = filterGroup.filter.getfilters();
        console.log(`Filters for Group ${i}:`, filters); // Log filters in each group

        for (let j = 0; j < filters.length; j++) {
          const filter = filters[j];
          console.log(`Filter ${j} in Group ${i}:`, filter); // Log each filter

          if (filterGroup.filtercolumn) {
            let filterValue = filter.value;
            console.log(
              `Filter Value for Filter ${j} in Group ${i}:`,
              filterValue
            ); // Log filter value

            if (typeof filterValue === "boolean") {
              filterValue = filterValue ? 1 : 0;
            }
            queryParam = {
              ...queryParam,
              [filterGroup.filtercolumn]: filterValue,
            };
          }
        }
      }
    }

    filtersRowParams = { ...filtersRowParams, ...queryParam };
    console.log("Updated filtersRowParams:", filtersRowParams); // Log updated filtersRowParams

    Object.keys(filtersRowParams).forEach((key) => {
      if (!(key in queryParam)) {
        delete filtersRowParams[key];
      }
    });

    console.log("Final filtersRowParams:", filtersRowParams); // Log final filtersRowParams after cleanup
    // getAllData();
  };
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    if (request != true) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      // let filter = customParamsService(, activeFilters.filters);
      const params = {
        // ...filters,
        page: pagination.currentPage + 1,
        // limit: paging?.perPage ? paging?.perPage : pagination.perPage,
        limit: pagination.perPage,
        // keyword: searchValue,
        ...filterParams,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before
          ? activeFilters?.filters?.year_before + "-01-01"
          : undefined,
        year_after: activeFilters?.filters?.year_after
          ? activeFilters?.filters?.year_after + "-01-01"
          : undefined,
        month_before: activeFilters?.filters?.month_before
          ? activeFilters?.filters?.month_before + "-01"
          : undefined,
        month_after: activeFilters?.filters?.month_after
          ? activeFilters?.filters?.month_after + "-01"
          : undefined,
        ...filtersRowParams,
        // date:queryParams?.date,
        // id_ref_lokasi_gi:id_ref_lokasi_gi
      };

      if (queryParams?.time) {
        params.datum_date = queryParams?.time
          ? `${queryParams?.date} ${queryParams?.time}`
          : null;
      } else if (queryParams?.date) {
        // params.datum_date = queryParams?.date
        //   ? queryParams?.date
        //   : moment().format("YYYY-MM-DD");
        params.datum = queryParams?.date
          ? queryParams?.date
          : moment().format("YYYY-MM-DD");
      }

      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;
      const dataLength = results ? results.length : 0;

      setLoading(false);
      if (dataLength > 0) {
        let data = results?.map((d: any, i: number) => {
          let number = pagination.currentPage * pagination.perPage + (i + 1);
          d.key = i;
          d.id = get(d, primaryKey);
          d.number = number;
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
    } catch (err: any) {
      setRespData([]);
      setLoading(false);
    }
  };

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    // console.log("pagination?.currentPage,", pagination?.currentPage);

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
    // filtersRowParams,
    location.pathname,
    path,
  ]);

  /** HANDLE RELOAD DATA CLICK */
  useEffect(() => {
    console.log("reloadData:", reloadData); // Debugging
    if (reloadData && reloadData.includes("default")) {
      getAllData();
    } else if (module != null) {
      if (reloadData && reloadData.includes(module)) {
        getAllData();
      }
    }
  }, [reloadData]);

  // const updateData = async (url: string, params: any, id: any) => {
  //   // Cek data sebelum kirim
  //   if (!params || !params.waktu || !params.id_ref_lokasi) {
  //     dispatchNotification("Data tidak lengkap. Update dibatalkan.", "danger");
  //     return;
  //   }

  //   try {
  //     let req: any = await putByPath(`${url}`, params, id, source.token);

  //     switch (req?.status) {
  //       case 500:
  //       case 504:
  //         dispatchNotification("Server is under heavy load", "danger");
  //         break;
  //       case 201:
  //       case 200:
  //         dispatchNotification(req?.message || "Update successful", "success");
  //         break;
  //       default:
  //         dispatchNotification("Unexpected response from server", "warning");
  //         break;
  //     }
  //   } catch (error: any) {
  //     console.error("Update Error:", error);
  //     dispatchNotification("Server is under heavy load", "danger");
  //     setLoading(false);
  //   }
  // };
  const updateData = async (url: string, params: any, id: any) => {
    // Cek data sebelum kirim
    if (!params) {
      dispatchNotification("Data tidak lengkap. Update dibatalkan.", "danger");
      return;
    }

    try {
      let req: any = await putByPath(`${url}`, params, id, source.token);

      switch (req?.status) {
        case 500:
        case 504:
          dispatchNotification(
            req?.message ||
            req?.error ||
            "Data yang diinputkan tidak sesuai field",
            "danger"
          );
          break;
        case 400:
          dispatchNotification(
            req?.message ||
            req?.error ||
            "Data yang diinputkan tidak sesuai field",
            "danger"
          );
          break;
        case 201:
        case 200:
          dispatchNotification(req?.message || "Update successful", "success");
          handleReload();
          break;
        default:
          dispatchNotification("Unexpected response from server", "warning");
          break;
      }
    } catch (error: any) {
      console.error("Update Error:", error);
      dispatchNotification("Server is under heavy load", "danger");
      setLoading(false);
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    const paramsExporting = exportConfig?.addParams
      ? exportConfig?.addParams
      : {};
    const paramsDefault = {
      // ...filters,
      page: pagination.currentPage + 1,
      limit: pagination.perPage,
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
      let content: string = headers["content-disposition"];
      const filename = content
        .replace("attachment; filename=", "")
        .replaceAll('"', "");
      fileDownload(
        dataBlob,
        `${label}_${moment().format("YYYY-MM-DD HH_mm_ss")}_${filename.includes(exportData?.type)
          ? filename
          : `${filename}.${exportData?.type}`
        }`
      );
      setLoading(false);
    } catch (err: any) {
      dispatchNotification(`Gagal export / download data`, "danger");
      setLoading(false);
      dispatch(exportingData(null));
    }
  };

  useEffect(() => {
    if (exportData && exportData?.table == module && validExport) {
      getAllDataExport();
    }
  }, [exportData]);

  /** DELETE HANDLING */
  const deleteData = async () => {
    setLoading(true);

    try {
      await deleteByPath(path, dataSelected.id, source.token);
      dispatchNotification(`Sukses menghapus data ${label}`, "success");
      getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal menghapus data ${label}`, "danger");
    }
  };

  useEffect(() => {
    if (selected) {
      switch (actionData) {
        case "delete":
          setDataSelected(selected);
          setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
          }));
          break;
        case "edit.modal":
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case "create.modal":
          searchParams.delete(ids);
          searchParams.append(ids, get(selected, primaryKey));
          setSearchParams(searchParams);
          break;
        case "edit":
          navigate(`edit/${get(selected, primaryKey)}`);
          break;
        case "detail":
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
        default:
          deleteData();
          break;
      }
    } else if (approved == false) {
      setActionData(undefined); // solusinya nambahin ini
      switch (modalConfirm?.action) {
        default:
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
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  const getGenerate = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    setLoading(true);
    try {
      const params = {
        id_user_entri: currentUser.id_user,
        ...filterParams,
        ...activeFilters?.filters,
        year_before: activeFilters?.filters?.year_before
          ? activeFilters?.filters?.year_before + "-01-01"
          : undefined,
        year_after: activeFilters?.filters?.year_after
          ? activeFilters?.filters?.year_after + "-01-01"
          : undefined,
        month_before: activeFilters?.filters?.month_before
          ? activeFilters?.filters?.month_before + "-01"
          : undefined,
        month_after: activeFilters?.filters?.month_after
          ? activeFilters?.filters?.month_after + "-01"
          : undefined,

        // ...filterParams,
      };

      const req: any = await postByPath(
        `${path}/generate`,
        params,
        source.token
      );

      if (generateData) {
        dispatch(generatingData(null));
        dispatch(reloadingData(moment().valueOf()));
      }

      if (req?.status === 404 || req?.status === 400) {
        dispatchNotification(`Gagal Generate data ${req?.message}`, "danger");
      } else {
        // Only call getAllData if request was successful
        getAllData();
      }

      return req.results;
    } catch (err: any) {
      let message: string = err?.response
        ? `, ${err?.response?.data?.message}`
        : err?.response?.data?.config?.statusText;

      dispatchNotification(`Gagal Generate data ${message}`, "danger");

      if (generateData) {
        dispatch(generatingData(null));
      }
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    if (generateData && generateData?.table == module) {
      console.log("getGenerate");
      getGenerate();
    }
  }, [generateData]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action && onCloseModal) {
      onCloseModal(undefined);
    }
  }, [closeModal]);

  useEffect(() => {
    return () => {
      setRespData([]);
    };
  }, []);

  //   const [cellData, setCellData] = useState({});
  //   useEffect(() => {
  //     if (Grid.current) {
  //         Grid.current.refreshdata(); // 🔥 Paksa refresh seluruh grid agar warna berubah
  //     }
  // }, [cellData]); // 🔥 Akan berjalan setiap kali cellData berubah

  const columngroups = [
    { text: "JANUARI", align: "center", name: "januari" },
    { text: "FEBRUARI", align: "center", name: "februari" },
    { text: "MARET", align: "center", name: "maret" },
    { text: "APRIL", align: "center", name: "april" },
    { text: "MEI", align: "center", name: "mei" },
    { text: "JUNI", align: "center", name: "juni" },
    { text: "JULI", align: "center", name: "juli" },
    { text: "AGUSTUS", align: "center", name: "agustus" },
    { text: "SEPTEMBER", align: "center", name: "september" },
    { text: "OKTOBER", align: "center", name: "oktober" },
    { text: "NOVEMBER", align: "center", name: "november" },
    { text: "DESEMBER", align: "center", name: "desember" },
  ];

  let lastKeyPressed: string | null = null;

  document.addEventListener("keydown", (e: any) => {
    lastKeyPressed = e.key;
  });

  const onCellendedit = (item: any) => {
    const { args } = item;

    const field = args.datafield;
    const oldRaw =
      typeof args.oldvalue === "object" ? args.oldvalue?.value : args.oldvalue;
    const newRaw =
      typeof args.value === "object" ? args.value?.value : args.value;

    const normalize = (v: any) =>
      v === null || v === undefined ? "" : `${v}`.trim();
    const oldVal = normalize(oldRaw);
    const newVal = normalize(newRaw);

    const isSame = oldVal === newVal;

    if (isSame) return;
    if (lastKeyPressed === "Tab" && isSame) {
      lastKeyPressed = null;
      return;
    }
    lastKeyPressed = null;

    const dynamicParams: any = {
      id_user_update: currentUser.id_user,
    };

    // Cek apakah field sesuai format: tgtMMWW → tgt0101, tgt0512, dll
    // const isTgtField = /^tgt\d{2}$/.test(field);
    // if (!isTgtField) {
    //   alert(`Field tidak dikenali: ${field}`);
    //   return;
    // }

    // Ambil kode waktu dari field: contoh field = tgt0101
    const timeCode = field.slice(3); // hasil: "0101"

    // Buat scField dan tentukan nilai SC
    const scField = `sc${timeCode}`;
    const scValue = !args.row[scField] || args.row[scField] === "0" ? 2 : 2;

    Object.assign(dynamicParams, {
      colsc: scField,
      valsc: scValue,
      col: field,
      val: args.value,
    });

    console.log("Kirim params →", dynamicParams);
    updateData(path, dynamicParams, args?.row.id_trans_jadwal_har_plgn_bln);
  };

  // ini backup
  // const onCellendedit = (item: any) => {
  //   const { args } = item;
  //   const datum = queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD");
  //   const valentriop = 2;
  //   const valscadaop = 3;

  //   let params: any = {}; // Objek untuk menyimpan perubahan

  //   const isAuthorized = () => {
  //         return (
  //           args?.row.id_ref_lokasi_gi === id_ref_lokasi_gi ||
  //           currentUser?.roleId === "1b4aa951-e537-483a-9b03-715f4062111e" ||
  //           currentUser?.roleId === "d62918b6-13b9-429b-a48b-bfebd3f28c4f"
  //         );
  //       };

  //       if (!isAuthorized()) {
  //         alert("Anda Tidak Mempunyai Hak Akses");
  //         return;
  //       }

  //   if (args?.oldvalue !== args?.value) {
  //     const validation = validateImax(args?.row, args?.value, args?.datafield);

  //     if (validation) {
  //       // Mapping otomatis untuk i0000 - i2330 dan r/s/t0000 - r/s/t2330
  //       const timeIntervals = [
  //         "0000", "0030", "0100", "0130", "0200", "0230", "0300", "0330", "0400", "0430",
  //         "0500", "0530", "0600", "0630", "0700", "0730", "0800", "0830", "0900", "0930",
  //         "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430",
  //         "1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830", "1900", "1930",
  //         "2000", "2030", "2100", "2130", "2200", "2230", "2300", "2330"
  //       ];

  //       const datafields = ["i", "r", "s", "t"]; // Semua field yang perlu dicek

  //       datafields.forEach((prefix) => {
  //         timeIntervals.forEach((time) => {
  //           if (args?.datafield === `${prefix}${time}`) {
  //             const key = `sc${time}`; // Nama parameter yang akan dikirim
  //             params[key] = args?.row[key] === "0" ? valentriop : valscadaop;
  //           }
  //         });
  //       });

  //       console.log("Params yang dikirim:", params); // Debugging untuk cek apakah params terisi

  //       updateData(path, {
  //         [args?.datafield]: args?.value,

  //         datum: datum,

  //         id_user_update: currentUser?.id_user,
  //         id_parent_lokasi: args?.row.id_parent_lokasi,
  //         id_ref_lokasi_gi: args?.row.id_ref_lokasi_gi,
  //         id_ref_lokasi: args?.row.id_ref_lokasi,
  //         ...params,
  //       }, args?.row.id);
  //     }
  //   }
  // };

  /** EXPORTING DATA */
  const getAllDataExportData = async (export_type: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // const filterParamUrl = Object.fromEntries(
    //   new URLSearchParams(window.location.search).entries()
    // );
    const params = {
      page: -1,
      limit: -1,
      export: true,
      export_type: export_type,
      ...filterParams,
      ...activeFilters?.filters,
    };
    // jqxLoader.current?.open();

    try {
      let req: any = await getAllDownload(path, params, source.token);
      /** RESET EXPORT */
      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers["content-disposition"];
      const filename = content
        .replace("attachment; filename=", "")
        .replaceAll('"', "");
      fileDownload(
        dataBlob,
        `${moment().format("YYYY-MM-DD HH_mm_ss")}_${filename.includes(export_type)
          ? filename
          : `${filename}.${export_type}`
        }`
      );
      // jqxLoader.current?.close();
    } catch (error: any) {
      let message: string = error?.response
        ? `, ${error?.response?.data?.message}`
        : error?.response?.data?.config?.statusText;
      dispatchNotification(
        `Gagal export / download data : ${message}`,
        "danger"
      );
      // jqxLoader.current?.close();
    }
  };
  // console.log("columnsConfig", columnsConfig);
  // const allowedPageSizes = [10, 25, 50, 100, 'all'];
  const onChangeItemPerPage = (value = pagination.perPage) => {
    setPagination((prev: any) => ({ ...prev, currentPage: 0, perPage: value }));
  };

  const sourcesData: any = {
    // datafields: columnsConfig?.datafield,
    datatype: "array",
    id: "m\\:properties>d\\:OrderID",
    pagenum: 3,
    // pager: (pagenum: any, pagesize: any, oldpagenum: any): void => {
    // callback called when a page or page size is changed.
    // },
    pagesize: 10,
    localdata: rowData,
  };

  const handleReload = () => {
    getAllData(); // Panggil fungsi untuk mengambil data terbaru
  };

  const sources = new jqx.dataAdapter(sourcesData);
  //  const buttonStyle: React.CSSProperties = {
  //         display: "inline-block",
  //         marginLeft: "5px",
  //         // backgroundColor: '#0484cc', // #fff Warna dasar tombol #ff0e0e
  //         // color: '#fff', // Warna teks tombol
  //         border: "none",
  //         borderRadius: "4px", // Membuat sudut tombol membulat
  //         cursor: "pointer",
  //         transition: "background-color 0.3s", // Transisi saat hover
  //       };
  // useEffect(() => {
  //   if (Grid.current) {
  //     Grid.current.updatebounddata(); // Memaksa update grid
  //   }
  // }, [rowData]);
  return (
    <>
      {ForinfoLabels && infoLabels.length > 0 && (
        <>
          {infoLabels.map((item: any) => (
            <Button
              variant={item?.color}
              key={nanoid()}
              className="ms-1 btn-sm mb-1"
              style={{ color: "var(--black)" }}
            >
              {item?.name}
            </Button>
          ))}
        </>
      )}

      <div
        style={{
          background: "linear-gradient(135deg, #2aa198, #4682b4)",
          borderRadius: "8px",
          padding: "15px",
          display: "flex",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left side for the title */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            color: "white",
            flex: 2,
          }}
        >
          TARGET BULANAN
        </div>

        <ButtonGroup className="ms-2" aria-label="Basic example">
          {reloadbtn && (
            <Button
              variant=""
              onClick={handleReload}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <i className="fas fa-sync-alt"></i>
            </Button>
          )}

          {exportbtn && (
            <Dropdown className="hide-toogle">
              <Dropdown.Toggle
                variant=""
                id="dropdown-download"
                className="dropdown-group border-radius-left-0"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                disabled={loading}
              >
                <i className="fa fa-download"></i>
                {loading && (
                  <i className="fas fa-circle-notch fa-spin ms-2"></i>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {exportOptionsDefault
                  .filter(
                    (f: any) =>
                      exportingOptions == "all" ||
                      exportingOptions?.includes(f.type)
                  )
                  .map((d: any) => (
                    <Dropdown.Item
                      key={nanoid()}
                      onClick={() => getAllDataExportData(d.type)}
                    >
                      {d.label}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          {/* {exportbtn && (
                                      <JqxButton
                                        onClick={() => getAllDataExportData('xlsx')}
                                        // theme={themeJqx}
                                        width={165}
                                        height={20}
                                        style={{backgroundColor: '#0484cc', color: '#fff' }}
                                        className="jqx-button-custom" // Kelas CSS untuk efek hover
                                      >
                                        <span> Download Excel</span>
                                        <i className="fa-solid fa-file-excel"></i>
                                      </JqxButton>
                                    )}
                                         {exportbtn && (
                                      <JqxButton
                                        onClick={() => getAllDataExportData('csv')}
                                        // theme={themeJqx}
                                        width={165}
                                        height={20}
                                        style={{backgroundColor: '#0484cc', color: '#fff' }}
                                        className="jqx-button-custom" // Kelas CSS untuk efek hover
                                      >
                                        <span> Download Csv</span>
                                        <i className="fa-solid fa-file-csv"></i>
                                      </JqxButton>
                                    )} */}
        </ButtonGroup>
      </div>
      <br></br>
      <br></br>

      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          onClick={getGenerate}
          disabled={loading}
          variant="primary"
          className="d-flex align-items-center"
        >
          <i
            className={`fa fa-cog ${loading ? "fa-spin" : ""}`}
            style={{ marginRight: 8 }}
          />
          {loading ? "Generating..." : "Generate Data"}
        </Button>
      </div>
      <small className="text-danger d-block mt-2 fst-italic fw-bold">
        <i className="fa fa-exclamation-circle me-1" />
        Generate data hanya untuk menampilkan data UP3. Apabila UP3 sudah muncul, Generate Data tidak perlu di klik.
      </small>
      <div>
        {/* {rowData?.length > 0 && */}
        <TopBarLoader isLoading={loading} />
        <JqxGrid
          ref={Grid}
          selectionmode="multiplecellsadvanced"
          pageable={false}
          editable={editAble}
          scrollfeedback={true}
          width={"100%"}
          height={"400px"}
          source={sources}
          columns={columnsConfig?.columns}
          altrows={true}
          columnsresize={true}
          {...(filterable && {
            filterable: true,
            showfilterrow: true,
            onFilter: handleOnFilter,
          })}
          onCellendedit={onCellendedit}
          autoupdate={true}
          columngroups={columnsGroupConfig ? columnsGroupConfig : columngroups}
        // rendergridrows={renderGridRows}
        />
      </div>
      {paging?.show != false && (
        <Pagination
          pagination={pagination}
          handlePaginationClick={handlePaginationClick}
          forced={false}
          onChangeItemPerPage={onChangeItemPerPage}
        />
      )}

      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
    </>
  );
}
interface ITableData {
  columnsConfig: any;
  columnsGroupConfig?: any;
  filterParams?: any;
  respDataApi: any;
  rowData: any;
  rowSelect?: boolean;
  rowSelectType?: string;
  selectedRows?: any;
  onCheckedRows?: any;
  filterable?: any;
  exportbtn?: any;
  infoLabels?: any[any];
  ForinfoLabels?: boolean;
  exportingOptions?: any;
  selected?: any;
  reloadbtn?: any; // memunculkan tombol reload
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
  editAble?: boolean;
}

interface IPaging {
  perPage?: any;
  show?: boolean;
  offset?: number;
  currentPage?: any;
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
