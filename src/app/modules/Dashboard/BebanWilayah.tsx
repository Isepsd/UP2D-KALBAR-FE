import React from 'react'
import { Col, Row } from 'react-bootstrap'

import CardSummary from '@app/components/Card/CardSummary'

const cardData: any = [
  { value: 451.54, sufixTitle: 'MW', secondTitle: 'BEBAN ONLINE', classBgCard: 'bg-aqua', routeDetail: '/dashboard/beban-sistem/beban-online' },
  { value: 5, sufixTitle: 'MW', secondTitle: 'BEBAN OFFLINE', classBgCard: 'bg-danger', routeDetail: '/dashboard/beban-sistem/beban-offline' },
  { value: 10, sufixTitle: '', secondTitle: 'PENYULANG TRIP', classBgCard: 'bg-success' },
  { value: 50.087, sufixTitle: 'Hz', secondTitle: 'FREKWENSI', classBgCard: 'bg-orange', routeDetail: '/dashboard/beban-sistem/frekwensi' }
]

function BebanWilayah() {
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

export default BebanWilayah