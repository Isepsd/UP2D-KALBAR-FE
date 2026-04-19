import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IFasopTelegramGroup, FasopTelegramGroupField } from '@app/interface/master-data/fasop-telegram-group.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';


// import { useSearchParams } from 'react-router-dom';
export default function GroupTelegramFormPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();
    // let [searchParams] = useSearchParams();
    /** FORM  HANDLE
     */
    const validationSchema = Yup.object().shape({
        nama: Yup.string().required('Nama Wajib diisi'),
        status: Yup.number()
            .nullable()
            .transform((_, v) => (v == 1 ? 1 : 0)),
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

    /** WATCH / SUBSCRIBVE FORM CHANGES */
    //  const watchIdPointTypeID = useWatch({ control, name: 'id_wa_group' });

    const watchStatus = useWatch({ control, name: 'status' });

    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: IFasopTelegramGroup) => {
        setDataParams(data);
    };

    return (
        <>
            <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={FasopTelegramGroupField}
                path={API_PATH().master.fasop.tel_group}
                onLoading={setLoading}
            // customLabel={'hide'}
            // isModal={true}

            >

                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Row>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control {...register('nama')} isInvalid={errors.nama} />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.nama?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Bot</Form.Label>
                            <SelectAsyncDynamic
                                fieldName='id_wa_bot'
                                pathServiceName='master.fasop.whatsapp.bot'
                                // path='master/fasop/whatsapp/bot'
                                labelField='nama'
                                valueField='id_wa_bot'
                                placeholder='Pilih...'
                                isClearable={true}
                                errors={errors}
                                control={control}
                                isSearchable={false}
                            />
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
                    </Row>

                    <Form.Group className='mt-4'>
                        <Button type='submit' variant='primary' disabled={loading}> Simpan </Button>
                        <ButtonCancel />
                    </Form.Group>
                </Form>

            </FormData>
        </>
    );
}
