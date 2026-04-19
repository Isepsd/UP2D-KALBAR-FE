import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { putByPath } from '@app/services/main.service';

function ResetPasswordForm() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    new_password: Yup.string().min(8, 'Password minimal 8 karakter').required('Password baru wajib diisi').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Harus Mengandung huruf besar, huruf kecil, angka dan karakter simbol"
    )
  });

  const [formModel] = useState<any>({});
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchNewPassword = useWatch({ control, name: 'new_password' });

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
      await putByPath('users/reset-user-password', params, id || currentUser?.id_user, source.token)
      setLoadingForm(false);
      setValue('new_password', '');
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
          <Form.Group className='mb-3' controlId='new_password'>
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              {...register('new_password')}
              isInvalid={errors.new_password}
              type='password'
              placeholder='Password Baru'
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.new_password?.message}
            </Form.Control.Feedback>
            {
              (watchNewPassword && errors?.new_password?.message == undefined) &&
              <Badge bg='success' className='mt-2 text-white'><span dangerouslySetInnerHTML={{ __html: `<i class="fas fa-check-circle"></i>` }}></span> Kata sandi sangat kuat</Badge>
            }
          </Form.Group>
        </Row>
        <Form.Group className='mt-4'>
          <Button type='submit' variant='primary'>
            Reset Password
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

export default ResetPasswordForm