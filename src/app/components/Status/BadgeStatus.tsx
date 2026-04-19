import React from 'react';
import { Badge } from 'react-bootstrap';

export default function BadgeStatus({status, trueStatus=1, trueMsg='Aktif', falseMsg='Tidak Aktif'}:any) {
  // console.log(" stts ",status);
  
  return (
    <Badge bg={status == trueStatus ? `success` : `neutral text-white`}>
      {status == trueStatus ? trueMsg : falseMsg}
    </Badge>
  );
}
