import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";


export default function RencanaFilter({ onFilterChange }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const wilayah = [

    { label: "BANTEN", value: "BANTEN" },
    { label: "TANGERANG", value: "TANGERANG" },

  ];

  const jenis_jadwal = [

    { label: "RUTIN", value: "RUTIN" },
    { label: "KOREKTIF", value: "KOREKTIF" },
    { label: "SUSULAN", value: "SUSULAN" },
    { label: "TERENCANA", value: "TERENCANA" },
    { label: "EMERGENCY", value: "EMERGENCY" },
    { label: "SIAGA", value: "SIAGA" },

  ];

  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    wilayah: Yup.string().nullable(),
    jenis_jadwal: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
    wilayah: "",
    jenis_jadwal: "",
  });

  const { handleSubmit, register, setValue, setError, formState, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { }: any = formState || {};
  const { errors }: any = formState || {};

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
          wilayah: "",
          jenis_jadwal: "",
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

            <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Wilayah</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'wilayah'}
                  placeholder="SEMUA"
                  options={wilayah}
                ></SelectFormStatic>
              </Form.Group>
            </Col>

            <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Jadwal</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_jadwal'}
                  placeholder="SEMUA"
                  options={jenis_jadwal}
                ></SelectFormStatic>
              </Form.Group>
            </Col>

            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
