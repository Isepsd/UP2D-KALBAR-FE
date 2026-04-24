import React, { ReactNode } from 'react'
import { Card } from 'react-bootstrap'

type Props = { 
  children?: ReactNode,
  title: string
};

function CardSummarySubSistem({ children, title }: Props) {
  return (
    <Card style={{border: '1px solid darkturquoise', borderRadius: 0}}>
      <Card.Header style={{backgroundColor: 'darkturquoise', color: '#fff', fontSize: '13px', borderRadius: 0}}>{title}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

export default CardSummarySubSistem