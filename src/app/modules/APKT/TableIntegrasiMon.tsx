// import BadgeStatus from "@app/components/Status/BadgeStatus";
import { INTEGRASI_MON_COLUMN } from "@app/configs/react-table/apkt.columns.config";
import { API_PATH } from "@app/services/_path.service";
import React, { useState } from "react";
import TableData from "../Table/TableData";

export default function TableIntegrasiMon({ trigger }: any) {
  const [columns] = useState<any>(INTEGRASI_MON_COLUMN());
  const [dataRows, setDataRows] = useState<any>([]);
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        // status: (<BadgeStatus trueStatus={'online'} trueMsg='Online' falseMsg='Tidak Online' status={item?.status}></BadgeStatus>),
        status: (item?.status =='ONLINE' ?  <span className="text-success">ONLINE</span> :  <span className="text-danger">OFFLINE</span>),
      });
    });

    setDataRows(dataTableValue)
  }


  return (
    <>
      <TableData
        columnsConfig={columns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().apkt.apkt_integrasi_mon}
        filterParams={{
          sort_by: "-nama_proses",
          page: "-1",
          limit: "-1"
        }}
        primaryKey="id"
        styles={{ height: '14rem' }}
        containerClass="table"
        showNoResul={false}
        pagingPresistance={true}
        trigger={trigger}

      />
    </>
  )
}