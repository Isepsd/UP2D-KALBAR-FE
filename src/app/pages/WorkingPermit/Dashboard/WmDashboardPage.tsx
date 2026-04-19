import React from 'react';

import { Card, Col, Row } from 'react-bootstrap';
import WpStatistic from '@app/modules/WorkingManagement/WpStatistic';
import TablePekerjaan from './TablePekerjaan';

export default function WmDashboardPage() { 

  return (
    <>
     {/* STATISTIC  */}
     <Row>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>
              STATISTIK
            </Card.Header>
            <Card.Body>
              <WpStatistic />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* !!END STATISTIC  */}

      <TablePekerjaan></TablePekerjaan>
    </>
  );
}