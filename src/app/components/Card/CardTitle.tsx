import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export default function CardTitle({
  title,
  bg = 'bg-transparent',
  className = 'mb-3',
}: ICardTitle) {
  return (
    <>
      <Card className={className}>
        <Card.Header className={bg}>
          <div className='d-flex justify-content-center'>
            <CardTitleInfo>{title}</CardTitleInfo>
          </div>
        </Card.Header>
      </Card>
    </>
  );
}

const CardTitleInfo = styled(Card.Title)`
  font-size: 1.15rem;
  padding: .25rem 1rem;
  font-weight: 700;
`


interface ICardTitle{
  title:string;
  bg?:string;
  className?:string;
}