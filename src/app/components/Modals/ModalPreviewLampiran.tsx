import { cdnUrl } from '@app/helper/cdn.helper';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const ModalPreviewLampiran = ({
  data = { title: '', file: '' },
  showModal,
  setShowModal,
}: any) => {
  const [type, setType] = useState<string>();

  const handleDownload = () => {
    window.open(`${process.env.PUBLIC_URL}/${cdnUrl(data?.file)}`, '_blank');
  };

  useEffect(() => {
    let file: string = data?.file;
    if (file != '' && file != null && file != undefined) {
      let typeTmp: any = 'image';
      if (file?.indexOf('.pdf') > -1 && file?.length > 0) {
        typeTmp = 'pdf';
      } else if (
        file?.length > 0 &&
        (file?.indexOf('.xlsx') > -1 ||
          file?.indexOf('.csv') > -1 ||
          file?.indexOf('.xls') > -1)
      ) {
        typeTmp = 'excel';
      }
      setType(typeTmp);
    }
  }, [data]);

  return (
    <>
      <Modal
        // size='sm'
        centered
        scrollable
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lampiran {data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type == 'pdf' && (
            <div className='text-center'>
              <iframe width='100%' height='460' src={cdnUrl(data?.file)} />
            </div>
          )}
          {type == 'image' && (
            <div className='container-image text-center'>
              <img
                // width='100%'
                src={cdnUrl(data?.file)}
                className='image-lampiran'
              />
            </div>
          )}
          {type == 'excel' && (
            <div className='container-image text-center'>
              <div>
                <strong>File tidak mendukung</strong>
              </div>
              <span className='pointer' onClick={handleDownload}>
                <u>Download File</u>
              </span>
            </div>
          )}
        </Modal.Body>

        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalPreviewLampiran;
