import React, { useRef } from 'react';

/** CONFIG */
import { PENGIRIMAN_STATUS_LOG_GARDU_JQ } from '@app/configs/react-table/apkt.columns.config'
import { get} from 'lodash';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import RoleDetailForm from "./RoleDetailForm";
// import ModalForm from "@app/components/Modals/ModalForm";

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import moment from 'moment';

export default function RoleDetailPage({ filterParams ,roleActions}: ITreeJaringan) {
    let roleAccess = ROLE_ACCESS("monitoring-apkt");
     roleActions = {
        view: ROLE_ACTION(roleAccess, 'view'),
        create: ROLE_ACTION(roleAccess, 'create'),
        update: ROLE_ACTION(roleAccess, 'update'),
        delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    const dataRowsSelect= useRef <any>([])
    const dataSelected = useRef<any>();
    // const jenis_laporan =  filterParams.current?.jenis_laporan;
    // const status_laporan =  filterParams.current?.status_laporan;
    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            let status_apkt = "Belum Kirim"
            let color = "secondary"
            switch (item?.status_apkt_kirim) {
              case 1:
                status_apkt = "Sedang Kirim"
                color = "success"
                break;
              case 2:
                status_apkt = "Gagal Kirim"
                color = "danger"
                break;
            }
            dataTableValue.push({
                number:item?.number,
       
        segment: get(item, 'segment.nama_lokasi'),
        section: get(item, 'section.nama_lokasi'),
        zone: get(item, 'zone.nama_lokasi'),
        up3_1: get(item, 'up3_1.nama_lokasi'),
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: item?.tgl_laporan,
        tgl_mulai:item?.tgl_mulai,
        tgl_selesai:item?.tgl_selesai,
        tgl_padam: item?.tgl_padam,
        tgl_kirim_apkt: item?.tgl_apkt_kirim,
        tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
        tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
        status_data: (<span className={`w-100 badge badge-${item?.status_data ? 'success' : 'danger'}`}>{item?.status_data ? 'Nyala' : 'Padam'}</span>),
        webservice: item?.webservice,
        server_apkt: item?.server_apkt,
        input_apkt: item?.input_apkt,
        output_apkt: item?.output_apkt,
        status_kirim_apkt: (<span className={`w-100 badge badge-${color}`}>{status_apkt}</span>),
        gardu: get(item, 'gardu'),
                
            });
        });
        return dataTableValue;
    }

    // const [modal, setModal] = useState<any>({
    //     approved: false,
    //     size: "lg",
    //     title: `Tambah Module`,
    //     id_token: filterParams?.id_token,
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
        dataRowsSelect.current = data;
    }

    return (
        <>
         <div className='d-flex'>

            {/* <Button disabled={dataRowsSelect?.length == 0} className='me-2' onClick={onShowModal}>Update Tanggal Nyala</Button> */}

           
        </div>
            {filterParams?.ref_apkt_trans_jar &&
                <TableDataJqxGridNew
                    //AKSI 
                    addbtn={roleActions.create}
                    onClickAdd={roleActions.create}
                    deletebtn={roleActions.delete}

                    //TABLE DATA
                    path={API_PATH().apkt.trans_log}
                    filterParams={filterParams}
                    dataFieldsColsConfig={PENGIRIMAN_STATUS_LOG_GARDU_JQ()}
                    primaryKey={'id_apkt_trans_log'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

            {/* <ModalForm modalProps={modal}>
                <RoleDetailForm paramid={filterParams?.id_token} />
            </ModalForm> */}
        </>
    );
}


export interface ITreeJaringan {
    move?: boolean;
    rowSelect?: boolean;
    isUpdateNyala?: boolean;
    rowSelectType?: string;
    onCheckedRows?: any;
    dataSelected?: any;
    filterParams?: any;
    path?: any;
    event?: any;
    configColumns?: any;
    trigger?: any;
    roleActions?: any;
  }