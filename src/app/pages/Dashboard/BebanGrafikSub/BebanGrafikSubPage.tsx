import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import LineChart from '@app/modules/Highcharts/LineChart'
import TableGrafikSubSistem from '@app/modules/Dashboard/TableGrafikSubSistem'

export default function BebanGrafikSubPage() {
  return (
    <Row>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>GRAFIK BEBAN SUBSISTEM KSKT</Card.Header>
          <Card.Body>
            <div style={{height: '40vh'}}>
              <LineChart />
            </div>
            <TableGrafikSubSistem />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
