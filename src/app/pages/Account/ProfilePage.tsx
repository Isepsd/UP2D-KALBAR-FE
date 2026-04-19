import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import LazyImage from '@app/components/LazyLoad/LazyImage';

import UserFormChangePasswword from '@app/modules/Account/UserFormChangePasswword';

import { putByPath } from '@app/services/main.service';
import { uploadImage } from '@app/services/cdn-upload.service';
import { pick } from 'lodash';
import { getObjectKeys } from '@app/helper/object.helper';
import { UserField } from '@app/interface/user.interface';
import { setLoggedInUserDetail } from '@app/store/reducers/auth';
import { cdnUrl } from '@app/helper/cdn.helper';

export default function UsersFormPage() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);

  const refUploadFoto = useRef<any>();
  const refUploadSignature = useRef<any>();

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState({
    file: undefined,
    base64: null,
  });
  const [previewSignature, setPreviewSignature] = useState({
    file: undefined,
    base64: null,
  });


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname Wajib diisi'),
    username: Yup.string().required('Username Wajib diisi'),
    // password: Yup.string().required('Password Wajib diisi'),
    email: Yup.string().required('Email Wajib diisi'),
    phone: Yup.string().required('Phone Wajib diisi'),
    gender: Yup.string().required('Gender Wajib diisi'),
    nip: Yup.string().required('NIP Wajib diisi'),
    sap: Yup.string().required('SAP Wajib diisi'),
    signature: Yup.string().nullable(),
    password: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status: 'active', gender: 'L' });
  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    delete data.password;
    if (previewImage?.file || previewSignature?.file) {
      uploadImageCDN(data);
    } else {
      upsertData(data);
    }
  };

  useEffect(() => {
    initDataForm(pick(currentUser, getObjectKeys(UserField)));
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  const initDataForm = (valueData: any) => {
    Object.keys(valueData).map((field: any) => {
      const valueOrigin = valueData[field];
      let v = valueOrigin;
      setValue(field, v);
    });
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      const id_user = params.id_user;
      delete params.id_user;
      params.akses_login = 1;
      const reqUpdate: any = await putByPath(
        'users',
        params,
        id_user,
        source.token
      );
      setLoadingForm(false);
      dispatch(setLoggedInUserDetail(reqUpdate?.results));
      dispatchNotification(`Berhasil mengubah data profil user`, 'success');
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${params.id ? 'update' : 'add'} user`,
        'danger'
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const onChangeFoto = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader: any = new FileReader();
      reader.onload = () => {
        setPreviewImage((prevState: any) => ({
          ...prevState,
          base64: reader.result,
          file: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeSignature = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader: any = new FileReader();
      reader.onload = () => {
        setPreviewSignature((prevState: any) => ({
          ...prevState,
          base64: reader.result,
          file: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageCDN = async (data: any, type: string = "avatar") => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      if (previewImage?.file && type == "avatar") {
        const formData: any = new FormData();
        formData.append('file', previewImage?.file);
        formData.append('root', 'apd');
        formData.append('folder', 'user');
        // formData.append('prefix', type);

        const req = await uploadImage(formData, source.token);
        data[type] = req.data;
        if (previewSignature?.file) {
          uploadImageCDN(data, "signature")

        } else {
          upsertData(data);
        }
        dispatchNotification(`Success upload `, 'success');
      } else if (previewSignature?.file) {
        const formData: any = new FormData();
        formData.append('file', previewSignature?.file);
        formData.append('root', 'apd');
        formData.append('folder', 'user');
        // formData.append('prefix', 'signature');

        const req = await uploadImage(formData, source.token);
        data[type] = req.data;
        dispatchNotification(`Success upload `, 'success');
        upsertData(data);
      }

      // upsertData(data);
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(`Failed upload foto profile`, 'danger');
    }
  };

  // console.log("errors", errors);


  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-2 management-separator'>
          <div className='w-100 text-center mb-4'>
            <LazyImage
              src={
                previewImage.base64 ||
                cdnUrl(currentUser?.avatar)
              }
              alt=''
              width={157}
              height={157}
              className='img-thumbnail image-circle image-profile-user'
            />
            <div className='text-center mt-2'>
              <button
                onClick={() => refUploadFoto.current.click()}
                type='button'
                className='btn btn-link'
              >
                Change
              </button>
              <input
                ref={refUploadFoto}
                onChange={onChangeFoto}
                type='file'
                accept='image/png, image/jpg, image/jpeg'
                hidden
              />
            </div>
          </div>
          <div className='w-100 text-center mt-3'>
            <LazyImage
              src={
                previewSignature.base64 ||
                cdnUrl(currentUser?.signature)
              }
              alt=''
              width={157}
              height={157}
              className='img-thumbnail image-profile-user'
              defaultImage={'/static/signature.png'}
            />
            <div className='text-center mt-2'>
              <button
                onClick={() => refUploadSignature.current.click()}
                type='button'
                className='btn btn-link'
              >
                Change
              </button>
              <input
                ref={refUploadSignature}
                onChange={onChangeSignature}
                type='file'
                accept='image/png, image/jpg, image/jpeg'
                hidden
              />
            </div>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> General Info
            </h5>
            <hr />
            <div className='row'>
              <div className='col-12 col-md-11'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row className='mb-3'>
                    <Col sm>
                      <Form.Group className='mb-3' controlId='fullname'>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          {...register('fullname')}
                          isInvalid={errors.fullname}
                          type='text'
                          placeholder='Your Fullname'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.fullname?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm>
                      <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          {...register('username')}
                          isInvalid={errors.username}
                          type='text'
                          placeholder='Your Username'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.username?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col sm>
                      <Form.Group className='mb-3' controlId='phone'>
                        <Form.Label>No Kontak</Form.Label>
                        <Form.Control
                          {...register('phone')}
                          isInvalid={errors.phone}
                          type='tel'
                          placeholder='Your phone number +62'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.phone?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm>
                      <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          {...register('email')}
                          isInvalid={errors.email}
                          type='email'
                          placeholder='Your email address'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.email?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='nip'>
                      <Form.Label>NIP</Form.Label>
                      <Form.Control
                        {...register('nip')}
                        isInvalid={errors.nip}
                        type='text'
                        placeholder='Your NIP'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.nip?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='sap'>
                      <Form.Label>SAP</Form.Label>
                      <Form.Control
                        {...register('sap')}
                        isInvalid={errors.sap}
                        type='text'
                        placeholder='Your SAP'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.sap?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group>
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <div>
                      <Form.Check
                        {...register('gender')}
                        inline
                        type='radio'
                        value='L'
                        label='Laki-Laki'
                      />
                      <Form.Check
                        {...register('gender')}
                        inline
                        type='radio'
                        value='P'
                        label='Perempuan'
                      />
                    </div>
                    <Form.Control.Feedback type='invalid'>
                      {errors?.gender?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='signature' hidden>
                    <Form.Label>Signature</Form.Label>
                    <Form.Control
                      {...register('signature')}
                      isInvalid={errors.signature}
                      type='signature'
                      placeholder='Your Signature'
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.signature?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-4'>
                    <Button type='submit' variant='primary'>
                      Simpan
                    </Button>
                    <ButtonCancel />
                  </Form.Group>
                </Form>
              </div>
            </div>

            <h5 className='py-1 mt-5'>
              <i className='fa-solid fa-lock'></i> Password
            </h5>
            <hr />
            <div className='row'>
              <div className='col-12 col-md-11'>
                <UserFormChangePasswword />
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
