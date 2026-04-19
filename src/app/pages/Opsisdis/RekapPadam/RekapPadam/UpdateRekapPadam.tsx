import React, { useState } from 'react';
import { Card, Col, Row, Form, Tabs, Tab } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';

import ModalData from '@app/components/Modals/ModalForm';
import ModalNyalaBertahap from './ModalNyalaBertahap';
import ModalTambahPertalatanFIOHL from './ModalTambahPeralatanFIOHL';
import ModalTambahPertalatan from './ModalTambahPeralatan';

import {
  EditRekapPadamField,
  IUpdateRekapPadam,
} from '@app/interface/rekap-padam/edit-form-rekap-padam.interface';

import { API_PATH } from '@app/services/_path.service';
import InfoRekapPadamForm from './InfoRekapPadamForm';
import PemeriksaanLanjutanForm from './PemeriksaanLanjutanForm';
import { useNavigate } from 'react-router-dom';

function UpdateRekapPadam() {
  const [loading, setLoading] = useState<boolean>(false);
  const [idTransEp, setTransEpID] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();
  const [dataSelectedPeralatan, setDataSelectedPeralatan] = useState<any>();
  const [dataSelectedPeralatanFiohl, setDataSelectedPeralatanFiohl] = useState<any>();
  const [dataParams, setDataParams] = useState<any>();
  const navigate = useNavigate();
  const [modalNyalaBertahap, setModalNyalaBertahap] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Tambah Nyala Bertahap`,
  });
  const [modalTambahPeralatan, setModalTambahPeralatan] = useState<any>({
    approved: false,
    size: 'xl',
    title: `Manuver Peralatan`,
  });
  const [modalTambahPeralatanFIOHL, setModalTambahPeralatanFIOHL] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Manuver Peralatan Fiohl`,
  });

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_ep_kat_ggn: Yup.string().nullable(),
    id_ref_ep_fiohl: Yup.string().nullable(),
    id_status_proteksi: Yup.string().nullable(),
    id_ref_ep_penyebab_ggn: Yup.string().nullable(),
    id_ref_ep_petugas_1: Yup.string().nullable(),
    id_ref_ep_petugas_2: Yup.string().nullable(),
    id_ref_ep_petugas_3: Yup.string().nullable(),
    jam_tutup: Yup.string().nullable(),
    jam_normal: Yup.string().nullable()
  });

  const [formModel] = useState<any>({
    status_data: 0,
  });

  const { handleSubmit, setValue, setError, control, formState, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IUpdateRekapPadam) => {
    data.id_trans_ep = dataSelected?.id_trans_ep;
    setDataParams(data);
  };


  const handleGetDataResult = (e: any) => {

    setDataSelected(e);
    setTransEpID(e?.id_trans_ep);
    setValue('no_event', e?.no_event);
    setValue('no_apkt', e?.no_apkt);

    if (e?.jam_normal) {
      let jam_normal = e?.jam_normal?.replace('+07:00', '')
      setValue('jam_normal', moment(jam_normal).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (e?.jam_padam) {
      let jam_padam = e?.jam_padam?.replace('+07:00', '')
      setValue('jam_padam', moment(jam_padam).format("YYYY-MM-DD HH:mm:ss"));
    }

    if (e?.jam_tutup) {
      let jam_tutup = e?.jam_tutup?.replace('+07:00', '')
      setValue('jam_padam', moment(jam_tutup).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (e?.jam_wrc) {
      let jam_wrc = e?.jam_wrc?.replace('+07:00', '')
      setValue('jam_wrc', moment(jam_wrc).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (e?.jam_isolasi) {
      let jam_isolasi = e?.jam_isolasi?.replace('+07:00', '')
      setValue('jam_isolasi', moment(jam_isolasi).format("YYYY-MM-DD HH:mm:ss"));
    }
    if (e?.jam_pengusutan) {
      let jam_pengusutan = e?.jam_pengusutan?.replace('+07:00', '')
      setValue('jam_pengusutan', moment(jam_pengusutan).format("YYYY-MM-DD HH:mm:ss"));
    }

    if (e?.keypoint) {
      const { zone, penyulang, nama_gardu_induk } = e?.keypoint;
      setValue('zone', zone);
      setValue('penyulang_gi', penyulang?.nama_lokasi);
      setValue('gardu_induk', nama_gardu_induk);
      setValue('up3', e?.keypoint?.up3?.id_ref_lokasi);
      setValue('ulp', e?.keypoint?.ulp?.id_ref_lokasi);
    }

    setValue('pelanggan_tm', e?.pelanggan_tm || 0);
    setValue('pelanggan_vip', e?.pelanggan_vip || 0);
    setValue('total_gangguan_month', e?.total_gangguan_month || 0);
    setValue('total_gangguan_year', e?.total_gangguan_year || 0);
    setValue('total_gardu_padam', e?.total_gardu_padam || 0);
    setValue('total_gardu_nyala', e?.total_gardu_nyala || 0);
  };

  const handleEditPeralatan = (item: any) => {
    setDataSelectedPeralatan(item)
    setModalTambahPeralatan((prev: any) => ({ ...prev, title: `Edit Peralatan`, show: true }));
  }
  const handleAddPeralatan = () => {
    setDataSelectedPeralatan(null);
    setModalTambahPeralatan((prev: any) => ({ ...prev, title: `Tambah Peralatan`, show: true }));
  }

  const handleEditPeralatanFiohl = (item: any) => {
    setDataSelectedPeralatanFiohl(item)
    setModalTambahPeralatanFIOHL((prev: any) => ({ ...prev, title: `Edit Peralatan Fiohl`, show: true }));
  }
  const handleAddPeralatanFiohl = () => {
    setDataSelectedPeralatanFiohl(null)
    setModalTambahPeralatanFIOHL((prev: any) => ({ ...prev, title: `Tambah Peralatan Fiohl`, show: true }));
  }

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                link="/opsisdis/rekap-padam/rekap"
                fields={EditRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_ep}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
                onGetDataResult={handleGetDataResult}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Tabs
                    defaultActiveKey="info"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="info" title="Info Padam Aktif">
                      <InfoRekapPadamForm
                        loading={loading}
                        idTransEp={idTransEp}
                        setValue={setValue}
                        control={control}
                        register={register}
                        setModalNyalaBertahap={setModalNyalaBertahap}
                        errors={errors} />
                    </Tab>
                    <Tab eventKey="profile" title="Pemeriksaan Lanjutan">
                      <PemeriksaanLanjutanForm
                        idTransEp={idTransEp}
                        control={control}
                        errors={errors}
                        handleAddPeralatan={handleAddPeralatan}
                        handleAddPeralatanFiohl={handleAddPeralatanFiohl}
                        handleEditPeralatan={handleEditPeralatan}
                        handleEditPeralatanFiohl={handleEditPeralatanFiohl}
                      />
                    </Tab>
                  </Tabs>
                  <hr className='mt-2' />
                  <div className='d-flex gap-2 mt-1'>
                    <Button type='submit' variant='primary' isLoading={loading}>
                      Simpan
                    </Button>
                    <a className='btn btn-danger' type='button'
                      onClick={() => { navigate('/opsisdis/rekap-padam/rekap') }}>
                      Back
                    </a>
                  </div>
                </Form>
              </FormData>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalData modalProps={modalNyalaBertahap}>
        <ModalNyalaBertahap dataSelected={dataSelected} idTransEp={idTransEp} />
      </ModalData>

      <ModalData modalProps={modalTambahPeralatan}>
        <ModalTambahPertalatan dataSelected={dataSelectedPeralatan} idTransEp={idTransEp} />
      </ModalData>

      <ModalData modalProps={modalTambahPeralatanFIOHL}>
        <ModalTambahPertalatanFIOHL dataSelected={dataSelectedPeralatanFiohl} idTransEp={idTransEp} />
      </ModalData>
    </>
  );
}

export default UpdateRekapPadam;
