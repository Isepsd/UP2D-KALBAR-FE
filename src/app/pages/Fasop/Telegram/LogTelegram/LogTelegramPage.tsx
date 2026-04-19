import React, { useState, useEffect } from 'react';
import {  Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** CONFIG */
// import { IFasopTelegramLog } from '@app/interface/fasop-telegram-log.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { TELEGRAM_LOG_COLUMNS } from '@app/configs/react-table/fasop/telegram.column';
import { useSelector } from 'react-redux';
// import { timeFormat } from '@app/helper/time.helper';
import LogTelegramFilter from './LogTelegramFilter';

export default function LogTelegramPage() {
  const { closeModal } = useSelector( (state: any) => state.ui );
  const navigate = useNavigate();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  const [columns, setColumns] = useState<any>(TELEGRAM_LOG_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
 
  /** MAP DATA FROM API RESPONSE */

  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any, index: number) => {
      dataTableValue.push({
        number: item.number,
        msg: (
          <div
            dangerouslySetInnerHTML={{
              __html: item.msg.replace(/\n/g, '<br />'),
            }}
          ></div>
        ),
       
        id_chat: item.id_chat,
        nama_bot: item.bot?.nama,
        nama_chat: item.kontak?.nama,
        pesan_error: item.pesan_error,
        tgl_kirim: item.datum_sent,
        kirim_ulang: (
          <BadgeStatus
            status={item?.kirim_ulang}
            trueMsg='Ya'
            falseMsg='Tidak'
          ></BadgeStatus>
        ),
        status: <BadgeStatus status={item?.status}></BadgeStatus>,
        status_sent: (
          <BadgeStatus
            status={item?.status_sent}
            trueMsg='Terkirim'
            falseMsg='Gagal'
          ></BadgeStatus>
        ),
        action: (
          <Dropdown className='hide-toogle hide-focus'>
            <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
              <i className='fa-solid fa-ellipsis font-weight-bold'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => navigate(`detail/${item?.id_telegram_bot}`)}
              >
                Detail
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDelete(item)}
                className='text-danger-hover'
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      });
    });

    setDataRows(dataTableValue)
  }

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete')
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);
  
  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
        setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
      >
        <LogTelegramFilter />
      </TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.telegram.tel_log}
        primaryKey={'id'}
        action={action}
        selected={dataSelected}
        deleteConfirmation
        // filterParams={{ sort_by: 'datum_sent' }}
      ></TableData>
    </>
  );
}
