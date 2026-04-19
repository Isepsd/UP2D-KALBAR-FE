import React, { useState } from 'react';

/** CONFIG */
import { WHATSAPP_LOG_COLUMNS_JQX } from '@app/configs/react-table/fasop/whatsapp.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import FilterJQ from './FilterJQ';
import moment from "moment";

export default function WhatsAppLogPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        datum_sent: item?.datum_created,
        nama_bot: item?.bot?.nama,
        msg: item?.msg,
        nama_kontak: item?.kontak?.nama,
        status_sent: item?.status_sent,
        pesan_error: item?.pesan_error

      });
    });
    return dataTableValue;
  }
  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().subtract(1, 'days').format('YYYY-MM-DD'), datum_before: moment().add(1, "days").format('YYYY-MM-DD'), id_wa_bot: null, id_wa_kontak: null

  });
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };



  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }


  return (
    <>
      <FilterJQ onFilterChange={handleFilterChange} />




      <div style={{ margin: '20px' }}>
        <TableDataJqxGridNew
          //TABLE DATA
          path={API_PATH().master.fasop.whatsapp.log}
          filterParams={{ sort_by: "datum_sent", ...filterValues }}
          dataFieldsColsConfig={WHATSAPP_LOG_COLUMNS_JQX()}
          primaryKey={'id'}
          respDataApi={handleRespDataApi}
          filterable={true}
          onRowSelected={handleCheckedRows}
          exportbtn={true}

        />
      </div>
    </>
  );
}