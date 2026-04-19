import React, { useEffect, useRef, useState } from 'react';
import { uploadImage } from '@app/services/cdn-upload.service';
import axios from 'axios';

export default function ImageUploadAlt({
  dispatchNotification,
  upsertData,
  uploadingImage,
  previewResults,
  className = 'btn btn-link',
  btnText = 'Ubah',
  fieldName='avatar'
}: IImageUpload) {
  const source = axios.CancelToken.source();
  const refUpload = useRef<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState({
    file: undefined,
    base64: null,
  });

  loading;

  const handleChangeFoto = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader: any = new FileReader();
      reader.onload = () => {
        setPreview((prevState: any) => ({
          ...prevState,
          base64: reader.result,
          file: file,
        }));
        previewResults({
          ...preview,
          base64: reader.result,
          file: file
        })
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageCDN = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      const formData: any = new FormData();
      formData.append('file', preview.file);
      formData.append('root', 'apd');
      formData.append('folder', 'user');
      formData.append('prefix', 'avatar');

      const req = await uploadImage(formData, source.token);
      data[fieldName] = req.data;

      if (upsertData) upsertData(data);
      if (previewResults) previewResults({ ...preview, file:undefined });
      if (dispatchNotification)
        dispatchNotification(`Success upload`, 'success');
    } catch (err: any) {
      setLoading(false);
      if (dispatchNotification) dispatchNotification(`Failed upload`, 'danger');
    }
  };

  useEffect(() => {
    if (uploadingImage) {
      uploadImageCDN(uploadingImage);
    }
  }, [uploadingImage]);

  return (
    <>
      <button
        onClick={() => refUpload.current.click()}
        type='button'
        className={className}
      >
        {btnText}
      </button>
      <input
        ref={refUpload}
        onChange={handleChangeFoto}
        type='file'
        accept='image/png, image/jpg, image/jpeg'
        hidden
      />
    </>
  );
}

interface IImageUpload {
  dispatchNotification?: any;
  upsertData: any;
  uploadingImage?: any;
  previewResults: any;
  onSelectedFile?: any;
  className?: any;
  btnText?: any;
  fieldName: any;
}
