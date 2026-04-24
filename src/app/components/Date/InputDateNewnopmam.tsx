import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  errors: any;
  register: any;
  type?: string;
  fieldName?: string;
  disabled?: boolean;
  step?: number;
  defaultValue?: string; // Added defaultValue as a prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
};

const InputDate: FC<Props> = ({
  errors,
  register,
  type = "date",
  fieldName = "date",
  disabled = false,
  step = 0,
  defaultValue, // Accept defaultValue as a prop
  onChange, // onChange prop
}) => {

  // Ensure defaultValue is in "YYYY-MM-DD" format
// Ubah function formatDate supaya handle datetime juga
const formatDate = (date: string | undefined) => {
  if (!date) return '';
  const d = new Date(date);

  if (type === "datetime-local") {
    // untuk datetime-local → butuh format "YYYY-MM-DDTHH:mm"
    return d.toISOString().slice(0,16); 
  }

  if (type === "time") {
    // untuk time → "HH:mm"
    return d.toISOString().slice(11,16);
  }

  return d.toISOString().split('T')[0]; // default date
};

  return (
    <div className={`icheck-primary`}>
      <Form.Control
        {...register(fieldName)}
        isInvalid={errors[fieldName] as boolean | undefined}
        type={type}
        disabled={disabled}
        step={step}
        defaultValue={formatDate(defaultValue)} // Apply formatted defaultValue
        onChange={onChange} // Pass onChange handler
      />
      <Form.Control.Feedback type='invalid'>
        {errors[fieldName]?.message}
      </Form.Control.Feedback>
    </div>
  );
}

export default InputDate;
