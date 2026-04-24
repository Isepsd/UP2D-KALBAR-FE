import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useForm ,useWatch} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import moment from "moment";
import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

export default function Filter({ onFilterChange  }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
 
  const kesimpulan = [
    
    { label: "VALID", value: "VALID" },
    { label: "INVALID", value: "INVALID" },

  ];
  const optionData = [
    // { label: 'Semua', value: '' },
    { label: "> 2 Jam", value: "> 2 jam" },
    { label: "> 4 Jam", value: "> 4 jam" },
    { label: "> 6 Jam", value: "> 6 jam" },
  ];
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    // datum_after: Yup.string().nullable(),
    // datum_before: Yup.string().nullable(),
    nama_pointtype: Yup.string().nullable(),
    durasi: Yup.string().nullable(),
    kesimpulan: Yup.string().nullable(),
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
    // datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    // datum_before: moment().format("YYYY-MM-DD"),
    nama_pointtype: "",
    durasi: "",
    kesimpulan: "",
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    path5: "",
  });

  const { handleSubmit, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchPath1 = useWatch({ control, name: 'path1' });
  const watchPath2 = useWatch({ control, name: 'path2' });
  const watchPath3 = useWatch({ control, name: 'path3' });
  const watchPath4 = useWatch({ control, name: 'path4' });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);

    // data.datum_after += " 00:00:00";
    // data.datum_before += " 23:59:59";

    // setLoading(true);
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
          // datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
          // datum_before: moment().format("YYYY-MM-DD"),
          nama_pointtype: "",
          durasi: "",
          kesimpulan: "",
          path1: "",
          path2: "",
          path3: "",
          path4: "",
        }}
        overrideType={{ tanggal_awal: "datetime", tanggal_akhir: "datetime" }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {/* <Col md={3} className=""> */}
            {/* <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("datum_after")}
                    type="date"
                    defaultValue={moment(formModel.datum_after).format(
                      "YYYY-MM-DD"
                    )}
                    // min={moment(watchDatum2Before)
                    //   .subtract(1, 'month')
                    //   .format('YYYY-MM-DD')}
                    // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("datum_before")}
                    type="date"
                    defaultValue={moment(formModel.datum_after).format(
                      "YYYY-MM-DD"
                    )}
                    // min={watchDatum1After}
                    // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group> */}
            {/* </Col> */}
            <Col md={2} className="">
                <Form.Group className='mb-2'>
                  <Form.Label>Tipe Point</Form.Label>
                  <SelectAsyncDynamic
                    fieldName='nama_pointtype'
                    pathServiceName='master.fasop.point_type'
                    labelField='name'
                    valueField='name'
                    placeholder='Pilih...'
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      id_induk_pointtype : "3d391819-4288-4699-80f4-7ebd5ae0d733",
                      sort_by: 'name',
           
                    }}
                  />
                </Form.Group>
              </Col>
            <Col md={2} className="">
            <Form.Group className="mb-2">
            <Form.Label>Durasi</Form.Label>
              <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'durasi'}
              placeholder="--Pilih Durasi--"
              options={optionData}
            ></SelectFormStatic>
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path1',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Tegangan (B2)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath1}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path2',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath2}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path3',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath3}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path4',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path5'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath4}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path5',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                    ...(watchPath4 ? { path4: watchPath4 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
            <Form.Group className="mb-2">
            <Form.Label>Kesimpulan</Form.Label>
              <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'kesimpulan'}
              placeholder="pilih..."
              options={kesimpulan}
            ></SelectFormStatic>
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