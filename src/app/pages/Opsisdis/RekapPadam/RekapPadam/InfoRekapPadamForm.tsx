import React, { useEffect } from "react";
import { Col, Form, Row, InputGroup} from "react-bootstrap";
// import { Col, Form, Row, InputGroup, Card } from "react-bootstrap";
import InputForm from '@app/components/Input/FormInputNoLabel';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
// import TableNyalaBertahap from './TableNyalaBertahap';
import { useWatch } from "react-hook-form";
// import AppButton from "@app/components/Button/Button";
import InputDate from '@app/components/Date/InputDate';
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";

interface IInfoRekapPadamForm {
  control: any
  errors: any
  setValue: any
  idTransEp: any
  setModalNyalaBertahap: any
  loading?: boolean
  register?: any
}
export default function InfoRekapPadamForm({
  control,
  errors,
  setValue,
  // loading = false,
  // idTransEp,
  // setModalNyalaBertahap,
  register,
}: IInfoRekapPadamForm) {
  const source = axios.CancelToken.source();

  const option_penyebab = [
    { label: '-', value: '' },
    { label: 'TRIP', value: 'TRIP' },
    { label: 'BUKA', value: 'BUKA' },
  ];
  const option_ket_anev = [
    { label: '-', value: '' },
    { label: 'OK', value: 'OK' },
    { label: 'ANULIR', value: 'ANULIR' },
  ];

  const option_jenis_padam = [
    { label: '-', value: '' },
    { label: 'TERENCANA', value: 'TERENCANA' },
    { label: 'TIDAK TERENCANA', value: 'TIDAK TERENCANA' },
  ];

  const option_jenis_peralatan = [
    { label: '-', value: '' },
    { label: 'PENYULANG', value: 'PENYULANG' },
    { label: 'ZONA', value: 'ZONA' },
    
  ];

  const watchPenyebab = useWatch({ control, name: 'penyebab' });
  const watchJenisPadam = useWatch({ control, name: 'jenis_padam' });
  const watchJamPadam = useWatch({ control, name: 'jam_padam' });
  const watchJamTutup = useWatch({ control, name: 'jam_tutup' });
  const watchJenisPeralatan = useWatch({ control, name: 'jenis_keypoint' });
  const watchPeralatan = useWatch({ control, name: 'id_keypoint' });
  const watchGangguanPadam = useWatch({ control, name: 'gangguan_padam' });

  useEffect(() => {
    if (watchPenyebab === 'TRIP') {
      setValue('jenis_padam', 'TIDAK TERENCANA');
    } else if (watchPenyebab === 'BUKA') {
      setValue('jenis_padam', 'TERENCANA');
    }
  }, [watchPenyebab]);

  const convert_jam = (data: any, key: any) => {
    if (data) {
      const val = data.replace('+07:00', '');
      setValue(key, val);
    }
  };

  useEffect(() => {
    convert_jam(watchJamPadam, 'jam_padam')
  }, [watchJamPadam]);

  useEffect(() => {
    convert_jam(watchJamTutup, 'jam_tutup')
  }, [watchJamTutup]);

  const getSelectOptions = async (id_keypoint: any) => {
    try {
      await getAllByPath(
        API_PATH().opsisdis.rekap_padam.tranf_ep_peralatan_detail + id_keypoint,
        {},
        source.token
      )
        .then((response: any) => {
          const { results, status } = response;
          if (status === 200) {
            const {
              gardu_induk,
              up3,
              ulp,
              total_gardu_padam,
              pelanggan_tm,
              pelanggan_vip,
              alamat,
              total_gangguan_month,
              total_gangguan_year,
            } = results;
            setValue('gardu_induk', gardu_induk?.nama_lokasi);
            setValue('id_up3', up3?.id_ref_lokasi);
            setValue('id_ulp', ulp?.id_ref_lokasi);
            setValue('up3', up3?.nama_lokasi);
            setValue('ulp', ulp?.nama_lokasi);
            setValue('total_gardu_padam', total_gardu_padam);
            setValue('pelanggan_tm', pelanggan_tm);
            // setValue('gangguan_padam', gangguan_padam);
            setValue('pelanggan_vip', pelanggan_vip);
            setValue('wilayah_padam', alamat);
            setValue('jml_gangguan_bulan', total_gangguan_month);
            setValue('jml_gangguan_tahun', total_gangguan_year);
          }
        })
        .catch(function (e: any) {
          console.log('e', e);
        });
    } catch { }
  };

  useEffect(() => {
    if (watchPeralatan) {
      getSelectOptions(watchPeralatan);
    }
  }, [watchPeralatan]);


  // console.log("watchGangguanPadam", watchGangguanPadam);


  return (
    <Row>
      <Col md={6}>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            No. Event
          </Form.Label>
          <Col md={8}>
            <InputForm control={control} name={'no_event'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            No. APKT
          </Form.Label>
          <Col md={8}>
            <InputForm control={control} name={'no_apkt'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Penyebab
          </Form.Label>
          <Col md={8}>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'penyebab'}
              options={option_penyebab}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Jenis Padam
          </Form.Label>
          <Col md={8}>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'jenis_padam'}
              options={option_jenis_padam}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Indikasi
          </Form.Label>
          <Col md={8}>
            <SelectAsyncDynamic
              required={true}
              fieldName={'id_ref_ep_indikasi'}
              pathServiceName={
                'opsisdis.rekap_padam.ref_ep_indikasi'
              }
              labelField={'nama'}
              valueField={'id_ref_ep_indikasi'}
              placeholder={'Pilih...'}
              isClearable={true}
              errors={errors}
              control={control}
              queryParams={{ page: -1 }}
              watchParent={watchJenisPadam}
              fieldNameParent="jenis"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>Jam Padam</Form.Label>
          <Col md={8}>
            <InputDate
              errors={errors}
              register={register}
              type="datetime-local"
              fieldName="jam_padam"
              // step={1}
            />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>Jam Tutup</Form.Label>
          <Col md={8}>
            <InputDate
              errors={errors}
              register={register}
              type="datetime-local"
              fieldName="jam_tutup"
              // step={1}
            />
          </Col>
        </Form.Group> */}

        {
        watchGangguanPadam === "PERALATAN" &&
          <>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                Jenis Peralatan
              </Form.Label>
              <Col md={8}>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_keypoint'}
                  options={option_jenis_peralatan}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                Peralatan
              </Form.Label>
              <Col md={8}>
                {watchJenisPeralatan == "PENYULANG" &&
                  <SelectAsyncDynamic
                    required={true}
                    fieldName='id_keypoint'
                    pathServiceName='master.jaringan.ref_lokasi'
                    labelField='nama_lokasi'
                    valueField='id_ref_lokasi'
                    placeholder={'Pilih...'}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: 10,
                      id_ref_jenis_lokasi: 6
                    }}
                  />
                }
                {/* {(watchJenisPeralatan == "GH" || watchJenisPeralatan == "RECLOSER") &&
                  < SelectAsyncDynamic
                    required={true}
                    fieldName='id_keypoint'
                    pathServiceName='master.jaringan.ref_lokasi'
                    labelField='nama_lokasi'
                    valueField='id_keypoint'
                    placeholder={'Pilih...'}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      id_ref_jenis_lokasi: 7
                    }}
                  />
                } */}
                {(watchJenisPeralatan == "ZONA") &&
                                <SelectAsyncDynamic
                                  required={true}
                                  fieldName='id_keypoint'
                                  pathServiceName='master.jaringan.ref_lokasi'
                                  labelField='nama_lokasi'
                                  valueField='id_ref_lokasi'
                                  placeholder={'Pilih...'}
                                  isClearable={true}
                                  errors={errors}
                                  control={control}
                                  queryParams={{
                                    page: -1,
                                    // id_ref_jenis_lokasi: 5
                                    fungsi_lokasi:'zone'
                                  }}
                                />
                }
              </Col>
            </Form.Group>
            {watchJenisPeralatan == 'MOTORIZED' &&
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Zona
                </Form.Label>
                <Col md={8}>
                  <InputForm control={control} name={'zona'} />
                </Col>
              </Form.Group>
            }
            {(watchJenisPeralatan == 'GH') && (
              <>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column md={4}>
                    Gardu Hubung
                  </Form.Label>
                  <Col md={8}>
                    <Form.Control
                      type={'text'}
                      {...register('gardu_hubung')}
                      isInvalid={errors?.gardu_hubung as boolean | undefined}
                    />
                  </Col>
                </Form.Group>
              </>
            )}
            {(watchJenisPeralatan == 'GH' ||
              watchJenisPeralatan == 'MOTORIZED' ||
              watchJenisPeralatan == 'RECLOSER') &&
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column md={4}>
                  Penyulang GI
                </Form.Label>
                <Col md={8}>
                  <InputForm control={control} name={'penyulang_gi'} />
                </Col>
              </Form.Group>
            }
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                Gardu Induk
              </Form.Label>
              <Col md={8}>
                <InputForm control={control} name={'gardu_induk'} />
              </Col>
            </Form.Group>
            {(watchJenisPeralatan == 'GH' ||
              watchJenisPeralatan == 'GI' ||
              watchJenisPeralatan == 'MOTORIZED' ||
              watchJenisPeralatan == 'RECLOSER') &&
              <>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column md={4}>
                    UP3
                  </Form.Label>
                  <Col md={8}>
                    <InputForm control={control} name={'up3'} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column md={4}>
                    ULP
                  </Form.Label>
                  <Col md={8}>
                    <InputForm control={control} name={'ulp'} />
                  </Col>
                </Form.Group>
              </>
            }
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                Wilayah Padam
              </Form.Label>
              <Col md={8}>
                <InputForm
                  as={'textarea'}
                  control={control}
                  name={'wilayah_padam'}
                />
              </Col>
            </Form.Group>
          </>

        }

        {watchGangguanPadam === "LBS MANUAL" &&
          <>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                LBS Manual/FCO
              </Form.Label>
              <Col md={8}>
                <InputForm control={control} name={'lbs_manual'} />
              </Col>
            </Form.Group>
          </>
        }
        {watchGangguanPadam === "MELUAS" &&
          <>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
                GANGGUAN MELUAS
              </Form.Label>
              <Col md={8}>
                <InputForm control={control} name={'lbs_manual'} />
              </Col>
            </Form.Group>
          </>
        }



        {/* <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Jumlah Gardu Padam
          </Form.Label>
          <Col md={8}>
            <InputForm
              control={control}
              name={'jlh_gardu_padam'}
            />
          </Col>
        </Form.Group> */}

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Pelanggan TM
          </Form.Label>
          <Col md={8}>
            <InputForm control={control} name={'pelanggan_tm'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Pelanggan VIP
          </Form.Label>
          <Col md={8}>
            <InputForm control={control} name={'pelanggan_vip'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={4}>
            Beban Padam
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <InputForm control={control} name={'beban_padam'} />
              <InputGroup.Text>A</InputGroup.Text>
            </InputGroup>
          </Col>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className='mb-3'>
          <Form.Label>Arus Gangguan:</Form.Label>
          <Row>
            <Col md={6} className='mb-3'>
              <InputGroup>
                <InputGroup.Text>R</InputGroup.Text>
                <InputForm control={control} name={'r'} />
                <InputGroup.Text>A</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={6} className='mb-3'>
              <InputGroup>
                <InputGroup.Text>S</InputGroup.Text>
                <InputForm control={control} name={'s'} />
                <InputGroup.Text>A</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={6} className='mb-3'>
              <InputGroup>
                <InputGroup.Text>T</InputGroup.Text>
                <InputForm control={control} name={'t'} />
                <InputGroup.Text>A</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>N</InputGroup.Text>
                <InputForm control={control} name={'n'} />
                <InputGroup.Text>A</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>
        {/* <Form.Group className='mb-3'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>
              Nyala Bertahapqfwqwfwqf
            </Card.Header>
            <Card.Body>
              {idTransEp && (
                <>
                  <AppButton
                    onClick={(e: any) => {
                      e.preventDefault();
                      setModalNyalaBertahap((prev: any) => ({
                        ...prev,
                        show: true,
                      }));
                    }}
                    variant='primary'
                    isLoading={loading}
                  >
                    Tambah Data
                  </AppButton>

                  <TableNyalaBertahap idTransEp={idTransEp} />
                </>
              )}
            </Card.Body>
          </Card>
        </Form.Group> */}
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>Jam Normal</Form.Label>
          <Col md={7}>
            <InputDate
              errors={errors}
              register={register}
              type="datetime-local"
              fieldName="jam_normal"
              step={1}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Cuaca
          </Form.Label>
          <Col md={7}>
            <SelectAsyncDynamic
              required={true}
              fieldName={'id_ref_ep_cuaca'}
              pathServiceName={
                'opsisdis.rekap_padam.ref_ep_cuaca'
              }
              labelField={'nama'}
              valueField={'id_ref_ep_cuaca'}
              placeholder={'Pilih...'}
              isClearable={true}
              errors={errors}
              control={control}
              queryParams={{ page: -1 }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            ANEV
          </Form.Label>
          <Col md={7}>
            <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'anev'}
              options={option_ket_anev}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Keterangan ANEV
          </Form.Label>
          <Col md={7}>
            <InputForm as="textarea" control={control} name={'keterangan_anev'} />

          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Jumlah Gardu Padam
          </Form.Label>
          <Col md={7}>
            <InputForm control={control} name={'total_gardu_padam'} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Jumlah Gardu Nyala
          </Form.Label>
          <Col md={7}>
            <InputForm control={control} name={'total_gardu_nyala'} />
          </Col>
        </Form.Group>
        <div>
          <strong>Total Gangguan:</strong>
        </div>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Total Gangguan Selama 1 Bulan
          </Form.Label>
          <Col md={7}>
            <InputForm
              control={control}
              name={'total_gangguan_month'}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column md={5}>
            Total Gangguan Selama 1 Tahun
          </Form.Label>
          <Col md={7}>
            <InputForm
              control={control}
              name={'total_gangguan_year'}
            />
          </Col>
        </Form.Group>
      </Col>
    </Row>
  )

}