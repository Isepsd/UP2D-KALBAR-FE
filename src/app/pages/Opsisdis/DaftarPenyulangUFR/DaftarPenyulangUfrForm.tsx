import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react';
import { DAFTAR_UFR } from '@app/configs/react-table/opsisdis.column.config';
import TableData from '@app/modules/Table/TableData';
import FilterForm from './FilterForm';
import CardFilter from '@app/components/Filter/CardFilter';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FormSubmit from './FormSubmit';
import { Row } from 'react-bootstrap';
import { setUFR } from '@app/store/reducers/ufr';
import { useDispatch } from 'react-redux';

export default function DaftarPenyulangUfrForm() {
  const dispatch = useDispatch();
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  // const [dataSelected, setDataSelected] = useState<any>([]);
  const [action] = useState<string>();
  const [dataColumns] = useState<any>(DAFTAR_UFR());

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        key:item?.key,
        number: item.number,
        id: item?.id_ref_lokasi,
        ufr: item?.ufr,
        penyulang: item?.nama_lokasi,
        gardu_induk: item?.parent_lokasi?.parent_lokasi?.nama_lokasi,
        trafo_gi: item?.parent_lokasi?.nama_lokasi,
      });
    });

    setDataRows(dataTableValue);
  };

  const handleRowsSelected = (item: any) => {
    dispatch(setUFR(item));
  };

  return (
    <>
      <Row className='animate__animated animate__fadeIn'>
        <div className='col-md-12'>
          <div className={`ms-md-0`}>
            <h5 className='py-1'>
              <i className='fa-solid fa-circle-info'></i> Form UFR
            </h5>
            <hr />
            <CardFilter>
              <FilterForm />
            </CardFilter>
            <TableData
              rowSelectType={'checkbox'}
              columnsConfig={dataColumns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={API_PATH().opsisdis.ufr}
              primaryKey={'id_meter'}
              action={action}
              // selected={dataSelected}
              onCheckedRows={handleRowsSelected}
              selectedRows={{"6":true}}
              rowSelect={true}
              filterParams={{
                id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
              }}
            />
            {/* {dataSelected && dataSelected.length > 0 && */}
      
              <FormSubmit />
            
            {/* } */}
          </div>
        </div>
      </Row>
    </>
  );
}
