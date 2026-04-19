import React, { useState, useEffect } from 'react'
import { Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { head } from 'lodash';
import { Button } from '@app/components';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { addNotification } from '@app/store/notification/notification.action';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { useDispatch } from 'react-redux';
import { getAllByPath, putByPath, postByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import { FRiskPointRQC } from '@app/interface/working-permit.interface';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const label = 'Risk Point QRC';

export default function WpRiskPointQRCPage() {
  const source = axios.CancelToken.source();
  const dispatch = useDispatch();

  const path = API_PATH().master.working_permit.risk_point_qrc;

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [roleActions, setRoleActions] = useState<any>({});
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_risk_point_qrc: Yup.number().nullable(),
    low_risk_point_min: Yup.number().min(0, 'Minimal 0').typeError("Harus berupa angka").required('Low Risk Wajib diisi'),
    low_risk_point_max: Yup.number().typeError("Harus berupa angka").required('Low Risk Max Wajib diisi'),
    medium_risk_point_min: Yup.number().typeError("Harus berupa angka").required('Medium Risk Min Wajib diisi'),
    medium_risk_point_max: Yup.number().typeError("Harus berupa angka").required('Medium Risk max Wajib diisi'),
    high_risk_point: Yup.number().typeError("Harus berupa angka").required('High Risk Wajib diisi'),
  });

  const [formModel] = useState<any>({ low_risk_point_min: 0 });
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  useEffect(() => {
    getAllData();

    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  /** GET DATA */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: 1,
        limit: 1,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        initDataForm(head(results))
      }
    } catch (err: any) { }
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    const id = params.id_risk_point_qrc;
    try {
      if (id) {
        await putByPath(path, params, id, source.token);
      } else {
        await postByPath(path, params, source.token);
        params = null
      }
      initDataForm(params)
      setLoadingForm(false);
      dispatchNotification(
        `Berhasil ${id ? 'ubah' : 'Tambah'} ${label}`,
        'Berhasil'
      );
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Gagal ${id ? 'ubah' : 'Tambah'} ${label}`,
        'danger'
      );
    }
  };

  const onSubmitForm = (data: any) => {
    upsertData(data);
  };

  /** INIT FORM EDIT */
  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        setValue(field, data[field])
      });
    } else {
      handleClearForm()
    }
  };

  const handleClearForm = () => {
    FRiskPointRQC.map((field: any) => {
      clearErrors(field);
      switch (field) {
        case "uraian":
          setValue(field, 0);
          break;
      }
    });
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let roleAccess = ROLE_ACCESS("risk-point-qrc")
    const roleAct = {
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12'>
          <div className='ms-md-4'>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> Setting Risk Point QRC
            </h5>
            <hr />
            <div className='row'>
              <div className='col-12 col-md-6'>
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Low Risk</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl type='number' defaultValue={0} {...register('low_risk_point_min')} />
                      <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-less-than-equal"></i></InputGroup.Text>
                      <FormControl type='number' defaultValue={0} {...register('low_risk_point_max')} />
                    </InputGroup>
                    <Form.Control.Feedback type='invalid'>
                      {errors?.medium_risk_min?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Medium Risk</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl type='number' defaultValue={0} {...register('medium_risk_point_min')} />
                      <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-less-than-equal"></i></InputGroup.Text>
                      <FormControl type='number' defaultValue={0} {...register('medium_risk_point_max')} />
                    </InputGroup>
                    <Form.Control.Feedback type='invalid'>
                      {errors?.hight_risk_min?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Hight Risk</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon2"><i className="fa-solid fa-greater-than"></i></InputGroup.Text>
                      <FormControl type='number' defaultValue={0} {...register('high_risk_point')} />
                    </InputGroup>
                    <Form.Control.Feedback type='invalid'>
                      {errors?.hight_risk_min?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {roleActions?.update &&
                    <Form.Group className='mt-4'>
                      <Button type='submit' variant='primary' isLoading={loadingForm}>Simpan</Button>
                    </Form.Group>
                  }

                </Form>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  )
}
