import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import { MASTER_ROLES_TOKEN } from '@app/configs/react-table/master-opsisdis.columns.config';
import TableData from '@app/modules/Table/TableData';


// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FormSubmit from './FormSubmit';

import { setUFR } from '@app/store/reducers/ufr';
import { useDispatch } from 'react-redux';

export default function DaftarPenyulangUfrForm() {
  const dispatch = useDispatch();
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  // const [dataSelected, setDataSelected] = useState<any>([]);
  const [action] = useState<string>();
  const [dataColumns] = useState<any>(MASTER_ROLES_TOKEN());

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
       namamodule:item?.nama,
       id_module:item?.id_module
      });
    });

    setDataRows(dataTableValue);
  };

  const handleRowsSelected = (item: any) => {
    dispatch(setUFR(item));
  };

  return (
    <>
     
            
            <TableData
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={API_PATH().master.external.extmodule}
              primaryKey={'id_module'}
              action={action}
              // selected={dataSelected}
              onCheckedRows={handleRowsSelected}
              rowSelectType={'checkbox'}
              rowSelect={true}
              
            />
            {/* {dataSelected && dataSelected.length > 0 && */}
      
              <FormSubmit />
            
            {/* } */}
    
    </>
  );
}
