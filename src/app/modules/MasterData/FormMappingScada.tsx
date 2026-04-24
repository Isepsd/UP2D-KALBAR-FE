

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { SINKRON_DATA } from '@app/configs/select-options/jaringan.select';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useWatch } from 'react-hook-form';
import SelectFormStatic from '../SelectForm/SelectFormStatic';

interface IFormMappingScada {
  register: any
  errors: any
  control: any
  dataSelected: any
}
export default function FormMappingScada({
  register,
  errors,
  control,
  dataSelected
}: IFormMappingScada) {
  const sinkronOptions: any = SINKRON_DATA

  const watchSinkronData = useWatch({ control, name: 'sinkron_data' });
  return (
    <>
      <Form.Group className='mt-3'>
        <Form.Label>
          Sinkron Data <RequiredInfo />
        </Form.Label>
        <SelectFormStatic
          control={control}
          errors={errors}
          fieldName="sinkron_data"
          placeholder='Pilih Sinkron Data'
          options={sinkronOptions}
          defaultValue={dataSelected?.sinkron_data}

        ></SelectFormStatic>
      </Form.Group>
      {watchSinkronData == "SCADA" &&
        <>
          <Form.Group className='mt-3' controlId='id_i'>
            <Form.Label>
              ID I (Arus)
            </Form.Label>
            <Form.Control
              {...register('id_i')}
              isInvalid={errors.id_i}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_i?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='id_v'>
            <Form.Label>
              ID V (Tegangan)
            </Form.Label>
            <Form.Control
              {...register('id_v')}
              isInvalid={errors.id_v}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_v?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='id_p'>
            <Form.Label>
              ID P (Daya)
            </Form.Label>
            <Form.Control
              {...register('id_p')}
              isInvalid={errors.id_p}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_p?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='id_p'>
            <Form.Label>
              ID Q (Data Reaktif)
            </Form.Label>
            <Form.Control
              {...register('id_q')}
              isInvalid={errors.id_p}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_p?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='path1'>
            <Form.Label>
              PATH1
            </Form.Label>
            <Form.Control
              {...register('path1')}
              isInvalid={errors.path1}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.path1?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='path2'>
            <Form.Label>
              PATH2
            </Form.Label>
            <Form.Control
              {...register('path2')}
              isInvalid={errors.path2}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.path2?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='path3'>
            <Form.Label>
              PATH3
            </Form.Label>
            <Form.Control
              {...register('path3')}
              isInvalid={errors.path3}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.path3?.message}
            </Form.Control.Feedback>
          </Form.Group>


        </>

      }
      {watchSinkronData == "AMR" &&

        <Form.Group className='mt-3' controlId='id_amr'>
          <Form.Label>
            ID AMR<RequiredInfo />
          </Form.Label>
          <Form.Control
            {...register('id_amr')}
            isInvalid={errors.id_amr}
          />
          <Form.Control.Feedback type='invalid'>
            {errors?.id_amr?.message}
          </Form.Control.Feedback>
        </Form.Group>

      }
      {watchSinkronData == "PORTAL EXT" &&
        <>
          <Form.Group className='mt-3' controlId='id_portal_ext'>
            <Form.Label>
              ID Portal EXT<RequiredInfo />
            </Form.Label>
            <Form.Control
              {...register('id_portal_ext')}
              isInvalid={errors.id_portal_ext}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.id_portal_ext?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='url_webservice'>
            <Form.Label>
              URL Webservice<RequiredInfo />
            </Form.Label>
            <Form.Control
              {...register('url_webservice')}
              isInvalid={errors.url_webservice}
            />
            <Form.Control.Feedback type='invalid'>
              {errors?.url_webservice?.message}
            </Form.Control.Feedback>
          </Form.Group>

        </>
      }


    </>
  );
}
