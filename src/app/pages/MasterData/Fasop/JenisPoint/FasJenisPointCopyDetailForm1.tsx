import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import { COPY_POINT_STATE_COLUMNS } from "@app/configs/react-table/master-fasop.columns.config";
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Button, ButtonCancel } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormData from '@app/modules/Form/FormData';
import * as Yup from 'yup';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

interface IWhatsappDetailForm {
    modalDecline?: any;
    paramid?: number;
    filterLayout?: any;
}

export const IBlacklistFeild = {
    id_wa_kontak: null,
    status_data: 1,
};

export default function FasJenisPointCopyDetailForm({ modalDecline, paramid }: IWhatsappDetailForm) {
    /** DATA RESP */
    const [dataSelected, setDataSelected] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();


    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                checked: true,
                key: item?.key,
                number: item.number,
                nama: item.name,
                jenis_point: item.jenispoint,
                
            });
        });
        return dataTableValue;
    };

    const validationSchema = Yup.object().shape({
        id_wa_kontak: Yup.string().nullable(),
        id_wa_group: Yup.string().nullable(),
    });

    const [formModel] = useState<any>({});
    const {
        handleSubmit,
        setValue,
        setError,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });

    const handleRowsSelected = (item: any) => {
        setDataSelected(item.current);
        console.log('setDataSelected', item.current);
      };

    const onSubmitForm = (data: any) => {
        let idx: any = [];
        if (dataSelected.length > 0) {
            dataSelected.map((item: any) => {
                idx.push(item?.id_wa_kontak);
            });
        }
        data.id_pointtype_state = idx;
        data.id_pointtype = paramid;
        setDataParams(data);
    };


    return (
        <>
            <Row className='animate__animated animate__fadeIn'>
                <div className='col-md-12 p-4'>
                    <div className={`ms-md-0`}>
                        <Row>
                            <Col md={12} className="mb-3">
                            <TableDataJqxGridNew
                                     path={API_PATH().master.fasop.point_type}
                                    dataFieldsColsConfig={COPY_POINT_STATE_COLUMNS()}
                                    primaryKey={'id_pointtype_state'}
                                    selectionmode={"checkbox"}
                                    respDataApi={handleRespDataApi}
                                    // serachBar={true}
                                    onRowSelected={handleRowsSelected}
                                    reloadbtn={false}
                                />

                            </Col>
                            {dataSelected &&
                                <Col md={12}>
                                    <FormData
                                        setError={setError}
                                        setValue={setValue}
                                        dataParams={dataParams}
                                        fields={IBlacklistFeild}
                                        path={API_PATH().master.fasop.point_type_state}
                                        customLabel='state'
                                        onLoading={setLoading}
                                        onGetDataResult={setDataSelected}
                                        hideTitle={true}
                                        ids="id_detail"
                                    >
                                        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                                            <Modal.Footer>
                                                <div className='d-flex gap-2'>
                                                    <ButtonCancel type='modal' ids='id_detail' onClick={modalDecline} />
                                                    <Button type='submit' variant='primary' isLoading={loading}> Simpan </Button>
                                                </div>
                                            </Modal.Footer>
                                        </Form>
                                    </FormData>
                                </Col>
                            }

                        </Row>
                    </div>
                </div>
            </Row>
        </>
    )
}
