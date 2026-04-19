import React, { useState } from 'react';
import { Col, Form, Row, FormControl, InputGroup } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';

export default function Filter() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();
    // const [optionsTimes, setOptionsTimes] = useState<any>([]);
    /** FORM  HANDLE */
    const validationSchema = Yup.object().shape({
        id_wa_bot: Yup.string().nullable(),
        id_wa_kontak: Yup.string().nullable(),
    });

    const [formModel] = useState<any>({
        datum_after: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        datum_before: moment().add(1, "days").format('YYYY-MM-DD'),
        id_wa_bot: null,
        id_wa_kontak: null,
    });

    const { handleSubmit, register, setValue, setError, control, formState } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });
    const { errors }: any = formState || {};

    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: any) => {
        setDataParams(() => {
            return { ...data }
        });
    };

    return (
        <>
            <FiltersForm
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                onLoading={setLoading}
                fields={{ datum_after: moment().subtract(1, 'days').format('YYYY-MM-DD'), datum_before: moment().add(1, "days").format('YYYY-MM-DD'), id_wa_bot: null, id_wa_kontak: null }}
            >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Range Tanggal</Form.Label>
                                <InputGroup>
                                    <FormControl
                                        {...register('datum_after')}
                                        type='date'
                                        max={moment().format('YYYY-MM-DD')}
                                    />
                                    <InputGroup.Text>
                                        <i className='fa-solid fa-arrow-right'></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        {...register('datum_before')}
                                        type='date'
                                        max={moment().format('YYYY-MM-DD')}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Bot WhatsApp</Form.Label>
                                <SelectAsyncDynamic
                                    fieldName='id_wa_bot'
                                    pathServiceName='master.whatsapp.whatsapp_bot'
                                    labelField='nama'
                                    valueField='id_wa_bot'
                                    placeholder='Pilih Bot'
                                    isClearable={true}
                                    errors={errors}
                                    control={control}
                                    queryParams={{
                                        page: -1,
                                        limit: -1,
                                        sort_by: 'nama',
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Kontak WhatsApp</Form.Label>
                                <SelectAsyncDynamic
                                    fieldName='id_wa_kontak'
                                    pathServiceName='master.whatsapp.whatsapp_kontak'
                                    labelField='nama'
                                    valueField='id_wa_kontak'
                                    placeholder='Pilih Kontak'
                                    isClearable={true}
                                    errors={errors}
                                    control={control}
                                    queryParams={{
                                        page: -1,
                                        limit: -1,
                                        sort_by: 'nama',
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} className='mt-2'>
                            <FilterActionButton className='justify-content-start' loading={loading} />
                        </Col>
                    </Row>
                </Form>
            </FiltersForm>
        </>
    );
}
