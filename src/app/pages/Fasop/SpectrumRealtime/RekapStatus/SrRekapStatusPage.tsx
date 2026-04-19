import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { head } from 'lodash'

/** CONFIG */
import TableFasopRekapStatus from '@app/modules/Fasop/TableFasopRekapStatus'
import { REKAP_OOP_SAAT_INI_COLUMNS, MASTER_COLUMNS } from '@app/configs/react-table/fasop/spectrum-realtime.column'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

const tabOptions = [
  { label: 'Invalid Data', value: '1',  pathService: API_PATH().master.jaringan.ref_lokasi, column: REKAP_OOP_SAAT_INI_COLUMNS(), primaryKey: 'id_ref_lokasi' },
  { label: 'Master', value: '2',  pathService: API_PATH().master.jaringan.ref_lokasi, column: MASTER_COLUMNS(), primaryKey: 'id_ref_lokasi' },
  { label: 'RTU', value: '3',  pathService: API_PATH().master.jaringan.ref_lokasi, column: MASTER_COLUMNS(), primaryKey: 'id_ref_lokasi' },
  { label: 'Analog', value: '5',  pathService: API_PATH().master.jaringan.ref_lokasi, column: MASTER_COLUMNS(), primaryKey: 'id_ref_lokasi' },
  { label: 'Digital', value: '6',  pathService: API_PATH().master.jaringan.ref_lokasi, column: MASTER_COLUMNS(), primaryKey: 'id_ref_lokasi' },
]

export default function SrRekapStatusPage() {
  const [tabActive, setTabActive] = useState<string>('1')
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive ))
    setTabActiveConf(active)
  }, [tabActive])
  

  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
        {
          tabOptions.map((tab: any) => (
            <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
          ))
        }
      </Tabs>
      <TableFasopRekapStatus pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} />
    </>
  )
}
