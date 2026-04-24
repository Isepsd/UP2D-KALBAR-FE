import React from 'react'
import { Col, Row } from 'react-bootstrap'

import CardSummarySubSistem from '@app/components/Card/CardSummarySubSistem'
import styled from 'styled-components'

const data: any = [
  {
    title: 'ISOLATED KOTABARU',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'ISOLATED KUALA KURUN',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'ISOLATED NANGA BULIK',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'ISOLATED PURUK CAHU',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'ISOLATED SUKAMARA',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'ISOLATED KUALA PEMBUANG',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'BARITO',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
  {
    title: 'TOTAL BEBAN KSKT',
    datas: [
      { name: 'BEBAN ', value: '.68', satuan: 'MW' },
      { name: 'TEGANGAN ', value: '20.55', satuan: 'MW' },
      { name: 'FREKUENSI ', value: '49.97', satuan: 'Hz' }
    ]
  },
]

const Text = styled.div`
  font-size: 11px;
  font-weight: 500;
`

function BebanSubSistem() {
  return (
    <Row>
      {
        data.map((item: any, index: number) => (
          <Col key={index} md={4} xs={12} className='mb-4'>
            <CardSummarySubSistem title={item.title}>
              {
                item.datas.map((d: any, idata: any) => (
                  <Row key={`${index}-${idata}`}>
                    <Col xs={4}><Text>{d.name}</Text></Col>
                    <Col xs={4}><Text>{d.value}</Text></Col>
                    <Col xs={4}><Text>{d.satuan}</Text></Col>
                  </Row>
                ))
              }
            </CardSummarySubSistem>
          </Col>
        ))
      }
    </Row>
  )
}

export default BebanSubSistem