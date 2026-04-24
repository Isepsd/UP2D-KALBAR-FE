import React, {  } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
// import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */
import {  BEBAN_EKSKURSI_COLUMN_JQWIDGET} from '@app/configs/jqwidget/laporan-beban-sistem-kehandalan.config';
import FilterFrekuensiKinerjaHarian from '@app/modules/opsisdis/TracingBeban/FilterFrekuensiKinerjaHarian';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBebanFrekbangka from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBebanFrekbangka';
// import { useSelector, } from 'react-redux';

// const customFilter = [{
//   search: "__ref_lokasi_gi",
//   field: "id_gardu_induk",
// }, {
//   search: "__ref_lokasi_penyulang",
//   field: "id_ref_lokasi_penyulang",
// }]

export default function BebanPenyulangPages() {
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );


  // useEffect(() => {
  //   if (
  //     activeFilters.filters?.id_ref_lokasi_gi &&
  //     activeFilters?.filters?.id_ref_lokasi_penyulang &&
  //     activeFilters.date
  //   ) {
  //     const formattedDate = activeFilters.date; // Assuming date is in the correct format

  //     fetch(`${API_PATH().opsisdis.laporan_beban.penyulang.jam}?date=${formattedDate}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Process the data here if needed, or perform any other actions
  //         console.log(data);
  //       })
  //       .catch((error) => console.error('Error:', error));
  //   }
  // }, [activeFilters]);

  return (
    <>
     
      <FilterFrekuensiKinerjaHarian
                
              
                    configFilter={[]}
                 
                  />
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Body>
              {/* {activeFilters.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_penyulang && ( */}
                <>
                  <ChartlaporanBebanFrekbangka
                     watchJenisKeterangan={'harian'}
                     path={API_PATH().opsisdis.laporan_beban.penyulang.tahunan}
                     format={'DD/MM/YYYY HH:mm'}
                
                  />

                </>
              {/* )} */}
            </Card.Body>
            {/* {activeFilters.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_penyulang && ( */}
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.tahunan} columnsConfig={BEBAN_EKSKURSI_COLUMN_JQWIDGET} primaryKey={''} tabActive={'beban_tahunan'} label="laporan beban penyulang" />
                    </Card.Body>
              </>
            {/* )} */}
          </Card>
        </Col>
      </Row>
    </>
  )
}
