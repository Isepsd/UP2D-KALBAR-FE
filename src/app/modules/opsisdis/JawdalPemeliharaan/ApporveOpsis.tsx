import React, { useEffect, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import FormInputControlColumn from '@app/components/Input/FormInputControlColumn';
import InputDate from '@app/components/Date/InputDate';

import { IJadwalPemerliharaan, JadwalPemerliharaanFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import FormDataModal from '@app/modules/Form/FormDataModal';

// interface IFormUploadDocumentSLD {
//   garduInduk: any;
//   kelompok: string
// }

function ApporveOpsis({
  dataSelected,
  type
}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    keterangan: Yup.string().nullable(),
    // id_gardu_induk: Yup.string().nullable(),
    // id_penyulang: Yup.string().nullable()
    id_gardu: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_up3: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    // pekerjaan: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_pengawas: Yup.number().typeError("Data belum dipilih").required("Data belum dipilih"),
    date: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jam1: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jam2: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jenis_jadwal: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    jenis_pelayanan: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_pelaksana: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    id_ref_jenis_pekerjaan: Yup.string().typeError("Data belum dipilih").required("Data belum dipilih"),
    butuh_padam: Yup.string().nullable(),
    wilayah_padam: Yup.string().nullable(),
    wilayah: Yup.string().nullable()
  });

  const [formModel] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IJadwalPemerliharaan) => {
    let params: any = data;
    params.jam_pekerjaan = `${params?.jam1}-${params?.jam2}`;
    params.butuh_padam = data?.butuh_padam == 'true' ? 1 : 0
    params.status_pekerjaan = type
    params.tgl = data.date
    // params.status_pekerjaan = 'Rencana pemeliharaan'

    setDataParams(params);
  };

  const initForm = (data: any) => {
    Object.keys(JadwalPemerliharaanFeild).map((field: any) => {
      switch (field) {
        case 'tgl':
          setValue('date', data[field]);
          break;
        case 'pelaksana':
          setValue('id_pelaksana', data?.id_pelaksana);
          break;
        case 'pengawas':
          setValue('id_pengawas', data?.id_pengawas);
          break;
        case 'jam_pekerjaan':
          let time = data[field].split("-")
          setValue('jam1', time[0]);
          setValue('jam2', time[1]);
          break;
        default:
          setValue(field, data[field]);
          break;
      }
    });
  }

  useEffect(() => {
    if (dataSelected) {
      initForm(dataSelected)
    }

  }, [dataSelected])


  // console.log("errors",errors);
  

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JadwalPemerliharaanFeild}
        path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        hideTitle={true}
      // overrideType={{ tgl_upload: 'datetime' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <FormInputControlColumn
                  labelName="Nama laporan"
                  required={false}
                  placeholder="Nama laporan"
                  isInvalid={errors?.jtm as boolean | undefined}
                  message={errors?.jtm?.message}
                  register={register('jtm')}
                  className='mb-3'
                  column1={5}
                  column2={7}
                />
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-5 col-form-label">
                    Tgl Laporan<RequiredInfo />
                  </Form.Label>
                  <Col md={7}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-5 col-form-label">
                    Tgl Nyala Awal<RequiredInfo />
                  </Form.Label>
                  <Col md={7}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-5 col-form-label">
                    Tgl Nyala Akhir<RequiredInfo />
                  </Form.Label>
                  <Col md={7}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-5 col-form-label">
                    Tgl Close Laporan <RequiredInfo />
                  </Form.Label>
                  <Col md={7}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>

                <FormInputControlColumn
                  labelName="Keterangan Approve"
                  required={false}
                  placeholder="Keterangan Approve"
                  isInvalid={errors?.jtm as boolean | undefined}
                  message={errors?.jtm?.message}
                  register={register('jtm')}
                  className='mb-3'
                  rows={4}
                  as={'textarea'}
                  column1={5}
                  column2={7}
                />

              </Col>
              <Col md={6}>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl Padam <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl APKT Kirim Nyala <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl Mulai APKT Kirim Nyala <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl Mulai APKT Kirim Padam <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl Selesai APKT Kirim Nyala <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label className="col-md-7 col-form-label">
                    Tgl Selesai APKT Kirim Padam <RequiredInfo />
                  </Form.Label>
                  <Col md={5}>
                    <InputDate errors={errors} register={register} />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' ids='id' />
              <Button type='submit' variant='primary' isLoading={loading}>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormDataModal>
    </>
  );
}

export default ApporveOpsis