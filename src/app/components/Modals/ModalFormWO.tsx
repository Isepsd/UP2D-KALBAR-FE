import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalformCopyJenispoint = ({ modalProps, children }: any) => {
  return (
    <Modal
      show={modalProps.show}
      onHide={() => modalProps.setShow(false)} // Fungsi untuk menutup modal jika diinginkan
      size={modalProps.size}
      backdrop="static" // Tidak menutup modal ketika klik di luar modal
      keyboard={false} // Nonaktifkan penutupan modal dengan tombol keyboard
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalProps.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalformCopyJenispoint;
