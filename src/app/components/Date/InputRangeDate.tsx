import moment from "moment";
import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useWatch } from "react-hook-form";

export default function InputRangeDate({
  control,
  register,
  fieldNameStart = "tanggal_mulai",
  fieldNameEnd = "tanggal_akhir",
  type = "date"
}: IInputRangeDate) {
  const watchDateMulai = useWatch({ control, name: fieldNameStart });
  const watchDateAkhir = useWatch({ control, name: fieldNameEnd });
  return (
    <>
      <Form.Group>
        <Form.Label>Range Tanggal</Form.Label>
        <InputGroup>
          <FormControl
            {...register(fieldNameStart)}
            type={type}
            max={watchDateAkhir}
          />
          <InputGroup.Text>
            <i className='fa-solid fa-arrow-right'></i>
          </InputGroup.Text>
          <FormControl
            {...register(fieldNameEnd)}
            type={type}
            min={watchDateMulai}
            max={moment().format('YYYY-MM-DD')}
          />
        </InputGroup>
      </Form.Group>
    </>
  )
}

interface IInputRangeDate {
  control: any,
  register: any
  fieldNameStart?: any
  fieldNameEnd?: any
  type?: string
}