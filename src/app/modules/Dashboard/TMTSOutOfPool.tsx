import React, { useState } from 'react';
import TableData from '../Table/TableData';
import { API_PATH } from '@app/services/_path.service';
import { TMTS_OUT_OFF_FULL } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import CardWidget from '@app/components/Card/CardWidget';
import { get } from 'lodash';


export default function TMTSOutOfPool() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(TMTS_OUT_OFF_FULL());
  // const [center, setCenter] = useState<any>()

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];


    data?.forEach((item: any) => {
      // SET DATA WIDGET TABLE
      dataTableValue.push({
        ...item,
        key: item?.peralatan ? item?.peralatan : "-",
        durasi: item?.durasi ? item?.durasi : "-",
      });

      
    
    })

  
    setDataRows(dataTableValue)
  }

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.lat && selected?.lon) {
      
    }

  };

  return (
    <>
      <CardWidget title='DAFTAR KINERJA' classNameBody='p-0'>
        <TableData
          containerClass='table table-responsive'
          columnsConfig={columns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          primaryKey='pointtype'
          path={
            API_PATH().dashboard.kinerja_scada.kinerja_box.list_oop
          }
          paging={{ show: false }}
          styles={{ height: '41rem' }}
          onCheckedRows={handleSelectedRows}

          
        />


      </CardWidget>
    </>
  );
}
