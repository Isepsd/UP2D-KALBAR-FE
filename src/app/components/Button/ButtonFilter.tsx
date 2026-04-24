import TopBarLoader from '@app/components/Loader/TopBarLoader';
import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

export default function ButtonFilter({children}:any) {
  const [active, setActive] = useState<boolean>(false)
  return (
    <OverlayTrigger
      trigger='click'
      placement='bottom'
      overlay={
        <Popover className='hide-arrow' id='popover-filter'>
          <Popover.Header as='h3'>Filters</Popover.Header>
          <Popover.Body>
            <React.Suspense fallback={<TopBarLoader />}>
              {children}
            </React.Suspense>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant={`${active ? 'primary':'outline-primary'}`} className='position-relative' onClick={()=>setActive(!active)}>
        <i className='fas fa-caret-square-down'></i> Filters
        <span className='badge bg-secondary ms-2'>4</span>
      </Button>
    </OverlayTrigger>
  );
}
