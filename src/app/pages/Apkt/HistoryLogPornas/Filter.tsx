import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import FiltersForm from "@app/modules/Filters/FilterFormNew";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import moment from "moment";
// import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
// import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamicDuplicate";

// export default function Filter({onFilterChange}:any) {
export default function FilterMonGar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    // datum_status_2_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    // datum_status_2_before: moment().format("YYYY-MM-DD"),
  });
  // console.log("sakitu",nama_group_event)
  const duration = [
    // { label: 'Semua', value: '' },
    // { label: "UP", value: "UP" },
    // { label: "DOWN", value: "DOWN" },
    { label: "PADAM", value: "DOWN" },
    { label: "NYALA", value: "UP" },
 
  ];

 
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
  

  });

  const [formModel] = useState<any>({

          event_status:"",
     
  });

  const { handleSubmit, setValue, setError,formState,control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
const onSubmitForm = (data: any) => {
  const payload = {
    ...data,

  };
  // onFilter(payload);
  setDataParams(payload);
  // onFilter(payload);
};



  // const watchDate2Before = useWatch({ control, name: 'date_before' });
  // const watchDate2After = useWatch({ control, name: "day_after" });

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
        
          event_status:"",
       
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
         <Row className="align-items-end">
            {/* Input Range Tanggal */}
            
  
      <Col md={2} >
              <Form.Group >
                <Form.Label>Status Event</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'event_status'}
                  isClearable={true}
                  placeholder="Pilih Status Event"
                  options={duration}
                ></SelectFormStatic>
              </Form.Group>
            </Col>
      
    

            {/* Tombol Filter */}
            <Col md="auto" className="align-self-end">
              <FilterActionButton
                className="justify-content-start"
                loading={loading}
              />
            </Col>
          </Row>

   
        </Form>
      </FiltersForm>
    </>
  );
}
