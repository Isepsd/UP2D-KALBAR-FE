import React from 'react';
import { Button } from 'react-bootstrap';

export default function ButtonSubmit({variant='primary', loading}:any) {
  return (
    <Button type='submit' variant={variant} disabled={loading}>
      Simpan
    </Button>
  );
}
