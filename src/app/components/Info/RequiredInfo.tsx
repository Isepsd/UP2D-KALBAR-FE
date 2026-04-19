import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  message?: string | 'Wajib diisi';
  placement?: any | 'auto';
  icon?: any | '';
}; /* could also use interface */

const RequiredInfo = ({ message='Wajib disi', placement='top', icon='' }: Props) => (
  <OverlayTrigger
    placement={placement}
    delay={{ show: 50, hide: 250 }}
    overlay={<Tooltip id='hover-tooltip'>{message}</Tooltip>}
  >
    {
      icon ? 
      <span><i className={icon}></i></span>:<span className='text-danger' style={{cursor: 'help'}}>*</span>
    }
    
  </OverlayTrigger>
);

export default RequiredInfo;
