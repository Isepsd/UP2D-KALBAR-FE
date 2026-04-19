import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'

import LineChart from '@app/modules/Highcharts/LineChart'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 11px;
`
const Content = styled.div`
  font-size: 1.5em;
  margin-top: 5px;
  margin-bottom: 5px;
`
const Date = styled.div`
  font-size: 10px;
`
const CardStatistic = styled.div`
  text-align: center;
  padding: 10px 5px;
  &.realtime {
    background: #e6f2ff;
    color: #06A563;
  }
  &.min {
    background: #9CF3CF;
    color: #06A563;
  }
  &.max {
    background: #FDC6C6;
    color: #C53838;
  }
`

function DetailFrekwensiPage() {
  return (
    <Row>
      <Col md={12} className='mb-4'>
        <Card className='card-widget'>
          <Card.Header className='text-uppercase'>SISTEM</Card.Header>
          <Card.Body>
            <Row className='mb-3'>
              <Col md={8}>
                <Row>
                  <Col md={4} className='mb-3 mb-md-0'>
                    <CardStatistic className='card realtime'>
                      <Title>REALTIME</Title>
                      <Content>49.992 Hz</Content>
                      <Date>29-04-2022 15:10:55</Date>
                    </CardStatistic>
                  </Col>
                  <Col md={4} className='mb-3 mb-md-0'>
                    <CardStatistic className='card min'>
                      <Title>MIN</Title>
                      <Content>30.79 Hz</Content>
                      <Date>29-04-2022 15:10:55</Date>
                    </CardStatistic>
                  </Col>
                  <Col md={4} className='mb-3 mb-md-0'>
                    <CardStatistic className='card max'>
                      <Title>MAX</Title>
                      <Content>80.891 Hz</Content>
                      <Date>29-04-2022 15:10:55</Date>
                    </CardStatistic>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div style={{height: '50vh'}}>
              <LineChart />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default DetailFrekwensiPage