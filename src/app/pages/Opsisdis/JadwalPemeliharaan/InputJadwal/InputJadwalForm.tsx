import React, { useState } from 'react'
import { Card, Col, Row, Form, InputGroup, Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import TableDaftarTugasTask from '@app/modules/opsisdis/JawdalPemeliharaan/TableDaftarTugasTask';
import TableInputJadwalDaftarAset from '@app/modules/opsisdis/JawdalPemeliharaan/TableInputJadwalDaftarAset';

import { IInputJadwal, InputJadwalField } from '@app/interface/opsisdis-input-jadwal.interface';

import { OPTIONS_OBJECT_PEMELIHARAAN, OPTIONS_PRIORITAS, OPTIONS_SIFAT_PEMELIHARAAN, OPTIONS_LEVEL_PEMELIHARAAN, OPTIONS_KONDISI_PEKERJAAN } from '@app/configs/select-options.config';

import { API_PATH } from '@app/services/_path.service';

const tabOptions = [
  { label: 'Umum', value: '1' },
  { label: 'Daftar Tugas', value: '2' },
]

function InputJadwalForm() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const objectPemeliharaanOptions: any = OPTIONS_OBJECT_PEMELIHARAAN();
  const priorotasOptions: any = OPTIONS_PRIORITAS();
  const sifatPemeliharaanOptions: any = OPTIONS_SIFAT_PEMELIHARAAN();
  const levelPemeliharaanOptions: any = OPTIONS_LEVEL_PEMELIHARAAN();
  const kondisiPekerjaanOptions: any = OPTIONS_KONDISI_PEKERJAAN();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    
  });

  const [formModel] = useState<any>({status_data: 0});
  
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

  // const watchStatus = useWatch({ control, name: 'status_data' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IInputJadwal) => {
    setDataParams(data);
    loading;
  };

  // console.log("loading",loading);
  

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card style={{borderColor: 'var(--success)'}}>
            <Card.Header className='bg-success font-weight-light text-white'>FORM USULAN PEMELIHARAAN UP2D</Card.Header>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={InputJadwalField}
                path={API_PATH().apkt.trans_jar}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
                batch={true}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Card className='card-widget position-static mb-4' style={{border: '1px solid var(--black-50)'}}>
                    <Card.Header className='font-weight-light font-sise-large' style={{backgroundColor: 'var(--black-50)'}}>Detail Usulan Pemeliharaan</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>Tanggal Mulai Pekerjaan<RequiredInfo /></Form.Label>
                            <Form.Control
                              {...register('tgl_mulai_kerja')} 
                              type='datetime-local'
                              isInvalid={errors.tgl_mulai_kerja ? true : false}
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.tgl_mulai_kerja?.message}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Tanggal Selesai Pekerjaan<RequiredInfo /></Form.Label>
                            <Form.Control
                              {...register('tgl_selesai_kerja')} 
                              type='datetime-local'
                              isInvalid={errors.tgl_selesai_kerja}
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.tgl_selesai_kerja?.message}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Lama Durasi Pekerjaan</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('durasi_pekerjaan')}
                              isInvalid={errors.durasi_pekerjaan} 
                              placeholder="Durasi Pekerjaan" 
                              aria-describedby="basic-addon2" />
                              <InputGroup.Text id="basic-addon2">Jam</InputGroup.Text>
                            </InputGroup>
                            <Form.Control.Feedback type='invalid'>{errors?.durasi_pekerjaan?.message}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Objek Pemeliharaan</Form.Label>
                            <SelectFormStatic
                              control={control}
                              errors={errors}
                              fieldName={'object_pemeliharaan'}
                              options={objectPemeliharaanOptions}
                            ></SelectFormStatic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>
                            GI/GH/KP <RequiredInfo />
                            </Form.Label>
                            <SelectAsyncDynamic
                              fieldName="gi_gh_kp"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Titik Pemeliharaan <RequiredInfo /></Form.Label>
                          </Form.Group>
                          <Row>
                            <Col sm={8}>
                              <Form.Group className='mb-3'>
                                <SelectAsyncDynamic
                                  fieldName="titik_pemeliharaan"
                                  control={control}
                                  errors={errors}
                                  labelField={'nama_lokasi'}
                                  valueField={'id_ref_lokasi'}
                                  pathServiceName={'master.jaringan.ref_lokasi'}
                                  setValue={setValue}
                                  options={[]}
                                ></SelectAsyncDynamic>
                              </Form.Group>
                            </Col>
                            <Col sm={4}>
                              <Form.Group className='mb-3'>
                                <Form.Control {...register('type')} disabled />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className='mb-3'>
                            <Form.Label>Titik Manuver Jaringan</Form.Label>
                            <Form.Control
                              {...register('titik_manuver_jar')} 
                              as='textarea'
                              isInvalid={errors.titik_manuver_jar ? true : false} 
                              placeholder='ex. PMT ASM12 Buka, MTRZ SMP Joroeg Buka'
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.titik_manuver_jar?.message}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Wilayah Padam</Form.Label>
                            <Form.Control
                              {...register('wil_padam')} 
                              as='textarea'
                              isInvalid={errors.wil_padam ? true : false }
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.wil_padam?.message}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>Prioritas<RequiredInfo/></Form.Label>
                            <SelectFormStatic
                              control={control}
                              errors={errors}
                              fieldName={'prioritas'}
                              options={priorotasOptions}
                            ></SelectFormStatic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Sifat Pemeliharaan<RequiredInfo/></Form.Label>
                            <SelectFormStatic
                              control={control}
                              errors={errors}
                              fieldName={'sifat_pemeliharaan'}
                              options={sifatPemeliharaanOptions}
                            ></SelectFormStatic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Level Pemeliharaan<RequiredInfo/></Form.Label>
                            <SelectFormStatic
                              control={control}
                              errors={errors}
                              fieldName={'level_pemeliharaan'}
                              options={levelPemeliharaanOptions}
                            ></SelectFormStatic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Kondisi Pekerjaan<RequiredInfo/></Form.Label>
                            <SelectFormStatic
                              control={control}
                              errors={errors}
                              fieldName={'kondisi_pekerjaan'}
                              options={kondisiPekerjaanOptions}
                            ></SelectFormStatic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Ket. Pemeliharaan</Form.Label>
                            <Form.Control
                              {...register('ket_pemeliharaan')} 
                              as='textarea'
                              isInvalid={errors.ket_pemeliharaan ? true : false}
                            />
                            <Form.Control.Feedback type='invalid'>{errors?.ket_pemeliharaan?.message}</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Availibility</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('availibility')} disabled aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">%</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Status Komunikasi</Form.Label>
                            <Form.Control disabled {...register('status_komunikasi')}
                            />
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Prediksi Cuaca</Form.Label>
                            <SelectAsyncDynamic
                              fieldName="prediksi_cuaca"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Card className='card-widget position-static mb-4' style={{border: '1px solid var(--black-50)'}}>
                        <Card.Header className='font-weight-light font-sise-large' style={{backgroundColor: 'var(--black-50)'}}>Daftar Aset</Card.Header>
                        <Card.Body>
                          <TableInputJadwalDaftarAset />
                        </Card.Body>
                      </Card>
                      <Row>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>Jumlah Gardu Padam</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('jlh_gardu_padam')} 
                              type='number' 
                              aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Gardu</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Beban Padam</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('beban_padam')} 
                              type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">MW</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>ENS Pekerjaan</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('ens_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>ENS s.d Saat Ini</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('ens_saat_ini')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Estimasi ENS Akumulasi</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('ens_akumulasi')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>SAIFI Pekerjaan</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saifi_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>SAIFI s.d Saat Ini</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saifi_saat_ini')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Estimasi SAIFI Akumulasi</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saifi_akumulasi')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>Jumlah Pelanggan Padam</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('jlh_pelanggan_padam')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Jumlah Pelanggan UIW</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('jlh_pelanggan_uiw')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>SAIDI Pekerjaan</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saidi_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>SAIDI S.d saat ini</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saidi_saat_ini')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Estimasi SAIDI Akumulasi</Form.Label>
                            <InputGroup className="mb-3">
                              <Form.Control {...register('saidi_akumulasi')} type='number' aria-describedby="availibility-addon2" />
                              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Tabs defaultActiveKey="1" variant="pills" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3">
                    { tabOptions.map((tab: any) => (
                      <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                    )) }
                  </Tabs>

                  { tabActive == '1' && (
                    <>
                      <Row>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>Pembuat Usulan<RequiredInfo /></Form.Label>
                            <Form.Control {...register('pembuat_usulan')} disabled />
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>Area Pembuat Usulan</Form.Label>
                            <SelectAsyncDynamic
                              fieldName="area_pembuat_usulan"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              isDisabled
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className='mb-3'>
                            <Form.Label>
                              Penanggung Jawab <RequiredInfo />
                            </Form.Label>
                            <SelectAsyncDynamic
                              fieldName="penanggung_jawab"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>
                              Pengawas Pekerjaan <RequiredInfo />
                            </Form.Label>
                            <SelectAsyncDynamic
                              fieldName="pengawas_pekerjaan"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                          <Form.Group className='mb-3'>
                            <Form.Label>
                              Pengawas K3 <RequiredInfo />
                            </Form.Label>
                            <SelectAsyncDynamic
                              fieldName="pengawas_k3"
                              control={control}
                              errors={errors}
                              labelField={'nama_lokasi'}
                              valueField={'id_ref_lokasi'}
                              pathServiceName={'master.jaringan.ref_lokasi'}
                              setValue={setValue}
                              options={[]}
                            ></SelectAsyncDynamic>
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  ) }
                  { tabActive == '2' && (
                    <TableDaftarTugasTask />
                  ) }
                </Form>
              </FormData>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default InputJadwalForm