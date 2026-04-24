import React, { useEffect, useState } from 'react';

import { get } from 'lodash'

/** COMPONENT */
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';

/** CONFIG */
import { GARDU_INDUK_COLUMN } from '@app/configs/react-table/opsisdis/slingle-line-diagram.colum.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ITableSLDGarduInduk {
  onSelectedRow?: any
}

export default function TableSLDGarduInduk({ onSelectedRow }: ITableSLDGarduInduk) {
  const { closeModal } = useSelector( (state: any) => state.ui );

  let [searchParams, setSearchParams] = useSearchParams();
  const garduIndukParams = searchParams.get('id_gardu_induk');
  
  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(GARDU_INDUK_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [action, setAction] = useState<string>();

  useEffect(() => {
    onSelectedRow({id_ref_lokasi: garduIndukParams})
  }, [garduIndukParams])
  

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_ref_lokasi: item?.id_ref_lokasi,
        gi: item?.nama_lokasi,
        // action: (<span className='text-danger cursor-pointer' onClick={() => handleDelete(item)}><i className="far fa-times-circle font-weight-bold"></i></span>),
      });
    });

    setDataRows(dataTableValue)
  }

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id_ref_lokasi) {
      searchParams.delete('id_gardu_induk');
      searchParams.append('id_gardu_induk', selected?.id_ref_lokasi);
      setSearchParams(searchParams);
    }
    setDataSelected(selected);
    if (onSelectedRow) {
      onSelectedRow(selected)
    }
    setAction('');
  };
 

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if(closeModal && action){
        setAction(undefined)
    }
  }, [closeModal])

  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        spaceTop={0}
      ></TableDataListAction>

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.jaringan.ref_lokasi}
        primaryKey={'id_ref_lokasi'}
        filterParams={{
          id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
          sort_by:'-tgl_update,id_ref_lokasi',
        }}
        action={action}
        selected={dataSelected}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
        onCloseModal={setAction}
      />
    </>
  );
}
