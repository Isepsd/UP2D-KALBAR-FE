import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { IWpHirarcDetail, WpHirarcDetailField } from '@app/interface/wp-hirarc.interface';
import SelectFormStatic from '../SelectForm/SelectFormStatic';
import {
  AKIBAT_OPTIONS,
  PELUANG_OPTIONS,
} from '@app/configs/select-options/working-permit.select';

export default function WmHirarcDetailForm() {
  let [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    kegiatan: Yup.string().required(),
    bahaya: Yup.string().required(),
    resiko_bahaya: Yup.string().required(),
    peluang: Yup.string()
      .nullable(),
    akibat: Yup.string()
      .nullable(),
    pengendalian: Yup.string().required(),
    penanggung_jawab:Yup.string().required(),
  });

  const [formModel] = useState<any>({ status: '1' });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IWpHirarcDetail) => {
    data.id_wp_hirarc = parseInt((searchParams.get("hirarc") as any))
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpHirarcDetailField}
        path={API_PATH().working_permit.hirarc_detail}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        ids="ids"
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>
                Kegiatan <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('kegiatan')}
                isInvalid={errors.kegiatan}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.kegiatan?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Bahaya(HAZARD) <RequiredInfo />
              </Form.Label>
              <Form.Control {...register('bahaya')} isInvalid={errors.bahaya} />
              <Form.Control.Feedback type='invalid'>
                {errors?.bahaya?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Resiko Bahaya(Risk) <RequiredInfo />
              </Form.Label>
              <Form.Control
                {...register('resiko_bahaya')}
                isInvalid={errors.resiko_bahaya}
              />
              <Form.Control.Feedback type='invalid'>
                {errors?.resiko_bahaya?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Peluang</Form.Label>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={'peluang'}
                options={PELUANG_OPTIONS}
              ></SelectFormStatic>
              <Form.Control.Feedback type='invalid'>
                {errors?.peluang?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Akibat</Form.Label>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={'akibat'}
                options={AKIBAT_OPTIONS}
              ></SelectFormStatic>
              <Form.Control.Feedback type='invalid'>
                {errors?.akibat?.message}
              </Form.Control.Feedback>
            </Form.Group> 

            <Form.Group className='mb-3'>
              <Form.Label>Pengendalian Resiko<RequiredInfo />
              </Form.Label>
              <Form.Control {...register('pengendalian')} isInvalid={errors.pengendalian} />
              <Form.Control.Feedback type='invalid'>
                {errors?.pengendalian?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <hr />
            <Form.Group className='mb-3'>
              <Form.Label>Peluang Setelah Pengendalian</Form.Label>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={'peluang2'}
                options={PELUANG_OPTIONS}
              ></SelectFormStatic>
              <Form.Control.Feedback type='invalid'>
                {errors?.peluang2?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Akibat Setelah Pengendalian</Form.Label>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={'akibat2'}
                options={AKIBAT_OPTIONS}
              ></SelectFormStatic>
              <Form.Control.Feedback type='invalid'>
                {errors?.akibat2?.message}
              </Form.Control.Feedback>
            </Form.Group> 
{/* 
            <Form.Group className='mb-3'>
              <Form.Label>Tingkat Resiko <RequiredInfo />
              </Form.Label>
              <Form.Control {...register('tingkat_resiko')} isInvalid={errors.tingkat_resiko} />
              <Form.Control.Feedback type='invalid'>
                {errors?.tingkat_resiko?.message}
              </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className='mb-3'>
              <Form.Label>Penganggung Jawab <RequiredInfo />
              </Form.Label>
              <Form.Control {...register('penanggung_jawab')} isInvalid={errors.penanggung_jawab} />
              <Form.Control.Feedback type='invalid'>
                {errors?.penanggung_jawab?.message}
              </Form.Control.Feedback>
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='ids' />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormData>
    </>
  );
}
