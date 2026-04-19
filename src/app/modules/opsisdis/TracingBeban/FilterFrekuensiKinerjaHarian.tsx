import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";

import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";




const TANGGAL_OPTIONS: any = [
  { label: 'HARIAN', value: 'harian' },
  { label: 'BULANAN', value: 'bulanan' },
  { label: 'TAHUNAN', value: 'tahunan' },
 
]



type Props = {
 
  configFilter?: any;
 
};

function SubSistemFilter({
 
  configFilter = {},
 
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);


  const models: any = {
   
    day_after: moment().subtract(29, "day").format("YYYY-MM-DD"),
    day_before: moment().format("YYYY-MM-DD"),
    month_after: moment().startOf("year").format("YYYY-MM"),
    month_before: moment().format("YYYY-MM"),
    year_after: moment().subtract(4, "year").format("YYYY"),
    year_before: moment().format("YYYY"),
   
    value: null,
    

    

  };

 

  configFilter?.forEach((parameter: any) => {
   
    models[parameter] = undefined;
  });

  const [formModel] = useState<any>({
   
    ...models,
  });

  const validationSchema = Yup.object().shape({
  
    day_after: Yup.string().nullable(),
    day_before: Yup.string().nullable(),
    month_after: Yup.string().nullable(),
    month_before: Yup.string().nullable(),
    year_after: Yup.string().nullable(),
    year_before: Yup.string().nullable(),
 
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });

  const { errors }: any = formState || {};
 
  const watchDate2Before = useWatch({ control, name: "date_before" });
  const watchMonth1After = useWatch({ control, name: "month_after" });
  const watchMonth2Before = useWatch({ control, name: "month_before" });
 
  const watchJenisKeterangan = useWatch({ control, name: 'keterangan' });

 
   
    
  
  

  const defaultValues = {
   
    ...models,
  };

  const [dataParams, setDataParams] = useState<any>(defaultValues);

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // console.log("data", data);

   // Check user choices and delete fields accordingly
   if (data.keterangan === 'harian') {
    if (data.day_after && data.day_before) {
      delete data.month_after;
      delete data.month_before;
      delete data.year_after;
      delete data.year_before;
    }
  } else if (data.keterangan === 'bulanan') {
    if (data.month_after && data.month_before) {
      delete data.year_after;
      delete data.year_before;
      delete data.day_after;
      delete data.day_before;
    }
  } else if (data.keterangan === 'tahunan') {
    if (data.year_after && data.year_before) {
      delete data.month_after;
      delete data.month_before;
      delete data.day_after;
      delete data.day_before;
    }
  }
    let valid = true;
   

   
    if (valid) {
      console.log("data parmas", data);

      setDataParams(() => {
        return {
          ...data,
        };
      });
    }
  };

  useEffect(() => {
    console.log("useEffect defaultValues", defaultValues);

    onSubmitForm(defaultValues);
  }, []);

  

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={defaultValues}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>

          <Col md={2}>
                <Form.Group className='mb-3'>
                  <Form.Label>Keterangan</Form.Label>
                  <SelectFormStatic
                    control={control}
                    errors={errors}
                    fieldName={'keterangan'}
                    options={TANGGAL_OPTIONS}
                  ></SelectFormStatic>
                  <Form.Control.Feedback type='invalid'>
                    {errors?.keterangan?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
          
            {(watchJenisKeterangan == 'harian') &&
 (
              <>
                <Col md={4} className="mb-3">
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register("day_after")}
                        type="date"
                        max={watchDate2Before}
                      />
                      <InputGroup.Text>
                        <i className="fa fa-arrow-right"></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register("day_before")}
                        type="date"
                        min={moment(watchDate2Before)
                          .subtract(31, "day")
                          .format("YYYY-MM-DD")}
                        max={moment().format("YYYY-MM-DD")}
                      />
                    </InputGroup>
                  </Form.Group>
                  {errors.day_after && (
                    <div className="invalid-feedback d-block">
                      {errors?.day_after?.message}
                    </div>
                  )}
                </Col>
              </>
            )}
            {(watchJenisKeterangan == 'bulanan') && (
                <>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Range Bulan</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register("month_after")}
                          type="month"
                          formTarget="yyyy-mm-dd"
                          placeholder="Pilih Tanggal"
                          max={watchMonth2Before}
                        />
                        <InputGroup.Text>
                          <i className="fa fa-arrow-right"></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register("month_before")}
                          type="month"
                          formTarget="yyyy-mm-dd"
                          placeholder="Pilih Tanggal"
                          min={moment(watchMonth1After).format("YYYY-MM")}
                          max={moment().format("YYYY-MM")}
                        />
                      </InputGroup>
                    </Form.Group>
                    {errors.month_after && (
                      <div className="invalid-feedback d-block">
                        {errors?.month_after?.message}
                      </div>
                    )}
                  </Col>
                </>
              )}
            {(watchJenisKeterangan == 'tahunan') && (
                <>
                  <Col md={4} className="mb-3">
                    <Form.Group>
                      <Form.Label>Range Tahun</Form.Label>
                      <InputGroup>
                        <FormControl {...register("year_after")} type="number" />
                        <InputGroup.Text>
                          <i className="fa fa-arrow-right"></i>
                        </InputGroup.Text>
                        <FormControl {...register("year_before")} type="number" />
                      </InputGroup>
                      {errors.year_after && (
                        <div className="invalid-feedback d-block">
                          {errors?.year_after?.message}
                        </div>
                      )}
                      {errors.year_before && (
                        <div className="invalid-feedback d-block">
                          {errors?.year_before?.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </>
              )}
          
          </Row>
          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(defaultValues)}
            className="justify-content-start"
          />
        </Form>
      </FiltersForm>
    </>
  );
}

export default SubSistemFilter;
