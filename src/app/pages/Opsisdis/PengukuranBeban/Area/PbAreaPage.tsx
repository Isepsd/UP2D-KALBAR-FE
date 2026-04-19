import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React from 'react'

import {
  Column,
} from 'devextreme-react/data-grid';

// import { useApp } from '@app/context/AppContext';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import Filter from './Filter';
import { PENGUKURAN_BEBAN_AREA } from '@app/configs/react-table/opsisdis.column.config';
import DiffCeilDataGrid from '@app/modules/Table/DiffCeilDataGrid';

export default function PbAreaPage() {
  // const queryParams = qs.parse(location.search);
  const url = API_PATH().opsisdis.pengukuran_beban.area;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.area_total;
  const columns: any = PENGUKURAN_BEBAN_AREA()
  return (

    <>
      <TableDataListAction
        add={false}
        column={false}
        module="Telemetring Area"
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>
      <div>
        <TablePengukuranBeban
          pathServiceCountNull={urlCountNull}
          parentField="id_ref_jenis_lokasi_in"
          pathService={url}
          primaryKey="id_trans_tm_area"
          callBackCount={false}
          label="Telemetring Area"
          module="Telemetring Area"
        >

          {columns.map((item: any, index: number) => (
            <Column
              dataField={item?.accessor} allowEditing={item?.allowEditing} allowUpdating={item?.allowUpdating} caption={item?.Header} key={index} minWidth={item?.minWidth} enabled={item?.enabled} cellRender={DiffCeilDataGrid} />
          ))}
        </TablePengukuranBeban>
      </div>
    </>
  )
}
