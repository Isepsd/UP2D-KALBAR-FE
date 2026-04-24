import React, { useRef} from 'react';

/** CONFIG */
import { SCADATEL_DETAIL_WO_DRAFTING_GRID } from "@app/configs/react-table/fasop/scadatel-column-drafting";
import { cdnUrl } from '@app/helper/cdn.helper';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function MonitoringKinSpvDetailPageJQ({ filterParams }: any) {

    // const [roleActions, setRoleActions] = useState<any>({});
   
  //   useEffect(() => {
  //   let roleAccess = ROLE_ACCESS("pelaksanaan-wo");
  //   const roleAct = {
  //     upload: ROLE_ACTION(roleAccess, 'posting'),
  //     delete: ROLE_ACTION(roleAccess, 'delete'),
  //     update: ROLE_ACTION(roleAccess, 'update'),
   
  //   };
  //   setRoleActions(roleAct);
  //   console.log('roleAct', roleAct);
  // }, []);

    const dataSelected = useRef<any>();

    const id_modules = filterParams?.id_modules || null;
  

    const mergedFilterParams = {
   
     nama_bidang: id_modules,
     
      
   };
    /** MAP DATA FROM API RESPONSE */
const handleRespDataApi = (data: any) => {
  let dataTableValue: any = [];
  // Memfilter data berdasarkan filterParams
      data?.forEach((item: any) => {
        //   Saring item berdasarkan filterParams
          if ((filterParams.id_modules)) {
              dataTableValue.push({
           number: item?.number,
            id_trans_drafting_wo: item?.id_trans_drafting_wo,
            progres: item?.progres,
            no_wo: item?.no_wo,
            tgl_wo: item?.tgl_wo,
            uraian_wo: item?.uraian_wo,
            id_ref_kegiatan: item?.nama_kegiatan,
            id_ref_lokasi_up3: item?.nama_up3,
            nama_bidang: item?.nama_bidang,
            peralatan: item?.peralatan,
            jns_peralatan: item?.jns_peralatan,
            id_ref_lokasi_gi: item?.nama_gi,
            id_ref_lokasi_peralatan: item?.nama_peralatan,
            foto_sebelum: item?.foto_sebelum ? `<a href="${cdnUrl(item?.foto_sebelum)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${(item?.foto_sebelum)}</a>` : '',
            foto_sesudah: item?.foto_sesudah ? `<a href="${cdnUrl(item?.foto_sesudah)}" target="_blank" rel="noopener noreferrer" style="color: blue;">${(item?.foto_sesudah)}</a>` : '',
            id_user_created: item?.nama_user_created,
            approve_spv_scada: item?.approve_spv_scada,
            nama_spv_scada: item?.nama_spv_scada,
            approve_spv_data: item?.approve_spv_data,
            nama_spv_data: item?.nama_spv_data,
            approve_spv_opsis: item?.approve_spv_opsis,
            nama_spv_opsis: item?.nama_spv_opsis,
            posting_wo: item?.posting_wo
                });
          }
      });

  
  return dataTableValue;
};


    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
        
                <TableDataJqxGridNew
                
                   path={API_PATH().fasop.drafting.wo_drafting}
                    filterParams={ mergedFilterParams}
                    dataFieldsColsConfig={SCADATEL_DETAIL_WO_DRAFTING_GRID()}
                    primaryKey={'id_trans_drafting_wo'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
           
            
         
        </>
        
    );
}
