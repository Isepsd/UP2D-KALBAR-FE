import React, { useState } from "react";
import { Col, Form, FormControl, Row, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FilterForm from "@app/modules/Filters/FilterForm";
import moment from "moment";
import { Button } from "@app/components";
import axios from "axios";
import { API_PATH } from "@app/services/_path.service";
import { getAllByPath } from "@app/services/main.service";
import { generateWhatsappText } from "./generateWhatsappText";

export default function FilterCopyWaHarian() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({});
  const [waText, setWaText] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    tanggal: Yup.string().required("Tanggal wajib diisi"),
  });

  const defaultDate = moment().format("YYYY-MM-DD");

  const { handleSubmit, register, setValue, setError } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { tanggal: defaultDate },
  });

  const onSubmitForm = async (data: any) => {
    const source = axios.CancelToken.source();

    try {
      setLoading(true);

      // ✅ mapping tanggal → datum_after & datum_before
      // const params = {
      //   tanggal: data.tanggal,
      //   datum_after: data.tanggal,
      //   datum_before: data.tanggal,
      // };

      const params = {
        tanggal: data.tanggal,
        datum_after: moment(data.tanggal)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),

        datum_before: moment(data.tanggal)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
          status_pekerjaan_in:
            "RENCANA JADWAL PEKERJAAN, PELAKSANAAN, SUDAH DILAKSANAKAN, BATAL DILAKSANAKAN, SUDAH MANUVER",
          page:-1,
          limit:-1
      };

      console.log("📌 PARAMS DIKIRIM:", params);

      const res: any = await getAllByPath(
        API_PATH().opsisdis.jadwal_pemeliharaan.har_rotbmh,
        params,
        source.token
      );

      console.log("📌 FULL RESPONSE:", res);

      const payload = res; // ✅ karena response langsung object
      console.log("📌 PAYLOAD dipakai:", payload);

      const text = generateWhatsappText(payload, data.tanggal);
      console.log("📌 HASIL generateWhatsappText:", text);

      setWaText(text);
      setShowModal(true);

      setDataParams(data);

    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("⛔ Request dibatalkan");
      } else {
        console.error("❌ ERROR submit:", err);
        alert("❌ Gagal memuat data Copy WhatsApp");
      }
    } finally {
      setLoading(false);
    }
  };

    const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(waText)
        .then(() => alert("✅ Teks berhasil dicopy!"))
        .catch(err => console.error("❌ Clipboard gagal:", err));
    } else {
      // fallback
      const textArea = document.createElement("textarea");
      textArea.value = waText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("✅ Teks berhasil dicopy!");
    }
  };

  return (
    <>
      <FilterForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{ tanggal: defaultDate }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Pilih Tanggal</Form.Label>
                <FormControl {...register("tanggal")} type="date" />
              </Form.Group>
            </Col>

            <Col md={6} className="mt-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="me-1 mt-2"
              >
                <i className="fa-brands fa-whatsapp me-1"></i> Generate Whatsapp
              </Button>
            </Col>
          </Row>
        </Form>
      </FilterForm>

      {/* ✅ MODAL PREVIEW */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Preview Copy Message WhatsApp Harian </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre style={{ whiteSpace: "pre-wrap" }}>{waText}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="success" onClick={handleCopy}>
            Copy ke Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
