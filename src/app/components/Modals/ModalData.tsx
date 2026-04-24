import { setCloseModal } from '@app/store/reducers/ui';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {  useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

type Props = {
  modalProps: any;
  callbackmodal?: any;
  children?: any;
  ids?: string;
  idsListen?: boolean;
  declineSubmited?: boolean;
};

const ModalData: FC<Props> = ({
  modalProps,
  callbackmodal,
  children,
  ids = 'id',
  idsListen=true,
  declineSubmited=true
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { callbackForm } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch()
  const id = searchParams.get(ids);

  const [modal, setModal] = useState<any>({
    show: id ? true : false,
    approved: false,
    size: modalProps?.size || 'sm',
    icon: '',
    title: 'Data',
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
    scrollable: false,
  });

  useEffect(() => {
    setModal({ ...modal, ...modalProps });
  }, [modalProps]);

  const modalDecline = () => {
    searchParams.delete(ids)
    setSearchParams(searchParams)
    setModal({ ...modal, show: false })
    dispatch(setCloseModal(moment()))
    if (callbackmodal) callbackmodal(false)
  };

  useEffect(() => {
    if(idsListen){
      if (id) {
        setModal({ ...modal, show: true, title:'Edit' });
      }else{
        setModal({ ...modal, show: false });
      }
    } 
  }, [id]);

  useEffect(() => {
    if(callbackForm && declineSubmited){
      modalDecline()
    }
  }, [callbackForm])
  

  return (
    <Modal
      className='confirm-delete'
      centered
      backdrop='static'
      keyboard={false}
      size={modal?.size || 'lg'}
      show={modal?.show}
      onHide={modalDecline}
      scrollable={modal?.scrollable}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modal?.title}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
};

export default ModalData;
