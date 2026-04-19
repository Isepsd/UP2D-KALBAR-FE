import React, { useRef } from 'react';

/** CONFIG */
import { MONITORING_GARDU_DETAIL_PAGE_JQX } from '@app/configs/react-table/apkt.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import ModalForm from "@app/components/Modals/ModalForm";


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';

export default function MonitoringGarduHistoriDetail({ filterParams }: any) {
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                id_scd_statusgardu: item?.id_scd_statusgardu,
                number: item?.number,
                datetime_awal: item?.datetime_status_1 ? moment(item.datetime_status_1).format("DD-MM-YYYY HH:mm:ss") : '-',
                status_awal: item?.status_awal,
                datetime_akhir: item?.datetime_status_2 ? moment(item.datetime_status_2).format("DD-MM-YYYY HH:mm:ss") : '-',
                status_akhir: item?.status_akhir,
                durasi: item?.durasi,
                // tanggal_buat: item.ext_user_token.created_at ? moment(item.created_at).format("DD-MM-YYYY HH:mm") : '-',
                
            });
        });
        return dataTableValue;
    }

    // const [modal, setModal] = useState<any>({
    //     approved: false,
    //     size: "lg",
    //     title: `Tambah Module`,
    //     id_scd_statusgardu: filterParams?.id_scd_statusgardu,
    // });

    // /** HANDLE ADD */
    // const handleAddClick = () => {
    //     setModal((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));
    // };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.point_number &&
                <TableDataJqxGridNew
                    //AKSI 
                    // addbtn={roleActions.create}
                    // onClickAdd={handleAddClick}
                    // deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().apkt.monitoring_gardu_status_detail}
                    filterParams={filterParams}
                    dataFieldsColsConfig={MONITORING_GARDU_DETAIL_PAGE_JQX()}
                    primaryKey={'point_number'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

        </>
    );
}
