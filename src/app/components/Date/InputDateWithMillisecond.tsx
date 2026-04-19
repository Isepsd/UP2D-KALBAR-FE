import React from "react";
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import {
  OPTION_JAM,
  OPTION_MINUTES,
  OPTION_SECOND,
} from '@app/configs/select-options/rekap_padam.select';
import { Col, Form, Row } from "react-bootstrap";

interface IInputDateWithMillisecond {
  control: any
  errors: any
  register: any
  label: string
  fieldDate: string
  fieldHours: string
  fieldMinutes: string
  fieldSecond: string
  fieldMilliSecond: string
}
export default function InputDateWithMillisecond({
  control,
  errors,
  register,
  label,
  fieldDate,
  fieldHours,
  fieldMinutes,
  fieldSecond,
  fieldMilliSecond
}: IInputDateWithMillisecond) {
  return (
    <Form.Group as={Row} className='mb-3'>
      <Form.Label column md={2}>{label}</Form.Label>
      <Col md={2}>
        <Form.Control
          type={'datetime'}
          {...register(fieldDate)}
          isInvalid={errors[fieldDate] as boolean | undefined}
          message={errors[fieldDate]?.message}
        />
        <Form.Control.Feedback type='invalid'>{errors[fieldDate]?.message}</Form.Control.Feedback>
      </Col>
      <Col md={2}>
        <SelectFormStatic
          control={control}
          errors={errors}
          fieldName={fieldHours}
          options={OPTION_JAM}
          placeholder="-"
        />
      </Col>
      <Col md={2}>
        <SelectFormStatic
          control={control}
          errors={errors}
          fieldName={fieldMinutes}
          options={OPTION_MINUTES}
          placeholder="-"
        />
      </Col>
      <Col md={2}>
        <SelectFormStatic
          control={control}
          errors={errors}
          fieldName={fieldSecond}
          placeholder="-"
          options={OPTION_SECOND}
        />
      </Col>
      <Col md={2}>
        <Form.Control
          type={'text'}
          {...register(fieldMilliSecond)}
          isInvalid={errors[fieldMilliSecond] as boolean | undefined}
          message={errors[fieldMilliSecond]?.message}
        />
        <Form.Control.Feedback type='invalid'>{errors[fieldMilliSecond]?.message}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}