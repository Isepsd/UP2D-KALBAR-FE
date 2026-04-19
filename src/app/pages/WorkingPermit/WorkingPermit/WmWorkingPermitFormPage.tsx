import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Tab, Tabs } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import { IWpOnline, WpOnlineField } from '@app/interface/wp-online.interface';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { postByPath } from '@app/services/main.service';
import FormDataWP from '@app/modules/WorkingPermit/FormDataWP';
import FomDataAPDKeselamatan from '@app/modules/WorkingPermit/FomDataAPDKeselamatan';
import FormDataKelengkapanPekerjaan from '@app/modules/WorkingPermit/FormDataKelengkapanPekerjaan';
import { JSONtoString, stringToJSON } from '@app/helper/data.helper';
import { isArray, size } from 'lodash';

export default function WmWorkingPermitFormPage() {
  const source = axios.CancelToken.source();

  const { callbackForm } = useSelector((state: any) => state.ui);

  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSelected, setSelectedData] = useState<any>()
  /** FORM  HANDLE
   */
  const validationSchema: any = Yup.object().shape({
    jenis_pekerjaan: Yup.string().required('Jenis pekerjaan wajib diisi'),
    pekerjaan_dilakukan: Yup.string().required('Pekerjaan dilakukan diisi'),
    lokasi_pekerjaan: Yup.string().required('Lokasi pekerjaan diisi'),
    id_wp_master_bagian: Yup.number().typeError("Belum pilih bagian").required('Belum pilih bagian'),
    nomor_sop: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null)
  });

  const [formModel] = useState<any>({});

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
  const watchJenisPekerjaan = useWatch({ control, name: 'jenis_pekerjaan' });
  const watchManuver = useWatch({ control, name: 'manuver' });
  const watchGrounding = useWatch({ control, name: 'grounding' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IWpOnline) => {
    data.nama_pekerja = isArray(data?.nama_pekerja) ? JSONtoString(data?.nama_pekerja?.map((p: any) => p?.value)) : ''
    data.klasifikasi10 = isArray(data?.klasifikasi10) ? JSONtoString(data?.klasifikasi10?.map((p: any) => p?.value)) : ''
    data.prosedur10 = isArray(data?.prosedur10) ? JSONtoString(data?.prosedur10?.map((p: any) => p?.value)) : ''
    data.tgl_pekerjaan = data.tgl_pekerjaan ? data.tgl_pekerjaan + ':00' : data.tgl_pekerjaan
    data.tgl_pekerjaan_selesai = data.tgl_pekerjaan_selesai ? data.tgl_pekerjaan_selesai + ':00' : data.tgl_pekerjaan_selesai
    data.status_persetujuan = 0
    setDataParams(data);
  };

  const handleGetDataResult = (e: any) => {
    setSelectedData(e)
  }

  /** REQUEST PUT PEKERJA */
  const insertPekerja = async (params: any) => {
    try {
      await postByPath(API_PATH().working_permit.online_pekerja, params, source.token)
    } catch {
    }
  }

  useEffect(() => {
    /** PEKERJA */
    if (dataParams?.nama_pekerja && callbackForm) {
      const pekerja = dataParams?.nama_pekerja
      if (isArray(pekerja) && size(pekerja) > 0) {
        const pekerjaParams = pekerja?.map((p: any) => {
          return {
            "nama_pekerja": p,
            "id_wp_online": callbackForm?.results?.id_wp_online
          }
        })
        insertPekerja(pekerjaParams)
      }
    }

    return () => {
      source.cancel()
    }
  }, [callbackForm])

  useEffect(() => {
    if (dataSelected) {
      const klasifikasi10 = stringToJSON(dataSelected?.klasifikasi10)
      const prosedur10 = stringToJSON(dataSelected?.prosedur10)
      if (isArray(klasifikasi10)) setValue('klasifikasi10', klasifikasi10?.map((k: any) => { return { value: k, label: k } }))
      if (isArray(prosedur10)) setValue('prosedur10', prosedur10?.map((k: any) => { return { value: k, label: k } }))
    }
  }, [dataSelected])

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={WpOnlineField}
        path={API_PATH().working_permit.online}
        onLoading={setLoading}
        overrideType={{ nomor_sop: 'number', tgl_pekerjaan: 'datetime', tgl_pekerjaan_selesai: 'datetime' }}
        onGetDataResult={handleGetDataResult}
      >
        <Col md='12' xs='12'>
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Tabs
              defaultActiveKey="data-wp"
              id="working-permit"
              className="mb-3"
            >
              <Tab eventKey="data-wp" title="Data Working Permit">
                <FormDataWP
                  errors={errors}
                  register={register}
                  control={control}
                  watchGrounding={watchGrounding}
                  watchJenisPekerjaan={watchJenisPekerjaan}
                  watchManuver={watchManuver}
                  dataSelected={dataSelected}
                />
              </Tab>
              <Tab eventKey="data-kelengkapan" title="Data Kelengkapan Pekerjaan">
                <FormDataKelengkapanPekerjaan
                  register={register}
                  dataSelected={dataSelected}
                  control={control}
                  setValue={setValue}
                />
              </Tab>
              <Tab eventKey="data-apd" title="Data APD dan Kelengkapan Keselamatan">
                <FomDataAPDKeselamatan
                  register={register}
                  dataSelected={dataSelected}
                  control={control}
                />
              </Tab>
            </Tabs>

            <Form.Group className='mt-4'>
              <Button type='submit' variant='primary' disabled={loading}>
                Simpan
              </Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
