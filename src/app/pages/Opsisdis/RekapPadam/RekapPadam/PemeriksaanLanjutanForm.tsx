import { OPTION_ACO_KERJA, OPTION_GANGGUAN_DITEMUKAN, OPTION_PENYULANG_FDIR } from "@app/configs/select-options/rekap_padam.select";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Col, Row, Form, Card } from "react-bootstrap";
import InputForm from '@app/components/Input/FormInputNoLabel';
import { API_PATH } from "@app/services/_path.service";
import { useWatch } from "react-hook-form";
import { getAllByPath } from '@app/services/main.service';
// import { KOODINASI_PROTEKSI_OPTIONS } from "@app/configs/select-options/working-permit.select";
import { get } from "lodash";
import TablePeralatanRC from "./TablePeralatanRC";
import TablePeralatanFIOHL from "./TabelPeralatanFIOHL";

interface IPemeriksaanLanjutanForm {
  control: any
  errors: any
  idTransEp?: any
  handleAddPeralatan?: any
  handleEditPeralatan: any
  handleAddPeralatanFiohl?: any
  handleEditPeralatanFiohl?: any
}

export default function PemeriksaanLanjutanForm({
  control,
  errors,
  idTransEp,
  handleAddPeralatan,
  handleEditPeralatan,
  handleAddPeralatanFiohl,
  handleEditPeralatanFiohl,
}: IPemeriksaanLanjutanForm) {
  const source = axios.CancelToken.source();
  const [optionsDispatcher, setOptionsDispatcher] = useState<any>([]);

  /** GET DATA PAGINATION */
  const getDispatcher = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        page: -1,
        limit: -1,
        id_ref_regu_petugas: 11
      };

      const req: any = await getAllByPath(get(API_PATH(), "admin.user"), params, source.token);
      const { results } = req;
      const dataLength = results ? results.length : 0;
      let data = results.map((d: any) => {
        return { ...d, label: d.fullname, value: d.id_user }
      });
      setOptionsDispatcher(dataLength > 0 ? data : [])
    } catch (err: any) {
      setOptionsDispatcher([])
    }
  };
  //   let dataTableValue: any = [];
  //   data?.forEach((item: any, index: any) => {
  //     dataTableValue.push({
  //       number: item.number,
  //       peralatan_rc: item.peralatan_rc || '-',
  //       rc_open: item.rc_open || '-',
  //       rc_close: item.rc_close || '-',
  //       status_open: item.status_rc_open,
  //       status_close: item.status_rc_close,
  //       jam_open: item.tgl_open ? moment(item.tgl_open).format("DD-MM-YYYY HH:mm") : '-',
  //       jam_close: item.tgl_close ? moment(item.tgl_close).format("DD-MM-YYYY HH:mm") : '-',
  //       action: (
  //         <Dropdown className='hide-toogle hide-focus'>
  //           <Dropdown.Toggle variant='light' id={`jar-detail-act-${index}`}>
  //             <i className='fa-solid fa-ellipsis font-weight-bold'></i>
  //           </Dropdown.Toggle>
  //           <Dropdown.Menu>
  //             <Dropdown.Item onClick={() => { deleteTambahPeralatan(item); }}>
  //               Delete
  //             </Dropdown.Item>
  //           </Dropdown.Menu>
  //         </Dropdown>
  //       ),
  //     });
  //   });

  //   setDataRows(dataTableValue);
  // };

  const watchJenisGangguan = useWatch({ control, name: "id_ref_ep_kat_ggn" });

  const handleAdd = () => {
    handleAddPeralatan();
  }

  const handleAddFiohl = () => {
    handleAddPeralatanFiohl();
  }

  const watchStatusProteksi = useWatch({ control, name: 'id_status_proteksi' });


  // console.log("watchStatusProteksi", watchStatusProteksi);

  useEffect(() => {
    getDispatcher()
  }, [])

  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Kategori Gangguan
            </Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={true}
                fieldName={'id_ref_ep_kat_ggn'}
                pathServiceName={'master.opsisdis.rekap_padam.kategori_gangguan'}
                labelField={'nama'}
                valueField={'id_ref_ep_kat_ggn'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Penyebab Gangguan
            </Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={false}
                fieldName={'id_ref_ep_penyebab_ggn'}
                pathServiceName={'master.opsisdis.rekap_padam.penyebab_gangguan'}
                labelField={'nama'}
                valueField={'id_ref_ep_penyebab_ggn'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
                watchParent={watchJenisGangguan}
                fieldNameParent="id_ref_ep_kat_ggn"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Gangguan Ditemukan
            </Form.Label>
            <Col md={8}>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`gangguan_ditemukan`}
                options={OPTION_GANGGUAN_DITEMUKAN}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Keterangan Gangguan
            </Form.Label>
            <Col md={8}>
              <InputForm
                control={control}
                name={'keterangan_ggn'}
                as="textarea"
              />
            </Col>
          </Form.Group>
          <div>
            {idTransEp &&
              <>
                <TablePeralatanRC
                  idTransEp={idTransEp}
                  handleAdd={handleAdd}
                  handleEdit={handleEditPeralatan}
                />
                <TablePeralatanFIOHL
                  idTransEp={idTransEp}
                  handleAdd={handleAddFiohl}
                  handleEdit={handleEditPeralatanFiohl}
                />
              </>
            }
          </div>
        </Col>
        <Col md={6}>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>Status Proteksi</Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={false}
                fieldName={'id_status_proteksi'}
                pathServiceName={'master.opsisdis.rekap_padam.status_proteksi'}
                labelField={'nama'}
                valueField={'id_status_proteksi'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Col>
          </Form.Group>
          {/* KOORDINASI  PROTEKSI */}
          {watchStatusProteksi === 3 &&
            <>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Koodinasi Proteksi
                </Form.Label>
                <Col md={8}>
                  <InputForm
                    control={control}
                    name={'koordinasi_proteksi'}
                    placeholder=""
                  />
                  {/* <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'koordinasi_proteksi'}
                    options={KOODINASI_PROTEKSI_OPTIONS}
                    placeholder="-"
                  /> */}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Keterangan
                </Form.Label>
                <Col md={8}>
                  <InputForm
                    control={control}
                    name={'keterangan_koodinasi_proteksi'}
                    as="textarea"
                  />
                </Col>
              </Form.Group>
            </>
          }
          {/* GAGAL AR */}
          {watchStatusProteksi === 1 &&
            <>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Gagal AR
                </Form.Label>
                <Col md={8}>
                  <InputForm
                    control={control}
                    name={'gagal_ar'}
                  />
                </Col>
              </Form.Group>
            </>
          }
          {/* SIMPATETIK TRIP */}
          {watchStatusProteksi === 4 &&
            <>
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Simpatik Trip
                </Form.Label>
                <Col md={8}>
                  <InputForm
                    control={control}
                    name={'simpatik_trip'}
                  />
                </Col>
              </Form.Group>
            </>
          }
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Penyulang FDIR
            </Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={true}
                fieldName={'id_penyulang_fdir'}
                pathServiceName={'master.opsisdis.rekap_padam.fdir'}
                labelField={'nama'}
                valueField={'id_penyulang_fdir'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              Status Penyulang FDIR
            </Form.Label>
            <Col md={8}>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`status_penyulang_fdir`}
                options={OPTION_PENYULANG_FDIR}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label md={4} column>Keterangan FDIR</Form.Label>
            <Col md={8}>
              <InputForm
                control={control}
                name={'keterangan_penyulang_fdir'}
                as="textarea"
              />
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              FAI Arus Gangguan HMI
            </Form.Label>
            <Col md={8}>
              <SelectAsyncDynamic
                required={true}
                fieldName={'id_ref_ep_ag_hmi'}
                pathServiceName={'master.opsisdis.rekap_padam.ag_hmi'}
                labelField={'nama'}
                valueField={'id_ref_ep_ag_hmi'}
                placeholder={'Pilih...'}
                isClearable={true}
                errors={errors}
                control={control}
              />
            </Col>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
              ACO Kerja
            </Form.Label>
            <Col md={8}>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`aco_kerja`}
                options={OPTION_ACO_KERJA}
              />
            </Col>
          </Form.Group>
          <hr />
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>
              Petugas
            </Card.Header>
            <Card.Body>
              <Form.Group className='mb-3'>
                <Form.Label >
                  Dispatcher DCC KALBAR 1
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={`id_ref_ep_petugas_1`}
                  options={optionsDispatcher}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Dispatcher DCC KALBAR 2
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={`id_ref_ep_petugas_2`}
                  options={optionsDispatcher}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Dispatcher DCC KALBAR 3
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={`id_ref_ep_petugas_3`}
                  options={optionsDispatcher}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Operator APKT
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={`id_ref_ep_operator_apkt`}
                  options={optionsDispatcher}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <ModalData modalProps={modalTambahPeralatan}>
        <ModalTambahPertalatan dataSelected={dataSelect} />
      </ModalData> */}
    </>
  )
}