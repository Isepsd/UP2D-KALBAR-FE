import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, ButtonCancel } from '@app/components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_PATH } from '@app/services/_path.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { getByIdPath, postByPath, putByPath } from '@app/services/main.service';
import { getObjectKeys } from '@app/helper/object.helper';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { pick } from 'lodash';
import {
  FasopMasterField,
  IFasopMaster,
} from '@app/interface/fasop-master.interface';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

function FasMasterFormPage() {
  const source = axios.CancelToken.source();
  const { activePage } = useSelector((state: any) => state.ui);
  const { id } = useParams();

  const dispatch = useDispatch();
  const path = API_PATH().master.fasop.master;
  const label = activePage?.display;

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** FORM  HANDLE
   */
  const validationSchema = Yup.object().shape({
    id_ref_lokasi: Yup.number()
      .nullable()
      .transform((_, val) => (val === Number(val) ? val : null)),
    nama: Yup.string().required('Nama Wajib diisi'),
    b3text: Yup.string().nullable(),
    faktor: Yup.number()
      .typeError('Faktor Wajib diisi')
      .required('Faktor Wajib diisi'),
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
    id_pointtype: Yup.number()
      .typeError('Jenis point Wajib diisi')
      .required('Jenis point Wajib diisi'),
    kinerja: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
    send_telegram: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** INIT */
  useEffect(() => {
    if (id) getDataById();
    else initDataForm();

    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);

    try {
      id
        ? await putByPath(path, params, id, source.token)
        : await postByPath(path, params, source.token);

      setLoadingForm(false);
      dispatchNotification(
        `Sukses ${id ? 'ubah' : 'membuat'} master`,
        'success'
      );
      if (!id) initDataForm();
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(`Gagal ${id ? 'ubah' : 'membuat'} master`, 'danger');
    }
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(path, id, source.token);
      initDataForm(req?.results);
    } catch {}
  };

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (data: any = undefined) => {
    const valueData =
      id && data
        ? pick(data, getObjectKeys(FasopMasterField))
        : FasopMasterField;
    Object.keys(valueData).map((field: any) => {
      setValue(field, valueData[field]);
    });
  };

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasopMaster) => {
    upsertData(data);
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
        <div className='col-md-12'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> {id ? 'Update' : 'Tambah'}{' '}
              {label}
            </h5>
            <hr />
            <div className='row'>
              <div className='col-12 col-md-10'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>Station</Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_ref_lokasi'
                        pathServiceName='master.jaringan.ref_lokasi'
                        labelField='nama_lokasi'
                        valueField='id_ref_lokasi'
                        placeholder='Pilih...'
                        isClearable={true}
                        errors={errors}
                        control={control}
                        queryParams={{
                          id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uid},${
                            JENIS_LOKASI().up3
                          },${JENIS_LOKASI().ulp},${
                            JENIS_LOKASI().gardu_induk
                          },${JENIS_LOKASI().gardu_hubung},${
                            JENIS_LOKASI().gardu_distribusi
                          }`,
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        {...register('nama')}
                        isInvalid={errors.nama}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.nama?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>B3text</Form.Label>
                      <Form.Control
                        {...register('b3text')}
                        isInvalid={errors.b3text}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.b3text?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>Faktor</Form.Label>
                      <Form.Control
                        {...register('faktor')}
                        type='number'
                        step='any'
                        min='0'
                        isInvalid={errors.faktor}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.faktor?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>Aktif</Form.Label>
                      <div className='ms-3 py-2'>
                        <Form.Check
                          type='switch'
                          id='aktif'
                          {...register('status')}
                          label='Ya'
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Col} className='mb-3'>
                      <Form.Label>Jenis Point</Form.Label>
                      <SelectAsyncDynamic
                        fieldName='id_pointtype'
                        pathServiceName='master.fasop.point_type'
                        labelField='name'
                        valueField='id_pointtype'
                        placeholder='Pilih...'
                        errors={errors}
                        control={control}
                        queryParams={{ jenispoint: 'MASTER' }}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className='mb-3 col-md-4'>
                      <Form.Label>Kinerja</Form.Label>
                      <div className='ms-3 py-2'>
                        <Form.Check
                          type='switch'
                          id='kinerja'
                          {...register('kinerja')}
                          label='Ya'
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className='mb-3 col-md-4'>
                      <Form.Label>Kirim Telegram</Form.Label>
                      <div className='ms-3 py-2'>
                        <Form.Check
                          type='switch'
                          id='kirimTelegram'
                          label='Ya'
                          {...register('send_telegram')}
                        />
                      </div>
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
          </div>
        </div>
      </Row>
    </>
  );
}

export default FasMasterFormPage;
