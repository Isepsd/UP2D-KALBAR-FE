import React, { useState, useEffect } from 'react';

/** CONFIG */
import { OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN ,OPSISDIS_DOKUMENHAR_COLUMN_JQ} from "@app/configs/react-table/opsisdis.column.config";

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { Tabs, Tab } from 'react-bootstrap';
import UsulanJadwalHarDetailFormPage from "./UsulanJadwalHarDetailFormPage"
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ModalForm from '@app/components/Modals/ModalForm';
import InputGarduForm from '../InputGarduForm';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import ModalFormWO from '@app/components/Modals/ModalFormWO';
import { timeFormatAlt } from '@app/helper/time.helper';


export default function FasJenisPointDetailPage({ filterParams }: any) {
  const { closeModal } = useSelector((state: any) => state.ui);
  let [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gardu'); // default tab
  /** DATA RESP */
  const [modalUpload, setModalUpload] = useState<any>({
    approved: false,
    size: "lg",
    title: `Upload Data`,
    show: false, // Pastikan ini ada
});


  const [dataRows, setDataRows] = useState<any>([]);
  const [dataRowsdok, setDataRowsdok] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [triggers, setTriggers] = useState<any>(null);
  const [roleActions, setRoleActions] = useState<any>({});
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [columns, setColumns] = useState<any>(OPSISDIS_USULAN_GARDU_PEMELIHARAAN_COLUMN());
  const [columnsdok, setColumnsdok] = useState<any>(OPSISDIS_DOKUMENHAR_COLUMN_JQ());
  const [dataColumnsdok, setDataColumnsdok] = useState<any>([]);


  // const [modalTambahPeralatan, setModalTambahPeralatan] = useState({
  //   show: false,
  //   size: 'xl',
  //   title: 'Pilih Jenis Pointtype Yang Akan Di Copy'
  // });
 
  /** MODAL JENIS POINT */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Jenis Point State`,
    trans_jadwal_har_id: filterParams?.trans_jadwal_har_id,
  });
  const handleEdit = (item: any) => {
    setDataSelected(item);
    setAction("edit.modal");
  };
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        action: (
          <div >
             {/* {roleActions?.update &&
                  <button
                  className="btn btn-primary me-2" // Apply primary style for Edit
                      onClick={() => handleEdit(item)}
                  >
                      Edit
                  </button>
              } */}
              {roleActions?.delete &&
                  <button
                  className="btn btn-danger"  // Apply danger style for Delete
                      onClick={() => handleDelete(item)}
                  >
                      Delete
                  </button>
              }
               </div>
        ),
        id: index + 1,
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

    setDataRows(dataTableValue);
  };
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApidok = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        action: (
          <div >
             {roleActions?.updatedok &&
                  <button
                  className="btn btn-primary me-2" // Apply primary style for Edit
                      onClick={() => handleEdit(item)}
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
               </div>
        ),
        id: index + 1,
    
        number: item?.number,
        trans_jadwal_har_id: item?.trans_jadwal_har_id,
        trans_jadwal_har_dok_id: item?.trans_jadwal_har_dok_id,
        nama_dok: item?.nama_dok,
        nama_file: item?.nama_file,
        created_at: `${timeFormatAlt(item?.created_at)}`,
       
      });
    });

    setDataRowsdok(dataTableValue);
  };

  /** DELETE HANDLING */
  // const handleDelete = (item: any) => {
  //   setDataSelected(item);
  //   setAction('delete');
  // };


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
  /** HANDLE ADD */
  const handleAddClick = () => {
    setDataSelected(undefined);
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  /** EDIT HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };


  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let colsdok: any = columnsdok?.filter(({ show }: any) => show === true);
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
    if (!roleAct?.delete && !roleAct?.updatedok) {
      cols = cols?.filter((item: any) => {
        return item?.accessor !== "action";
      });
    }
    setDataColumns(cols);  // Use the filtered cols here
  
    setDataColumnsdok(colsdok);
    if (!roleAct?.delete && !roleAct?.updatedok) {
      colsdok = colsdok?.filter((item: any) => {
        return item?.accessor !== "action";
      });
    }
    setDataColumnsdok(colsdok);
  }, [columns,columnsdok]);
  

  useEffect(() => {
    if (filterParams?.trans_jadwal_har_id) {
      setTriggers(
        filterParams?.trans_jadwal_har_id ? filterParams?.trans_jadwal_har_id : '0'
      );
    } else if (
      triggers &&
      filterParams?.trans_jadwal_har_id == null &&
      !searchParams.get('point_type')
    ) {
      setTriggers('0');
    }
  }, [filterParams?.trans_jadwal_har_id]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])
 
  // const handleAdd = () => {
  //   setModalTambahPeralatan((prevState) => ({
  //     ...prevState,
  //     show: true,
  //   }));
  // };
  // const handleClose = () => {
  //   setModalTambahPeralatan((prevState) => ({
  //     ...prevState,
  //     show: false,
  //   }));
  // };

  
  return (
    <>
      {/* {filterParams?.trans_jadwal_har_id && ( */}
        <>
         
   
          <div>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab:any) => setActiveTab(tab)}
        className="mb-3"
      >
        <Tab eventKey="gardu" title="Gardu Pemeliharaan">
        <TableDataListAction
                add={true}
                onClickAdd={handleUpload}
                columns={columns}
                setColumns={setColumns}
                module='Jenis Point State'
              />
          {activeTab === 'gardu' && filterParams?.trans_jadwal_har_id && (
            
            <TableData
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu} // Gardu endpoint
              primaryKey={'trans_jadwal_har_gardu_id'}
              action={action}
              selected={dataSelected}
              filterParams={
                filterParams?.trans_jadwal_har_id != null
                ? filterParams
                : { trans_jadwal_har_id: 0 }
              }
              trigger={triggers}
              ids={'ids'}
              pagingPresistance={true}
              module="Jenis Point State Gardu"
            />
          )}
        </Tab>
        <Tab eventKey="dok" title="Upload Dokumen">
        <TableDataListAction
                add={false}
                upload={true}
                onClickupload={handleAddClick}
                columns={columnsdok}
                setColumns={setColumnsdok}
                module='Jenis Point State'
              />
          {activeTab === 'dok' && (
            <TableData
              columnsConfig={dataColumnsdok}
              respDataApi={handleRespDataApidok}
              rowData={dataRowsdok}
              path={API_PATH().opsisdis.jadwal_pemeliharaan.dok} // Dok endpoint
              primaryKey={'trans_jadwal_har_dok_id'}
              action={action}
              selected={dataSelected}
              filterParams={
                filterParams?.trans_jadwal_har_id != null
                ? filterParams
                : { trans_jadwal_har_id: 0 }
              }
              trigger={triggers}
              ids={'ids'}
              pagingPresistance={true}
              module="Jenis Point State Dok"
            />
          )}
        </Tab>
      </Tabs>
    </div>
    
        </>
        <ModalForm modalProps={modalUpload} >
        <InputGarduForm></InputGarduForm>
      </ModalForm>
      {/* )} */}
       <ModalForm modalProps={modal} ids='ids'>
        <UsulanJadwalHarDetailFormPage
          // handleClose={handleClose}
          trans_jadwal_har_id={filterParams}
           handleClose={undefined}                />
              </ModalForm>
                   

 
    </>
  );
}
