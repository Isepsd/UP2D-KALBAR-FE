import { setCloseModal } from '@app/store/reducers/ui';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Icon = styled.div`
  font-size: 2rem;
`;
const Desc = styled.p`
  line-height: 1;
`;

type Props = {
  ModalNotifProps: any;
  callbackModalNotif: any;
};

const ModalNotif: FC<Props> = ({
  ModalNotifProps,
  callbackModalNotif,
}) => {
  const dispatch = useDispatch()
  const [ModalNotif, setModalNotif] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-solid fa-triangle-exclamation',
    description: 'Peringatan !',
    subDescriotion: `Peringatan data`,
    textButton: 'OK',
  });

  useEffect(() => {
    setModalNotif({ ...ModalNotifProps });
  }, [ModalNotifProps]);

  const ModalNotifDecline = () => {
    setModalNotif({ ...ModalNotif, show: false, approved: false });
    callbackModalNotif(false);
    dispatch(setCloseModal(moment()))
  };

  const modalClose = () => {
    setModalNotif({
      ...ModalNotif,
      show: false,
      approved: null,
    });
    callbackModalNotif(null);
  };

  return (
    <Modal
      className='confirm-delete'
      centered
      // backdrop='static'
      keyboard={false}
      size={ModalNotif.size || 'sm'}
      show={ModalNotif.show}
      onHide={modalClose}
    >
      <Modal.Body className='p-4 justify-content-center text-center'>
        <Icon className='text-muted'>
          <i className={ModalNotif.icon} />
        </Icon>
        <h5 className='my-2'>{ModalNotif.description}</h5>
        {ModalNotif.subDescriotion && (
          <Desc className='text-muted'>{ModalNotif.subDescriotion}</Desc>
        )}
        <div className=' mt-4'>
          <button className='btn me-2 btn-danger text-white' onClick={ModalNotifDecline}>
            {ModalNotif.textButton || 'OK'}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNotif;
