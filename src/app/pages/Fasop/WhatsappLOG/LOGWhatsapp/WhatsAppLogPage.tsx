import React, { useState, useEffect } from 'react';
// import { Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

/** CONFIG */
// import { IFasopTelegramLog } from '@app/interface/fasop-telegram-log.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import BadgeStatus from '@app/components/Status/BadgeStatus';
import { WHATSAPP_LOG_COLUMNS } from '@app/configs/react-table/fasop/whatsapp.column';
import { useSelector } from 'react-redux';
import Filter from './Filter';

export default function WhatsAppLogPage() {
    const { closeModal } = useSelector((state: any) => state.ui);
    // const navigate = useNavigate();

    /** DATA RESP */
    const [dataRows, setDataRows] = useState<any>([]);
    // const [dataSelected] = useState<any>();
    const [action, setAction] = useState<string>();

    const [columns, setColumns] = useState<any>(WHATSAPP_LOG_COLUMNS());
    const [dataColumns, setDataColumns] = useState<any>([]);

    const getColorLabel = (status: any) => {

        if (status == 0) {
            return { color: 'warning', label: 'Sedang dikirim ' }
        } else if (status == 1) {
            return { color: 'success', label: 'Terkirim ' }
        } else if (status == 2) {
            return { color: 'danger', label: 'Gagal dikirim ' }
        } else {
            return { color: 'default', label: 'Belum dikirim ' }
        }
    };

    /** MAP DATA FROM API RESPONSE */

    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                nama_chat: item?.kontak?.nama,
                id_wa_bot: item?.bot?.nama,

                datum_sent: item?.datum_sent,
                nama_bot: item?.bot?.nama,
                nama_kontak: item?.kontak?.nama,
                status_sent: (<span className={`w-100 badge badge-${getColorLabel(item?.status_sent).color}`}>{getColorLabel(item?.status_sent).label}</span>),
                pesan_error: item?.pesan_error,
                msg: (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: item?.msg?.replace(/\n/g, '<br />'),
                        }}
                    ></div>
                ),
                // action: (
                //     <Dropdown className='hide-toogle hide-focus'>
                //         <Dropdown.Toggle variant='light' id={`dropdown-act-${index}`}>
                //             <i className='fa fa-ellipsis-h font-weight-bold'></i>
                //         </Dropdown.Toggle>

                //         <Dropdown.Menu>
                //             <Dropdown.Item onClick={() => handleEdit(item)}>
                //                 Edit
                //             </Dropdown.Item>
                //             <Dropdown.Item
                //                 onClick={() => handleDelete(item)}
                //                 className='text-danger-hover'
                //             >
                //                 Delete
                //             </Dropdown.Item>
                //         </Dropdown.Menu>
                //     </Dropdown>
                // ),
            });
        });

        setDataRows(dataTableValue)
    }

    // /** DELETE HANDLING */
    // const handleDelete = (item: any) => {
    //     setDataSelected(item);
    //     setAction('delete')
    // };


    // /** EDIT HANDLING */
    // const handleEdit = (item: any) => {
    //     setDataSelected(item);
    //     setAction('edit')
    // };

    /** COLUMN SHOW HIDE EVENT HANDLE */
    useEffect(() => {
        const cols = columns?.filter(({ show }: any) => show === true);
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
            <div className='px-2 mt-2'>
                <Filter />
            </div>

            <TableDataListAction

                add={true}
                columns={columns}
                setColumns={setColumns}
            >

            </TableDataListAction>

            <TableData
                columnsConfig={dataColumns}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                path={API_PATH().master.fasop.whatsapp.log}
                primaryKey={'id'}
              
                filterParams={{
                    sort_by: "datum_sent",
                   
                }}
             
            ></TableData>
            
        </>
    );
}
