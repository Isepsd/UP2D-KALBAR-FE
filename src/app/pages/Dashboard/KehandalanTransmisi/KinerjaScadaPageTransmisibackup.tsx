import React, { useMemo, useState } from 'react';
import { Col, Row, } from 'react-bootstrap';

import GrafikKomulatifKinerjaTransmisi from '@app/modules/Dashboard/GrafikKomulatifKinerjaTransmisi';
// import TableData from "@app/modules/Table/TableData";
// import moment from 'moment';
// import StatisticKinerjaScada from '@app/modules/Dashboard/StatisticKinerjaScada';
// import { HIS_TRIP_COLUMNS } from '@app/configs/react-table/fasop/spectrum-history.column';
import {
 
  CONFIG_GRAFIK_KOMULATIF,CONFIG_GRAFIK_KOMULATIF2

} from '@app/configs/kinerja-scada.configKehandalan';
// import { timeFormatSec } from '@app/helper/time.helper';
// import { Badge } from 'react-bootstrap';
// import RTUOutOfPool from '@app/modules/Dashboard/RTUOutOfPool';
// import { API_PATH } from '@app/services/_path.service';
import { nanoid } from '@reduxjs/toolkit';
export default function KinerjaScadaPage() {

  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
  const [grafikKomulatif2] = useState<any>(CONFIG_GRAFIK_KOMULATIF2);
  // const [dataRows, setDataRows] = useState<any>([]);
  // const [showTable, setShowTable] = useState(false);
  // const [columns] = useState<any>(HIS_TRIP_COLUMNS());

  // Function to handle bar graph click and toggle table visibility
  // const handleBarGraphClick = () => {
  //   setShowTable(!showTable); // Toggle the value of showTable
  // };

  const renderGrafikKomulatif = useMemo(() => {
    return grafikKomulatif?.map((item: any) => {
      return (
        <div className='mb-2' key={nanoid()}>
          <GrafikKomulatifKinerjaTransmisi path={item?.path} title={item?.title} />
        </div>
      );
    });
  }, [grafikKomulatif]);

  const renderGrafikKomulatif2 = useMemo(() => {
    return grafikKomulatif2?.map((item: any) => {
      return (
        <div className='mb-2' key={nanoid()}>
          <GrafikKomulatifKinerjaTransmisi path={item?.path} title={item?.title}  />
        </div>
      );
    });
  }, [grafikKomulatif2]);

  // const tableComponent = showTable ? (
  //   <div>
  //     {/* Render your table component here */}
  //     {/* Replace with the code to display your table */}
  //     <p>This is your table.</p>
  //   </div>
  // ) : null;


  /** MAP DATA FROM API RESPONSE */
  // const handleRespDataApi = (data: any) => {
  //   let dataTableValue: any = [];
  //   data?.forEach((item: any) => {
  //     dataTableValue.push({
  //       ...item,
  //       b1: item?.path1,
  //       b2: item?.path2,
  //       b3: item?.path3,
  //       element: item?.path4,
  //       tanggal_awal: timeFormatSec(item.datum_1),
  //       tanggal_akhir: timeFormatSec(item.datum_2),
  //       // ocr: item?.ocr,
        
  //       status_beban:item?.i,
  //       status_ifr:item?.ifr,
  //       status_ifs: item?.ifs,
  //       status_ift:item?.ift,
  //       status_ifn: item?.ifn,
  //       status_ocr: (
  //         <Badge bg={item?.ocr === 1 ? 'success' : 'danger'} className="text-white">
  //           {item?.ocr === 1 ? 'ON' : 'OFF'}
  //         </Badge>
  //       ),
  //       status_gfr: (
  //         <Badge bg={item?.gfr === 1 ? 'success' : 'danger'} className="text-white">
  //           {item?.gfr === 1 ? 'ON' : 'OFF'}
  //         </Badge>
  //       ),
  //       cbtr: (
  //         <Badge bg={item?.cbtr === 1 ? 'success' : 'danger'} className="text-white">
  //           {item?.cbtr === 1 ? 'ON' : 'OFF'}
  //         </Badge>
  //       )
  //     });
  //   });

  //   setDataRows(dataTableValue)
  // }


  return (
    <>
      {/* KINERJA SCADA  */}
    
      <Row className='gx-2'>
        <Col md={6} className='mb-4'>
          {renderGrafikKomulatif}
        </Col>
        <Col md={6}>
        {renderGrafikKomulatif2}
        </Col>
      </Row>
      {/* {tableComponent} */}

      {/* <Card.Body>
      <TableData columnsConfig={columns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.history.trip} primaryKey={'id_his_trip'} filterParams={{
        datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
        sort_by: "datum_1",
        cek_trip:1 
      }} deleteConfirmation />
      </Card.Body> */}
    </>
  );
}
