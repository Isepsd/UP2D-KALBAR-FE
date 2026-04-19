import React from 'react'
import { Col, Row } from 'react-bootstrap'

import CardSummary from '@app/components/Card/CardSummary'

const cardData: any = [
  { value: 376, sufixTitle: 'MW', secondTitle: 'TAHUN', classBgCard: 'bg-aqua' },
  { value: 7, sufixTitle: 'MW', secondTitle: 'BULAN', classBgCard: 'bg-danger' },
  { value: 24, sufixTitle: '', secondTitle: 'HARI', classBgCard: 'bg-success' },
]
function Rekap() {
  return (
    <Row>
      {
        cardData.map((item: any, index: number) => (
          <Col key={index} md={3} xs={12} className='mb-3 mb-md-0'>
            <CardSummary {...item} />
          </Col>
        ))
      }
    </Row>
  )
}

export default Rekap