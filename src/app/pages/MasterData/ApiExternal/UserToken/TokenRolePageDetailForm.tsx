import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react'
import { MASTER_MODULE_API } from '@app/configs/react-table/master-opsisdis.columns.config';
import TableData from '@app/modules/Table/TableData';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Button, ButtonCancel } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormData from '@app/modules/Form/FormData';
import * as Yup from 'yup';

interface IBlacklistFormPage {
    modalDecline?: any;
}

export const IBlacklistFeild = {
    id_ref_lokasi: null,
    status_data: 1,
}

export default function TokenRolePageDetailForm({ modalDecline }: IBlacklistFormPage) {
    /** DATA RESP */
    const [dataRows, setDataRows] = useState<any>([]);
    const [dataSelected, setDataSelected] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();
    const [action] = useState<string>();
    const [dataColumns] = useState<any>(MASTER_MODULE_API());

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                checked: true,
                key: item?.key,
                number: item.number,
                id: item?.id_ref_lokasi,
                alamat: item?.alamat,
                up3: item?.up3_1?.nama_lokasi,
                nama_lokasi: item?.nama_lokasi,
                kode_lokasi: item?.kode_lokasi,
                penyulang: item?.penyulang?.nama_lokasi,
                gardu_induk: item?.gardu_induk?.nama_lokasi,
                jenis_lokasi: item?.ref_jenis_lokasi?.nama_jenis_lokasi,
            });
        });

        setDataRows(dataTableValue)
    }

    const validationSchema = Yup.object().shape({
        id_ref_lokasi: Yup.string().nullable(),
        id_wa_group: Yup.string().nullable()
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
        setDataSelected(item)
    }

    const onSubmitForm = (data: any) => {
        let idx: any = []
        if (dataSelected.length > 0) {
            dataSelected.map((item: any) => {
                idx.push(item?.id)
            })
        }
        data.id_ref_lokasi = idx;
        data.id_wa_group = dataSelected?.id_wa_group
        setDataParams(data);
    };

    // console.log("parent", parent);


    return (
        <>
            <Row className='animate__animated animate__fadeIn'>
                <div className='col-md-12 p-4'>
                    <div className={`ms-md-0`}>
                        <Row>
                            <Col md={12} className="mb-3">
                                <TableData
                                    rowSelectType={'checkbox'}
                                    columnsConfig={dataColumns}
                                    respDataApi={handleRespDataApi}
                                    rowData={dataRows}
                                    path={API_PATH().master.jaringan.ref_lokasi}
                                    primaryKey={'id_ref_lokasi'}
                                    action={action}
                                    // selected={dataSelected}
                                    onCheckedRows={handleRowsSelected}
                                    rowSelect={true}
                                    filterParams={{
                                        id_ref_jenis_lokasi_in: `${JENIS_LOKASI().penyulang},${JENIS_LOKASI().zone},${JENIS_LOKASI().section},${JENIS_LOKASI().segment}`,
                                    }}
                                />
                            </Col>
                            {dataSelected &&
                                <Col md={12}>
                                    <FormData
                                        setError={setError}
                                        setValue={setValue}
                                        dataParams={dataParams}
                                        fields={IBlacklistFeild}
                                        path={API_PATH().master.external.extmodule}
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
                                                    <Button type='submit' variant='primary' isLoading={loading}>
                                                        Simpan
                                                    </Button>
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
