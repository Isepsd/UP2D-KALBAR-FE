import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import LazyImage from '@app/components/LazyLoad/LazyImage';

import {
  getAllByPath,
  getByIdPath,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import { uploadImage } from '@app/services/cdn-upload.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { cdnUrl } from '@app/helper/cdn.helper';

export default function UsersFormPage({ password = true }: any) {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();

  const refUploadFoto = useRef<any>();
  const refUploadSignature = useRef<any>();

  const [dataSelected, setDataSelected] = useState<any>();
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [roleOptions, setRoleOptions] = useState<any>([]);
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
    fullname: Yup.string().required(),
    username: password ? Yup.string().min(8, 'Minimal 6 Karakter').required() : Yup.string().nullable(),
    email: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    status: Yup.string().required(),
    gender: Yup.string().required(),
    nip: Yup.string().nullable(),
    sap: Yup.string().nullable(),
    about: Yup.string().nullable(),
    // roleId: Yup.number().min(1).typeError('Role Wajib diisi'),
    id_atasan: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_departement: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_jabatan: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    signature: Yup.string().nullable(),
    // id_perusahaan: Yup.string().required(),
    password: (id == undefined && password == true) ? Yup.string().min(8, 'Password minimal 8 karakter').required('Password baru wajib diisi').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Harus Mengandung huruf besar, huruf kecil, angka dan karakter simbol"
    ) : Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status: 'active', gender: 'L' });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState,
    setError
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchPassword = useWatch({ control, name: 'password' });

  // console.log(errors)
  const onSubmitForm = (data: any) => {
    if (previewImage.file) {
      uploadImageCDN(data);
    } else {
      data.username = data?.username == "" ? null : data.username
      upsertData(data);
    }
  };

  useEffect(() => {
    getDataRoleAll();
    if (id) getDataById();
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath('users', id, source.token);
      setDataSelected(req?.results);
      initDataForm(req?.results);
    } catch { }
  };

  /** GET ALL ROLE */
  const getDataRoleAll = async () => {
    const params = {
      sort_by: 'name',
      page: -1,
      limit: -1,
    };

    try {
      const req: any = await getAllByPath('roles', params, source.token);

      let response: any = req?.results || [];
      let data = response.map((d: any) => {
        return { ...d, label: d.name, value: d.id };
      });
      setRoleOptions(data);
    } catch {
      setRoleOptions([]);
    }
  };

  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        setValue(field, data[field]);
      });
    }
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    const id_user = params.id_user;

    try {
      if (params.id_user) delete params.password;

      id_user
        ? await putByPath('users', params, id_user, source.token)
        : await postByPath('users', params, source.token);
      setLoadingForm(false);
      navigate(-1);
      dispatchNotification(
        `Sukses ${id_user ? 'mengubah' : 'membuat'} user`,
        'success'
      );
    } catch (err: any) {
      const errValidation = err?.response?.data?.results;
      if (errValidation && err?.response?.data?.status == 400) {
        errorValidationHandling(errValidation);
      } else {
        dispatchNotification(
          `Gagal ${id_user ? 'mengubah' : 'membuat'} user`,
          'danger'
        );
      }
      setLoadingForm(false);
    }
  };


  const errorValidationHandling = (formInvalid: any) => {
    if (
      typeof formInvalid == 'object' &&
      formInvalid instanceof Array == false
    ) {
      Object.entries(formInvalid).forEach(([key, value]) => {
        const valueArr: any = value;
        setError(key, {
          type: 'manual',
          message: valueArr.join(' '),
        });
      });
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

  const uploadImageCDN = async (data: any,type: string = "avatar") => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      const formData: any = new FormData();
      formData.append('file', previewImage.file);
      formData.append('root', 'apd');
      formData.append('folder', 'user');
      formData.append('prefix', 'avatar');

      const req = await uploadImage(formData, source.token);
      dispatchNotification(`Suksesupload foto profile`, 'success');
      data.avatar = req.data;
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
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(`Failed upload foto profile`, 'danger');
    }
  };

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-2 management-separator'>
          <div className='w-100 text-center'>
            <LazyImage
              src={
                previewImage.base64 ||
                cdnUrl(dataSelected?.avatar)
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
                cdnUrl(dataSelected?.signature)
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
                    <Form.Group as={Col} controlId='fullname'>
                      <Form.Label>
                        Nama Lengkap <RequiredInfo />{' '}
                      </Form.Label>
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
                    {password !== false && (
                      <Form.Group as={Col}>
                        <Form.Label>
                          Username <RequiredInfo />
                        </Form.Label>
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
                    )}
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='phone'>
                      <Form.Label>Phone</Form.Label>
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
                    <Form.Group as={Col} controlId='email'>
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
                  <Row className='mb-3'>
                    <Form.Group as={Col}>
                      <Form.Label>Jabatan</Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_jabatan'
                        pathServiceName='master.admin_ksa.jabatan'
                        labelField='nama'
                        valueField='id_jabatan'
                        placeholder='Jabatan'
                        errors={errors}
                        control={control}
                      />
                    </Form.Group>
                    {/* <Form.Group as={Col}>
                      <Form.Label>
                        Perusahaan <RequiredInfo />
                      </Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_perusahaan'
                        pathServiceName='master.admin_ksa.perusahaan'
                        labelField='nama'
                        valueField='id_perusahaan'
                        placeholder='Perusahaan'
                        errors={errors}
                        control={control}
                      />
                    </Form.Group> */}
                  </Row>

                  <Row className='mb-3'>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>
                        Atasan
                      </Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_atasan'
                        pathServiceName='admin.user'
                        labelField='fullname'
                        valueField='id_user'
                        placeholder='Pilih...'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        queryParams={{
                          id_ref_jenis_lokasi: `${JENIS_LOKASI().uiw}`,
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>
                        Unit Kerja <RequiredInfo />
                      </Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_unit_lokasi'
                        pathServiceName='master.jaringan.ref_lokasi'
                        labelField='nama_lokasi'
                        valueField='id_ref_lokasi'
                        placeholder='Pilih...'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        required={true}
                        queryParams={{
                          id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uiw},${JENIS_LOKASI().uid
                            },${JENIS_LOKASI().ulp},${JENIS_LOKASI().up3},${JENIS_LOKASI().up2d
                            }`,
                        }}
                      />
                    </Form.Group>
                  </Row>

                  <Row className='mb-3'>
                    {password !== false && (
                      <Form.Group as={Col} controlId='phone'>
                        <Form.Label>Role</Form.Label>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name='roleId'
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder='Pilih Role'
                              styles={ReactSelectStyle}
                              classNamePrefix={`${errors.roleId ? 'is-invalid' : ''
                                }`}
                              inputRef={ref}
                              value={roleOptions?.filter(
                                (c: any) => c.value == value
                              )}
                              onChange={(val: any) => onChange(val?.value)}
                              options={roleOptions}
                            />
                          )}
                        />
                        {errors.roleId && (
                          <div className='invalid-feedback d-block'>
                            {errors.roleId?.message}
                          </div>
                        )}
                      </Form.Group>
                    )}
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col}>
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
                      {errors.gender && (
                        <div className='invalid-feedback d-block'>
                          {errors.gender?.message}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          {...register('status')}
                          inline
                          type='radio'
                          value='active'
                          label='Active'
                        />
                        <Form.Check
                          {...register('status')}
                          inline
                          type='radio'
                          value='inactive'
                          label='Inactive'
                        />
                      </div>
                      <Form.Control.Feedback type='invalid'>
                        {errors?.gender?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <hr />

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

                  {!dataSelected?.id_user && password !== false && (
                    <>
                      <hr />

                      <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          {...register('password')}
                          isInvalid={errors.password}
                          type='password'
                          value={'@qQxs9mHUamxw75H'}
                          placeholder='Your Password'
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors?.password?.message}
                        </Form.Control.Feedback>
                        {watchPassword &&
                          errors?.password?.message == undefined && (
                            <Badge bg='success' className='mt-2 text-white'>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: `<i class="fas fa-check-circle"></i>`,
                                }}
                              ></span>{' '}
                              Kata sandi sangat kuat
                            </Badge>
                          )}
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className='mt-4'>
                    <Button type='submit' variant='primary'>
                      Save
                    </Button>
                    <ButtonCancel />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
