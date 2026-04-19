import React, { useRef } from 'react';

/** CONFIG */
import { MONITORING_GARDU_HISTORI_DETAIL_JQX } from '@app/configs/react-table/apkt.columns.config';

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
                point_number: item?.point_number,
                number: item?.number,
                msec: item?.msec,
                time_stamp: item?.time_stamp ? moment(item.time_stamp).format("DD-MM-YYYY HH:mm:ss") : '-',
                value: item?.value,
                source: item?.source, 
                quality_code_scada: item?.quality_code_scada,
                quality_code: item?.quality_code,
                system_time_stamp: item?.system_time_stamp ? moment(item.system_time_stamp).format("DD-MM-YYYY HH:mm:ss") : '-',
                system_msec: item?.system_msec
                
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

    /** HANDLE ADD */
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
                   
                    // onClickAdd={handleAddClick}
                   

                    //TABLE DATA
                    path={API_PATH().apkt.his_11_digitalt}
                    filterParams={filterParams}
                    dataFieldsColsConfig={MONITORING_GARDU_HISTORI_DETAIL_JQX()}
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
