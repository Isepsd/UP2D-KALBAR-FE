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

import {
  getByIdPath,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';

export default function AmrCustomerForm() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();

  const path = API_PATH().master.opsisdis.customer
  const label = "AMR Customer "

  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataSelected, setDataSelected] = useState<any>()
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().nullable(),
    lok: Yup.string().nullable(),
    alamat: Yup.string().nullable(),
    meter_id: Yup.number().nullable(),
    meter_type: Yup.number().nullable(),
    rate: Yup.string().nullable(),
    bapm: Yup.string().nullable(),
    nofa: Yup.string().nullable(),
    modem_adr: Yup.number().nullable(),
    goltarif: Yup.string().nullable(),
    kodegardu: Yup.string().nullable(),
    daya: Yup.number().nullable(),
    customer_rid: Yup.number().typeError("Customer RID harus number").required('Customer RID Wajib diisi'),
    faktor_kali: Yup.number().nullable(),
  });
  // const koneksi: any = KONEKSI_KE_ALAT()
  // const serial: any = SERIAL_PORT()
  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    setValue,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    upsertData(data);
  };

  useEffect(() => {
    if (id) getDataById();
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(
        path,
        id,
        source.token
      );
      setDataSelected(req?.results);
      initDataForm(req?.results);
    } catch { }
  };

  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        switch (field) {
          default:
            setValue(field, data[field]);
            break;
        }
      });
    }
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      if (id) {
        params.id_user_update = currentUser.id_user
        await putByPath(path, params, id, source.token)
      } else {
        params.id_user_entri = currentUser.id_user
        await postByPath(path, params, source.token);
      }
      setLoadingForm(false);
      navigate(-1);
      dispatchNotification(
        `Success ${id ? 'update' : 'add'} ${label}`,
        'success'
      );
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? 'update' : 'add'} ${label}`,
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
        <div className='col-md-12'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> {dataSelected?.id ? 'Ubah' : 'Tambah'} {label}
            </h5>
            <hr />

            <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
              <Row>
                <Col md={4}>
                  <Form.Group className='mt-3' controlId='nama'>
                    <Form.Label>Customer RID</Form.Label>
                    <Form.Control
                      {...register('customer_rid')}
                      isInvalid={errors.customer_rid}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.customer_rid?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='lok'>
                    <Form.Label>Lokasi</Form.Label>
                    <Form.Control
                      isInvalid={errors.lok}
                      {...register('lok')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.lok?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='rate'>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      isInvalid={errors.rate}
                      {...register('rate')}

                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.rate?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='bapm'>
                    <Form.Label>BAPM</Form.Label>
                    <Form.Control
                      isInvalid={errors.bapm}
                      type="number"
                      {...register('bapm')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.bapm?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='goltarif'>
                    <Form.Label>Gol Tarif</Form.Label>
                    <Form.Control
                      isInvalid={errors.goltarif}
                      {...register('goltarif')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.goltarif?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mt-3' controlId='nama'>
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      {...register('nama')}
                      isInvalid={errors.nama}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.nama?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='meter_id'>
                    <Form.Label>Meter ID</Form.Label>
                    <Form.Control
                      isInvalid={errors.meter_id}
                      {...register('meter_id')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.meter_id?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='modem_adr'>
                    <Form.Label>Modem ADR</Form.Label>
                    <Form.Control
                      isInvalid={errors.modem_adr}
                      {...register('modem_adr')}
                      type="number"
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.modem_adr?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='faktor_kali'>
                    <Form.Label>Faktor Kali</Form.Label>
                    <Form.Control
                      isInvalid={errors.faktor_kali}
                      type="number"
                      {...register('faktor_kali')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.faktor_kali?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='kodegardu'>
                    <Form.Label>Kode Garud</Form.Label>
                    <Form.Control
                      {...register('kodegardu')}
                      isInvalid={errors.kodegardu}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.kodegardu?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                </Col>
                <Col md={4}>
                  <Form.Group className='mt-3' controlId='alamat'>
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      isInvalid={errors.alamat}
                      {...register('alamat')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.alamat?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='meter_type'>
                    <Form.Label>Meter Type</Form.Label>
                    <Form.Control
                      isInvalid={errors.meter_type}
                      {...register('meter_type')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.meter_type?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='daya'>
                    <Form.Label>Daya</Form.Label>
                    <Form.Control
                      isInvalid={errors.daya}
                      {...register('daya')}
                      type="number"
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.daya?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mt-3' controlId='nofa'>
                    <Form.Label>Nofa</Form.Label>
                    <Form.Control
                      isInvalid={errors.nofa}
                      {...register('nofa')}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.nofa?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

              </Row>

              <Form.Group className='mt-4'>
                <Button type='submit' variant='primary'>
                  Save
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
