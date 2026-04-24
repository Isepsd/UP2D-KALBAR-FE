import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactDOM from "react-dom/client";
// import * as ReactDOM from 'react-dom/client';
import { FormControl, InputGroup } from 'react-bootstrap';
// Jqwidgets
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxDropDownList from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import JqxWindow from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxwindow';
// import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { get, debounce } from 'lodash';
import { getAllByPath, putByPath, deleteByPath, getAllDownload } from '@app/services/main.service';
import fileDownload from 'js-file-download';
import axios from 'axios';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import moment from 'moment';


interface ITableDataJqxGridNew {
  dataFieldsColsConfig: any;
  path: any;
  dataSources?: any;
  filterParams?: any;
  primaryKey: any;
  selectionmode?: any;
  respDataApi: any;
  serachBar?: boolean;
  showtoolbar?: boolean;
  onRowSelected?: any;
  editable?: any;
  pageable?: any;
  filterable?: any;
  showHideCol?: any;
  ids?: any;
  onShowModal?: any;
  // ACTIONS BUTTON
  addbtn?: any; // memunculkan tombol add
  onClickAdd?: any; // event ketika add data ex: mumunculkan modal atau reedirect ke form page
  updatebtn?: any; // memunculkan tombol edit
  onClickUpdate?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  updatebtnJenisLap?: any; // memunculkan tombol edit
  onClickUpdateJenisLap?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  updatebtnNoApkt?: any
  onClickUpdateNoApkt?: any;
  updatebtnStatus?: any
  onClickUpdateStatus?: any
  deletebtn?: any; // memunculkan tombol delete
  reloadbtn?: any; // memunculkan tombol reload
  uploadbtn?: boolean; // memunculkan tombol upload
  onClickUpload?: any; // event ketika upload ex: mumunculkan modal atau reedirect ke form page
  exportbtn?: any; // memunculkan tombol export
  // roleActions?: any; // memunculkan tombol export
  autoheight?: any
  autorowheight?: any
  SetPrivilegesbtn?: any; // memunculkan tombol edit
  onClickSetPrivileges?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPassword?: any; // memunculkan tombol edit
  onClickSetPassword?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetView?: any; // memunculkan tombol edit
  onClickSetView?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPosting?: any; // memunculkan tombol edit
  onClickSetPosting?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetPelaksanaan?: any; // memunculkan tombol edit
  onClickSetPelaksanaan?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetUpload?: any; // memunculkan tombol edit
  onClickSetUpload?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page
  SetApprove?: any; // memunculkan tombol edit
  onClickSetApprove?: any; // event ketika Update ex: mumunculkan modal atau reedirect ke form page

}

const TableDataJqxGridNew: React.FC<ITableDataJqxGridNew> = React.memo(({
  dataFieldsColsConfig = [], path, showHideCol = false,
  dataSources, filterParams = {}, primaryKey,
  selectionmode = 'singlerow', respDataApi,
  serachBar = false, onRowSelected, pageable = true,
  editable = false, filterable = false, showtoolbar = true,
  addbtn = false, onClickAdd,
  updatebtn = false, onClickUpdate,
  updatebtnJenisLap = false, onClickUpdateJenisLap,
  updatebtnNoApkt = false, onClickUpdateNoApkt,
  updatebtnStatus = false, onClickUpdateStatus,
  deletebtn = false, exportbtn = true,
  uploadbtn = false, onShowModal,
  autoheight = true,
  autorowheight = true,

  SetPrivilegesbtn = false,
  onClickSetPrivileges = false, // event ketika Update ex: mumunculkan modal atau reedirect ke form page,
  SetPassword = false,
  onClickSetPassword = false,
  SetView = false,
  onClickSetView = false,
  SetPosting = false,
  onClickSetPosting = false,
  SetPelaksanaan = false,
  onClickSetPelaksanaan = false,
  SetUpload = false,
  onClickSetUpload = false,
  SetApprove = false,
  onClickSetApprove = false,
  reloadbtn = true, ids = 'id', // call virtual id for modals edit or something
}) => {
  const navigate = useNavigate();
  const sc = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);
  const [themeJqx] = useState<any>('light');
  const Grid = useRef<JqxGrid>(null);
  const toolbarRendered = useRef(false);
  const myWindow = useRef<JqxWindow>(null);
  const alertWindow = useRef<JqxWindow>(null);
  const dropDownList = useRef<JqxDropDownList>(null);
  // const jqxLoader = useRef<JqxLoader>(null);
  const [columns] = useState<IGridProps["columns"]>(dataFieldsColsConfig.columns);
  const [columngroups] = useState<IGridProps["columngroups"]>(dataFieldsColsConfig.columngroups);
  const rowsSelected = useRef<any>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let filtersRowParams: any = {}

  // const [source] = useState<any>({
  //   url: path,
  //   dataFields: dataFieldsColsConfig?.dataFields,
  //   id: primaryKey,
  //   datatype: 'json',
  //   root: 'results',
  //   cache: false,
  //   ...(dataSources ? dataSources : null),
  //   totalrecords: 0,
  //   beforeprocessing: (data: any) => {
  //     source.totalrecords = data.total;
  //   }
  // });


  const [source] = useState<any>(() => {
    const sourceObj: any = {
      dataFields: dataFieldsColsConfig?.dataFields,
      id: primaryKey,
      datatype: 'json',
      root: 'results',
      cache: false,
      totalrecords: 0,
      beforeprocessing: (data: any) => {
        sourceObj.totalrecords = data.total;
      }
    };

    if (dataSources) {
      sourceObj.localData = dataSources;
    } else {
      sourceObj.url = path;
    }

    return sourceObj;
  });

  const debouncedLoadServerData = debounce((serverdata, source, callback) => {
    const params = {
      page: serverdata.pagenum + 1,
      limit: serverdata.pagesize,
      sort_by: 'nama',
      ...filterParams,
      ...filtersRowParams
    };
  
    getAllByPath(path, params, sc.token)
      .then((response: any) => {
        const { results, total } = response;
        
        // Jika results memiliki properti rows, gunakan data dari rows, jika tidak, gunakan results langsung
        const data = results?.rows ? results.rows : Array.isArray(results) ? results : [];
        
        // Tentukan totalrecords: jika total tersedia, gunakan itu; jika tidak, gunakan panjang data
        const totalrecords = typeof total === 'number' ? total : data.length;

        // Modifikasi hasilnya dengan menambahkan nomor
        const modifiedResults = data.map((result: any, index: number) => ({
          ...result,
          number: index + serverdata.recordstartindex + 1
        }));
  
        // Panggil callback dengan hasil yang dimodifikasi dan total records
        callback({ records: respDataApi(modifiedResults), totalrecords });
      })
      .catch((error: any) => {
        // Tangani pesan kesalahan dan tampilkan notifikasi
        const message: string = error?.response?.data?.message || error?.response?.statusText || 'An error occurred';
        dispatchNotification(`${message}`, 'danger');
  
        // Panggil callback dengan hasil kosong jika ada kesalahan
        callback({ records: [], totalrecords: 0 });
      });
  }, 300); // 300ms debounce


  

  const dataAdapter = new jqx.dataAdapter(source, {
    loadServerData: (serverdata: any, source: any, callback: any) => {
      debouncedLoadServerData(serverdata, source, callback);
    },
  });

  const rendergridrows = (params: any): any => { return params.data; };
  // const handleBindingComplete = () => setLoading(false);

  const handleOnSort = (event: any) => {
    const sortinformation = event?.args?.sortinformation;
    let sortdirection = sortinformation?.sortdirection?.ascending ? "" : "-";
    if (!sortinformation.sortdirection.ascending && !sortinformation.sortdirection.descending) sortdirection = "null";
    if (sortdirection !== "null") {
      filterParams = { ...filterParams, sort_by: sortdirection + sortinformation?.sortcolumn };
    } else {
      delete filterParams.sort_by;
    }
    handleReloadData();
  };

  const handleRowSelectionsChange = () => {
    const selectedRowIndexes = Grid.current?.getselectedrowindexes();
    const rowCount: any = Grid.current?.getdatainformation().rowscount || 0;
    const checkedRows: any[] = [];
    const uncheckedRows: any[] = [];

    for (let i = 0; i < rowCount; i++) {
      const row: any = Grid.current?.getrowdata(i);
      if (row !== undefined) {
        if (selectedRowIndexes?.includes(i)) {
          checkedRows.push(row);
        } else {
          uncheckedRows.push(row);
        }
      }
    }

    checkedRows.forEach((row: any) => {
      if (!rowsSelected.current.some((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey])) {
        rowsSelected.current.push(row);
      }
    });

    uncheckedRows.forEach((row: any) => {
      const index = rowsSelected.current.findIndex((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey]);
      if (index !== -1) {
        rowsSelected.current.splice(index, 1);
      }
    });
    onRowSelected(rowsSelected);
  };

  const handleSingleRowSelect = (event: any) => {
    if (event) rowsSelected.current = event;
    onRowSelected(rowsSelected);
  }

  const handleRowsSelected = (event: any) => {
    if (selectionmode === 'checkbox') {
      handleRowSelectionsChange();
    } else {
      handleSingleRowSelect(event?.args.row);
    }
  }
  // const handleRowUnselect = (event: any) => {
  const handleRowUnselect = () => {
    if (selectionmode === 'checkbox') {
      handleRowSelectionsChange();
    } else {
      Grid.current?.clearselection();
    }
  }

  const handleOnCellendedit = (item: any) => {
    const { args } = item;
    if (args?.oldvalue != args?.value) {
      updateData(path, { [args?.datafield]: args?.value }, args?.row[primaryKey]);
    }
  }

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
            console.log(`Filter Value for Filter ${j} in Group ${i}:`, filterValue); // Log filter value

            if (typeof filterValue === 'boolean') {
              filterValue = filterValue ? 1 : 0;
            }
            queryParam = { ...queryParam, [filterGroup.filtercolumn]: filterValue };
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

    handleReloadData();
  };


  const handleSearch = (event: any) => {
    filterParams = { ...filterParams, page: 1, limit: 10, sort_by: 'nama', keyword: event.target.value };
    handleReloadData();
  };

  /** NOTIFICATION HANDLER */
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** EDIT DATA ON TABLE */
  const updateData = async (url: string, params: any, id: any) => {
    try {
      let req: any = await putByPath(`${url}`, params, id, sc.token);
      if (req?.status === 500) dispatchNotification(`${req?.message}`, 'danger');
      if (req?.status === 201) dispatchNotification(`${req?.message}`, 'success');
      // handleReloadData(); aktifkan jika akn refresh data setelah edit
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`${message}`, 'danger');
      setLoading(false);
    }
  }

  const listOnSelect = (event: any): void => {
    if (event.args) {
      const selectedItem = event.args.item;
      if (selectedItem.checked) {
        Grid.current?.showcolumn(selectedItem.value);
      } else {
        Grid.current?.hidecolumn(selectedItem.value);
      }
    }
  };

  /** MENU HANDLER & PRIVILAGES BY ACCES USER */
  const rendertoolbar = (toolbar: any) => {
    if (!toolbarRendered.current) {
      const buttonStyle: React.CSSProperties = {
        display: 'inline-block',
        marginLeft: '5px',
        // backgroundColor: '#0484cc', // #fff Warna dasar tombol #ff0e0e
        // color: '#fff', // Warna teks tombol
        border: 'none',
        borderRadius: '4px', // Membuat sudut tombol membulat
        cursor: 'pointer',
        transition: 'background-color 0.3s', // Transisi saat hover
      };

      const buttonsContainer = (
        <div style={{ overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', position: 'relative', margin: '5px' }}>
          {addbtn && (
            <JqxButton
              onClick={handleAddClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Tambah Data</span>
              <i className="fa-solid fa-plus"></i>
            </JqxButton>
          )}
          {SetUpload && (
            <JqxButton
              onClick={handleSetUploadClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> Upload</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {updatebtn && (
            <JqxButton
              onClick={handleEditClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Edit</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetPrivilegesbtn && (
            <JqxButton
              onClick={handleSetPrivilegesClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Set Privileges</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetPassword && (
            <JqxButton
              onClick={handleonClickSetPassword}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> Reset Password</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetView && (
            <JqxButton
              onClick={handleSetViewClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> View</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetApprove && (
            <JqxButton
              onClick={handleSetApproveClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> Approve</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetPelaksanaan && (
            <JqxButton
              onClick={handleSetPelaksanaanClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> Pelaksanaan</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {SetPosting && (
            <JqxButton
              onClick={handleSetPostingClick}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span> Posting</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          

          {updatebtnJenisLap && (
            <JqxButton
              onClick={handleEditClickJenisLap}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover

            >
              <span>Update Jenis Laporan</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {updatebtnNoApkt && (
            <JqxButton
              onClick={handleEditClickNoApkt}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Update No APKT</span>
              <i className="fa-solid fa-edit"></i>
            </JqxButton>
          )}
          {updatebtnStatus && (
            <JqxButton
              onClick={handleEditClickStatus}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#0484cc', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Update Status</span>
              <i className="fa-solid fa-edit"></i> Update Status
            </JqxButton>
          )}

          {deletebtn && (
            <JqxButton
              onClick={handleDeleteData}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#ff0e0e', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Delete</span>
              <i className="fa-solid fa-trash-can"></i>
            </JqxButton>
          )}
          {exportbtn && (
            <JqxButton
              onClick={() => getAllDataExport('xlsx')}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#5cb85c', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Export to Excel</span>
              <i className="fa-solid fa-file-excel"></i>
            </JqxButton>
          )}
          {exportbtn && (
            <JqxButton
              onClick={() => getAllDataExport('csv')}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#5cb85c', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Export to Csv</span>
              <i className="fa-solid fa-file-csv"></i>
            </JqxButton>
          )}
          {uploadbtn && (
            <JqxButton
              onClick={onShowModal}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Upload from Excel</span>
              <i className="fa-solid fa-upload"></i>
            </JqxButton>
          )}
          {filterable && (
            <JqxButton
              onClick={handleClearFilter}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Clear Filter</span>
              <i className="fa-solid fa-filter-circle-xmark"></i>
            </JqxButton>
          )}
          {reloadbtn && (
            <JqxButton
              onClick={handleReloadData}
              theme={themeJqx}
              width={120}
              height={20}
              style={{ ...buttonStyle, backgroundColor: '#808080', color: '#fff' }}
              className="jqx-button-custom" // Kelas CSS untuk efek hover
            >
              <span>Reload</span>
              <i className="fa-solid fa-rotate"></i>
            </JqxButton>
          )}
          {showHideCol && (
            <JqxDropDownList
              ref={dropDownList}
              theme={themeJqx}
              style={buttonStyle}
              onSelect={listOnSelect}
              width={200}
              height={30}
              source={dataFieldsColsConfig.columns}
              checkboxes={true}
              filterable={true}
              displayMember={'text'}
              valueMember={'datafield'}
              placeHolder='Show/Hide Columns'
            />
          )}
        </div>
      );

      ReactDOM.createRoot(toolbar[0]).render(buttonsContainer);
      toolbarRendered.current = true;
    }
  };

  /** AKSI REQUEST HANDLER */
  const deleteData = async () => {
    try {
      let req: any = await deleteByPath(path, rowsSelected.current[primaryKey], source.token);
      setLoading(false);
      dispatchNotification(`${req?.message}`, 'success');
      HideConfirmDelete();
      handleReloadData();
    } catch (error: any) {
      setLoading(false);
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`${message}`, 'danger');
    }
  };

  /** EXPORTING DATA */
  const getAllDataExport = async (export_type: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const filterParamUrl = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    const params = { page: -1, limit: -1, export: true, export_type: export_type, ...filterParams, ...filterParamUrl }
    // jqxLoader.current?.open();

    try {
      let req: any = await getAllDownload(path, params, source.token);
      /** RESET EXPORT */
      const dataBlob = req?.data;
      const headers = req?.headers;
      let content: string = headers['content-disposition'];
      const filename = content.replace('attachment; filename=', '').replaceAll('"', '');
      fileDownload(
        dataBlob,
        `${moment().format('YYYY-MM-DD HH_mm_ss')}_${filename.includes(export_type) ? filename : `${filename}.${export_type}`
        }`
      );
      // jqxLoader.current?.close();
    } catch (error: any) {
      let message: string = error?.response ? `, ${error?.response?.data?.message}` : error?.response?.data?.config?.statusText;
      dispatchNotification(`Gagal export / download data : ${message}`, 'danger');
      // jqxLoader.current?.close();
    }
  };

  /** HANDLE TAMBAH DATA */
  const handleAddClick = (e: any) => {
    if (onClickAdd) {
      onClickAdd(e);
    } else {
      const target = typeof addbtn == 'boolean' ? 'add' : addbtn;
      navigate(target);
    }
  };

  /** HANDLE EDIT DATA */
  const handleEditClick = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickUpdate) {
        onClickUpdate(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`edit/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };



  const handleEditClickNoApkt = (e: any) => {
    if (rowsSelected.current[primaryKey] !== null && rowsSelected.current[primaryKey] !== '') {
      if (onClickUpdateNoApkt) {
        onClickUpdateNoApkt(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`no_apkt/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };
  /** HANDLE EDIT DATA */
  const handleSetPrivilegesClick = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickSetPrivileges) {
        onClickSetPrivileges(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`settings/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };
  const handleSetViewClick = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickSetView) {
        onClickSetView(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`view/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };
  const handleSetPostingClick = (e: any) => {
    if (rowsSelected.current[primaryKey] ) {
      if (onClickSetPosting) {
        onClickSetPosting(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`posting/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };
  const handleSetPelaksanaanClick = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickSetPelaksanaan) {
        onClickSetPelaksanaan(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      }else {
        navigate(`pelaksanaan/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };
  const handleSetUploadClick = (e: any) => {
    if (onClickSetUpload) {
      onClickSetUpload(e);
    } else {
      const target = typeof addbtn == 'boolean' ? 'add' : addbtn;
      navigate(target);
    }
  };
  const handleSetApproveClick = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickSetApprove) {
        onClickSetApprove(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      }
      else {
        navigate(`approve/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };


  /** HANDLE EDIT DATA */
  const handleonClickSetPassword = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickSetPassword) {
        onClickSetPassword(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`set-password/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };


  const handleEditClickJenisLap = (e: any) => {
    if (rowsSelected.current[primaryKey] !== null && rowsSelected.current[primaryKey] !== '') {
      if (onClickUpdateJenisLap) {
        onClickUpdateJenisLap(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`jenis_laporan/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };

  const handleEditClickStatus = (e: any) => {
    if (rowsSelected.current[primaryKey]) {
      if (onClickUpdateStatus) {
        onClickUpdateStatus(e);
        searchParams.delete(ids);
        searchParams.append(ids, get(rowsSelected.current, primaryKey));
        setSearchParams(searchParams);
      } else {
        navigate(`edit/${rowsSelected.current[primaryKey]}`);
      }
    } else {
      ShowAlert();
    }
  };


  /** HANDLE DELETE DATA */
  const handleDeleteData = (): void => {
    if (rowsSelected.current[primaryKey]) {
      ShowConfirmDelete();
    } else {
      ShowAlert();
    }
  };

  /** HANDLE UPLOAD DATA */
  // const handleUploadClick = (e: any) => {
  //   if (onClickUpload) {
  //     onClickUpload(e);
  //   }
  // };

  const ShowConfirmDelete = (): void => {
    myWindow.current?.open();
  };
  const HideConfirmDelete = (): void => {
    myWindow.current?.hide();
  };

  const ShowAlert = (): void => {
    alertWindow.current?.open();
  };

  const handleReloadData = (): void => {
    Grid.current?.updatebounddata();
  };
  const handleClearFilter = (): void => {
    Grid.current?.clearfilters();
  };

  console.log('component TableDataJqxGridNew has rendered');



  return (
    <>
      <TopBarLoader isLoading={loading} />
      <div className='p-1'>
        {serachBar &&
          <InputGroup className='mb-2'>
            <InputGroup.Text id='search-wsp' style={{ background: 'var(--black-5)' }} >
              <i className='fa fa-search fa-fw'></i>
            </InputGroup.Text>
            <FormControl
              className='search ps-0'
              placeholder=' Cari...'
              aria-label=' Cari...'
              aria-describedby='search-wsp'
              onChange={handleSearch}
              style={{ background: 'var(--black-5)', borderLeft: 0 }}
            />
          </InputGroup>
        }

        {/* <JqxLoader ref={jqxLoader} width={60} height={60} theme={themeJqx} /> */}

        <JqxGrid
          ref={Grid}
          theme={themeJqx}
          width={"100%"}
          autoheight={autoheight}
          autorowheight={autorowheight}
          columnsresize={true}
          columnsreorder={true}
          columns={columns}
          columngroups={columngroups}
          source={dataAdapter}

          // Toolbar options
          {...(showtoolbar && {
            showtoolbar: true,
            rendertoolbar: rendertoolbar,
          })}

          // Filtering options
          {...(filterable && {
            filterable: true,
            showfilterrow: true,
            onFilter: handleOnFilter,
          })}

          // Paging Options
          pageable={pageable}
          // pagesizeoptions={['10', '25', '50', '100', '1000']}
          virtualmode={true}
          rendergridrows={rendergridrows}

          // Sorting event
          sortable={true}
          onSort={handleOnSort}

          /** selectionmode options
           * [rows] none, checkbox, single row, multiplerows, multiplerowsextended
           * [cells] singlecell, multiplecells, multiplecellsextended, multiplecellsadvanced */
          selectionmode={selectionmode}
          onRowselect={handleRowsSelected}
          onRowunselect={handleRowUnselect}

          // edit data event
          {...(editable && {
            editable: true,
            onCellendedit: handleOnCellendedit,
          })}
        />

        <JqxWindow
          ref={myWindow}
          width={350} minWidth={300} maxWidth={400}
          height={130} minHeight={100} maxHeight={180}
          animationType='fade' autoOpen={false} cancelButton={'.cancel'}
          okButton={'.ok'} resizable={true} isModal={true} modalOpacity={0.3}
          position={{ x: '40%', y: '40%' }} draggable={true} theme={themeJqx}
        >
          <div> <i className="fa-regular fa-circle-question me-2"></i> Konfirmasi delete </div>
          <div>
            <div> Apakah anda yakin ingin menghapus data ? <br /> Data yang dihapus tidak dapat dikembalikan! </div>
            <div style={{ float: 'right', marginTop: 15 }}>
              <div>
                <JqxButton className={'ok'} style={{ display: 'inline-block', marginRight: 10 }} width={80} value={'OK'} onClick={deleteData} theme={themeJqx} />
                <JqxButton className={'cancel'} style={{ display: 'inline-block' }} width={80} onClick={() => myWindow.current?.close()} value={'Cancel'} theme={themeJqx} />
              </div>
            </div>
          </div>
        </JqxWindow>

        <JqxWindow
          ref={alertWindow}
          width={350} minWidth={300} maxWidth={400}
          height={130} minHeight={100} maxHeight={180}
          animationType='fade' autoOpen={false} cancelButton={'.cancel'}
          okButton={'.ok'} resizable={true} isModal={true} modalOpacity={0.3}
          position={{ x: '40%', y: '40%' }} draggable={true} theme={themeJqx}
        >
          <div> <i className="fa-solid fa-triangle-exclamation"></i> Peringatan ! </div>
          <div>
            <div> Anda belum pilih data. <br /> Silahkan pilih data dulu pada table !. </div>
            <div style={{ float: 'right', marginTop: 15 }}>
              <div>
                <JqxButton className={'cancel'} style={{ display: 'inline-block' }} width={100} height={25} onClick={() => alertWindow.current?.close()} value={'OK. Mengerti'} theme={themeJqx} />
              </div>
            </div>
          </div>
        </JqxWindow>

      </div>
    </>
  );
});

export default TableDataJqxGridNew;