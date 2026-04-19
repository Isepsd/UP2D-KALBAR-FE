import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

import { useApp } from '@app/context/AppContext';

export default function FilterActionButton({
  textSubmit = "Terapkan",
  loading,
  onClickReset,
  className = "justify-content-between",
  top = "mt-4"
}: IFilterActionButton) {
  const navigate = useNavigate()
  const location = useLocation()

  const { onClickSubmit } = useApp();

  const submitFilter = () => onClickSubmit(nanoid());

  const handleResetFilter = () => {
    navigate({ search: '' });
    submitFilter();
    
    if (onClickReset) onClickReset()
  }

  return (
    <Form.Group className={`${top} d-flex ${className}`}>
      <Button onClick={submitFilter} type='submit' variant='primary' className="me-2" disabled={loading}>
        {textSubmit}
      </Button>
      {onClickReset &&
        <Button type='button' variant='' onClick={handleResetFilter} disabled={location.search == ''}>
          Reset
        </Button>
      }

    </Form.Group>
  );
}

interface IFilterActionButton {
  loading?: boolean;
  onClickReset?: any
  textSubmit?: string
  className?: string
  top?: string
}
