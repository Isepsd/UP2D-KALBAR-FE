import React, { useState, useEffect } from 'react';
import { Col, Form ,Modal} from 'react-bootstrap';

/** CONFIG */
import { JENIS_POINT_DETAIL_COPY_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
import { IFasopPointTypeState } from '@app/interface/fasop-pointtype-state.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import FormData from '@app/modules/Form/FormData';
import { yupResolver } from '@hookform/resolvers/yup';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, ButtonCancel } from '@app/components';

interface ICopyValueDetailForm {
    modalDecline?: any;
   
    filterLayout?: any;
    filterParams?: any;
}
export const IBlacklistFeild = {
    id_pointtype: null,
    name: null,
    status: 1,
    valid: 1,
    quality_code: null,
    statekey: null,
    // status_data: 1,
};
export default function FasJenisPointDetailPage({modalDecline, filterParams }: ICopyValueDetailForm) {
  const { closeModal } = useSelector((state: any) => state.ui);
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [dataSelected,setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [triggers, setTriggers] = useState<any>(null);
  const [columns] = useState<any>(JENIS_POINT_DETAIL_COPY_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [dataParams, setDataParams] = useState<any>();
//   const mapPropertyFromSelectedData = (property: string) => {
//     return dataSelected.map((item: any) => item?.[property]);
//   };
  const validationSchema = Yup.object().shape({
    id_pointtype: Yup.number().nullable(),
    id_pointtype_state: Yup.number().nullable(),
    name: Yup.number().nullable(),
    status: Yup.number()
      .nullable()
      ,
    valid: Yup.number()
      .nullable()
     ,
    quality_code: Yup.number().nullable(),
    statekey: Yup.number()
      .nullable()
      
    
});
const [formModel] = useState<any>({});
  const {
    handleSubmit,
    setValue,
    setError,
} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
});


  

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: IFasopPointTypeState, index: number) => {
      dataTableValue.push({
        // id_pointtype:item?.id_pointtype,
        id_pointtype_state:item?.id_pointtype_state,
        id: index + 1,
        statekey: item.statekey || '0',
        quality_code: item?.quality_code || '0',
        name: item.name,
        valid: item.valid,
        status: item.status,
        // valid: (
        //   <div className='position-relative text-center w-100'>
        //     <Form.Check checked={!!item?.valid} disabled />
        //   </div>
        // ),
        // status: (
        //   <div className='position-relative text-center w-100'>
        //     <Form.Check checked={!!item.status} disabled />
        //   </div>
        // ),
        
      });
    });

    setDataRows(dataTableValue);
  };

  


  

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
  
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (filterParams?.id_pointtype) {
      setTriggers(
        filterParams?.id_pointtype ? filterParams?.id_pointtype : '0'
      );
    } else if (
      triggers &&
      filterParams?.id_pointtype == null &&
      !searchParams.get('point_type_copy')
    ) {
      setTriggers('0');
    }
  }, [filterParams?.id_pointtype]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  const handleRowsSelected = (data: any) => {
    setDataSelected(data);
};


const onSubmitForm = () => {
  
  if (dataSelected && dataSelected.length > 0) {
    // Assuming dataSelected is an array of selected items

    const data = dataSelected.map((data:any) => ({
      // id_pointtype_state:data.id_pointtype_state,
      name: data.name,
      status: data.status,
      valid: data.valid,
      quality_code: data.quality_code,
      statekey: data.statekey,
    }));
    const firstSelectedItem = data[0]; // Assuming you only need the first selected item

    // Map properties directly to the data object
    data.name = firstSelectedItem.name;
    data.status = firstSelectedItem.status;
    data.valid = firstSelectedItem.valid;
    data.quality_code = firstSelectedItem.quality_code;
    data.statekey = firstSelectedItem.statekey;

    // Assuming paramid is the desired id_pointtype value
    const parent: any = searchParams.get("point_type");

    // Update the state of dataParams with the combined data
    setDataParams({ ...data, id_pointtype: parseInt(parent) });
  }
};



  return (
    <>
      {filterParams?.id_pointtype && (
        <>
       
          <TableData
          
            columnsConfig={dataColumns}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
            path={API_PATH().master.fasop.point_type_state}
            primaryKey={'id_pointtype_state'}
            action={action}
            selected={dataSelected}
            filterParams={
              filterParams?.id_pointtype != null
                ? filterParams
                : { id_pointtype: 0 }
            }
            trigger={triggers}
         
            ids={'ids'}
            pagingPresistance={false}
            module='Jenis Point State'
            rowSelectType={'checkbox'}
            onCheckedRows={handleRowsSelected}
            rowSelect={true}
          ></TableData>

          
        </>
        
        
      )}
      <>
                         {dataSelected &&
                                <Col md={12}>
                                    <FormData
                                        setError={setError}
                                        setValue={setValue}
                                        dataParams={dataParams}
                                        fields={IBlacklistFeild}
                                        path={API_PATH().master.fasop.point_type_state}
                                        customLabel='state'
                                        onLoading={setLoading}
                                        onGetDataResult={setDataSelected}
                                        hideTitle={true}
                                        ids="id_detail"
                                    >
                                        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                                            <Modal.Footer>
                                                <div className='d-flex gap-2'>
                                                    <ButtonCancel type='modal' ids='id_detail' onClick={modalDecline} />
                                                    <Button type='submit' variant='primary' isLoading={loading}> Simpan </Button>
                                                </div>
                                            </Modal.Footer>
                                        </Form>
                                    </FormData>
                                </Col>
                            }

    
       </>
      

    </>
    
  );
}
