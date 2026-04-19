import React, { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

type Props = {
  checked: boolean;
  defaultValue?: boolean,
  label: string;
  type?: any | 'checkbox';
  onChange: (value: any) => void;
};

const Check: FC<Props> = ({ checked, label, type = 'checkbox', onChange }) => {
  const [ID] = useState(uuidv4());
    const [value, setValue] = useState(checked);

    const handleOnChange = (event:any) => {
        setValue(event.target.checked);
    };

    useEffect(() => {
        if (value !== checked) {
            setValue(checked);
        }
    }, [checked]);

    useEffect(() => {
        if (onChange && value !== checked) {
            onChange(value);
        }
    }, [value]);

  return (
    <div className={`icheck-primary`}>
      <Form.Check
        type={type}
        id={ID}
        label={label}
        checked={value}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Check;