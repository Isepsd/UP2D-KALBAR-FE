import React, { useState,useRef } from 'react';
/** CONFIG */
import { RTU_OUT_OFF_FULL_JQX } from '@app/configs/react-table/dashboard/kinerjaNew.cinfig';
import { API_PATH } from '@app/services/_path.service';
import CardWidget from '@app/components/Card/CardWidget';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

export default function RTUOutOfPool() {

  const dataSelected = useRef<any>();

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

   
    return dataTableValue;
  }

  /** HANDLE SELECTED ROWS */
  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
   
  }

  return (
    <>
 


      <CardWidget title='TOP 20 DURASI OOP RTU' classNameBody='p-0'>
        <TableDataJqxGridNew
          path={API_PATH().dashboard.kinerja_scada.kinerja_box.rtu_out__off_pool }
          dataFieldsColsConfig={RTU_OUT_OFF_FULL_JQX()}
            primaryKey={'pointtype'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
       
        />
      </CardWidget>
    </>
  );
}
