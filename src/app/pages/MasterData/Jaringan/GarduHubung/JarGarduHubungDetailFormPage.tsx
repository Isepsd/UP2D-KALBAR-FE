import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import {
  getAllByPath,
  getByIdPath,
  postByPath,
  putByPath,
} from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';

export default function JarGarduHubungDetailForm() {
  const dispatch = useDispatch();
  const { id, id_gh } = useParams();
  const navigate = useNavigate();
  const source = axios.CancelToken.source();

  const path = "master/jaringan/ref-lokasi-gd"
  const pathJenis = API_PATH().master.jaringan.ref_lokasi
  const label = "Gardu Hubung Detail"

  const { currentUser } = useSelector((state: any) => state.auth);
  // const [dataSelected, setDataSelected] = useState<any>()
  const [zoneOptions, setZoneOptions] = useState<any>()
  const [penyulangOptions, setPenyulangOptions] = useState<any>()
  const [loadingForm, setLoadingForm] = useState<boolean>(false);


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_lokasi_child: Yup.number().typeError("Belum pilih penyulang atau zona").required("Belum pilih penyulang atau zona"),
    id_zone: Yup.number().typeError("Belum pilih zona"),
    id_penyulang: Yup.number().typeError("Belum pilih penyulang"),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
  const {
    handleSubmit,
    setValue,
    control,
    // getValues,
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
    if (id_gh) getDataById();
    getAllData()
    getAllDataZona()
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(
        path,
        id_gh,
        source.token
      );
      // setDataSelected(req?.results);
      initDataForm(req?.results);
    } catch { }
  };

  const getAllData = async () => {

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: '-1',
        limit: 100,
        id_ref_jenis_lokasi: 6,
        status_listrik: 1,
      };

      const req: any = await getAllByPath(pathJenis, params, source.token);
      const { results } = req;

      let data = results.map((d: any) => {
        return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
      });
      setPenyulangOptions(data);
    } catch (err: any) {
    }
  };
  const getAllDataZona = async () => {

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: '-1',
        limit: 100,
        id_ref_jenis_lokasi: 7,
        status_listrik: 1,
      };

      const req: any = await getAllByPath(pathJenis, params, source.token);
      const { results } = req;

      let data = results.map((d: any) => {
        return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
      });
      setZoneOptions(data);
    } catch (err: any) {
    }
  };

  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        switch (field) {         
          case "id_ref_lokasi_child":
            setValue(field, data?.id_ref_lokasi_child?.id_ref_lokasi);
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
      if (id_gh) {
        params.id_user_update = currentUser.id_user
        await putByPath(path, params, id_gh, source.token)
      } else {
        params.id_ref_lokasi = id
        params.id_user_entri = currentUser.id_user
        await postByPath(path, params, source.token);
      }
      setLoadingForm(false);
      dispatchNotification(
        `Success ${id_gh ? 'update' : 'add'} ${label}`,
        'success'
      );
      navigate(-1);
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id_gh ? 'update' : 'add'} ${label}`,
        'danger'
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  // console.log("getValue",getValues);
  

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> {id ? 'Ubah' : 'Tambah'} {label}
            </h5>
            <hr />
            <div className='row'>
              <div className='col-12 col-md-11'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row className='mb-3'>
                    <Col>
                      <Form.Group className='mt-3' controlId='id_parent_lokasi'>
                        <Form.Label>Penyulang</Form.Label>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name='id_penyulang'
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder='Pilih Penyulang'
                              styles={ReactSelectStyle}
                              classNamePrefix={`${errors.id_penyulang ? 'is-invalid' : ''
                                }`}
                              inputRef={ref}
                              value={penyulangOptions?.filter(
                                (c: any) => c.value == value
                              )}
                              onChange={(val: any) => {
                                setValue("id_zone", 0)
                                onChange(val?.value)
                                setValue("id_ref_lokasi_child", val?.value)
                              }}
                              options={penyulangOptions}
                            />
                          )}
                        />
                        {errors.id_ref_lokasi_child && (
                          <div className='invalid-feedback d-block'>
                            {errors.id_ref_lokasi_child?.message}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className='mt-3' controlId='id_parent_lokasi'>
                        <Form.Label>Zona</Form.Label>
                        <Controller
                          control={control}
                          defaultValue={''}
                          name='id_zone'
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              placeholder='Pilih zona'
                              styles={ReactSelectStyle}
                              classNamePrefix={`${errors.id_zone ? 'is-invalid' : ''
                                }`}
                              inputRef={ref}
                              value={zoneOptions?.filter(
                                (c: any) => c.value == value
                              )}
                              onChange={(val: any) => {
                                onChange(val?.value)
                                setValue("id_ref_lokasi_child", val?.value)
                                setValue("id_penyulang", 0)
                              }}
                              options={zoneOptions}
                            />
                          )}
                        />
                        {errors.id_ref_lokasi_child && (
                          <div className='invalid-feedback d-block'>
                            {errors.id_ref_lokasi_child?.message}
                          </div>
                        )}
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
