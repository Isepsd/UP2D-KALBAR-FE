import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'

import TableInputJadwal from '@app/modules/opsisdis/JawdalPemeliharaan/TableInputJadwal'
import TableDetailJadwalPemeliharaan from '@app/modules/opsisdis/JawdalPemeliharaan/TableDetailJadwalPemeliharaan'
import { API_PATH } from '@app/services/_path.service'
import { INPUT_JADWAL_DOKUEMNTASI_COLUMN, INPUT_JADWAL_GARDU_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column'
import { head } from 'lodash'
import CardFilter from '@app/components/Filter/CardFilter'
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter'
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper'
const tabOptions = [
  { label: 'Gardu', value: 'gardu', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.gardu, column: INPUT_JADWAL_GARDU_COLUMN(), primaryKey: 'id_ref_lokasi', add: false },
  { label: 'Dokumentasi', value: 'dokumentasi', format: 'YYYY', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.dok, column: INPUT_JADWAL_DOKUEMNTASI_COLUMN(), primaryKey: 'id_ref_lokasi', add: true },
]
function ApproveBagian() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const [dataSelected, setDataSelected] = useState<any>()
  const [roleActions, setRoleActions] = useState<any>({});
  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  const handleSelectedRows = (item: any) => {
    if (item?.length > 0) {
      setDataSelected(item[0]);
    }
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("approve-bagian-ops-pemeliharaan")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      reject: ROLE_ACTION(roleAccess, 'reject'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
  }, [])

  return (
    <>
      <CardFilter>
        <Filter isStatusPek={false} isButuhPadam={false} isWilayah={false} />
      </CardFilter>
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>APPROVE BAGIAN</Card.Header>
            <Card.Body>
              <TableInputJadwal
                roleActions={roleActions}
                onCheckedRows={handleSelectedRows} page="bagian" sendTo="REN" filterParams={{ status_pekerjaan: "Rencana Pemeliharaan", sort_by: "+tgl_update" }} />
            </Card.Body>
          </Card>
        </Col>
        {dataSelected &&
          <Col md={12} className='mb-4 position-static'>
            <Card className='card-widget position-static'>
              <Card.Body>
                <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
                  {
                    tabOptions.map((tab: any) => (
                      <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                    ))
                  }
                </Tabs>

              </Card.Body>
              <Card.Body>
                <TableDetailJadwalPemeliharaan pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={tabActiveConf.value} parent={dataSelected} add={tabActiveConf.add} />
              </Card.Body>
            </Card>
          </Col>
        }

      </Row>
    </>
  )
}

export default ApproveBagian