import React, { useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FilterForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import moment from "moment";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import SelectFormStaticDouble from "@app/modules/SelectForm/SelectFormStaticDouble";

export default function PostingFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    // datum_after: moment().add(-1, "day").format("YYYY-MM-DD"),
    // datum_before: moment().format("YYYY-MM-DD"),
    // wilayah: ""
  });

  const wilayah = [
    { label: "BANTEN", value: "BANTEN" },
    { label: "TANGERANG", value: "TANGERANG" },
  ];

  // const status_pekerjaan = [
  //   { label: "DRAFT", value: "DRAFT" },
  //   { label: "USULAN PEKERJAAN", value: "USULAN PEKERJAAN" },
  //   { label: "RENCANA JADWAL PEKERJAAN", value: "RENCANA JADWAL PEKERJAAN" },
  // ];

  const kategori_rotbmh = [
    { label: "ROT", value: "ROT" },
    { label: "ROB", value: "ROB" },
    { label: "ROM", value: "ROM" },
    { label: "ROH", value: "ROH" },
    { label: "EMERGENCY", value: "EMERGENCY" },
  ];

  const SIFAT_PEKERJAAN_2 =  [
    { label: 'Kode 1 : Pemadaman beban distribusi selama pekerjaan', value: '1' },
    { label: 'Kode 2 : Pemadaman beban distribusi selama manuver', value: '2' },
    { label: 'Kode 3 : Peralatan bebas tegangan selama pekerjaan', value: '3' },
    { label: 'Kode 4 : Peralatan bebas tegangan selama manuver', value: '4' },
    { label: 'Kode 5 : Peralatan bertegangan', value: '5' },
    { label: 'ABK : Akan diberitahu kemudian', value: 'ABK' },
  ];

  // const status_approval = [
  //   // { label: "Belum Disetujui", value: "BELUM" },
  //   // { label: "Sudah Diposting", value: "POSTING" },
  //   // { label: "Sudah Disetujui", value: "SETUJU" },
  //   { label: "Batal", value: "BATAL" },
  //   { label: "Release", value: "RELEASE" },
  // ];

  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    wilayah: Yup.string().nullable(),
    // status_pekerjaan: Yup.string().nullable(),
    kategori_rotbmh_in: Yup.string().nullable(),
    sifat_pekerjaan_2_in: Yup.string().nullable(),
    // status_approval: Yup.string().nullable(),
    approvel_area: Yup.string().nullable(),
    approvel_apd: Yup.string().nullable(),
    release_rotbmh: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_after: moment().add(-3, "day").startOf("day").format("YYYY-MM-DD"),
    datum_before: moment().add(14, "day").endOf("day").format("YYYY-MM-DD"),
    wilayah: "",
    // status_pekerjaan: "",
    kategori_rotbmh_in: "",
    sifat_pekerjaan_2_in: "",
    // status_approval: "",
    approvel_area: "",
    approvel_apd: "",
    release_rotbmh: ""
  });

  const { handleSubmit, register, setValue, setError, formState, control } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const { }: any = formState || {};

  // const onSubmitForm = (data: any) => {
  //   setDataParams(() => {
  //     return { ...data };
  //   });
  // };

  const onSubmitForm = (data: any) => {

    // let extraFilter: any = {
    //   approvel_area: "",
    //   approvel_apd: "",
    //   release_rotbmh: ""
    // };

    // if (data.status_approval === "BATAL") {
    //   extraFilter = { approvel_area: 1, approvel_apd: 2, release_rotbmh: 0 };
    // }

    // if (data.status_approval === "RELEASE") {
    //   extraFilter = { approvel_area: 0, approvel_apd: 0, release_rotbmh: 1 };
    // }

    const finalParams = {
      ...data
      // ...extraFilter
    };

    console.log("PARAMS FINAL:", finalParams);

    setDataParams(finalParams);
  };

  return (
    <>
      <FilterForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_after: moment()
            .add(-3, "day")
            .startOf("day")
            .format("YYYY-MM-DD"),
          datum_before: moment()
            .add(14, "day")
            .endOf("day")
            .format("YYYY-MM-DD"),
          wilayah: "",
          // status_pekerjaan: "",
          kategori_rotbmh_in: "",
          sifat_pekerjaan_2_in: "",
          // status_approval: "",
          // approvel_area: "",
          // approvel_apd: "",
          // release_rotbmh: "",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("datum_after")}
                    type="date"
                    defaultValue={moment(formModel.awal).format("YYYY-MM-DD")}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("datum_before")}
                    type="date"
                    defaultValue={moment(formModel.akhir).format("YYYY-MM-DD")}
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
                  fieldName={"wilayah"}
                  placeholder="SEMUA"
                  options={wilayah}
                ></SelectFormStatic>
              </Form.Group>
            </Col>

            {/* <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Status Pekerjaan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={"status_pekerjaan"}
                  placeholder="SEMUA"
                  options={status_pekerjaan}
                ></SelectFormStatic>
              </Form.Group>
            </Col> */}
            </Row>
            <Row>
            <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Kategori</Form.Label>
                <SelectFormStaticDouble
                  control={control}
                  errors={errors}
                  fieldName="kategori_rotbmh_in"
                  placeholder="All"
                  options={kategori_rotbmh}
                  isClearable={true}
                  isMulti={true}           // INI YANG AKTIFIN MULTI SELECT
                />
              </Form.Group>
            </Col>

            <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Sifat Pekerjaan</Form.Label>
                <SelectFormStaticDouble
                  control={control}
                  errors={errors}
                  fieldName="sifat_pekerjaan_2_in"
                  placeholder="All"
                  options={SIFAT_PEKERJAAN_2}
                  isClearable={true}
                  isMulti={true}           // INI YANG AKTIFIN MULTI SELECT
                />
              </Form.Group>
            </Col>

            {/* <Col md={2} className="">
              <Form.Group className="mb-2">
                <Form.Label>Keterangan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={"status_approval"}
                  placeholder="SEMUA"
                  options={status_approval}
                ></SelectFormStatic>
              </Form.Group>
            </Col> */}
            <Col md={2} className="mt-2">
              <FilterActionButton
                className="justify-content-start"
                loading={loading}
              />
            </Col>
            <Col md={6}>
              {/* Status Keterangan (Horizontal Layout) */}
              <div style={{ marginTop: "20px" }}>
                <h6>KETERANGAN</h6>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {/* <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Belum Disetujui</span>
                  </div> */}
                  {/* <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#FFFE99",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Sudah Diposting</span>
                  </div> */}
                  {/* <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#81C784",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Sudah Disetujui</span>
                  </div> */}
                  <div style={{ display: "inline-flex", alignItems: "center",
                      marginRight: "15px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#FA8072",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Batal</span>
                  </div>
                  {/* <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#6F42C1",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Sudah Release</span>
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </FilterForm>
    </>
  );
}
