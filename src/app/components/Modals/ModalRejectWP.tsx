import React, { FC, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { putByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import moment from 'moment';

type Props = {
  modalRejectWPProps: any;
  callbackTrigger: any
};

const ModalRejectWP: FC<Props> = ({
  modalRejectWPProps,
  callbackTrigger
}) => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [modalRejectWP, setModalRejectWP] = useState<any>({
    show: false,
    approved: false,
    size: 'md',
    description: 'Reject WP',
    textApproved: 'Save',
    classApproved: 'primary',
    textDecline: 'Cancel',
    statusPersetujuan:0,
    data: undefined
  });
  const [loading, setLoading] = useState<boolean>();
  
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    keterangan_reject: Yup.string().required('Keterangan Wajib diisi'),
  });

  const [formModel] = useState<any>({});
  const {
    handleSubmit,
    register,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    // console.log(data);
    // console.log(modalRejectWP.data);

    const params = {
      ...data,
      status_persetujuan: modalRejectWP.statusPersetujuan,
      id_user_update: String(currentUser.id_user)
    }

    rejectDataWP(params)
  };

  useEffect(() => {
    setModalRejectWP({ ...modalRejectWPProps });
  }, [modalRejectWPProps]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, [])

  /** DELETE HANDLING */
  const rejectDataWP = async (params: any) => {
    setLoading(true);

    try {
      await putByPath(`${API_PATH().working_permit.online}/reject-wp`, params, modalRejectWP.data?.id_wp_online, source.token);
      callbackTrigger(moment().format('x'))
      dispatchNotification(`Sukses reject WP`, 'success');
      modalRejectWPAccept()
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal reject WP`, 'danger');
    }
  };

  const modalRejectWPDecline = () => {
    setModalRejectWP({ ...modalRejectWP, show: false });
  };

  const modalRejectWPAccept = () => {
    setModalRejectWP({
      ...modalRejectWP,
      show: false,
      approved: true,
    });
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Modal
        className='confirm-delete'
        centered
        backdrop='static'
        keyboard={false}
        size={modalRejectWP.size || 'sm'}
        show={modalRejectWP.show}
        onHide={modalRejectWPDecline}
      >
        <Modal.Header>
          <h5 className='my-2'>{modalRejectWP.description}</h5>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group>
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as={'textarea'} {...register('keterangan_reject')} isInvalid={errors.keterangan_reject} />
              <Form.Control.Feedback type='invalid'>{errors?.keterangan_reject?.message}</Form.Control.Feedback>
            </Form.Group>
            <div className='d-flex justify-content-between mt-4'>
              <button type='reset' className='btn me-2 w-50' onClick={modalRejectWPDecline}>
                {modalRejectWP.textDecline || 'No'}
              </button>
              <button type='submit'
                className={`btn btn-${modalRejectWP.classApproved} ms-2 w-50 text-white`}
              >
                {modalRejectWP.textApproved || 'Yes'}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalRejectWP;