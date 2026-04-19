import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { get } from 'lodash';
import { useSearchParams } from 'react-router-dom';

/** CONFIG */
import { WP_QRC_QUESTION_COLUMNS } from '@app/configs/react-table/working-permit.columns.config';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import TrashIcon from '@app/components/Icons/TrashIcon';

export default function WmQRCDetail({ filterParams }: any) {
  let [searchParams] = useSearchParams();

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [triggers, setTriggers] = useState<any>(null);

  const [columns] = useState<any>(WP_QRC_QUESTION_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        pertanyaan: get(item, 'pertanyaan_qrc.pertanyaan_qrc'),
        ada: (
          <Form.Group className='mb-3'>
            <Form.Check
              type='checkbox'
              label=''
              checked={item?.ada == '1'}
              onChange={(e: any) => handleChangeChecked(item, e)}
            />
          </Form.Group>
        ),
        action: (
          <>
            <Button size='sm' variant='danger' onClick={()=>handleDelete(item)}><TrashIcon /></Button>
          </>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  const handleChangeChecked = (item: any, e: any) => {
    // console.log(item, e);
    item;
    e;
  };

  /** DELETE HANDLING */
  const handleDelete = (item: any) => {
    setDataSelected(item);
    setAction('delete');
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (filterParams?.id_wp_qrc) {
      setTriggers(filterParams?.id_wp_qrc ? filterParams?.id_wp_qrc : '0');
    } else if (
      triggers &&
      filterParams?.id_wp_qrc == null &&
      !searchParams.get('hirarc')
    ) {
      setTriggers('0');
    }
  }, [filterParams?.id_wp_qrc]);

  return (
    <>
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        selected={dataSelected}
        onCloseModal={setAction}
        action={action}
        path={API_PATH().working_permit.qrc_detail}
        primaryKey={'id_wp_qrc_detail'}
        filterParams={
          filterParams?.id_wp_qrc != null ? filterParams : { id_wp_qrc: 0 }
        }
        request={filterParams?.id_wp_qrc != null ? true: false}
        trigger={triggers}
        ids={'ids'}
        pagingPresistance={false}
        module='Hirarc Detail'
      ></TableData>
    </>
  );
}
