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
  modalConfirmProps: any;
  callbackModalConfirm: any;
};

const ModalConfirm: FC<Props> = ({
  modalConfirmProps,
  callbackModalConfirm,
}) => {
  const dispatch = useDispatch()
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-trash-can',
    description: 'Delete this data',
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
  });

  useEffect(() => {
    setModalConfirm({ ...modalConfirmProps });
  }, [modalConfirmProps]);

  const modalConfirmDecline = () => {
    setModalConfirm({ ...modalConfirm, show: false, approved: false });
    callbackModalConfirm(false);
    dispatch(setCloseModal(moment()))
  };

  const modalConfirmAccept = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
      approved: true,
    });
    callbackModalConfirm(true);
  };

  const modalClose = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
      approved: null,
    });
    callbackModalConfirm(null);
  };

  return (
    <Modal
      className='confirm-delete'
      centered
      // backdrop='static'
      keyboard={false}
      size={modalConfirm.size || 'sm'}
      show={modalConfirm.show}
      onHide={modalClose}
    >
      <Modal.Body className='p-4'>
        <Icon className='text-muted'>
          <i className={modalConfirm.icon} />
        </Icon>
        <h5 className='my-2'>{modalConfirm.description}</h5>
        {modalConfirm.subDescriotion && (
          <Desc className='text-muted'>{modalConfirm.subDescriotion}</Desc>
        )}
        <div className='d-flex justify-content-between mt-4'>
          <button className='btn me-2 w-50' onClick={modalConfirmDecline}>
            {modalConfirm.textDecline || 'No'}
          </button>
          <button
            className={`btn btn-${modalConfirm.classApproved} ms-2 w-50 text-white`}
            onClick={modalConfirmAccept}
          >
            {modalConfirm.textApproved || 'Yes'}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
