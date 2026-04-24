import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import LazyImage from '@app/components/LazyLoad/LazyImage';

import { getByIdPath, putByPath } from '@app/services/main.service';
import { first, pick } from 'lodash';
import { getObjectKeys } from '@app/helper/object.helper';
import { UserField } from '@app/interface/user.interface';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import {
  OPTIONS_LAYOUT,
  OPTIONS_DISPLAY_SCALE,
  OPTIONS_COLOR_SCHEME,
  OPTIONS_THEME_MODE,
} from '@app/configs/select-options.config';
import { FONTS_CONFIG } from '@app/configs/font.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import ImageUploadAlt from '@app/components/Upload/ImageUploadAlt';
import { cdnUrl } from '@app/helper/cdn.helper';
import { JSONtoString, stringToJSON } from '@app/helper/data.helper';
import { setApplication } from '@app/store/reducers/ui';

export default function ApplicationSettingsPage() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);

  const [layoutOptions] = useState<any>(OPTIONS_LAYOUT());
  const [themeModeOptions] = useState<any>(OPTIONS_THEME_MODE());
  const [fontOptions] = useState<any>(FONTS_CONFIG());
  const [colorOptions] = useState<any>(OPTIONS_COLOR_SCHEME());
  const [displayScaleOptions] = useState<any>(OPTIONS_DISPLAY_SCALE());

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<any>();
  const [previewImageLogo, setPreviewImageLogo] = useState({
    file: undefined,
    base64: null,
  });

  const [previewImageFavicon, setPreviewImageFavicon] = useState({
    file: undefined,
    base64: null,
  });

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    app_name: Yup.string().required('Sub Nama aplikasi wajib di isi'),
    app_sub_name: Yup.string().required('Nama aplikasi wajib di isi'),
    company: Yup.string().required('Nama perusahaan wajib di isi'),
    layout: Yup.string().required('Layout belum dipilih'),
    colors: Yup.string().required('Tema Warna belum dipilih'),
    theme_mode: Yup.string().required('Theme mode belum dipilih'),
    font: Yup.string().required('Font belum dipilih'),
    scaling: Yup.string().required('Display scaling belum dipilih'),
    email_use_tls: Yup.string().required('Display scaling belum dipilih'),
    email_host: Yup.string().nullable(),
    email_host_user: Yup.string().nullable(),
    email_host_password: Yup.string().nullable(),
    email_port: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
    max_change_life: Yup.number().typeError("Batas ubah password tidak valid").required("Batas ubah password wajib diisi"),
    rupiah: Yup.number().typeError("Default Rupiah tidak valid").required("Default Rupiah wajib diisi"),
    def_pengukuran_teg_sekunder: Yup.number().typeError("Default Pengukuran Tegangan Sekunder tidak valid").required("Default Pengukuran Tegangan Sekunder wajib diisi"),
    def_pengukuran_teg_primer: Yup.number().typeError("Default Pengukuran Tegangan Primer tidak valid").required("Default Pengukuran Tegangan Primer wajib diisi"),
    def_nilai_cosq: Yup.number().typeError("Default Nilai COSQ tidak valid").required("Default Nilai COSQ wajib diisi"),
  });

  const [formModel] = useState<any>({ def_generate_time: '60', status: 'active', gender: 'L' });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchLogo = useWatch({ control, name: 'logo' });
  const watchFavicon = useWatch({ control, name: 'favicon' });
  const watchEmailTls = useWatch({ control, name: 'email_use_tls' });

  const onSubmitForm = (data: any) => {
    if (previewImageLogo.file || previewImageFavicon.file) {
      setUploadingImage(data);
    } else {
      data.font = JSONtoString(
        first(fontOptions.filter((f: any) => f?.value == data?.font))
      );
      upsertData(data);
    }
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(
        'application-setting',
        process.env.APP_ID,
        source.token
      );
      initForm(req?.results);
    } catch { }
  };

  const initForm = (app: any) => {
    if (app) {
      Object.keys(app).map((field: any) => {
        switch (field) {
          case 'font':
            const fontParse: any = stringToJSON(app[field]);
            setValue('font', fontParse?.value);
            break;
          case 'def_generate_time':
            setValue('def_generate_time', String(app[field]));
            break;
          default:
            setValue(field, app[field]);
            break;
        }
      });
    }
  };

  useEffect(() => {
    getDataById();

    return () => {
      source.cancel();
    };
  }, []);

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
      const id_app = params.id_app;
      delete params.id_app;
      await putByPath('application-setting', params, id_app, source.token);
      setLoadingForm(false);
      dispatchNotification(`Berhasil mengubah data profil user`, 'success');
      dispatch(setApplication(params));

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        {/* LEFT SIDE  */}
        <div className='col-md-2 management-separator'>
          {/* LOGO  */}
          <div className='w-100 text-center'>
            <LazyImage
              src={previewImageLogo.base64 || `${cdnUrl(watchLogo)}`}
              alt=''
              width={157}
              height={157}
              defaultImage='/static/logo.svg'
              className='img-thumbnail image-circle image-profile-user'
            />
            <p className='text-center'>Logo</p>
            <div className='text-center mt-2'>
              <ImageUploadAlt
                fieldName={'avatar'}
                upsertData={upsertData}
                uploadingImage={uploadingImage}
                previewResults={(v: any) => {
                  setPreviewImageLogo(v);
                  setUploadingImage(undefined);
                }}
              />
            </div>
          </div>

          {/* FAVICON  */}
          <div className='w-100 text-center mt-4'>
            <LazyImage
              src={previewImageFavicon.base64 || `${cdnUrl(watchFavicon)}`}
              alt=''
              width={64}
              height={64}
              defaultImage='/static/logo.svg'
              className='img-thumbnail image-circle'
            />
            <p className='text-center'>Favicon</p>
            <div className='text-center mt-2'>
              <ImageUploadAlt
                fieldName='favicon'
                upsertData={upsertData}
                uploadingImage={uploadingImage}
                previewResults={(v: any) => {
                  setPreviewImageFavicon(v);
                  setUploadingImage(undefined);
                }}
              />
            </div>
          </div>
        </div>
        {/* !END LEFT SIDE  */}

        {/* RIGHT SIDE  */}
        <div className='col-md-8'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> General Info
            </h5>
            <hr />
            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
              <div className='row'>
                <div className='col-12 col-md-11'>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='app_name'>
                      <Form.Label>
                        Nama Aplikasi <RequiredInfo />
                      </Form.Label>
                      <Form.Control
                        {...register('app_name')}
                        isInvalid={errors.app_name}
                        type='text'
                        placeholder='Nama aplikasi'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.app_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Sub Nama Aplikasi</Form.Label>
                      <Form.Control
                        {...register('app_sub_name')}
                        isInvalid={errors.app_sub_name}
                        type='text'
                        placeholder='Sub Nama Aplikasi'
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.app_sub_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3' controlId='company'>
                    <Form.Label>
                      Nama Perusahaan <RequiredInfo />
                    </Form.Label>
                    <Form.Control
                      {...register('company')}
                      isInvalid={errors.company}
                      type='text'
                      placeholder='Nama perusahaan'
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.company?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tentang aplikasi</Form.Label>
                    <Form.Control
                      as='textarea'
                      {...register('description')}
                      isInvalid={errors.description}
                      type='text'
                      placeholder='Tentang aplikasi'
                      style={{ height: '100px' }}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.description?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <h5 className='py-1 mt-5'>
                    <i className='fa-solid fa-swatchbook'></i> Styling
                  </h5>
                  <hr />
                  <Form.Group className='mb-3' controlId='layout'>
                    <Form.Label>
                      Tema Layout <RequiredInfo />
                    </Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='layout'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Pilih tema layout'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.layout ? 'is-invalid' : ''
                            }`}
                          inputRef={ref}
                          value={layoutOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={layoutOptions}
                        />
                      )}
                    />
                    {errors.layout && (
                      <div className='invalid-feedback d-block'>
                        {errors.layout?.message}
                      </div>
                    )}
                  </Form.Group>
                  <Row className='mb-3'>
                    <Form.Group as={Col} className='mb-3' controlId='colors'>
                      <Form.Label>
                        Tema Warna <RequiredInfo />
                      </Form.Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name='colors'
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            placeholder='Pilih tema warna'
                            styles={ReactSelectStyle}
                            classNamePrefix={`${errors.colors ? 'is-invalid' : ''
                              }`}
                            inputRef={ref}
                            value={colorOptions.filter(
                              (c: any) => c.value == value
                            )}
                            onChange={(val: any) => onChange(val?.value)}
                            options={colorOptions}
                          />
                        )}
                      />
                      {errors.colors && (
                        <div className='invalid-feedback d-block'>
                          {errors.colors?.message}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3' controlId='colors'>
                      <Form.Label>
                        Mode Tampilan (Default) <RequiredInfo />
                      </Form.Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name='theme_mode'
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            placeholder='Pilih tema warna'
                            styles={ReactSelectStyle}
                            classNamePrefix={`${errors.theme_mode ? 'is-invalid' : ''
                              }`}
                            inputRef={ref}
                            value={themeModeOptions.filter(
                              (c: any) => c.value == value
                            )}
                            onChange={(val: any) => onChange(val?.value)}
                            options={themeModeOptions}
                          />
                        )}
                      />
                      {errors.theme_mode && (
                        <div className='invalid-feedback d-block'>
                          {errors.theme_mode?.message}
                        </div>
                      )}
                    </Form.Group>
                  </Row>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Display Scale <RequiredInfo />
                    </Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='scaling'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Pilih display scaling'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.scaling ? 'is-invalid' : ''
                            }`}
                          inputRef={ref}
                          value={displayScaleOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={displayScaleOptions}
                        />
                      )}
                    />
                    {errors.scaling && (
                      <div className='invalid-feedback d-block'>
                        {errors.scaling?.message}
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className='row'>
                <div className='col-12 col-md-11'>
                  <Form.Group>
                    <Form.Label>
                      Font <RequiredInfo />
                    </Form.Label>
                    <Controller
                      control={control}
                      defaultValue={''}
                      name='font'
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          placeholder='Font Family'
                          styles={ReactSelectStyle}
                          classNamePrefix={`${errors.font ? 'is-invalid' : ''}`}
                          inputRef={ref}
                          value={fontOptions.filter(
                            (c: any) => c.value == value
                          )}
                          onChange={(val: any) => onChange(val?.value)}
                          options={fontOptions}
                        />
                      )}
                    />
                    {errors.font && (
                      <div className='invalid-feedback d-block'>
                        {errors.font?.message}
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>

              <h5 className='py-1 mt-5'>
                <i className='fa-regular fa-envelope'></i> SMPTP Mail Config
              </h5>
              <hr />

              <Form.Group className='mb-3' controlId='email_host'>
                <Form.Label>Email Host</Form.Label>
                <Form.Control
                  {...register('email_host')}
                  isInvalid={errors.email_host}
                  type='text'
                  placeholder='Email'
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.email_host?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='email_host_user'>
                  <Form.Label>Email User</Form.Label>
                  <Form.Control
                    {...register('email_host_user')}
                    isInvalid={errors.email_host_user}
                    type='text'
                    placeholder='Email User'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.email_host_user?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email Password</Form.Label>
                  <Form.Control
                    {...register('email_host_password')}
                    isInvalid={errors.email_host_password}
                    type='text'
                    placeholder='Email Password'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.email_host_password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='email_port'>
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    {...register('email_port')}
                    isInvalid={errors.email_port}
                    type='text'
                    placeholder='Email Port'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.email_port?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Tls</Form.Label>
                  <div className='px-3 py-2'>
                    <div className='form-check form-switch'>
                      <input
                        className={`form-check-input ${errors.email_use_tls ? 'is-invalid' : ''
                          }`}
                        type='checkbox'
                        id='tls-conf'
                        {...register('email_use_tls')}
                      />
                      <label className='form-check-label' htmlFor='tls-conf'>
                        {watchEmailTls ? 'Ya' : 'Tidak'}
                      </label>
                    </div>
                    <Form.Control.Feedback type='invalid'>
                      {errors?.email_use_tls?.message}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Row>

              <h5 className='py-1 mt-5'>
                <i className='fa-solid fa-shield-halved'></i> Security
              </h5>
              <hr />
              <Form.Label>Batas Ubah Password</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl
                  {...register('max_change_life')}
                  isInvalid={errors.max_change_life}
                  type='number'
                  placeholder='Batas ubah password per...'
                />
                <InputGroup.Text>Hari</InputGroup.Text>
                <Form.Control.Feedback type='invalid'>
                  {errors?.max_change_life?.message}
                </Form.Control.Feedback>
              </InputGroup>
              <h5 className='py-1 mt-5'>
                <i className='fa-solid fa-shield-halved'></i> Default Nilai
                Pengukuran
              </h5>
              <hr />
              <Row>
                <Form.Group as={Col} controlId='def_pengukuran_teg_primer'>
                  <Form.Label>Default Pengukuran Tegangan Primer</Form.Label>
                  <Form.Control
                    {...register('def_pengukuran_teg_primer')}
                    isInvalid={errors.def_pengukuran_teg_primer}
                    type='text'
                    placeholder='Default Peng. Tegangan Primer'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.def_pengukuran_teg_primer?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Default Pengukuran Tegangan Sekunder</Form.Label>
                  <Form.Control
                    {...register('def_pengukuran_teg_sekunder')}
                    isInvalid={errors.def_pengukuran_teg_sekunder}
                    type='text'
                    placeholder='Default Pengukuran Tegangan Sekunder'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.def_pengukuran_teg_sekunder?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mt-3'>
                <Form.Group as={Col} controlId='rupiah'>
                  <Form.Label>Rupiah</Form.Label>
                  <Form.Control
                    {...register('rupiah')}
                    isInvalid={errors.rupiah}
                    type='number'
                    placeholder='Rupiah'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.rupiah?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Default Nilai CPSQ</Form.Label>
                  <Form.Control
                    {...register('def_nilai_cosq')}
                    isInvalid={errors.def_nilai_cosq}
                    type='text'
                    placeholder='Default Nilai COS PHI'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.def_nilai_cosq?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  className='mt-3'
                  controlId='def_generate_time'
                >
                  <Form.Label>Default Generate Time</Form.Label>
                  <div>
                    <Form.Check
                      {...register('def_generate_time')}
                      inline
                      type='radio'
                      value='60'
                      label='60 Menit'
                    />
                    <Form.Check
                      {...register('def_generate_time')}
                      inline
                      type='radio'
                      value='30'
                      label='30 Menit'
                    />
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.def_generate_time?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className='mt-4'>
                <Button type='submit' variant='primary'>
                  Simpan
                </Button>
                <ButtonCancel />
              </Form.Group>
            </Form>
          </div>
        </div>
      </Row>
    </>
  );
}
