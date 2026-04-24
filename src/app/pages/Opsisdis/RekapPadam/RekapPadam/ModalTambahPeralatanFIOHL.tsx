import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import * as Yup from 'yup';

import Button from '@app/components/Button/Button';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { API_PATH } from '@app/services/_path.service';

import FormDataModal from '@app/modules/Form/FormDataModal';
import moment from 'moment';
import { PeralatanFIOHLField } from '@app/interface/opsis-peralatn-fiohl.interface';

const option_indikasi = [
  { label: "R", value: 'R' },
  { label: "S", value: 'S' },
  { label: "T", value: 'T' },
  { label: "RS", value: 'RS' },
  { label: "RT", value: 'RT' },
  { label: "ST", value: 'ST' },
  { label: "RST", value: 'RST' },
]

function ModalTambahPertalatanFIOHL({ idTransEp, dataSelected }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal: Yup.string().typeError("Format waktu salah").required("Data ini harus diisi"),
  });

  const [formModel] = useState<any>();
  const { handleSubmit, setValue, setError, control, formState, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    data.id_trans_ep = idTransEp
    setDataParams(data);
  };

  const initForm = (data: any = null) => {
    Object.keys(PeralatanFIOHLField).map((field: any) => {
      if (data) {
        switch (field) {
          case 'tgl_close':
          case 'tgl_open':
            let date = data[field] ? data[field].replace('+07:00', '') : null
            setValue(field, date ? date : "")
            break;
          case 'tanggal':
            let dates = data[field] ? data[field].replace('+07:00', '') : null
            setValue(field, dates ? moment(dates).format("YYYY-MM-DD") : "")
            break;
          default:
            setValue(field, data[field]);
            break;
        }
      }
    });
  }

  useEffect(() => {
    initForm(dataSelected)
  }, [dataSelected])

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
                fields={PeralatanFIOHLField}
                path={API_PATH().opsisdis.rekap_padam.tranf_ep_peralatan_fiohl}
                onLoading={setLoading}
                customLabel={'hide'}
                dataSelected={dataSelected}
                ids="id_trans_ep_peralatan_fiohl"
                isModal={true}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <>
                    <Row>
                      <Col md={4}>
                        <Form.Group className='mb-3'>
                          <Form.Label >Tanggal</Form.Label>
                          <FormControl
                            {...register('tanggal')}
                            type='datetime-local'
                            step='1'
                          />
                          {errors?.tgl_entri && (
                            <div className='invalid-feedback d-block'>
                              {errors?.tgl_entri?.message}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
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
                              id_ref_lokasi_in: '6,8,7'
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className='mb-3'>
                          <Form.Label>Indikasi</Form.Label>
                          <SelectFormStatic
                            control={control}
                            errors={errors}
                            fieldName={'indikasi'}
                            options={option_indikasi}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                  <div className='gap-2 text-right'>
                    <ButtonCancel type='modal' ids='id' />
                    <Button
                      type='submit'
                      variant='primary'
                      className='ms-1'
                      isLoading={loading}
                    >
                      Simpan
                    </Button>
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

export default ModalTambahPertalatanFIOHL;
