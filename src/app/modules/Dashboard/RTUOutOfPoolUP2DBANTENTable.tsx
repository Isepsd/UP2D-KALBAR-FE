import React, {  useRef } from 'react';

/** CONFIG */
import { RTU_OUT_FULL_JQX } from '@app/configs/react-table/dashboard/kinerjaNew.cinfig';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';



export default function StatRtuPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        nama_pointtype: item?.path3text,
        status: item?.status,
        tanggal: item?.tanggal,
        durasi: item?.durasi,
        kali_oop: item?.kali_oop,
        path1text: item?.path1text,
        path2text: item?.path2text,
        path3text: item?.path3text,
        

      });
    });
    return dataTableValue;
  }



  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
   
  }
  

  return (
    <>
          
    
          <TableDataJqxGridNew
            serachBar={true}
            //TABLE DATA
            path={API_PATH().dashboard_up2d_banten.mon_rtu_frek}
            filterParams={{ 
              id_induk_pointtype: '3d391819-4288-4699-80f4-7ebd5ae0d733',jenis:'RTU'}}
            dataFieldsColsConfig={RTU_OUT_FULL_JQX()}
            primaryKey={'id_pointtype'}
            respDataApi={handleRespDataApi}
            filterable={false}
            onRowSelected={handleCheckedRows}
            exportbtn={false}
            reloadbtn={false}
          />
        
    </>
  );
}