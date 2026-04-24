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

export default function UsulanFilter() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    datum_after: moment().add(-1, "day").format("YYYY-MM-DD"),
    datum_before: moment().format("YYYY-MM-DD"),
    // wilayah: ""
  });

  const wilayah = [
    { label: "BANTEN", value: "BANTEN" },
    { label: "TANGERANG", value: "TANGERANG" },
  ];

  const status_pekerjaan = [
    { label: "PELAKSANAAN", value: "PELAKSANAAN" },
    { label: "SUDAH DILAKSANAKAN", value: "SUDAH DILAKSANAKAN" },
    { label: "SUDAH MANUVER", value: "SUDAH MANUVER" },
    { label: "BATAL DILAKSANAKAN", value: "BATAL DILAKSANAKAN" },
  ];

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

  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    wilayah: Yup.string().nullable(),
    status_pekerjaan: Yup.string().nullable(),
    kategori_rotbmh_in: Yup.string().nullable(),
    sifat_pekerjaan_2_in: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_after: moment().add(-3, "day").startOf("day").format("YYYY-MM-DD"),
    datum_before: moment().add(14, "day").endOf("day").format("YYYY-MM-DD"),
    wilayah: "",
    status_pekerjaan: "",
    kategori_rotbmh_in: "",
    sifat_pekerjaan_2_in: "",
  });

  const { handleSubmit, register, setValue, setError, formState, control } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const { }: any = formState || {};

  const onSubmitForm = (data: any) => {
    setDataParams(() => {
      return { ...data };
    });
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
          status_pekerjaan: "",
          kategori_rotbmh_in: "",
          sifat_pekerjaan_2_in: "",
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

            <Col md={2} className="">
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
            </Col>
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
            
                        <Col md={2} className="mt-2">
                          <FilterActionButton
                            className="justify-content-start"
                            loading={loading}
                          />
                        </Col>
                        </Row>
                        <Row>
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
                  <div
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
                    <span>Rencana Jadwal</span>
                  </div>
                  <div
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
                    <span>Pelaksanaan</span>
                  </div>
                  <div
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
                    <span>Sudah Dilaksanakan</span>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#FA8072",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Batal Dilaksanakan</span>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#BBDEFB",
                        border: "1px solid #ddd",
                        marginRight: "5px",
                      }}
                    ></div>
                    <span>Sudah Manuver</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </FilterForm>
    </>
  );
}
