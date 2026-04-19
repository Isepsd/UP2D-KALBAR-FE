import React from 'react'
import { Col, Row } from 'react-bootstrap'

import CardSummaryMap from '@app/components/Card/CardSummaryMap'

const cardData: any = [
  { value: 451.54, sufixTitle: 'Unit', secondTitle: 'Kantor', classBgCard: 'bg-dark-cyan' },
  { value: 5, sufixTitle: 'Unit', secondTitle: 'Gardu Induk', classBgCard: 'bg-accent' },
  { value: 5, sufixTitle: 'Unit', secondTitle: 'Gardu Hubung', classBgCard: 'bg-danger' },
  { value: 451.54, sufixTitle: 'Unit', secondTitle: 'Gardu Distribusi', classBgCard: 'bg-fear' },
  { value: 5, sufixTitle: 'Unit', secondTitle: 'Key Point', classBgCard: 'bg-yellow' },
  { value: 5, sufixTitle: 'Unit', secondTitle: 'FIOHL', classBgCard: 'bg-aqua' },
  { value: 5, sufixTitle: 'Unit', secondTitle: 'Tiang', classBgCard: 'bg-grey' },
]

function StatisticPetaGarduPadam() {
  return (
    <>
      <Row>
        {
          cardData.map((item: any, index: number) => (
            <Col key={index} md={12} xs={12} className='mb-2'>
              <CardSummaryMap {...item} btnDetail={false} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default StatisticPetaGarduPadam