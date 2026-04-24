import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FiltersForm from "@app/modules/Filters/FilterForm";

import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import InputDate from "@app/components/Date/InputDate";
import moment from "moment";
// import { OPTIONS_ZONA } from '@app/configs/select-options/jaringan.select';
// import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

export default function Filter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({});

  const validationSchema = Yup.object().shape({
    tahun: Yup.string()
      .typeError("Tanggal wajib diisi")
      .required("Tanggal wajib diisi"),

    // zona: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    tahun: moment().format("YYYY"),
    id_pemilik: null,
  });

  const { handleSubmit, setValue, setError, register, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });


  const { errors }: any = formState || {};

  // const [paramParentLokasi, setParamParentLokasi] = useState<boolean>(false)

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setLoading(true); // Aktifkan loading segera setelah tombol ditekan




    setDataParams(() => ({
      ...data,
    }));


  };





  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{

          tahun: moment().format("YYYY"),
          // zona: "ZONA 1",
          // id_ref_lokasi_gi: id_ref_lokasi_gi?.id_roles,
          id_pemilik: null,
          // id_parent_lokasi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className="align-items-end"> {/* agar semua col sejajar di bawah (rata) */}
            <Col md={1}>
              <Form.Group className="mb-2">
                <Form.Label>tahun</Form.Label>
                <InputDate
                  errors={errors}
                  register={register}
                  type="year"
                  fieldName="tahun"
                />
              </Form.Group>
            </Col>

            {/* <Col md={4}>
                <Form.Group className="mb-1" controlId="zona">
                  <Form.Label>Zona</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName="zona"
                    options={OPTIONS_ZONA}
                    isClearable={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.zona?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col> */}

            <Col md={2}>
              <div className="mb-2">
                <FilterActionButton
                  className="justify-content-start"
                  loading={loading}
                />
              </div>
            </Col>
          </Row>

        </Form>
      </FiltersForm>
    </>
  );
}
