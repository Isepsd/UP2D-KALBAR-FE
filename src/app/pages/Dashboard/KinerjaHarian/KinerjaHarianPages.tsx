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
import ChartlaporanBebanHarian from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBebanHarian';

export default function BebanPenyulangPages() {
 

  return (
    <>
    
      <FilterFrekuensiKinerjaHarian            
                    configFilter={[]}

                  />
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Body>
             
                <>
                  <ChartlaporanBebanHarian
                    watchJenisKeterangan={'harian'}
                    path={API_PATH().opsisdis.laporan_beban.penyulang.tahunan}
                    format={'DD/MM/YYYY HH:mm'}
                
                  />

                </>
         
            </Card.Body>
          
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.tahunan} columnsConfig={BEBAN_EKSKURSI_COLUMN_JQWIDGET} primaryKey={''} tabActive={'beban_tahunan'} label="laporan beban penyulang" />
                    </Card.Body>
              </>
           
          </Card>
        </Col>
      </Row>
    </>
  )
}
