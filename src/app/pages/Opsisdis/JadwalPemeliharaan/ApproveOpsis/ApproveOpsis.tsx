import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Alert, Tabs, Tab } from 'react-bootstrap'

// import ModalData from '@app/components/Modals/ModalForm';
// import DurasiProsesModal from '@app/modules/opsisdis/JawdalPemeliharaan/DurasiProsesModal';

import { API_PATH } from '@app/services/_path.service';

import { INPUT_JADWAL_DOKUEMNTASI_COLUMN, INPUT_JADWAL_GARDU_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';

import TableDetailJadwalPemeliharaan from '@app/modules/opsisdis/JawdalPemeliharaan/TableDetailJadwalPemeliharaan';
import TableInputJadwal from '@app/modules/opsisdis/JawdalPemeliharaan/TableInputJadwal';
import { head } from 'lodash';
import CardFilter from '@app/components/Filter/CardFilter';
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const tabOptions = [
  { label: 'Gardu', value: 'gardu', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.gardu, column: INPUT_JADWAL_GARDU_COLUMN(), primaryKey: 'id_trans_jadwal_har_gardu', add: true },
  { label: 'Dokumentasi', value: 'dokumentasi', format: 'YYYY', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.dok, column: INPUT_JADWAL_DOKUEMNTASI_COLUMN(), primaryKey: 'id_trans_jadwal_har_dok', add: true },
]
export default function ApproveOpsis() {
  // const navigate = useNavigate()
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const [dataSelected, setDataSelected] = useState<any>(null)
  const [roleActions, setRoleActions] = useState<any>({});
  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  const handleSelectedRows = (item: any) => {
    if (item?.length > 0) {
      setDataSelected(item[0])

    }
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("pprove-ren-ops-pemeliharaan")
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
            <Card.Body>
              <Alert variant='primary' className='mb-0'>
                <p className='mb-0'>Jika status Laporan <b>disetuji</b> maka akan diteruskan ke bagian Pelaksana!!.</p>
              </Alert>
            </Card.Body>
            <Card.Header className='text-uppercase'>MCC - PEMELIHARAAN - VERIFIKASI OPSIS</Card.Header>
            <Card.Body>
              {/* <TableDataListAction
                add={false}
                columns={columns}
                setColumns={setColumns}
                module="Approve ren"
                spaceTop={0}
              /> */}
              <div className='mb-4'>
                <TableInputJadwal
                  roleActions={roleActions}
                  onCheckedRows={handleSelectedRows}
                  filterParams={{
                    status_pekerjaan: 'Disetujui ren',
                    sort_by: "+tgl_update"
                  }}
                  page="opsis" />
              </div>
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

      {/* <ModalData modalProps={modal}>
        <DurasiProsesModal />
      </ModalData> */}
    </>
  )
}
