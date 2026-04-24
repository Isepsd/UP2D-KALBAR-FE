import React, { useEffect, useState } from 'react';

/** CONFIG */
import { SCADATEL_STATUS_RTU_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-realtime.column'
import { useLocation } from 'react-router-dom'; // Import useLocation
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';


export default function StatRtuPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        point_number: item?.point_number,
        nama_pointtype: item?.nama_pointtype,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        status_2: item?.status_2,
        datum_2: item?.datum_2,
        durasi: item?.durasi,
        value: item?.value,
        datum_capture: item?.datum_capture,
        kesimpulan: item?.kesimpulan

      });
    });
    return dataTableValue;
  }



  const handleCheckedRows = (data: any) => {
    return data;
  }
 
  const location = useLocation(); // Get the location object
  const [filterValues, setFilterValues] = useState<any>({
    kesimpulan: 'VALID', // Default value
    path1: '',
    path2: '',
    path3: '',
    path4: '',
  });

  useEffect(() => {
    // Update kesimpulan based on the state passed from route
    if (location.state?.kesimpulan) {
      setFilterValues((prevValues: any) => ({
        ...prevValues,
        kesimpulan: location.state.kesimpulan,
      }));
    }
  }, [location.state]);

  const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);

        };

  useEffect(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
    }

  }, []);


  return (
    <>
            <Filter onFilterChange={handleFilterChange} />
      <div style={{ marginTop: '20px' }}>
        <div id="tabs">
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> RTU Status</li>
          </ul>
        <div key="2">
          <TableDataJqxGridNew
            
            //TABLE DATA
            path={API_PATH().fasop.realtime.digital}
            filterParams={{ 
              id_induk_pointtype: '3d391819-4288-4699-80f4-7ebd5ae0d733',jenis:'RTU', ...filterValues}}
            dataFieldsColsConfig={SCADATEL_STATUS_RTU_COLUMN_JQX()}
            primaryKey={'id_pointtype'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>

      </div>
      </div>
    </>
  );
}