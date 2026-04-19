import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

import { Controller, useWatch } from 'react-hook-form';

import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_PEKERJAAN_OPTIONS } from '@app/configs/select-options/working-permit.select';

interface IFormDataWP {
  control: any
  errors: any
  register: any
  watchJenisPekerjaan: any
  watchManuver: any
  watchGrounding: any
  dataSelected: any
}

export default function FormDataWP({
  control,
  errors,
  register,
  watchJenisPekerjaan,
  watchManuver,
  watchGrounding,
  dataSelected
}: IFormDataWP) {

  const watchBagian = useWatch({ control: control, name: "id_wp_master_bagian" })


  return (
    <>
      <Row>
        <Col md='5' xs='12'>
          <Form.Group className='mb-3'>
            <Form.Label>Jenis Pekerjaan</Form.Label>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'jenis_pekerjaan'}
              options={JENIS_PEKERJAAN_OPTIONS}
            ></SelectFormStatic>
            <Form.Control.Feedback type='invalid'>
              {errors?.jenis_pekerjaan?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Pekerjaan yg akan dilakukan</Form.Label>
            <Form.Control {...register('pekerjaan_dilakukan')} isInvalid={errors.pekerjaan_dilakukan} />
            <Form.Control.Feedback type='invalid'>
              {errors?.pekerjaan_dilakukan?.message}
            </Form.Control.Feedback>
          </Form.Group>


        

          <Form.Group className='mb-3'>
            <Form.Label>Detail Lokasi Pekerjaan</Form.Label>
            <Form.Control as="textarea" row="3" {...register('lokasi_pekerjaan')} isInvalid={errors.lokasi_pekerjaan} placeholder="Masukan detail lokasi pekerjaan" />
            <Form.Control.Feedback type='invalid'>
              {errors?.lokasi_pekerjaan?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Bagian</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_wp_master_bagian'
              pathServiceName='master.working_permit.bagian'
              labelField='name'
              valueField='id_wp_master_bagian'
              placeholder='Pilih...'
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'name' }}

            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Referensi SOP dan JSA</Form.Label>
            <SelectAsyncDynamic
              fieldName='nomor_sop'
              pathServiceName='working_permit.sop_jsa'
              labelField='judul_pekerjaan'
              valueField='id_wp_master_sop_jsa'
              placeholder='Pilih...'
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'sop_jsa' }}
              options={dataSelected?.master_sop_jsa}
              isClearable={true}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Referensi Hirarc</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_wp_hirarc'
              pathServiceName='working_permit.hirarc'
              labelField='pekerjaan'
              valueField='id_wp_hirarc'
              placeholder='Pilih...'
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'pekerjaan' }}
              options={dataSelected?.wp_hirarc}
              isClearable={true}
            />
          </Form.Group>



          {
            dataSelected == undefined &&
            <Form.Group className='mb-3'>
              <Form.Label>Nama Pekerja <span className="small text-danger">*Untuk menambahkan daftar pekerja, ketik nama pekerja kemudian tekan enter</span></Form.Label>

              <Controller
                name="nama_pekerja"
                render={({ field }) => (
                  <CreatableSelect
                    isMulti={true}
                    {...field}
                    options={[]}
                    isClearable={true}
                    placeholder="Ketik nama pekerja..."
                  />
                )}
                control={control}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.nama_pekerja?.message}
              </Form.Control.Feedback>
            </Form.Group>
          }
          {
            watchJenisPekerjaan == 'EXTERNAL' &&
            <>
              <Form.Group className='mb-3'>
                <Form.Label>Unit / Vendor Pelaksana</Form.Label>
                <SelectAsyncDynamic
                  fieldName='vendor_pelaksana'
                  pathServiceName='master.admin_ksa.perusahaan'
                  labelField='nama'
                  valueField='id_perusahaan'
                  placeholder='Pilih...'
                  errors={errors}
                  control={control}
                  queryParams={{ sort_by: 'nama' }}
                  isClearable={true}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Nama Koordinator Vendor</Form.Label>
                <Form.Control {...register('nama_koordinator_vendor')} isInvalid={errors.nama_koordinator_vendor} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_koordinator_vendor?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </>

          }

          <Row>
            <Form.Group as={Col} className='mb-3'>
              <Form.Label>Tanggal dan Waktu Mulai Pekerjaan</Form.Label>
              <Form.Control
                type='datetime-local'
                formTarget='YYYY-MM-DD HH:mm'
                {...register('tgl_pekerjaan')}
                isInvalid={errors.tgl_pekerjaan} />
              <Form.Control.Feedback type='invalid'>
                {errors?.tgl_pekerjaan?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className='mb-3'>
              <Form.Label>Tanggal dan Waktu Selesai Pekerjaan	</Form.Label>
              <Form.Control
                type='datetime-local'
                formTarget='YYYY-MM-DD HH:mm'
                {...register('tgl_pekerjaan_selesai')}
                isInvalid={errors.tgl_pekerjaan_selesai} />
              <Form.Control.Feedback type='invalid'>
                {errors?.tgl_pekerjaan_selesai?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Label>Petugas Zona Kerja</Form.Label>
            <div className='py-2'>
              <Form.Check
                inline
                type='switch'
                id='petugas_zona1'
                {...register('petugas_zona1')}
                label={'Petugas GI'}
              />
              <Form.Check
                inline
                type='switch'
                id='petugas_zona2'
                {...register('petugas_zona2')}
                label={'Petugas GH'}
              />
              <Form.Check
                inline
                type='switch'
                id='petugas_zona3'
                {...register('petugas_zona3')}
                label={'Petugas Rayon'}
              />
            </div>
          </Form.Group>



          <Form.Group className='mb-3'>
            <Form.Label>Perlu Grounding</Form.Label>
            <div className='ms-3 py-2'>
              <Form.Check
                type='switch'
                id='grounding'
                {...register('grounding')}
                label={watchGrounding === true ? 'Ya' : 'Tidak'}
              />
            </div>
          </Form.Group>

        </Col>
        <Col md={5} xs={12}>
          <Form.Group className='mb-3'>
            <Form.Label>Perlu Manuver / Padam 20 kv</Form.Label>
            <div className='ms-3 py-2'>
              <Form.Check
                type='switch'
                id='manuver'
                {...register('manuver')}
                label={watchManuver === true ? 'Ya' : 'Tidak'}
              />
            </div>
          </Form.Group>

         
          <Form.Group className='mb-3'>
            <Form.Label>Nama SPV</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_user_spv'
              pathServiceName='admin.user'
              labelField='fullname'
              valueField='id_user'
              placeholder='Pilih...'
              required={true}
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'fullname' }}
              isClearable={true}
              watchParent={watchBagian}
              fieldNameParent="id_bagian"
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nama AsMan</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_user_asman'
              pathServiceName='admin.user'
              labelField='fullname'
              valueField='id_user'
              placeholder='Pilih...'
              required={true}
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'fullname' }}
              isClearable={true}
              watchParent={watchBagian}
              fieldNameParent="id_bagian"
            />
          </Form.Group>
          {watchManuver &&
            <Form.Group className='mb-3'>
              <Form.Label>PIC Persetujuan Padam</Form.Label>
              <SelectAsyncDynamic
                fieldName='id_user_opsis'
                pathServiceName='admin.user'
                labelField='fullname'
                valueField='id_user'
                placeholder='Pilih...'
                required={true}
                errors={errors}
                control={control}
                queryParams={{ sort_by: 'fullname' }}
                isClearable={true}
                watchParent={watchBagian}
                fieldNameParent="id_bagian"
              />
            </Form.Group>

          }
          <Form.Group className='mb-3'>
            <Form.Label>Nama Pengawas</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_pengawas'
              pathServiceName='admin.user'
              labelField='fullname'
              valueField='id_user'
              placeholder='Pilih...'
              required={true}
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'fullname' }}
              isClearable={true}
            />
          </Form.Group>



          <Form.Group className='mb-3'>
            <Form.Label>Nama Pengawas K3</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_pengawask3'
              pathServiceName='admin.user'
              labelField='fullname'
              valueField='id_user'
              placeholder='Pilih...'
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'fullname' }}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Nama Manager</Form.Label>
            <SelectAsyncDynamic
              fieldName='id_user_manager'
              pathServiceName='admin.user'
              labelField='fullname'
              valueField='id_user'
              placeholder='Pilih...'
              errors={errors}
              control={control}
              queryParams={{ sort_by: 'fullname' }}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
