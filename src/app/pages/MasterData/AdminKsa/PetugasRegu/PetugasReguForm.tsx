import React, { useEffect, useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { IAdminKSAPetugasRegu, IAdminKSAPetugasReguFeild } from '@app/interface/admin-ksa-petugas-regu.interface';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { getByIdPath, putByPath } from '@app/services/main.service';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { getObjectKeys } from '@app/helper/object.helper';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';

export default function PetugasReguForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_regu_petugas: Yup.number().typeError('Regu Petugas belum dipilih').required('Regu Petugas belum dipilih'),
    id_user: Yup.number().typeError('Regu Petugas belum dipilih').required('Petugas Regu belum dipilih'),
  });
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const [formModel] = useState<any>();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const { id } = useParams();
  const onSubmitForm = (data: IAdminKSAPetugasRegu) => {
    upsertData(data)

  };

  const initDataForm = (data: any = undefined) => {
    const valueData =
      data
        ? pick(data, getObjectKeys(IAdminKSAPetugasReguFeild))
        : IAdminKSAPetugasReguFeild;

    Object.keys(valueData).map((field: any) => {
      const valueOrigin = valueData[field];
      setValue(field, valueOrigin);
    });
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const upsertData = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // setLoadingForm(true);

    try {
      // console.log('data', data);

      await putByPath(API_PATH().master.admin_ksa.petugas_regu, data, data?.id_user, source.token)

      setLoading(false);
      dispatchNotification(
        `Berhasil disimpan`,
        'success'
      );

      /** IF REDIRECT / DISMISSED TRUE */
      navigate(-1);


      initDataForm();
    } catch (err: any) {
      const errValidation = err?.response?.data?.results;
      if (errValidation && err?.response?.data?.status == 400) {
        errorValidationHandling(errValidation);
      } else {
        dispatchNotification(
          `Gagal disimpan`,
          'danger'
        );
      }
      setLoading(false);
    }
  };
  const errorValidationHandling = (formInvalid: any) => {
    if (
      typeof formInvalid == 'object' &&
      formInvalid instanceof Array == false
    ) {
      Object.entries(formInvalid).forEach(([key, value]) => {
        const valueArr: any = value;
        setError(key, {
          type: 'manual',
          message: valueArr.join(' '),
        });
      });
    }
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    setLoading(true);

    try {
      const req: any = await getByIdPath(
        API_PATH().admin.user,
        id,
        source.token
      );
      initDataForm(req?.results);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (id) {
      getDataById()
    }
  }, [])

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
        <Row className='mb-3'>
          <Col md='7' xs='12'>
            <Form.Group className='mt-3'>
              <Form.Label>Nama Regu <RequiredInfo /></Form.Label>
              <SelectAsyncDynamic
                fieldName="id_ref_regu_petugas"
                control={control}
                errors={errors}
                labelField={'name'}
                valueField={'id_ref_regu_petugas'}
                pathServiceName={'master.admin_ksa.regu_petugas'}

                queryParams={{ sort_by: 'name' }}
                setValue={setValue}
              // options={dataSelected?.id_ref_regu_petugas}
              ></SelectAsyncDynamic>
            </Form.Group>
            {!id &&
              < Form.Group className='mt-3'>
                <Form.Label>Petugas Regu <RequiredInfo /></Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_user"
                  control={control}
                  errors={errors}
                  labelField={'fullname'}
                  valueField={'id_user'}
                  pathServiceName={'admin.user'}

                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                // options={dataSelected?.id_user}
                ></SelectAsyncDynamic>
              </Form.Group>
            }
          </Col>
        </Row>
        <Form.Group className='mt-4'>
          <Button type='submit' variant='primary' disabled={loading}>
            Simpan
          </Button>
          <ButtonCancel />
        </Form.Group>
      </Form>
    </>
  );
}
