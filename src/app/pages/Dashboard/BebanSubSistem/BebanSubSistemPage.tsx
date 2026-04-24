import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'

import BebanWilayah from '@app/modules/Dashboard/BebanWilayah'
import BebanSubSistem from '@app/modules/Dashboard/BebanSubSistem'

export default function BebanSubSistemPage() {
  return (
    <Row>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>REKAP BEBAN KSKT</Card.Header>
          <Card.Body>
            <BebanWilayah />
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>INFO BEBAN SUBSISTEM KSKT</Card.Header>
          <Card.Body>
            <BebanSubSistem />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
