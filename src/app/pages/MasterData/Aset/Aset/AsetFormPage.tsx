import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Tabs, Tab, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { Button, ButtonCancel } from '@app/components';

import { getAllByPath, getByIdPath, postByPath, putAsetExtAtrBatch, putByPath } from '@app/services/main.service';
import { SEBAGAI_ASET } from '@app/configs/select-options/aset.select';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { API_PATH } from '@app/services/_path.service';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { FAset } from '@app/interface/aset.interface';
import { head } from 'lodash';

function AsetFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const source = axios.CancelToken.source();
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);

  const path = API_PATH().master.aset.ref_aset
  const pathAdditionalFields = API_PATH().master.aset.ref_aset_ext_atr
  const label = "Aset "
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [additionalOptions, setAdditionalOptions] = useState<any>([]);
  const [key, setKey] = useState('general');

  const sebagaiOptions: any = SEBAGAI_ASET()

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_aset_jenis: Yup.number().typeError("Jenis aset harus number").required('Jenis aset Wajib diisi'),
    no_aset_internal: Yup.number().nullable(),
    no_aset_external: Yup.number().nullable(),
    jenis_aset: Yup.string().nullable(),
    nama: Yup.string().required('Nama wajib diisi'),
    no_seri: Yup.string().nullable(),
    id_ref_aset_parent: Yup.string().nullable(),
    id_ref_aset_level: Yup.string().nullable(),
    id_ref_aset_manufaktur: Yup.string().nullable(),
    model: Yup.string().nullable(),
    tipe: Yup.string().nullable(),
    tahun: Yup.string().nullable(),
    lat: Yup.number().nullable(),
    lon: Yup.number().nullable(),
    dimensi_lebar: Yup.number().nullable(),
    dimensi_panjang: Yup.number().nullable(),
    dimensi_tinggi: Yup.number().nullable(),
    dimensi_satuan: Yup.number().nullable(),
    massa_berat: Yup.number().nullable(),
    massa_satuan: Yup.number().nullable(),
    id_ref_aset_status: Yup.string().nullable(),
    id_ref_lokasi_1: Yup.string().nullable(),
    id_ref_lokasi_2: Yup.string().nullable(),
    id_ref_lokasi_3: Yup.string().nullable(),
    id_ref_lokasi_4: Yup.string().nullable(),
    id_ref_aset_lantai: Yup.string().nullable(),
    id_ref_aset_ruangan: Yup.string().nullable(),
    id_ref_aset_rak: Yup.string().nullable(),
    id_ref_aset_kondisi: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ jenis_aset: 'parent', lat: 0, lon: 0 });
  const { register, handleSubmit, setValue, clearErrors, control, formState, } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchJenisAset = useWatch({ control, name: 'id_ref_aset_jenis' });
  const watchSebagai = useWatch({ control, name: 'jenis_aset' });
  const watchStation = useWatch({ control, name: 'id_ref_lokasi_1' });
  const watchTrafoGI = useWatch({ control, name: 'id_ref_lokasi_3' });

  const onSubmitForm = (data: any) => {
    upsertData(data);
  };

  useEffect(() => {
    if (id) getDataById();
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  useEffect(() => {
    if(watchJenisAset) getAdditionalField()
  }, [watchJenisAset])

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath( path, id, source.token );
      initDataForm(req?.results);
    } catch { }
  };

  const getAdditionalField = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let path = `master/aset/ref-aset-ex-atr`

      const params = {
        page: '-1',
        sort_by: 'nama',
        sort_type: 'asc',
        id_ref_aset_jenis: watchJenisAset
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results
      setAdditionalOptions(data)
      if(data?.length > 0) getAdditionalFieldValue(data)
    } catch (err: any) {
    }
  };

  const getAdditionalFieldValue = async (listFields = []) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let path = `master/aset/ref-aset-ext-atr`

      const params = {
        page: '-1',
        sort_by: 'tgl_entri',
        sort_type: 'asc',
        id_ref_aset: id
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results

      if(data?.length > 0){
        const newOptions: any = listFields?.map((x: any) => {
          const existField: any = head(data.filter((y: any) => x.id_ref_aset_ex_atr == y.id_ref_aset_ex_atr ))
          
          return {...x, ...existField}
        })
        
        setAdditionalOptions(newOptions) 
      }
      
    } catch (err: any) {
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
    try {
      let req: any 
      if (id) {
        params.id_user_update = currentUser.id_user
        req = await putByPath(path, params, id, source.token)
      } else {
        params.id_user_entri = currentUser.id_user
        req = await postByPath(path, params, source.token)
      }
      const { results } = req
      
      const paramsAdditional: any = additionalOptions.filter((f: any) => f?.nilai ).map((x: any) => ({id_ref_aset_ex_atr: x.id_ref_aset_ex_atr, id_ref_aset: results?.id_ref_aset, status: 1, nilai: x.nilai, id_ref_aset_ext_atr: x?.id_ref_aset_ext_atr || ''}))
      if(paramsAdditional?.length > 0) upserAdditionalField(paramsAdditional)
      
      setLoadingForm(false);
      dispatchNotification(
        `Success ${id ? 'update' : 'add'} ${label}`,
        'success'
      );
      handleClearForm()
      if(paramsAdditional?.length == 0) navigate(-1)
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? 'update' : 'add'} ${label}`,
        'danger'
      );
    }
  };

  /** INSERT Additional Field */
  const upserAdditionalField = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      id ? await putAsetExtAtrBatch(`${pathAdditionalFields}/update-batch`, params, source.token) : await postByPath(pathAdditionalFields, params, source.token);
      setLoadingForm(false);
      dispatchNotification(
        `Success ${id ? 'update' : 'add'} Additional Fields`,
        'success'
      );
      handleClearForm()
      navigate(-1)
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? 'update' : 'add'} Additional Fields`,
        'danger'
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const handleClearForm = () => {
    FAset.map((f: any) => {
      clearErrors(f);
      switch (key) {
        case "lat":
        case "lon":
          setValue(f, 0);
          break;
        case "jenis_aset":
          setValue(f, 'parent');
          break;
        default:
          setValue(f, "");
          break;
      }
    });
  };

  const onChangeAdditionalField = (e: any, index: any) => {
    let newArr = [...additionalOptions]; // copying the old datas array
    newArr[index]['nilai'] = e.target.value; // replace e.target.value with whatever you want to change it to

    setAdditionalOptions(newArr);
  }

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12'>
          <div className='ms-md-1'>
            <div className="align-items-center d-flex">
              <h5 className='mb-0'>
                <i className='fa-solid fa-circle-info'></i> {id ? 'Ubah' : 'Tambah'} {label}
              </h5>
              <Tabs
                variant='pills'
                activeKey={key}
                onSelect={(k: any) => setKey(k)}
                className="ms-auto"
              >
                <Tab eventKey="general" title="General"></Tab>
                <Tab eventKey="lokasi" title="Lokasi Aset"></Tab>
                <Tab eventKey="lainnya" title="Spesifikasi Lainnya" disabled={additionalOptions?.length == 0}></Tab>
              </Tabs>
            </div>
            <hr />
            <div className='row'>
              <div className='col-12'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  {
                    key == 'general' && (
                      <>
                        <Row>
                          <Col>
                            <Form.Group  className='mb-3'>
                              <Form.Label>Jenis Aset</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_jenis' 
                                pathServiceName='master.aset.ref_aset_jenis'
                                labelField='nama_aset_jenis'
                                valueField='id_ref_aset_jenis'
                                placeholder='Pilih Jenis Aset'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Pengelola</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_lokasi_4' 
                                pathServiceName='master.jaringan.ref_lokasi'
                                labelField='nama_lokasi'
                                valueField='id_ref_lokasi'
                                placeholder='Pilih Pengelola'
                                isClearable={true}
                                errors={errors} 
                                control={control}
                                queryParams={{
                                  id_ref_jenis_lokasi_in: `${
                                    JENIS_LOKASI().uid
                                  },${JENIS_LOKASI().up3},${
                                    JENIS_LOKASI().ulp
                                  }`,
                                  status_listrik: 1
                                }}
                              />
                            </Form.Group>
                            <Form.Group  className='mb-3'>
                              <Form.Label>No Aset Internal</Form.Label>
                                <Form.Control type='number'
                                  {...register('no_aset_internal')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.no_aset_internal?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group  className='mb-3'>
                              <Form.Label>No Aset External</Form.Label>
                                <Form.Control type='number'
                                  {...register('no_aset_external')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.no_aset_external?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group  className='mb-3'>
                              <Form.Label>Sebagai</Form.Label>
                                <Form.Select {...register('jenis_aset')}>
                                  {
                                    sebagaiOptions.map((status: any, index: number) => (
                                      <option key={index} value={status.value}>{status.label}</option>
                                    ))
                                  }
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.jenis_aset?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                              watchSebagai == 'child' && (
                                <Form.Group  className='mb-3'>
                                  <Form.Label>Induk Aset</Form.Label>
                                  <SelectAsyncDynamic 
                                    pathServiceName='master.aset.ref_aset'
                                    fieldName='id_ref_aset_parent' 
                                    labelField='nama'
                                    valueField='id_ref_aset'
                                    placeholder='Pilih Aset'
                                    errors={errors} 
                                    control={control} 
                                  />
                                </Form.Group>
                              )
                            }
                            <Form.Group  className='mb-3'>
                              <Form.Label>Nama Aset</Form.Label>
                                <Form.Control {...register('nama')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.nama?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group  className='mb-3'>
                              <Form.Label>No Seri</Form.Label>
                                <Form.Control {...register('no_seri')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.no_seri?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group  className='mb-3' controlId='id_ref_aset_level'>
                              <Form.Label>Level Aset</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_level' 
                                pathServiceName='master.aset.ref_aset_level'
                                labelField='nama'
                                valueField='id_ref_aset_level'
                                placeholder='Pilih Level'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group  className='mb-3' controlId='id_ref_aset_manufaktur'>
                              <Form.Label>Manufaktur</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_manufaktur' 
                                pathServiceName='master.aset.ref_aset_manufaktur'
                                labelField='nama'
                                valueField='id_ref_aset_manufaktur'
                                placeholder='Pilih Manufaktur'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group  className='mb-3'>
                              <Form.Label>Model</Form.Label>
                                <Form.Control
                                  {...register('model')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.model?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Form.Group className='mb-3'>
                              <Form.Label>Tipe</Form.Label>
                                <Form.Control
                                  {...register('tipe')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.tipe?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Tahun</Form.Label>
                                <Form.Control type='number'
                                  {...register('tahun')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.tahun?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Lat</Form.Label>
                                <Form.Control type='number'
                                  {...register('lat')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.lat?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Lon</Form.Label>
                                <Form.Control type='number'
                                  {...register('lon')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.lon?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className='mb-3'>
                              <Form.Label>Dimensi Lebar</Form.Label>
                                <Form.Control type='number'
                                  {...register('dimensi_lebar')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.dimensi_lebar?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Dimensi Panjnag</Form.Label>
                                <Form.Control type='number'
                                  {...register('dimensi_panjang')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.dimensi_panjang?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Dimensi Tinggi</Form.Label>
                                <Form.Control type='number'
                                  {...register('dimensi_tinggi')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.dimensi_tinggi?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                            <Form.Label>Dimensi Satuan</Form.Label>
                              <Form.Control type='number'
                                {...register('dimensi_satuan')}
                              />
                              <Form.Control.Feedback type='invalid'>
                                {errors?.dimensi_satuan?.message}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className='mb-3'>
                              <Form.Label>Massa Berat</Form.Label>
                                <Form.Control type='number'
                                  {...register('massa_berat')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.massa_berat?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Massa Satuan</Form.Label>
                                <Form.Control type='number'
                                  {...register('massa_satuan')}
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {errors?.massa_satuan?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='id_ref_aset_status'>
                              <Form.Label>Status Aset</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_status' 
                                pathServiceName='master.aset.ref_aset_status'
                                labelField='nama'
                                valueField='id_ref_aset_status'
                                placeholder='Pilih Status'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )
                  }
                  {
                    key == 'lokasi' && (
                      <>
                        <Row>
                          <Col>
                            <Form.Group className='mb-3'>
                              <Form.Label>Station</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_lokasi_1' 
                                pathServiceName='master.jaringan.ref_lokasi'
                                labelField='nama_lokasi'
                                valueField='id_ref_lokasi'
                                placeholder='Pilih Station'
                                isClearable={true}
                                errors={errors} 
                                control={control} 
                                queryParams={{
                                  id_ref_jenis_lokasi_in: `${
                                    JENIS_LOKASI().gardu_induk
                                  },${JENIS_LOKASI().gardu_hubung},${
                                    JENIS_LOKASI().gardu_distribusi
                                  }`,
                                  status_listrik: 1
                                }}
                              />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Trafo</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_lokasi_3' 
                                pathServiceName='master.jaringan.ref_lokasi'
                                labelField='nama_lokasi'
                                valueField='id_ref_lokasi'
                                placeholder='Pilih Trafo'
                                isClearable={true}
                                watchParent={watchStation}
                                isDisabled={!watchStation}
                                errors={errors} 
                                control={control}
                                queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().trafo_gi}`, id_parent_lokasi: watchStation, status_listrik: 1 }}
                              />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                              <Form.Label>Penyulang</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_lokasi_2' 
                                pathServiceName='master.jaringan.ref_lokasi'
                                labelField='nama_lokasi'
                                valueField='id_ref_lokasi'
                                placeholder='Pilih Penyulang'
                                watchParent={watchTrafoGI}
                                isDisabled={!watchTrafoGI}
                                isClearable={true}
                                errors={errors} 
                                control={control}
                                queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().penyulang}`, id_parent_lokasi: watchTrafoGI, status_listrik: 1 }}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className='mb-3' controlId='id_ref_aset_lantai'>
                              <Form.Label>Lantai</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_lantai' 
                                pathServiceName='master.aset.ref_aset_lantai'
                                labelField='nama'
                                valueField='id_ref_aset_lantai'
                                placeholder='Pilih Lantai'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='id_ref_aset_ruangan'>
                              <Form.Label>Ruangan</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_ruangan' 
                                pathServiceName='master.aset.ref_aset_ruangan'
                                labelField='nama'
                                valueField='id_ref_aset_ruangan'
                                placeholder='Pilih Ruangan'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='id_ref_aset_rak'>
                              <Form.Label>Rak</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_aset_rak' 
                                pathServiceName='master.aset.ref_aset_rak'
                                labelField='nama'
                                valueField='id_ref_aset_rak'
                                placeholder='Pilih Rak'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='id_ref_kondisi_aset'>
                              <Form.Label>Kondisi Aset</Form.Label>
                              <SelectAsyncDynamic 
                                fieldName='id_ref_kondisi_aset' 
                                pathServiceName='master.aset.ref_aset_kondisi'
                                labelField='nama'
                                valueField='id_ref_kondisi_aset'
                                placeholder='Pilih Kondisi'
                                errors={errors} 
                                control={control} 
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )
                  }
                  {
                    key == 'lainnya' && (
                      <Row>
                        {
                          additionalOptions?.map((additional: any, index: number) => (
                            <Col key={index} md={4}>
                              <Form.Group className='mb-3'>
                                <Form.Label>{additional.nama}</Form.Label>
                                <InputGroup>
                                  <FormControl value={additional?.nilai} onChange={(e)=> onChangeAdditionalField(e, index)} placeholder={additional.nama} />
                                  <InputGroup.Text>{additional.satuan}</InputGroup.Text>
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          ))
                        }
                      </Row>
                    )
                  }
                  <Form.Group className='mt-4'>
                    <Button type='submit' variant='primary' isLoading={loadingForm}>
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

export default AsetFormPage