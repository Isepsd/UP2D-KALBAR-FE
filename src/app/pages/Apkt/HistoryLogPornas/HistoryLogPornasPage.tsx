import React, { useState, useEffect } from 'react';

/** CONFIG */
import { SCADATEL_HISTORI_LOG_APKT } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableDataNew';
import TableDataListAction from '@app/modules/Table/TableDataListAction copy';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
import ModalForm from '@app/components/Modals/ModalForm';
// import { Badge } from 'react-bootstrap';
// import Filter from './Filter';
// import CardWidget from '@app/components/Card/CardWidget';
import EventFormPagePayload from "./EventFormPagePayload"


export default function ShRTUPage() {
  /** DATA RESP */
  const { closeModal } = useSelector((state: any) => state.ui);
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected,setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [columns, setColumns] = useState<any>(SCADATEL_HISTORI_LOG_APKT());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [modallog, setModallog] = useState<any>({
    approved: false,
    size: 'lg',
    title: ``,
  });
/** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
      let dataTableValue: any = [];

      data?.forEach((item: any) => {
        // parse payload JSON
        let payloadObj;
        try {
          payloadObj = JSON.parse(item?.payload);
        } catch (e) {
          payloadObj = { data: [] };
        }

        payloadObj?.data?.forEach((d: any) => {
          dataTableValue.push({
            ...item,
            number: item?.number,
            transaction_id: item?.transaction_id,
            capture_at: item?.capture_at,

            // ambil description
            description: d?.description || "-",

            // ambil up/down time
            up_down_time: d?.up_time || d?.down_time || "-",

            // ambil status + kasih warna
      status: (
            <span
              className={`w-100 badge badge-${
                d?.status === "UP"
                  ? "success"
                  : "danger"
              }`}
            >
              {d?.status === "UP" ? "Nyala" : "Padam"}
            </span>
          ),

          payload: (
          <div className="d-flex gap-2">
           
             <button
                className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
                onClick={() => handleLog(item)}
              >
                <i className="fa fa-file-code"></i> Payload
              </button>

          
         
          </div>
        ),

          });
        });
      });

      setDataRows(dataTableValue);
    };

const handleLog = (item:any) => {
    setDataSelected(item.payload)
        setModallog((prevState: any) => ({
          ...prevState,
          show: true,
        }));
      };
  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
   
    setDataColumns(cols);
  }, [columns]);

    /** HANDLE CLOSE MODAL */
    useEffect(() => {
      if (closeModal && action) {
        setAction(undefined)
      }
    }, [closeModal])

  return (
    <>

{/* <CardWidget title='FILTER'>
        <Filter   />
      </CardWidget> */}

     
      <TableDataListAction 
        add={false} 
        columns={columns} 
        setColumns={setColumns} 
        filterLayout='card'
        title='LOG PORNAS'
      >
      
      </TableDataListAction>

      <TableData
      columnsConfig={dataColumns} 
      respDataApi={handleRespDataApi} 
      rowData={dataRows} 
      selected={dataSelected}
      action={action}
      primaryKey={'id_his'}
      path={API_PATH().apkt.log_pornas}
      filterParams={{ id_induk_pointtype: "3d391819-4288-4699-80f4-7ebd5ae0d733", kinerja: 1 }}
      deleteConfirmation
      pagingPresistance={false}
      />
 <ModalForm modalProps={modallog} ids='ids'>
         <EventFormPagePayload
         dataSelected =  {dataSelected}
         ></EventFormPagePayload>
 
 
 
       </ModalForm>
    </>

    
  );
  
}
