import { API_PATH } from '@app/services/_path.service';
import React, { useState, useEffect } from 'react';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import axios from 'axios';
import RCFilter from '@app/modules/Fasop/RCFilter';
import { getAllByPath } from '@app/services/main.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import TableDataJQWidgetUpdate from '@app/modules/Table/TableDataJQWidgetUpdate';
import { RC_COLUMN_JQWIDGET } from '@app/configs/jqwidget/pengukuran-beban-trafo.column.config';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { Button } from 'react-bootstrap';
import moment from 'moment';
export default function ShRemoteControlPageJQ() {
  const label = 'History RC';
  const url = API_PATH().fasop.laporan_scada.histori_rc;

  const [roleActions, setRoleActions] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [columns, setColumns] = useState<any>([]);
  const [optionsGarduInduk, setOptionsGarduInduk] = useState<any>();
  const [dataRows, setDataRows] = useState<any>([]);


  const [filterValues, setFilterValues] = useState<any>({
    tanggal_akhir: moment().format('YYYY-MM-DD'),
    tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    path1text: "",
    path2text: "",
    path3text: "",
    path4text: "",
    id_unit: null,
  });
  const source = axios.CancelToken.source();

  // Function to refresh data
  const refreshData = async () => {
    // Display a loading indicator while fetching data
    setLoading(true);

    try {
      // Update filterValues with default values
      setFilterValues({
        tanggal_akhir: moment().format('YYYY-MM-DD'),
        tanggal_mulai: moment().subtract(1, 'day').format('YYYY-MM-DD'),
        path1text: "",
        path2text: "",
        path3text: "",
        path4text: "",
        id_unit: null,
      });

      // Fetch the data here
      await getAllData();
    } catch (error) {
      // Handle errors if any
      console.error('Error refreshing data:', error);
    } finally {
      // Hide the loading indicator
      setLoading(false);
    }
  };

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
      limit: -1,
      sort_by: 'path1',
      tanggal_mulai: filterValues.tanggal_mulai,
      tanggal_akhir: filterValues.tanggal_akhir,
      path1text: filterValues.path1text,
      path2text: filterValues.path2text,
      path3text: filterValues.path3text,
      path4text: filterValues.path4text,
      id_unit: filterValues.id_unit,
      };

      const req: any = await getAllByPath(
        API_PATH().fasop.laporan_scada.histori_rc,
        params,
        source.token
      );

      const { results } = req;
      let unit: any = [];
      results?.map((item: any) => {
        unit.push({
          label: item?.nama_lokasi,
          value: item?.id_ref_lokasi,
        });
      });
      setLoading(false);
      setOptionsGarduInduk(unit);
    } catch (err: any) {
      setLoading(false);
      setOptionsGarduInduk(null);
    }
  };

  useEffect(() => {
    let fields: any = RC_COLUMN_JQWIDGET(roleActions);
    setColumns(fields);
  }, [roleActions]);

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data.map((item: any) => {
      item.b1 = item?.path1;
      item.b2 = item?.path2;
      item.b3 = item?.path3;
      item.element = item?.path4;
      item.operator = item?.msg_operator;
      item.tgl_mulai_remote = item?.datum_1;
      item.datum_2 = item?.datum_2;
      item.status_2 = item?.status_2;
      item.durasi = item?.durasi;

      return item;
    });
    setDataRows(dataTableValue);
  };

  // // Function to refresh data
  // const refreshData = () => {
  //   // Call the data fetching function here
  //   getAllData();
  // };


  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};


  useEffect(() => {
    getAllData();
    let roleAccess = ROLE_ACCESS('remote-control');
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, 'generate'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);

    return () => {
      source.cancel();
      setOptionsGarduInduk(null);
    };
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {optionsGarduInduk && (
        <>

          <TableDataListAction  
          column={false} 
          add={false}  setColumns={setColumns}  module={label} filterLayout="card" reload={false} >
            <RCFilter/>
          </TableDataListAction>
          <div>
          <Button
              variant="primary" // Use the desired button variant
              onClick={refreshData} // Call the refreshData function when the button is clicked
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
                <i className='fas fa-sync-alt'></i>
             
            </Button>
            <TableDataJQWidgetUpdate
              roleActions={roleActions}
              columnsConfig={columns}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              path={url}
              primaryKey={'id_his_rc'}
              deleteConfirmation
              filterParams={{filterValues}}
              validExport={false}
              paging={{ show: true }}
              
            />
        
          </div>
        </>
      )}
    </>
  );
}
