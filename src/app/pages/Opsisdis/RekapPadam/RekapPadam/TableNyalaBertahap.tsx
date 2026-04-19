import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
moment.locale('id');

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** CONFIGS */
import { NYALA_BERTAHAP_REKAP_PADAM } from '@app/configs/react-table/opsisdis/rekap-padam/nyala-bertahap.column';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

function TableNyalaBertahap({ idTransEp, update = true }: any) {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(NYALA_BERTAHAP_REKAP_PADAM());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [action, setAction] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        sisa_beban_padam: () => {
          if (!item?.beban_sebelum && !item?.beban_masuk)
            return 0;

          return parseInt(item?.beban_sebelum) - parseInt(item?.beban_masuk)
        },
        section: item?.section,
        durasi: item?.durasi,
        ens: item?.ens,
        number: item.number,
        action: (
          <>
            <div className='d-flex px-2 align-items-center'>
              <Button
                onClick={() => { deleteNyalaBertahap(item) }}
                size='sm'
                className='me-2'
              >
                <i className='fa-regular fa-trash-can'></i> Delete
              </Button>
            </div>
          </>
        ),
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    if (!update) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action"
      })
    }
    setDataColumns(cols);
  }, [columns]);

  const deleteNyalaBertahap = (item: any) => {
    setDataSelected(item)
    setAction('delete')
  }

  return (
    <>
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().opsisdis.rekap_padam.tranf_ep_section}
        filterParams={{
          id_trans_ep: idTransEp,
        }}
        onCloseModal={setAction}
        deleteConfirmation
        action={action}
        primaryKey="id_trans_ep_section"
        selected={dataSelected}
      />
    </>
  );
}

export default TableNyalaBertahap;
