import { PENGUKURAN_BEBAN_PEMBANGKIT, PENGUKURAN_BEBAN_TRESHOLD_HARIAN } from '@app/configs/react-table/opsisdis.column.config';
import TableBebanEnergy from '@app/modules/opsisdis/TableBebanEnergy';
import TableThreshold from '@app/modules/opsisdis/TableThreshold';
// import TableFrequensiEksekusi from '@modules/opsisdis/TableFrequensiEksekusi';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import { head } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import Filter from './Filter';

export default function FreEksekusiPage() {
  const tabOptions = [
    // { label: 'Record Frekuensi', value: '1', pathService: API_PATH().opsisdis.frequensi.energi, cozlumn: PENGUKURAN_BEBAN_ENERGI_TRAFO(), primaryKey: 'id_ref_lokasi' },
    // { label: 'Frekuensi Harian', value: '2', pathService: API_PATH().opsisdis.frequensi.energi, column: PENGUKURAN_BEBAN_FREQUNESI_HARIAN(), primaryKey: 'id_ref_lokasi' },
    // { label: 'Frekuensi per Bulan', value: '3', pathService:API_PATH().opsisdis.frequensi.energi, column: PENGUKURAN_BEBAN_ENERGI_PENYULANG(), primaryKey: 'id_ref_lokasi' },
    { label: 'Treshold Harian', value: '4', pathService: API_PATH().opsisdis.frequensi.energi, column: PENGUKURAN_BEBAN_TRESHOLD_HARIAN(), primaryKey: 'id_frek_th' },
    // { label: 'Rekap Treshold', value: '5', pathService:API_PATH().opsisdis.frequensi.energi, column: PENGUKURAN_BEBAN_ENERGI_PENYULANG(), primaryKey: 'id_ref_lokasi' },
  ]
  /** DATA RESP */
  const [columns, setColumns] = useState<any>(PENGUKURAN_BEBAN_PEMBANGKIT());
  const [tabActive, setTabActive] = useState<string>('4')
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout="card"
      >
        <Filter />
      </TableDataListAction>

      <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-2 tab-sm mt-3">
        {
          tabOptions.map((tab: any) => (
            <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
          ))
        }
      </Tabs>
      {/* <TableFrequensiEksekusi
        pathService={tabActiveConf.pathService}
        primaryKey={tabActiveConf.primaryKey}
        columnsConfig={tabActiveConf.column}

      /> */}
      {tabActive == '2' &&
        <TableBebanEnergy
          pathService={tabActiveConf.pathService}
          primaryKey={tabActiveConf.primaryKey}
          label={tabActiveConf.label}
          module={tabActiveConf.label} />
      }
      {tabActive == "4" &&
        <TableThreshold
          pathService={tabActiveConf.pathService}
          primaryKey={tabActiveConf.primaryKey}
          label={tabActiveConf.label}
          module={tabActiveConf.label} />
      }

    </>
  )
}
