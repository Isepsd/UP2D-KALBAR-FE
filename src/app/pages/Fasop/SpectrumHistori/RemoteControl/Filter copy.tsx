import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import InputDate from '@app/components/Date/InputDate';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
// import { FASOP_PENGUKURAN_30_M } from '@app/configs/select-options/fasop-select';

export default function Filter(
) {
  const [loading, setLoading] = useState<boolean>(false);
  // const options: any = FASOP_PENGUKURAN_30_M();
  const [dataParams, setDataParams] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
   
    // time: optionsTimes[0]?.value
  });

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
  datum_date: Yup.string().typeError('Tanggal wajib diisi').required('Tanggal wajib diisi'),
   waktu: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    path5: Yup.string().nullable(),
   
  });
  // const currentDate = moment();
  // const startOfDay = currentDate
  //   .clone()
  //   .startOf("day")
  //   .set({ hour: 0, minute: 0, second: 0 });
  // const endOfDay = currentDate
  //   .clone()
  //   .endOf("day")
  //   .set({ hour: 23, minute: 59, second: 59 });

  const [formModel] = useState<any>({
    waktu: undefined,
    datum_date: moment().format("YYYY-MM-DD"),
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    path5: "",
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
    // const watchDate = useWatch({ control, name: 'date' });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // if (data?.datum_date) {
    //   data.datum_date = moment(data?.datum_date).format('YYYY-MM-DD');
    // }
    if (data?.waktu) {
      const datum_date = moment(data?.datum_date).format('YYYY-MM-DD');
      const datum = data.waktu;
      data.datum = datum_date + " " + datum;
    } else {
      delete data.datum; // Remove the "datum" property from the data object if "waktu" is not chosen
    }
    
    // else{
    //   data.datum_date = moment(data?.datum_date).format('YYYY-MM-DD');
    // }
    
    setDataParams(() => {
      return { ...data };
    });
  };
  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          // datum_after: moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
          // datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
          // after: moment().subtract(1, "day").format("YYYY-MM-DD"),
          // before: moment().format("YYYY-MM-DD"),
          datum_date: moment().format("YYYY-MM-DD"),
          waktu: undefined,
          datum: undefined,
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          path5: "",
        }}

      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
         
          <Col md={3} className="">
            <Form.Group className='mb-2'>
                  <Form.Label>Tanggal</Form.Label>
                  <InputDate errors={errors} register={register} type="date" fieldName="datum_date" />
                </Form.Group>
            </Col>
           
            {/* <Col md={2}> */}
              {/* <Form.Group className='mb-2'>
                <Form.Label>Jam</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'waktu'}
                  isClearable={true}
                  options={options}
                />
              </Form.Group>
            </Col> */}
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path1"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: "path1text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Tegangan (B2)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path2"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: "path2text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path3"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: "path3text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path4"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: "path4text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path5"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: "path5text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="mt-2">
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
