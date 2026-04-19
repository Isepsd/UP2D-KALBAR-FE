import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'
import Filter from './Filter';
import { DAFTAR_UFR } from '@app/configs/react-table/opsisdis.column.config';
import TableData from '@app/modules/Table/TableData';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function DaftarPenyulangUfrPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action] = useState<string>();

  const [columns, setColumns] = useState<any>(DAFTAR_UFR());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item.number,
        id: item?.id_ref_lokasi,
        ufr: item?.ufr,
        penyulang: item?.nama_lokasi,
        gardu_induk: item?.parent_lokasi?.parent_lokasi?.nama_lokasi,
        trafo_gi: item?.parent_lokasi?.nama_lokasi,
      });
    });

    setDataRows(dataTableValue)
  }

/** COLUMN SHOW HIDE EVENT HANDLE */
useEffect(() => {
  let cols: any = columns?.filter(({ show }: any) => show === true);
  let roleAccess = ROLE_ACCESS("UFR")
  const roleAct = {
    view: ROLE_ACTION(roleAccess, 'view'),
    create: ROLE_ACTION(roleAccess, 'create'),
    update: ROLE_ACTION(roleAccess, 'update'),
    delete: ROLE_ACTION(roleAccess, 'delete'),
  };
  setRoleActions(roleAct);
  if (!roleAct?.delete && !roleAct?.update) {
    cols = cols?.filter((item: any) => {
      return item?.accessor != "action"
    })
  }
  setDataColumns(cols);
}, [columns]);
  return (
    <>
      <TableDataListAction
        add={roleActions?.create}
        columns={columns}
        setColumns={setColumns}
        // module="Daftar Penyulang UFR"
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>
      <div>
        <TableData
          columnsConfig={dataColumns}
          respDataApi={handleRespDataApi}
          rowData={dataRows}
          path={API_PATH().opsisdis.ufr}
          primaryKey={'id_meter'}
          action={action}
          // selected={dataSelected}
          filterParams={{
            id_ref_jenis_lokasi: JENIS_LOKASI().penyulang
          }}
        />
      </div>
    </>
  )
}
