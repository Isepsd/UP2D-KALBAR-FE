import React from 'react';

import { Card } from 'react-bootstrap';

interface IFilterCard {
  children?: any;
}

function CardFilter({
  children,
}: IFilterCard) {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Filter</Card.Title>
        </Card.Header>
        <Card.Body>
          {children &&
            { children }
          }
        </Card.Body>
      </Card>
    </>
  );
}

export default CardFilter;
