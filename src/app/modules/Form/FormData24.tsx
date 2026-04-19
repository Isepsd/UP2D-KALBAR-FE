import { LABEL_DATA_24 } from '@app/configs/label-data-24';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface IFormData24 {
  // control?: any;
  // errors?: any;
  register: any;
}

function FormData24({ 
  register
}: IFormData24) {

  return (
    <>
      <Row>
        {Object.keys(LABEL_DATA_24()).map((item: any, index: number) =>
          <Col md={2} key={index}>
            <Form.Group className='mt-3' controlId={String(index)}>
              <Form.Label> {LABEL_DATA_24()[index]}</Form.Label>
              <Form.Control
                type='string'
                {...register(String(index))}
              />
            </Form.Group>
          </Col>
        )}
      </Row>
    </>
  );
}

export default FormData24;
