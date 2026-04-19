import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IFasopWhatsappBot, FasopWhatsappField } from '@app/interface/master-data/fasop-whatsapp-bot.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';

export default function BotWhatsappFormPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();

    /** FORM  HANDLE
     */
    const validationSchema = Yup.object().shape({
        nama: Yup.string().required('Nama Wajib diisi'),
        url: Yup.string().required('Nama Wajib diisi'),
        token: Yup.string().required('Nama Wajib diisi'),
        instance_id: Yup.string().required('Nama Wajib diisi'),
        status: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
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
    const watchStatus = useWatch({ control, name: 'status' });

    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: IFasopWhatsappBot) => {
        setDataParams(data);
    };

    return (
        <>
            <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={FasopWhatsappField}
                path={API_PATH().master.fasop.whatsapp.bot}
                onLoading={setLoading}
            >
                <Col md="6" xs="12">
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control {...register('nama')} isInvalid={errors.nama} />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.nama?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Url</Form.Label>
                            <Form.Control
                                {...register('url')}
                                isInvalid={errors.url}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.url?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Token</Form.Label>
                            <Form.Control
                                {...register('token')}
                                isInvalid={errors.token}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.token?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' >
                            <Form.Label>Instance_id</Form.Label>
                            <Form.Control
                                {...register('instance_id')}
                                isInvalid={errors.instance_id}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.instance_id?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Aktif</Form.Label>
                            <div className='ms-3 py-2'>
                                <Form.Check
                                    type='switch'
                                    id='aktif'
                                    {...register('status')}
                                    label={watchStatus === true ? 'Ya' : 'Tidak'}
                                />
                            </div>
                        </Form.Group>
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
