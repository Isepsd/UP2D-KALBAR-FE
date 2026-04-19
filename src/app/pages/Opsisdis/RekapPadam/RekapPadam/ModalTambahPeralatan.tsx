import React, { useState } from 'react';
import { Card, Col, Row, Form, InputGroup } from 'react-bootstrap';
// import { Card, Col, Row, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import * as Yup from 'yup';

import Button from '@app/components/Button/Button';
import InputForm from '@app/components/Input/FormInputNoLabel';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import InputDate from '@app/components/Date/InputDate';
import { API_PATH } from '@app/services/_path.service';

import { get } from 'lodash';
import { OpsisPeralatanRCFeild } from '@app/interface/opsis-peralatan-rc.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

const option_eksekusi_rc = [
  { label: "BERHASIL", value: 'BERHASIL' },
  { label: "GAGAL", value: 'GAGAL' },
  { label: "MANUAL", value: 'MANUAL' },
]

const option_status = [
  { label: "VALID", value: 'VALID' },
  { label: "INVALID", value: 'INVALID' },
  { label: "OOS", value: 'OOS' },
  { label: "MECHANISM FAIL", value: 'MECHANISM FAIL' },
]
// const option_waktu_masuk = [

//   { label: "OPEN", value: 'OPEN' },
//   { label: "CLOSE", value: 'CLOSE' },
// ]

const option_status_oprasi = [
  { label: "MANUAL", value: 'MANUAL' },
  { label: "TC", value: 'TC' },
  { label: "TRIP", value: 'TRIP' },
]

// const option_status_manufer = [
//   { label: "NORMAL", value: 'NORMAL' },
//   { label: "BELUM NORMAL", value: 'BELUM NORMAL' },
// ]

const jenis_peralatan = [
  { label: "PERALATAN", value: 'KEYPOINT' },
  { label: "LBS MANUAL", value: 'LBS MANUAL' },

]

function ModalTambahPertalatan({ idTransEp, dataSelected }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    // id_peralatan: Yup.number().typeError("Format waktu salah").required("Data ini harus diisi"),
    // tgl_entri: Yup.string().typeError("Format waktu salah").required("Data ini harus diisi"),
    beban: Yup.string().required("Data ini harus diisi"),
    beban_masuk: Yup.string().nullable(),
    r: Yup.string().typeError("Data harus angka"),
    s: Yup.string().typeError("Data harus angka"),
    t: Yup.string().typeError("Data harus angka"),
    n: Yup.string().typeError("Data harus angka"),
    keterangan: Yup.string().nullable(),
    id_peralatan: Yup.string().nullable(),
    peralatan_rc: Yup.string().nullable(),
    lbs_manual: Yup.string().nullable(),
    id_ref_ep_ag_hmi: Yup.string().required("Data belum dipilih"),
    // status_manuver: Yup.string().required("Data belum dipilih"),
    jenis_peralatan: Yup.string().required("Data belum dipilih"),
    status_operasi: Yup.string().required("Data belum dipilih"),
    status_rc_open: Yup.string().nullable(),
    rc_open: Yup.string().nullable(),
    tgl_open: Yup.string().nullable(),
    status_rc_close: Yup.string().nullable(),
    section: Yup.string().nullable(),
    waktu_masuk: Yup.string().nullable(),
    rc_close: Yup.string().nullable(),
    tgl_close: Yup.string().nullable(),
  });

  const [formModel] = useState<any>();
  const { handleSubmit, setValue, setError, control, formState, register,watch} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
 // Define the watch value for the dropdown
 const watchDropdown = useWatch({
  control,
  name: 'satuan',
  defaultValue: 'A', // Set the default value to 'A'
});
  // const watchPeralatan = useWatch({ control, name: 'peralatan', defaultValue: 'PERALATAN' });
  const watchLJenisPeralatan = useWatch({ control, name: 'jenis_peralatan', defaultValue: 'jenis_peralatan' });
  // const useWatchTgl_Open = useWatch({control, name: 'waktu_masuk'});
  const [ens, setEns] = useState('');
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.id_trans_ep = idTransEp
    if (!data?.tgl_close) {
      delete data.tgl_close
    }
    if (!data?.tgl_open) {
      delete data.tgl_open
    }

    console.log("data", data);
    console.log("error", errors);

    setDataParams(data);
  };

  // const initForm = (data: any = null) => {
  //   Object.keys(OpsisPeralatanRCFeild).map((field: any) => {
  //     if (data) {
  //       switch (field) {
  //         case 'tgl_close':
  //         case 'tgl_open':
  //           let date = data[field] ? data[field].replace('+07:00', '') : null
  //           setValue(field, date ? date : "")
  //           break;
  //         case 'tgl_entri':
  //           let dates = data[field] ? data[field].replace('+07:00', '') : null
  //           setValue(field, dates ? moment(dates).format("YYYY-MM-DD") : "")
  //           break;
  //         default:
  //           setValue(field, data[field]);
  //           break;
  //       }
  //     }
  //   });
  // }

  // useEffect(() => {
  //   initForm(dataSelected)
  // }, [dataSelected])

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
  
    // Assuming setValue is a function to update the state of the input field
    setValue(name, value);
  
    // Assuming r, s, t, n are defined and have the parsed values
    const beban = parseFloat(value);
  
    // Calculate rstn (sum of r, s, t, and n)
    const jmlBeban = beban;
  
    // Extract the hour from waktu_masuk using watch
    const waktu_masuk = watch('waktu_masuk');
    const getHours = (dateString: any) => {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 0 : date.getHours(); // Return 0 if date is invalid
    };
  
    const jam = getHours(waktu_masuk);
  
    // Calculate the final result using the formula
    let Jumlah = jmlBeban * 20 * jam * Math.cbrt(3) * 0.95 / 1000;
  
    // Round Jumlah to 2 decimal places
    Jumlah = parseFloat(Jumlah.toFixed(2));
  
    // Assuming setEns is a function to update something related to "Ens"
    setEns(Jumlah.toString());
  };
  
  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormDataModal
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={OpsisPeralatanRCFeild}
                path={API_PATH().opsisdis.rekap_padam.trans_ep_peralatan2}
                onLoading={setLoading}
                customLabel={'hide'}
                dataSelected={dataSelected}
                ids="id_trans_ep_peralatan"
                isModal={true}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <>
                    <Row className='mb-2'>
                      {/* <Col md={2}>
                        <Form.Group className='mb-3'>
                          <Form.Label >Tanggal</Form.Label>
                          <FormControl
                            {...register('tgl_entri')}
                            type='datetime-local'
                          />
                          {errors?.tgl_entri && (
                            <div className='invalid-feedback d-block'>
                              {errors?.tgl_entri?.message}
                            </div>
                          )}
                        </Form.Group>
                      </Col> */}
                      <Col>
                        <Form.Group className='mb-3'>
                          <Form.Label>Jenis Peralatan</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'jenis_peralatan'}
                            options={jenis_peralatan}
                          />
                        </Form.Group>
                      </Col>
                      {watchLJenisPeralatan === "LBS MANUAL" &&
                        <Col md={3} className="">
                          <Form.Group className='mb-3'>
                            <Form.Label >LBS MANUAL</Form.Label>
                            <Col md={12}>

                              <Form.Control
                                {...register('peralatan_rc')}
                                isInvalid={errors?.peralatan_rc as boolean | undefined}
                              />

                            </Col>
                          </Form.Group>
                        </Col>}
                      {watchLJenisPeralatan === "KEYPOINT" &&
                        <Col>
                          <Form.Group className='mb-3'>
                            <Form.Label>Peralatan</Form.Label>

                            <SelectAsyncDynamic
                              required={true}
                              fieldName={'id_peralatan'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              placeholder={'Pilih...'}
                              isClearable={true}
                              errors={errors}
                              control={control}
                              queryParams={{
                                page: -1,
                                id_ref_lokasi_in: '6,36'
                              }}

                            />

                          </Form.Group>
                        </Col>}
                      <Col className="">
                        <Form.Group>
                          <Form.Label>Arus gangguan HMI</Form.Label>
                          <SelectAsyncDynamic
                            fieldName={'id_ref_ep_ag_hmi'}
                            pathServiceName={
                              'master.opsisdis.rekap_padam.ag_hmi'
                            }
                            labelField={'nama'}
                            valueField={'id_ref_ep_ag_hmi'}
                            placeholder={'Pilih...'}
                            isClearable={true}
                            errors={errors}
                            control={control}
                            queryParams={{ page: -1 }}
                            options={dataSelected?.ref_fai_arus_ggn_hmi}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Status Operasi</Form.Label>
                        </Form.Group>
                        <SelectFormStatic
                          control={control}
                          errors={errors}
                          fieldName={'status_operasi'}
                          options={option_status_oprasi}
                        />
                      </Col>
                    </Row>
                    <Row className='mb-2'>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Beban</Form.Label>
                        <InputGroup>
                          {/* <InputForm control={control} placeholder="0.00" name="beban" /> */}
                          <Form.Control placeholder="0.00" {...register('beban')} onChange={handleInputChange}  />
                          {/* Dropdown for "A" and "MW" */}
                          <Form.Select style={{ fontSize: '12px' }} {...register('satuan')}>
                          <option value="" style={{ fontSize: '12px' }}>Pilih Beban</option>
                          <option value="A" style={{ fontSize: '12px' }}>A</option>
                          <option value="MW" style={{ fontSize: '12px' }}>MW</option>
                        </Form.Select>
                        </InputGroup>
                        {errors && errors.beban && (
                          <div className="invalid-feedback d-block">{errors.beban.message}</div>
                        )}
                      </Form.Group>
                    </Col>
                    {watchDropdown === 'A' && (
                      <Col md={9}>
                        <Form.Group>
                          <Form.Label>Arus Gangguan</Form.Label>
                        </Form.Group>
                        <Row>
                          <Col md={3} className='mb-3'>
                            <InputGroup>
                              <InputGroup.Text>R</InputGroup.Text>
                              <Form.Control {...register('r')}  />
                              <InputGroup.Text>A</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "r") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "r")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={3} className='mb-3'>
                            <InputGroup>
                              <InputGroup.Text>S</InputGroup.Text>
                              <Form.Control {...register('s')}  />
                              <InputGroup.Text>A</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "s") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "s")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={3} className='mb-3'>
                            <InputGroup>
                              <InputGroup.Text>T</InputGroup.Text>
                              <Form.Control {...register('t')}  />
                              <InputGroup.Text>A</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "t") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "t")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={3} className='mb-3'>
                            <InputGroup>
                              <InputGroup.Text>N</InputGroup.Text>
                              <Form.Control {...register('n')}  />
                              <InputGroup.Text>A</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "n") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "n")?.message}
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    )}
                        </Row>
                    
                    <Row className='mb-2'>

                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Eksekusi Open</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'rc_open'}
                            options={option_eksekusi_rc}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Status Open</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'status_rc_open'}
                            options={option_status}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Waktu Open</Form.Label>
                          <InputDate
                            errors={errors}
                            register={register}
                            type="datetime-local"
                            fieldName="tgl_open"
                            step={1}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Eksekusi Close</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'rc_close'}
                            options={option_eksekusi_rc}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label>Status Close</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'status_rc_close'}
                            options={option_status}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label>Waktu Close</Form.Label>
                          <InputDate
                            errors={errors}
                            register={register}
                            type="datetime-local"
                            fieldName="tgl_close"
                            step={1}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className='mb-4'>
                      <Col md={12} className="">
                        <Form.Group>
                          <Form.Label>Keterangan</Form.Label>
                          <InputForm
                            control={control}
                            name={'keterangan'}
                            as="textarea"
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col md={4} className="">
                        <Form.Group>
                          <Form.Label>Status Manuver</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'status_manuver'}
                            options={option_status_manufer}
                          />
                        </Form.Group>
                      </Col> */}


                    </Row>
                    <Row className='mb-2'>

                      <Col md={3} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Section</Form.Label>
                          <Col md={12}>
                            <Form.Control {...register('section')} isInvalid={errors?.section as boolean | undefined} />
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col md={3} className="">
                        <Form.Group className='mb-3'>
                          <Form.Label >Waktu Masuk</Form.Label>
                          {/* <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'waktu_masuk'}
                            options={option_waktu_masuk}
                          /> */}
                           <InputDate
                            errors={errors}
                            register={register}
                            type="datetime-local"
                            fieldName="waktu_masuk"
                            step={1}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>

                      

                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label>Beban Masuk</Form.Label>
                        </Form.Group>
                        <InputGroup>
                          <InputForm control={control} name={'beban_masuk'} />
                          <InputGroup.Text>A</InputGroup.Text>
                        </InputGroup>
                        {get(errors, "beban_masuk") && (
                          <div className='invalid-feedback d-block'>
                            {get(errors, "beban_masuk")?.message}
                          </div>
                        )}
                      </Col>

                      <Col md={3} className="mb-3">
                        <Form.Group>
                          <Form.Label>ENS</Form.Label>
                        </Form.Group>
                        <InputGroup>
                        <Form.Control {...register('ens')} type="text"
                                name="ens"
                                value={ens}
                                readOnly
                                    
                             isInvalid={errors?.ens as boolean | undefined}
                                                   />
                          <InputGroup.Text>kWh</InputGroup.Text>
                        
                        </InputGroup>
                      </Col>

                    </Row>
                  </>
                  <div className='gap-2 text-right'>
                    <ButtonCancel type='modal' ids='id' />
                    <Button type='submit' variant='primary' className='ms-1' isLoading={loading} > Simpan </Button>
                  </div>
                </Form>
              </FormDataModal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ModalTambahPertalatan;
