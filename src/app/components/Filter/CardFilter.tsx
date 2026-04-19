import React from 'react'
import { Card } from 'react-bootstrap';
interface ICardFilter {
  children: any,
  className?: string
}
export default function CardFilter({
  children,
  className = "card-widget mt-2 mb-2"
}: ICardFilter) {

  return (

    <Card className={className}>
      <Card.Header className='text-uppercase'>FILTER</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>

  )
}
