import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';
import RequiredInfo from '../Info/RequiredInfo';

const FormInputControlColumn: React.FC<{
  labelName: string;
  required?: boolean;
  placeholder?: string;
  as?: any;
  rows?: any;
  isInvalid: boolean | undefined;
  message: any;
  register: UseFormRegisterReturn;
  type?: 'text' | 'password' | 'number' | 'color' | 'email' | 'tel';
  className?: string;
  column1?: number;
  column2?: number;
  readOnly?: boolean
}> = ({
  labelName,
  required = false,
  placeholder,
  isInvalid,
  message,
  register,
  type = 'text',
  as = undefined,
  rows = undefined,
  className = 'mb-3',
  column1 = 4,
  column2 = 8,
  readOnly = false
}) => {
    return (
      <Form.Group as={Row} className={className}>
        <Form.Label className={`col-md-${column1} col-form-label`}>
          {labelName}
          {required && <RequiredInfo />}
        </Form.Label>
        <Col md={column2}>
          <Form.Control
            type={type ?? 'text'}
            {...register}
            as={as}
            rows={rows}
            isInvalid={isInvalid}
            placeholder={placeholder ?? ''}
            readOnly={readOnly}
          />
          <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>

        </Col>
      </Form.Group>
    );
  };

export default FormInputControlColumn;
