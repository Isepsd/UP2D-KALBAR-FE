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

export default function VendorForm() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const navigate = useNavigate();
  const { id } = useParams();

  const path = "master/vendor"
  const label = "Vendor "

  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataSelected, setDataSelected] = useState<any>()
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    status: Yup.number().typeError("Status harus number").required('Status Wajib diisi'),
  });

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
          case 'status':
            setValue(field, String(data[field]));
            break;
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
            <div className='row'>
              <div className='col-12 col-md-11'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row className='mb-3'>

                    <Col>
                      <Form.Group className='mt-3' controlId='nama'>
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          {...register('nama')}
                        />
                      </Form.Group>
                      <Form.Group className='mt-3' controlId='alamat'>
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          as="textarea"
                          {...register('alamat')}
                        />
                      </Form.Group>
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          {...register('status')}
                          inline
                          type='radio'
                          value='1'
                          label='Active'
                        />
                        <Form.Check
                          {...register('status')}
                          inline
                          type='radio'
                          value='0'
                          label='Inactive'
                        />
                      </div>
                      <Form.Control.Feedback type='invalid'>
                        {errors?.gender?.message}
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Group className='mt-3' controlId='about'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          {...register('nama')}
                        />
                      </Form.Group>
                      <Form.Group className='mt-3' controlId='about'>
                        <Form.Label>Telepon</Form.Label>
                        <Form.Control
                          {...register('jabatan')}
                        />
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
          </div>
        </div>
      </Row>
    </>
  );
}
