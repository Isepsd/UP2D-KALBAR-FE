import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Form, Spinner } from 'react-bootstrap';

import TopBarLoader from '../Loader/TopBarLoader';
import ModalPreviewLampiran from '../Modals/ModalPreviewLampiran';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import requestApi from '@app/services/api.service';
import { addNotification } from '@app/store/notification/notification.action';

const InputUploadNew = ({
  fieldName,
  rootFolder = 'apd',
  folder = '',
  thumbSize,
  path = 'upload_file',
  previewUrl = '',
  params = [],
  apiTarget = 'file',
  onUploaded,
  onChange,
  setValue,
  showNotification = false,
  ...otherProps
}: InputUploadNew) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showModallampiran, setShowModallampiran] = useState<boolean>(false);

  const dispatch = useDispatch();

  const dispatchNotification = (msg: string, type: string) => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const postFile = async () => {
    setLoading(true);
    setShowUpload(false);
    setShowPreview(false);

    try {
      if (!selectedFile) throw new Error('No file selected');

      const formData = new FormData();
      formData.append(apiTarget, selectedFile);
      formData.append('fileName', selectedFile.name);
      formData.append('root', rootFolder);
      formData.append('folder', folder);

      if (thumbSize && selectedFile.type.includes('image')) {
        formData.append('thumb_size', thumbSize);
      }

      params.forEach((param) => {
        formData.append(param.key, param.value);
      });

      const { data } = await requestApi().request({
        url: `${process.env.API_UPLOAD}/${path}/`,
        method: 'POST',
        data: formData,
      });

      setLoading(false);
      setShowPreview(true);

      if (onUploaded) onUploaded({ fileName: selectedFile.name, data: data });
      if (setValue && fieldName) {
        setValue(fieldName, selectedFile.name); // Set only the file name
      }

      if (showNotification) {
        dispatchNotification(data.message, 'success');
      }
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(err?.response?.data?.message || 'Upload failed', 'danger');
    }
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setShowUpload(true);
      setShowPreview(false);

      if (onChange) onChange(file.name); // Pass only file name
    }
  };

  const handleUpload = () => {
    if (!loading && selectedFile) {
      postFile();
    }
  };

  useEffect(() => {
    if (previewUrl) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
    console.log('previewUrl', previewUrl);
  }, [previewUrl]);

  return (
    <>
      {loading && <TopBarLoader isLoading={loading} />}
      <div className='d-flex gap-2 mb-3'>
        <div className='w-100' style={{ zIndex: 0 }}>
          <Form.Control
            type='file'
            onChange={selectFile}
            {...otherProps}
          />
          {showUpload && <span className="text-danger small">Klik upload untuk mengupload file/image</span>}
        </div>
        {(showUpload || showPreview) && (
          <div className='input-group-append ms-2'>
            {showUpload && (
              <span
                onClick={handleUpload}
                className='input-group-text cursor-pointer'
              >
                {loading ? (
                  <Spinner
                    className='ms-1'
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : (
                  'Upload'
                )}
              </span>
            )}
            {showPreview && (
              <span
                className='input-group-text cursor-pointer'
                onClick={() => setShowModallampiran(true)}
              >
                Preview
              </span>
            )}
          </div>
        )}
      </div>
      <ModalPreviewLampiran
        data={{ title: fieldName, file: previewUrl }}
        showModal={showModallampiran}
        setShowModal={() => setShowModallampiran(false)}
      />
    </>
  );
};

interface InputUploadNew {
  fieldName?: string;
  rootFolder?: string;
  thumbSize?: string;
  apiTarget?: string;
  onUploaded?: (data: any) => void;
  folder?: string;
  path?: string;
  previewUrl?: string;
  params?: Array<{ key: string, value: any }>;
  accept?: string;
  onChange?: (fileName: string) => void; // Expect only file name
  showNotification?: boolean;
  setValue?: (field: string, value: any) => void;
}

export default InputUploadNew;
