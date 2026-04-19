import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { ChangePasswordService } from '@app/services/auth.service'

function UserFormPasswword() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required('Password lama wajib diisi'),
    password: Yup.string().required('Password baru wajib diisi'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Konfirmasi password wajib diisi'),
  });

  const [formModel] = useState<any>({ status: 'active', gender: 'male' });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    const params = { ...data, id: id || currentUser?.id_user }
    updatePassword(params);
  };

  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** PUT / UPDATE DATA REQUEST */
  const updatePassword = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      await ChangePasswordService(params, id || currentUser?.id_user, source.token)
      setLoadingForm(false);
      setValue('old_password', '');
      setValue('password', '');
      setValue('password_confirmation', '');
      dispatchNotification(
        `Password berhasil diubah`,
        'success'
      );

      /** SCROLL TOP */
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      if (id) navigate(-1);
    } catch (err: any) {
      let errMsg = err?.response?.data?.message
      errMsg = errMsg == 'Old password is not correct' ? 'Password lama tidak valid' : 'Password gagal diganti'

      if (errMsg == 'Password lama tidak valid') {
        setError('old_password', {
          type: "manual",
          message: errMsg,
        })
      }

      setLoadingForm(false);
      dispatchNotification(
        errMsg,
        'danger'
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Row className='mb-3'>
          <Form.Group className='mb-3' controlId='old_password'>
            <Form.Label>Password Lama</Form.Label>
            <Form.Control
              {...register('old_password')}
              isInvalid={errors.old_password}
              type='password'
              placeholder='Password Lama'
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.old_password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId='password'>
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              {...register('password')}
              isInvalid={errors.password}
              type='password'
              placeholder='Password Baru'
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId='password_confirmation'>
            <Form.Label>Konfirmasi Password</Form.Label>
            <Form.Control
              {...register('password_confirmation')}
              isInvalid={errors.password_confirmation}
              type='password'
              placeholder='Konfirmasi Password Baru'
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.password_confirmation?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className='mt-4'>
          <Button type='submit' variant='primary'>
            Ubah Password
          </Button>
          {
            id && (
              <ButtonCancel />
            )
          }
        </Form.Group>
      </Form>
    </>
  )
}

export default UserFormPasswword