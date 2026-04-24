import React, { useState } from 'react';
import TableData from '../Table/TableData';
import { API_PATH } from '@app/services/_path.service';
import { RTU_OUT_OFF_FULL } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import CardWidget from '@app/components/Card/CardWidget';
import { get } from 'lodash';
import MapLocationLeaflet from '@app/components/Map/MapLocationLeaflet';
import PetaRTUPOOL from './PetaRTUPOOL';

export default function RTUOutOfPool() {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(RTU_OUT_OFF_FULL());
  const [dataMaps, setDataMaps] = useState<any>();
  const [center, setCenter] = useState<any>()

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

    setDataMaps(dataMap)
    setDataRows(dataTableValue)
  }

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.lat && selected?.lon) {
      setCenter(() => {
        return {
          latitude: selected?.lat,
          longitude: selected?.lon,
        }
      })
    }

  };

  return (
    <>
      {dataMaps &&
        <CardWidget title='MAP RTU OUT OF POOL' className='mb-2' classNameBody='p-0'>
          <div style={{ height: '20rem' }}>
            {/* <MapLocation items={dataMaps} latitude={dataSelected?.lat} longitude={dataSelected?.lon}/> */}
            <MapLocationLeaflet position={center}>
              <PetaRTUPOOL data={dataMaps} />
            </MapLocationLeaflet>
          </div>
        </CardWidget>
      }


      <CardWidget title='DAFTAR RTU OUT OF POOL' classNameBody='p-0'>
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
