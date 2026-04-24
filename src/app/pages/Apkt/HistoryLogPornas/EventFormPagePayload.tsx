import React from "react";
import { Modal } from "react-bootstrap";

export default function EventFormPagePayload({ dataSelected }: any) {
  // console.log("dataselectedpayload", dataSelected);

  return (
    <div className="px-4 py-3">
          <h5 className="text-center fw-bold text-primary mb-3">
            Payload Kafka
          </h5>

          <div
            className="border rounded bg-dark text-light p-4"
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontSize: "1.1rem",
              lineHeight: 1.5,
              maxHeight: "400px",   // batas tinggi
              overflowY: "auto",    // scroll vertical
            }}
          >
            {dataSelected ? dataSelected : "Tidak ada payload"}
          </div>

          <Modal.Footer className="d-flex justify-content-center mt-3">
            <small className="text-muted">
              Payload hanya ditampilkan untuk dibaca (read-only)
            </small>
          </Modal.Footer>
    </div>

  );
}
