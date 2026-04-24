import { API_PATH } from '@app/services/_path.service';
import React, { useState, useEffect } from 'react';
import { JADWAL_PEMELIHARAAN_GARDU } from '@app/configs/react-table/opsisdis.column.config';
import TableData from '@app/modules/Table/TableData';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { Alert, Col, Form, Modal, Row } from 'react-bootstrap';
import { Button, ButtonCancel } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormData from '@app/modules/Form/FormData';
import { JadwalPemerliharaanGarduFeild } from '@app/interface/opsisdis-jadwal-pemeliharaan.interface';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

interface IInputGarduForm {
  handleClose?: any;
  trans_jadwal_har_id?: string;
  id_penyulang?: string;  // Tambahkan prop untuk id_penyulang
  approvel_apd: any;
}

export default function InputGarduForm({ handleClose, approvel_apd, trans_jadwal_har_id, id_penyulang }: IInputGarduForm) {
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [dataSelected, setDataSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataColumns] = useState<any>(JADWAL_PEMELIHARAAN_GARDU());
  // const navigate = useNavigate();

  const handleRespDataApi = (data: any) => {
    const dataTableValue = data.map((item: any) => ({
      checked: true,
      key: item?.key,
      trans_jadwal_har_gardu_id: item?.trans_jadwal_har_gardu_id,
      number: item.number,
      id: item?.id_ref_lokasi,
      nama_lokasi: item?.nama_lokasi,
      alamat: item?.alamat,
      up3: item?.up3_1?.nama_lokasi,
      penyulang: item?.penyulang?.nama_lokasi,
      gardu_induk: item?.gardu_induk?.nama_lokasi,
      gardu_induk_id: item?.gardu_induk_id,
    }));
    setDataRows(dataTableValue);
  };

  const validationSchema = Yup.object().shape({
    gardu_id: Yup.string().nullable(),
    gardu_induk_id: Yup.string().nullable(),
    penyulang_id: Yup.string().nullable(),
    up3_id: Yup.string().nullable(),
    trans_jadwal_har_id: Yup.string().nullable(),
  });

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const { handleSubmit, setError, setValue } = formMethods;

  const handleRowsSelected = (item: any[]) => {
    console.log("item:", item); // Log untuk memastikan data terpilih
    setDataSelected(item);
  };

  const onSubmitForm = (data: any) => {
    if (dataSelected.length === 0) {
      console.warn("Tidak ada data yang dipilih!");
      return;
    }

    const formattedData = dataSelected.map((item: any) => ({
      trans_jadwal_har_id: trans_jadwal_har_id,
      gardu_id: item?.id,
      gardu_induk_id: item?.gardu_induk_id,
      penyulang_id: item?.penyulang_id,
      up3_id: item?.up3_id,
      id_user_created: data.created_user,
      id_user_updated: data.id_user_entri,
    }));

    setDataParams({ datas: formattedData });

    console.log("Payload dikirim:", { datas: formattedData });
    // navigate('/opsisdis/jadwal-pemeliharaan/usulan-jadwal-har');
    handleClose()
  };

  useEffect(() => {
    if (dataParams) {
      // Log `dataParams` saat ter-update untuk memastikan pengiriman data
      console.log("Data Params siap dikirim:", dataParams);
    }
  }, [dataParams]);

  const id = trans_jadwal_har_id;
  const isAllreadyId = {
    trans_jadwal_har_id: id
  };


  return (
    <Row className="animate__animated animate__fadeIn">
      <div className="col-md-12 p-4">

        {isAllreadyId.trans_jadwal_har_id === null ? (
          <Alert variant="danger" className="text-center mb-4">
            Silahkan Pilih Jadwal Pemeliharaan Terlebih Dahulu!
          </Alert>
        ) : approvel_apd === 1 ? (
          <Alert variant="warning" className="text-center mb-4">
            Data tidak bisa di modifikasi, di karenakan data sudah di Approve!
          </Alert>
        ) : (
          <Row>
            <Col md={12} className="mb-3">
              <TableData
                rowSelectType="checkbox"
                columnsConfig={dataColumns}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                path={API_PATH().master.jaringan.ref_lokasi}
                primaryKey="id"
                onCheckedRows={handleRowsSelected}
                rowSelect={true}
                filterParams={{
                  id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                  id_penyulang: id_penyulang // Tambahkan filter id_penyulang
                }}
              />
            </Col>

            {dataSelected.length > 0 && (
              <Col md={12}>
                <FormData
                  setError={setError}
                  setValue={setValue}
                  dataParams={dataParams}
                  fields={JadwalPemerliharaanGarduFeild}
                  path={API_PATH().opsisdis.jadwal_pemeliharaan.gardu}
                  customLabel="state"
                  onLoading={setLoading}
                  onGetDataResult={setDataSelected}
                  hideTitle={true}
                  ids="id_detail"
                >
                  <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Modal.Footer>
                      <div className="d-flex gap-2">
                        <ButtonCancel type="modal" ids="id_detail" onClick={handleClose} />
                        <Button type="submit" variant="primary" isLoading={loading}>
                          Simpan
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </FormData>
              </Col>
            )}
          </Row>
        )}
      </div>
    </Row>
  )
}
