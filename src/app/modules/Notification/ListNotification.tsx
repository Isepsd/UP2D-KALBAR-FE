import React, { FC } from 'react';
import styled from 'styled-components';

const WrapperNotif = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid var(--black-100);
  }
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`
const Name = styled.h5`
  font-size: 13px;
  font-weight: bold;
  font-family: 'Inter';
`;
const Desc = styled.p`
  font-weight: normal;
  font-family: 'Inter';
  line-height: 17px;
`;
const Time = styled.div`
  font-size: 13px;
  font-family: 'Inter';
`;

type Props = {
  assignFrom: string;
  action: string;
  taskComment: string;
  title: string;
  description: string;
  avatar: string;
  datetime: any;
};

const ListNotification: FC<Props> = ({
  assignFrom,
  action,
  title,
  taskComment,
  description,
  avatar,
  datetime,
}) => {
  return (
    <>
      <WrapperNotif className='d-flex mb-3 pb-3'>
        <i className='fas fa-circle text-primary me-1' style={{fontSize: 'x-small'}}></i>
        <Avatar src={avatar} />
        <div className='ps-3'>
          <Name>
            <span className='pe-2'>{assignFrom}</span>
            <span className='font-weight-500 pe-2'>{action}</span>
            <span>{taskComment}</span>
          </Name>
          <div className='font-weight-600'>{title}</div>
          <Desc>{description}</Desc>
          <Time className='text-muted d-flex'> <div className='text-capitalize badge-status-sm urgent me-2'>Urgent</div>
          <span>{datetime}</span></Time>
        </div>
      </WrapperNotif>
    </>
  );
};

export default ListNotification;
