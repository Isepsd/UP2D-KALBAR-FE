import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
import { SELECT_UFR } from '@app/configs/select-options.config';
import FormData from '@app/modules/Form/FormData';
import { API_PATH } from '@app/services/_path.service';
import { DokumentasiUFRField } from '@app/interface/dokumentasi-ufr.interface';
import ButtonSubmit from '@app/components/Button/ButtonSubmit';
import { useSelector } from 'react-redux';

export default function FormSubmit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { list } = useSelector(
    (state: any) => state.ufr
  );
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    ufr: Yup.number().typeError("UFR tidak valid").required("UFR belum dipilih"),
    id_ref_lokasi: Yup.array().typeError("Belum Pilih Data").required("Belum Pilih Data"),
  });

  const [formModel] = useState<any>({});
  const optionData: any = SELECT_UFR()
  const {
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
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  useEffect(() => {
    let id: any = []
    list?.map((item: any) => {
      id.push(item?.id)
    })
    setValue("id_ref_lokasi", id)
  }, [list])

  return (
    <>
      {list && list?.length > 0 &&
        <FormData
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={DokumentasiUFRField}
          path={`${API_PATH().opsisdis.ufr}/update`}
          onLoading={setLoading}
          customLabel={'hide'}
          isModal={true}
        // batch={true}
        >
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Row className='mt-3'>
              <Col md={3} className="mt-2">
                <Form.Group className='' controlId='general_mode'>
                  <Form.Label>Pindah ke UFR</Form.Label>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='ufr'
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        placeholder='Pilih UFR'
                        styles={ReactSelectStyle}
                        classNamePrefix={`${errors.ufr ? 'is-invalid' : ''}`}
                        inputRef={ref}
                        value={optionData?.filter(
                          (c: any) => c.value == value
                        )}
                        onChange={(val: any) => onChange(val?.value)}
                        options={optionData}
                      // isClearable={true}
                      />
                    )}
                  />
                  {errors.ufr && (
                    <div className='invalid-feedback d-block'>
                      {errors.ufr?.message}
                    </div>
                  )}
                </Form.Group>
              </Col>

            </Row>
            <div className="mt-4">
              <ButtonSubmit className="justify-content-start" loading={loading} onClickReset={() => onSubmitForm(null)} />

            </div>
          </Form>
        </FormData>
      }
    </>
  );
}
