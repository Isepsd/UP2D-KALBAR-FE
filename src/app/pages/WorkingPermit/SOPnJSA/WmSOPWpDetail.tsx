import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { WP_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';
import { Button } from 'react-bootstrap';
import BadgeStatus from '@app/components/Status/BadgeStatus';

export default function WmSOPWpDetail({ filterParams }: any) {
  let [searchParams] = useSearchParams();

  const [triggers, setTriggers] = useState<any>(null);
  
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(WP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        bagian: item?.bagian?.name,
        pekerja: (
          <Button variant='' size='sm'>
            Klik Nama Pekerja
          </Button>
        ),
        pengawas: item?.pengawas?.fullname,
        pengawask3: item?.pengawask3?.fullname,
        manuver: (
          <BadgeStatus status={item?.manuver} trueMsg="Ya" falseMsg="Tidak"></BadgeStatus>
        ),
        grounding: (
          <BadgeStatus status={item?.grounding} trueMsg="Ya" falseMsg="Tidak"></BadgeStatus>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);


  useEffect(() => {
    if(filterParams?.nomor_sop){
      setTriggers(filterParams?.nomor_sop ? filterParams?.nomor_sop : '-1')
    }
    else if(triggers && filterParams?.nomor_sop==null && !searchParams.get("sop")){
      setTriggers('0')
    }

  }, [filterParams?.nomor_sop]) 

  return (
    <>
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().working_permit.online}
        primaryKey={'id_wp_online'} 
        filterParams={filterParams?.nomor_sop!=null ? {...filterParams, sort_by:'tgl_update'}:{nomor_sop:-1, sort_by:'tgl_update'}}
        trigger={triggers}
        module={'Detail SOP JSA'}
      />
    </>
  );
}
