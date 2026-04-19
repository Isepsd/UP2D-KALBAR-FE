import { notificationTemplate } from '@app/helper/notificationTemplate';
import requestApi from '@app/services/api.service';
import { addNotification } from '@app/store/notification/notification.action';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import TopBarLoader from '../Loader/TopBarLoader';
import ModalPreviewLampiran from '../Modals/ModalPreviewLampiran';

/*  @params thumbSize ukuran optional example 40 
    @params title stirng param for modal lmapiran
    @params apiTarget stirng param upload name  example file
    @params root stirng nama project
    @params folder string folder file 
    @params path string path upload
    @params accept file optional default all file | accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    @params link file optional default string empty for show button preview
    @params onUploaded return upload

 */
const InputUpload = ({
  fieldName,
  title = '',
  rootFolder = 'apd',
  folder = '',
  thumbSize,
  path = 'upload_file',
  previewUrl = '',
  params = [],
  apiTarget = 'file',
  onUploaded,
  accept = '*',
  setValue,
  showNotification=false,
  ...otherProps
}: IInputUpload) => {
  const [loading, setLoading] = useState<boolean>(false); //loading
  const [selectedFile, setSelectedFile] = useState<any>();
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [showModallampiran, setShowModallampiran] = useState<boolean>(false);

  const source = axios.CancelToken.source();

  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  // On file upload (click the upload button)
  const postFile = async () => {
    setUpload(true);
    setLoading(true);

    try {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(`${apiTarget}`, selectedFile);
      const type_file = selectedFile.type;
      if (type_file.indexOf('image') >= 0) {
        path = `upload_image`;
      }

      formData.append('root', rootFolder);
      formData.append('folder', folder);

      if (thumbSize && type_file.indexOf('image') >= 0) {
        formData.append('thumb_size', thumbSize);
      }
      if (thumbSize && type_file.indexOf('image') >= 0) {
        formData.append('thumb_size', thumbSize);
      }

      if (params?.length > 0) {
        params.map((value: any) => {
          formData.append(`${value.key}`, value.value);
        });
      }

      // Request made to the backend api
      // Send formData object

      const req: any = await requestApi().request({
        url: `${process.env.API_UPLOAD}/${path}/`,
        method: 'POST',
        data: formData,
        cancelToken: source.token, // <-- IMPORTANT!
      });

      const response: any = req;
      setLoading(false);
      setUpload(false);
      setShowUpload(false);
      setShowPreview(true);

      if(onUploaded) onUploaded(response?.data)
      if(setValue && fieldName) {setValue(fieldName, response?.data);
      // console.log(fieldName, response?.data)
    }
      if(showNotification){
        dispatchNotification(response.message, 'success');
      }
    } catch (err: any) {
      // console.log(err)
      setShowPreview(false);
      setLoading(false);
      setUpload(false);
      dispatchNotification(err?.response?.data?.message, 'danger');
    }
  };

  /* selected file */
  const selectFile = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setShowUpload(true);
    setShowPreview(false)
  };

  /* selected file */
  const handleUpload = () => {
    if (!upload) {
      postFile();
    }
  };

  useEffect(() => {
    if (previewUrl != '' && previewUrl != null && previewUrl != undefined) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
    return () => {
      source.cancel('Canceled');
    };
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
            accept={accept}
          />
          {
            showUpload && <span className="text-danger small">Klik upload untuk mengupload file /image</span>
          } 
        </div>
        {(showPreview || showUpload) && (
          <div
            className={`input-group-append ms-2 ${
              showPreview || showUpload ? '' : 'd-none'
            }`}
          >
            <span
              onClick={handleUpload}
              className={`input-group-text cursor-pointer ${
                showUpload ? '' : 'd-none'
              }`}
            >
              <Spinner
                className={`ms-1 ${loading ? '' : 'd-none'}`}
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Upload 
            </span>
            <span
              className={`input-group-text cursor-pointer ${
                showPreview ? '' : 'd-none'
              }`}
              onClick={() => setShowModallampiran(true)}
            >
              Preview {showPreview}
            </span>
          </div>
        )}
      </div>
      <ModalPreviewLampiran
        data={{ title: title, file: previewUrl }}
        showModal={showModallampiran}
        setShowModal={() => {
          setShowModallampiran(false);
        }}
      />
    </>
  );
};

interface IInputUpload {
  title?: string;
  rootFolder?: string;
  thumbSize?: string;
  apiTarget?: string;
  onUploaded?: any;
  folder?: string;
  path?: string;
  previewUrl?: string;
  params?: any;
  accept?: string;
  showNotification?:boolean;
  setValue?:any;
  fieldName?:string;
}

export default InputUpload;
