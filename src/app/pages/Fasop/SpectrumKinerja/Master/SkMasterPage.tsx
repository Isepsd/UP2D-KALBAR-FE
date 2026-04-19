import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap'
import { head } from 'lodash';
import moment from 'moment';

/** CONFIG */
import { KIN_MASTER__HARI_COLUMNS, KIN_MASTER_BULAN_COLUMNS } from '@app/configs/react-table/fasop/spectrum-kinerja.column'

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import KinerjaFilter from '@app/modules/Fasop/KinerjaFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

const tabOptions = [
  { label: 'Harian', key: 'harian', pathService: API_PATH().fasop.kinerja.master_hari, primaryKey: 'id_kin_master_harian', column: KIN_MASTER__HARI_COLUMNS() },
  { label: 'Bulanan', key: 'bulanan', pathService: API_PATH().fasop.kinerja.master_bulan, primaryKey: 'id_kin_master_bulan', column: KIN_MASTER_BULAN_COLUMNS() },
]

export default function SkMasterPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['key'])
  const [tabActiveSelected, setTabActiveSelected] = useState<any>(tabOptions[0])

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>([]);
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data:any)=>{
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        kinerja: (<div className='pb-4 ps-4 position-relative'><Form.Check checked={item?.kinerja} disabled /></div>),
        master: item?.c_point?.path3text,
        jenis_lokasi: item?.c_point?.ref_lokasi?.nama_lokasi,
        jenis_point: item?.c_point?.pointtype?.name,
        avability: item?.performance,
        durasi: moment.utc(moment(item.datum_2).diff(moment(item.datum_1))).format("DD:HH:mm:ss"),
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.key == tabActive ))
    if(active){
      setTabActiveSelected(active)
      setColumns(active.column)
    }
  }, [tabActive])

  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 mt-4 tab-sm">
        {
          tabOptions.map((tab: any) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.label} />
          ))
        }
      </Tabs>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns}>
        <KinerjaFilter type={tabActive} jenisPointType='MASTER' keywordName='Master' keywordField='path3text' />
      </TableDataListAction> 

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={tabActiveSelected?.pathService} primaryKey={tabActiveSelected?.primaryKey} deleteConfirmation />
    </>
  );
}
