import React, { useState } from 'react';
import TableData from '@app/modules/Table/TableData';
import { API_PATH } from '@app/services/_path.service';
import { RTU_OUT_OFF_FULL } from '@app/configs/react-table/dashboard/kinerjaNew.cinfig';
import CardWidget from '@app/components/Card/CardWidget';
import { get } from 'lodash';


export default function RTUOutOfPool() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(RTU_OUT_OFF_FULL());


  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    let dataMap: any = [];

    data?.forEach((item: any) => {
      // SET DATA WIDGET TABLE
      dataTableValue.push({
        ...item,
        key: item?.peralatan ? item?.peralatan : "-",
        durasi: item?.durasi ? item?.durasi : "-",
      });

      // SET DATA WIDGET MAP
      dataMap.push({
        latitude: item?.lat,
        longitude: item?.lon,
      })
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
 


      <CardWidget title='TOP 20 DURASI OOP RTU' classNameBody='p-0'>
        <TableData
          containerClass='table table-responsive'
          columnsConfig={columns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          primaryKey='pointtype'
          path={
            API_PATH().dashboard.kinerja_scada.kinerja_box.rtu_out__off_pool
          }
          paging={{ show: false }}
          styles={{ height: '41rem' }}
          onCheckedRows={handleSelectedRows}
          rowSelect={true}
          rowSelectType={'radio'}
        />
      </CardWidget>
    </>
  );
}
