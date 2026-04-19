import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default function CardInfo({
  label,
  value,
  suffix,
  variant,
  height = '',
  fontSize = '2rem',
}: ICardInfo) {
  return (
    <>
      <Card
        bg={variant}
        key={variant}
        text={'white'}
        className='my-1'
        style={{ borderRadius: '0.7rem' }}
      >
        <Card.Body className='d-flex px-1' style={{ height: height }}>
          <BoxStatistic>
            <div className='d-flex justify-content-center font-weight-500 text-uppercase fs-6'>
              {label}
            </div>
            <div className={`d-flex justify-content-center `} style={{fontSize:fontSize}}>
              {value} <span className="suffix">
              {suffix}
              </span>
            </div>
          </BoxStatistic>
        </Card.Body>
      </Card>
    </>
  );
}

const BoxStatistic = styled.div`
  color: white;
  width:100%;
  text-align: center;
  align-items: center;
  margin:auto;
  .suffix{
    font-size: .65em;
    line-height: 2.5;
  }
`

interface ICardInfo {
  label?: string;
  variant?: string;
  value?: any;
  suffix?: any;
  height?: any;
  fontSize?: any;
}
