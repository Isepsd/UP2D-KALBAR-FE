import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';

export default function UsulanFilter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    // datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    // datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
  });
  

  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
  });

  const { handleSubmit, register, setValue, setError, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { }: any = formState || {};

  const onSubmitForm = (data: any) => {
    const awal = data.after;
    const akhir = data.before;

    data.datum_after = awal + " 00:00:00";
    data.datum_before = akhir + " 23:59:59";

    setDataParams(() => {
      return { ...data };
    });
    onFilterChange(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
          datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("after")}
                    type="date"
                    defaultValue={moment(formModel.datum_after).format("YYYY-MM-DD")}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("before")}
                    type="date"
                    defaultValue={moment(formModel.datum_before).format("YYYY-MM-DD")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
            <Col md={6}>
              {/* Status Keterangan (Horizontal Layout) */}
              <div style={{ marginTop: '20px' }}>
                <h6>KETERANGAN</h6>
                <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '15px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'white', border: '1px solid #ddd', marginRight: '5px' }}></div>
                    <span>Belum Disetujui</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '15px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'yellow', border: '1px solid #ddd', marginRight: '5px' }}></div>
                    <span>Sudah Diposting</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '15px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#81C784', border: '1px solid #ddd', marginRight: '5px' }}></div>
                    <span>Sudah Disetujui</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'red', border: '1px solid #ddd', marginRight: '5px' }}></div>
                    <span>Batal</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
