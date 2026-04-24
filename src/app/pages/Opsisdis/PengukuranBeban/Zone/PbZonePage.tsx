import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useState } from 'react'
import Filter from '@app/modules/opsisdis/Filter';


import {
  Column,
} from 'devextreme-react/data-grid';

// import { useApp } from '@app/context/AppContext';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import { PENGUKURAN_BEBAN_ZONE } from '@app/configs/react-table/opsisdis.column.config';
import DiffCeilDataGrid from '@app/modules/Table/DiffCeilDataGrid';

export default function PbZonePage() {
  // const queryParams = qs.parse(location.search);
  const url = API_PATH().opsisdis.pengukuran_beban.zone;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.zone_total;
  const [add, setAdd] = useState<any>(false)
  const columns: any = PENGUKURAN_BEBAN_ZONE()

  return (

    <>
      <TableDataListAction
        generate={add}
        column={false}
        add={false}
        module="Telemetring Zona"
        filterLayout="card"
      >
        <Filter
          id_jenis_lokasi={JENIS_LOKASI().penyulang}
          labelParent="Penyulang"
        />
      </TableDataListAction>
      <div>
        <TablePengukuranBeban
          pathServiceCountNull={urlCountNull}
          pathService={url}
          primaryKey="id_trans_tm_zona"
          callBackCount={setAdd}
          label="Telemetring Zona"
          module="Telemetring Zona"
        >

          {columns.map((item: any, index: number) => (
            <Column
              dataField={item?.accessor} allowEditing={item?.allowEditing} allowUpdating={item?.allowUpdating} caption={item?.Header} key={index} minWidth={item?.minWidth} enabled={item?.enabled} cellRender={DiffCeilDataGrid} />
          ))}
          {/* <Column dataField='f' caption="Frekwensi (HZ)" dataType='number'></Column> */}
          {/* <Column dataField='q' caption="Daya Reactive (MVAR)" dataType='number'></Column> */}
        </TablePengukuranBeban>
      </div>
    </>
  )
}
