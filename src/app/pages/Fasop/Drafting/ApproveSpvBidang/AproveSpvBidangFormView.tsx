import React, { useState, useEffect  } from 'react';
// import { useLocation } from 'react-router-dom';
import { Row, Col, Form,Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import InputDateNew from '@app/components/Date/InputDateNew';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import FormInputNoLabelnew from '@app/components/Input/FormInputNoLabelnew';
import { IFasopNoWO, IFasopNoWOField } from '@app/interface/jaringan-no-wo.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
// import InputUploadNew from '@app/components/Upload/InputUploadNew';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { getAllByPath } from '@app/services/main.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectAsyncDynamicCheckBox from '@app/modules/SelectForm/SelectAsyncDynamicCheckBox';
import Button from '@app/components/Button/Button';
import SelectFormStaticCheckbox from '@app/modules/SelectForm/SelectFormStaticCheckbox';

export default function AproveSpvBidangFormApproveJQ({handleClose}:any) {
  const source = axios.CancelToken.source();
  // const [folderBefore, setFolderBefore] = useState('');
  // const [folderAfter, setFolderAfter] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();
  const [noWo, setNoWo] = useState<any>('');
  const option_kat_peralatan = [
    { label: "GI", value: 'GI' },
    { label: "GH", value: 'GH' },
    { label: "MP", value: 'MP' },

  ]
  const option_jns_peralatan = [
    { label: "GI", value: 'GI' },
    { label: "UFR", value: 'UFR' },
    { label: "GH", value: 'GH' },
    { label: "KP", value: 'KP' },
    { label: "GFD", value: 'GFD' },
    { label: "MP", value: 'MP' },
    { label: "REC", value: 'REC' },
    { label: "SSO", value: 'SSO' },

  ]
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    // nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    tgl_wo: Yup.string().nullable(),
    progres: Yup.string().nullable(),
    no_wo: Yup.string().nullable(),
    nama_gi: Yup.string().nullable(),
    id_ref_lokasi_gi: Yup.string().nullable(),
    id_user_updated: Yup.string().nullable(),
    id_bidang: Yup.string().nullable(),
    foto_sebelum: Yup.string().nullable(),
    foto_sesudah: Yup.string().nullable(),
    id_ref_lokasi_up3: Yup.string().nullable(),
    id_ref_kegiatan: Yup.string().nullable(),
    nama_kegiatan: Yup.string().nullable(),
    peralatan: Yup.string().nullable(),
    id_ref_lokasi_peralatan: Yup.string().nullable(),
    nama_peralatan: Yup.string().nullable(),
    jns_peralatan: Yup.string().nullable(),
    uraian_wo: Yup.string().nullable(),
   
    
  });

  const [formModel] = useState<any>({no_wo: noWo ,status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,

  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBSCRIBE FORM CHANGES */
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });

  // const watchPenyulang = useWatch({ control, name: 'id_penyulang' });


  // Watch untuk memantau perubahan pada field tertentu



  const fetchNoWO = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate delay if needed
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('id');
      let req:any;
  
      if (id) {
        // Fetch `no_wo` using the `id` parameter
        req = await getAllByPath(`${API_PATH().fasop.drafting.wo_drafting}/${id}`, {}, source.token);
      } else {
        // Fetch a new `no_wo` if no `id` is present
        req = await getAllByPath(API_PATH().fasop.drafting.get_nowo, {}, source.token);
      }
  
      console.log('API response:', req); // Inspect API response
  
      // Ensure the data is in the correct response structure
      const results:any = req?.results.no_wo || '';
      console.log('Results:', results); // Inspect the results
  
      if (results) {
        setNoWo(results); // Set no_wo from the results
        console.log('Fetched no_wo:', results); // Inspect the fetched value
      } else {
        setNoWo(''); // Set noWo to an empty string if no data is found
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching no_wo:', error);
      setNoWo(null);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNoWO();
  }, [setValue]);
  
  useEffect(() => {
    if (noWo) {
      setValue('no_wo', noWo);
    }
  }, [noWo, setValue]);
  
  
  // const watchNamaFileSelelum = watch('foto_sebelum')
  // const watchNamaFileSesudah = watch('foto_sesudah')
  // useEffect(() => {
  //   if (watchPenyulang) {
  //     getDataPenyulangById();
  //   }
  // }, [watchPenyulang])

  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  const onSubmitForm = (data: IFasopNoWO) => {
    // data.foto_sebelum = folderBefore || ''; // Ensure this is a string
    // data.foto_sesudah = folderAfter || ''; // Ensure this is a string
     data.progres='RELEASE WO'
    let id_parent: any;
    if (data?.id_penyulang) {
      id_parent = data?.id_penyulang;
    }
  
    data.no_wo = noWo; // Ensure noWo is correctly assigned
  
    data.id_parent_lokasi = id_parent;
  
    setDataParams(data);
    handleClose();
  };
  
  
 
  /** GET EDIT DATA */
  // const getDataPenyulangById = async () => {
  //   try {
  //     const req: any = await getByIdPath(API_PATH().master.jaringan.ref_lokasi, watchPenyulang, source.token);
  //     // console.log("req?.results", req?.results);

  //     setValue("id_uid", req?.results?.id_uid?.id_ref_lokasi)
  //     setValue("id_up3_1", req?.results?.id_up3_1?.id_ref_lokasi)
  //     setValue("id_ulp_1", req?.results?.id_ulp_1?.id_ref_lokasi)

  //     setValue("id_gardu_induk", dataSelected?.id_gardu_induk?.id_ref_lokasi)
  //     setValue("id_trafo_gi", dataSelected?.trafo_gi?.id_ref_lokasi)
  //     setValue("id_penyulang", watchPenyulang)
  //     // setValue("id_zone", dataSelected?.zone?.id_ref_lokasi)
  //     // setValue("id_section", dataSelected?.section?.id_ref_lokasi)
  //     // setValue("id_segment", dataSelected?.segment?.id_ref_lokasi)

  //   } catch { }
  // };

  // const options_parent = [
  //   { label: 'PENYULANG', value: 'PENYULANG' },
  //   { label: 'ZONE', value: 'ZONE' },
  //   { label: 'SECTION', value: 'SECTION' },
  //   { label: 'SEGMENT', value: 'SEGMENT' },
  // ]
  // useEffect(() => {
  //   fetchNoWO();
  // }, []);

  
  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IFasopNoWOField}
        path={API_PATH().fasop.drafting.wo_drafting}
        customLabel={'hide'}
        isModal={true}
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="12">
            <Form.Group className='mt-3 d-flex align-items-center' controlId='no_wo'>
              <Form.Label className='mb-0' style={{ minWidth: '120px' }}>No WO <RequiredInfo /></Form.Label>
              <div className='d-flex align-items-center flex-grow-1'>
                <span className='mx-2'>:</span>
                <Form.Control
                  style={{ width: '98%' }}
                  defaultValue={noWo}
                  value={noWo}
                  disabled
                  {...register('no_wo')}
                  isInvalid={!!errors.no_wo}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_wo?.message}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <div>

      </div>
            <Form.Group className='mt-3 d-flex align-items-center'>
              <Form.Label className='mb-0' style={{ minWidth: '120px' }}>TGL WO <RequiredInfo /></Form.Label>
              <div className='d-flex align-items-center flex-grow-1'>
                <span className='mx-2'>:</span>
                <div style={{ width: '98%' }}>
                  <InputDateNew
                   disabled
                  errors={errors}
                  register={register}
                  type="date"
                  fieldName="tgl_wo"
                  step={1}
                  // defaultValue={new Date().toISOString().split('T')[0]} // Today's date
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>User</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectAsyncDynamic
                    isDisabled={true}
                    fieldName="id_user_created"
                    control={control}
                    errors={errors}
                    labelField={'fullname'}
                    valueField={'id_user'}
                    pathServiceName={'admin.user'}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                    setValue={setValue}
              
                    options={dataParams?.up3_1}
                  ></SelectAsyncDynamic>
                
                  </div>
                </div>
              </Form.Group>
           

            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Bidang</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                    <SelectAsyncDynamic
                    isDisabled={true}
                      fieldName="id_bidang"
                      control={control}
                      errors={errors}
                      labelField={'nama'}
                      valueField={'id_ref_bagian'}
                      pathServiceName={'fasop.drafting.ref_bagian'}
                      queryParams={{ sort_by: 'nama' }}
                      setValue={setValue}
                      options={dataSelected?.ref_bagian}
                    />
                  </div>
                </div>
              </Form.Group>
           
            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Kegiatan</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                    <SelectAsyncDynamicCheckBox
                     isDisabled={true}
                      fieldName="id_ref_kegiatan"
                      control={control}
                      errors={errors}
                      labelField={'kegiatan'}
                      valueField={'id_ref_kegiatan'}
                      pathServiceName={'fasop.drafting.ref_kegiatan'}
                      queryParams={{ sort_by: 'nama' }}
                      setValue={setValue}
                      options={dataSelected?.ref_bagian}
                      isMulti={true}
                    />
                  </div>
                </div>
              </Form.Group>
           
   
            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Area</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectAsyncDynamic
                   isDisabled={true}
                    fieldName="id_ref_lokasi_up3"
                    fieldNameParent="id_uid"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                    setValue={setValue}
              
                    options={dataParams?.up3_1}
                  ></SelectAsyncDynamic>
                
                  </div>
                </div>
              </Form.Group>
           
            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Kat.Peralatan</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectFormStaticCheckbox
                         disabled={true}
                          control={control}
                          errors={errors}
                          fieldName={'peralatan'}
                          options={option_kat_peralatan}
                        />
                
                  </div>
                </div>
              </Form.Group>
           
            <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Jenis Peralatan</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectFormStaticCheckbox
                        disabled={true}
                          control={control}
                          errors={errors}
                          fieldName={'jns_peralatan'}
                          options={option_jns_peralatan}
                        />
                
                  </div>
                </div>
              </Form.Group>
           
              <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Gardu Induk</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectAsyncDynamicCheckBox
                      isDisabled={true}
                      fieldName="id_ref_lokasi_gi"
                      control={control}
                      errors={errors}
                      labelField={'nama_lokasi'}
                      valueField={'id_ref_lokasi'}
                      pathServiceName={'master.jaringan.ref_lokasi'}
                      queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                      setValue={setValue}
                      options={dataSelected?.gardu_induk}
                      isMulti={true}
                    />
                    
                  </div>
                </div>
              </Form.Group>
           
              <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Penyulang</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectAsyncDynamicCheckBox
                    isDisabled={true}
                    fieldName="id_ref_lokasi_peralatan"
                    // fieldNameParent="id_gardu_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={
                      { id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }
                    }
                    // isDisabled={!watchTrafoGI}
                    // watchParent={watchTrafoGI}
                    setValue={setValue}
                    options={dataSelected?.penyulang}
                    isMulti={true}
                     
                    />
                    
                  </div>
                </div>
              </Form.Group>
            
          

              <Form.Group className='mt-3 d-flex align-items-start'>
                  <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Deskripsi</Form.Label>
                  <div className='d-flex flex-grow-1'>
                  <span className='mx-4'>:</span>
                    <FormInputNoLabelnew
                    disabled={true}
                      control={control}
                      name={'uraian_wo'}
                      as="textarea"
                  
                    />
                  </div>
                </Form.Group>
            </Col>
            {/* !END LEFT COLUMN  */}
          
          </Row>


          <Modal.Footer>
            <ButtonCancel type='modal' onClick={handleClose} />
            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
          </Modal.Footer>
         
        </Form>
      </FormData>
    </>
  );
}
