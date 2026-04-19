import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react'
import { JADWAL_PEMELIHARAAN_GARDU } from '@app/configs/react-table/opsisdis.column.config';
import TableData from '@app/modules/Table/TableData';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { Button, ButtonCancel } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormData from '@app/modules/Form/FormData';
import { JadwalPemerliharaanGarduFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import * as Yup from 'yup';

interface IInputGarduForm {
  parent?: any;
  modalDecline?: any;
}

export default function InputGarduForm({ parent, modalDecline }: IInputGarduForm) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected, setDataSelected] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [action] = useState<string>();
  const [dataColumns] = useState<any>(JADWAL_PEMELIHARAAN_GARDU());

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
        gardu: item?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
      });
    });

    setDataRows(dataTableValue)
  }

  const validationSchema = Yup.object().shape({
    id_gardu: Yup.string().nullable()
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
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
    data.id_trans_jadwal_har = parent?.id;
    let gardu: any = []

    if (dataSelected.length > 0) {

      dataSelected.map((item: any) => {
        gardu.push(item?.id)
      })
    }
    data.id_gardu = gardu;
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
                  primaryKey={'id_meter'}
                  action={action}
                  // selected={dataSelected}
                  onCheckedRows={handleRowsSelected}
                  rowSelect={true}
                  filterParams={{
                    id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                    id_gardu_induk: parent?.id_gardu_induk
                  }}
                />
              </Col>
              {dataSelected &&
                <Col md={12}>
                  <FormData
                    setError={setError}
                    setValue={setValue}
                    dataParams={dataParams}
                    fields={JadwalPemerliharaanGarduFeild}
                    path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
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
