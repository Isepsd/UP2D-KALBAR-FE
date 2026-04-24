import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { OPTIONS_KONDISI_PEKERJAAN, OPTIONS_LEVEL_PEMELIHARAAN, OPTIONS_OBJECT_PEMELIHARAAN, OPTIONS_PRIORITAS, OPTIONS_SIFAT_PEMELIHARAAN } from '@app/configs/select-options.config';

interface IInputJadwalForm {
  register: any,
  errors: any,
  control: any
  setValue: any
}

function InputJadwalFormFirst({
  register,
  errors,
  control,
  setValue
}: IInputJadwalForm) {
  const objectPemeliharaanOptions: any = OPTIONS_OBJECT_PEMELIHARAAN();
  const priorotasOptions: any = OPTIONS_PRIORITAS();
  const sifatPemeliharaanOptions: any = OPTIONS_SIFAT_PEMELIHARAAN();
  const levelPemeliharaanOptions: any = OPTIONS_LEVEL_PEMELIHARAAN();
  const kondisiPekerjaanOptions: any = OPTIONS_KONDISI_PEKERJAAN();

  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Tanggal Mulai Pekerjaan<RequiredInfo /></Form.Label>
            <Form.Control
              {...register('tgl_mulai_kerja')} type='datetime-local'
              isInvalid={errors.tgl_mulai_kerja}
            />
            <Form.Control.Feedback type='invalid'>{errors?.tgl_mulai_kerja?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Tanggal Selesai Pekerjaan<RequiredInfo /></Form.Label>
            <Form.Control
              {...register('tgl_selesai_kerja')} type='datetime-local'
              isInvalid={errors.tgl_selesai_kerja}
            />
            <Form.Control.Feedback type='invalid'>{errors?.tgl_selesai_kerja?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Lama Durasi Pekerjaan</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('durasi_pekerjaan')}
                isInvalid={errors.durasi_pekerjaan} placeholder="Durasi Pekerjaan" aria-describedby="basic-addon2" />
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
              {...register('titik_manuver_jar')} as='textarea'
              isInvalid={errors.titik_manuver_jar} placeholder='ex. PMT ASM12 Buka, MTRZ SMP Joroeg Buka'
            />
            <Form.Control.Feedback type='invalid'>{errors?.titik_manuver_jar?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Wilayah Padam</Form.Label>
            <Form.Control
              {...register('wil_padam')} as='textarea'
              isInvalid={errors.wil_padam}
            />
            <Form.Control.Feedback type='invalid'>{errors?.wil_padam?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Prioritas<RequiredInfo /></Form.Label>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'prioritas'}
              options={priorotasOptions}
            ></SelectFormStatic>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Sifat Pemeliharaan<RequiredInfo /></Form.Label>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'sifat_pemeliharaan'}
              options={sifatPemeliharaanOptions}
            ></SelectFormStatic>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Level Pemeliharaan<RequiredInfo /></Form.Label>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'level_pemeliharaan'}
              options={levelPemeliharaanOptions}
            ></SelectFormStatic>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Kondisi Pekerjaan<RequiredInfo /></Form.Label>
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
              {...register('ket_pemeliharaan')} as='textarea'
              isInvalid={errors.ket_pemeliharaan}
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
    </>
  )
}
export default InputJadwalFormFirst