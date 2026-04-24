import React, { useState } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { RTU_OUT_OFF_FULL_JQX } from '@app/configs/react-table/dashboard/kinerjaNew.cinfig';
import CardWidget from '@app/components/Card/CardWidget';
import { Tab, Tabs } from 'react-bootstrap';
import SmartGridComponentMonRtu from '@app/modules/Table/TableDataJqxGridNew';


export default function TeleOutOfPoolUP2DBANTEN() {

  const [mainTab, setMainTab] = useState('gi');
  const [subTab, setSubTab] = useState('2h');

  // Mengatur filterParams berdasarkan tab yang aktif
  const getFilterParams = () => {
    let page = 1;  // Default page
    let limit = 20;  // Default limit
    let nama_pointtype = '';
    let durasi = '';

    // Menentukan nama_pointtype berdasarkan tab utama
    switch (mainTab) {
      case 'gi':
        nama_pointtype = 'rtu_gi';
        break;
      case 'gh':
        nama_pointtype = 'rtu_gh';
        break;
      case 'mp':
        nama_pointtype = 'rtu_mp';
        break;
      default:
        nama_pointtype = 'rtu_gi';
    }

    // Menentukan durasi berdasarkan tab sub
    switch (subTab) {
      case '2h':
        durasi = '2';
        break;
      case '4h':
        durasi = '4';
        break;
      case '6h':
        durasi = '6';
        break;
      case '24h':
        durasi = '24';
        break;
      default:
        durasi = '2';
    }

    return { page, limit, nama_pointtype, durasi };
  };

  // Mengupdate tab utama dan tab sub
  const handleMainTabChange = (key:any) => {
    setMainTab(key);
    setSubTab('2h'); // Set default sub-tab ketika tab utama berubah
  };

  const handleSubTabChange = (key:any) => {
    setSubTab(key);
  };


 const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
      nama_pointtype: item?.path3 ,
      durasi: item?.durasi ? item?.durasi : "-",

      });
    });
    return dataTableValue;
  }

  return (
    <CardWidget title='TOP 20 DURASI OOP RTU' classNameBody='p-0'>
      <div className="tabs-container">
        <Tabs
          activeKey={mainTab}
          onSelect={handleMainTabChange}
          id="main-tabs"
          className="mb-3"
        >
          {/* Tab GI */}
          <Tab eventKey="gi" title={<><i className="fa-solid fa-server"></i> GI</>}>
            <div className="sub-tabs">
              <Tabs
                activeKey={subTab}
                onSelect={handleSubTabChange}
                id="sub-tabs-gi"
                className="sub-tabs"
              >
                {/* Sub-tab 2H */}
                <Tab eventKey="2h" title="2H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 4H */}
                <Tab eventKey="4h" title="4H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 6H */}
                <Tab eventKey="6h" title="6H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 24H */}
                <Tab eventKey="24h" title="24H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
              </Tabs>
            </div>
          </Tab>

          {/* Tab GH */}
          <Tab eventKey="gh" title={<><i className="fa-solid fa-server"></i> GH</>}>
            <div className="sub-tabs">
              <Tabs
                activeKey={subTab}
                onSelect={handleSubTabChange}
                id="sub-tabs-gh"
                className="sub-tabs"
              >
                {/* Sub-tab 2H */}
                <Tab eventKey="2h" title="2H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 4H */}
                <Tab eventKey="4h" title="4H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 6H */}
                <Tab eventKey="6h" title="6H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 24H */}
                <Tab eventKey="24h" title="24H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
              </Tabs>
            </div>
          </Tab>
          <Tab eventKey="mp" title={<><i className="fa-solid fa-server"></i> MP</>}>
            <div className="sub-tabs">
              <Tabs
                activeKey={subTab}
                onSelect={handleSubTabChange}
                id="sub-tabs-mp"
                className="sub-tabs"
              >
                {/* Sub-tab 2H */}
                <Tab eventKey="2h" title="2H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 4H */}
                <Tab eventKey="4h" title="4H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 6H */}
                <Tab eventKey="6h" title="6H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
                {/* Sub-tab 24H */}
                <Tab eventKey="24h" title="24H">
                  {/* Komponen TableDataJqxGridNew */}
                </Tab>
              </Tabs>
            </div>
          </Tab>
        </Tabs>

        {/* Hanya ada satu komponen TableDataJqxGridNew */}
        <SmartGridComponentMonRtu
          path={API_PATH().dashboard_up2d_banten.mon_rtu}
          filterParams={getFilterParams()}
          dataFieldsColsConfig={RTU_OUT_OFF_FULL_JQX()}
          primaryKey='pointtype'
          respDataApi={handleRespDataApi}
          // isFilter={false}
          exportbtn={false}
          reloadbtn={false}
          // pager={false}
        />
      </div>
    </CardWidget>
  );
}
