import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'

import LineChart from '@app/modules/Highcharts/LineChart'
import BebanWilayah from '@app/modules/Dashboard/BebanWilayah'
import Rekap from '@app/modules/Dashboard/Rekap'

export default function BebanSistemPage() {
  return (
    <Row>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>BEBAN WILAYAH KALBAR</Card.Header>
          <Card.Body>
            <BebanWilayah />
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>REKAP KALBAR</Card.Header>
          <Card.Body>
            <Rekap />
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>FREKWENSI PEMBANGKIT</Card.Header>
          <Card.Body>
            <div className='position-relative' style={{height: '30vh'}}>
              <LineChart />
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>BEBAN SISTEM HARIAN (MW) WILAYAH KALBAR</Card.Header>
          <Card.Body>
            <div className='position-relative' style={{height: '30vh'}}>
              <LineChart />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
