import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import LineChart from '@app/modules/Highcharts/LineChart'
import DaftarPengukuranBeban from '@app/modules/opsisdis/LaporanBeban/DaftarPengukuranBeban'

export default function LBTGrafikBebanSistemPage() {
  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>BEBAN SISTEM (MW) WILAYAH KALBAR</Card.Header>
            <Card.Body>
              <div className='position-relative' style={{height: '30vh'}}>
                <LineChart />
              </div>
            </Card.Body>
            <Card.Header className='text-uppercase mt-4'>DAFTAR PENGUKURAN BEBAN PENYULANG</Card.Header>
            <Card.Body>
              <DaftarPengukuranBeban />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
