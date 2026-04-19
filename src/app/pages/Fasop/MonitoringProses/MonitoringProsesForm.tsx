import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { API_PATH } from '@app/services/_path.service';
import { Badge } from 'react-bootstrap';
import FormDataModal from '@app/modules/Form/FormDataModal';

interface IMonitoringProsesForm {
  dataSelected?: any;
  console?: string; 
}

function MonitoringProsesForm({ dataSelected, console }: IMonitoringProsesForm) {
  const [dataParams, setDataParams] = useState<any>();
  const [formModel] = useState<any>({});
  const { handleSubmit, setValue, setError } = useForm({
    defaultValues: formModel,
  });

  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };

  return (
    <>
      <FormDataModal
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={{ console: '' }}
          path={API_PATH().apkt.trans_jar}
          customLabel={'hide'}
          dataSelected={dataSelected}
          isModal={true}
          ids="id"
        >
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
              <Modal.Body style={{ overflowY: 'auto', maxHeight: '100vh' }}>
              {console != null ? (
               <div className="card-body" style={{ padding: '8px', borderRadius: '4px' }}>
               <pre style={{ margin: 0 }}>
                {console}
               </pre>
             </div>
              ) : (
                <div>
                  <Badge bg="danger" className="text-white">Keterangan Console Tidak Ada</Badge>
                </div>
              )}
              </Modal.Body>
            </Form>
        </FormDataModal>
    </>
  );
}

export default MonitoringProsesForm;
