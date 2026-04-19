import { LAST_EVENT_UP3 } from '@app/configs/react-table/dashboard/kinerja.cinfig';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TableStatic from '../Table/TableStatic';

export default function LastEventUp3({data}:any) {
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns] = useState<any>(LAST_EVENT_UP3());
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        key: item?.keypoint ? item?.keypoint : '-',
        event: item?.event,
        jam_event: item?.jam_event
          ? moment(item?.jam_event).format('DD-MM-YYYY HH:mm')
          : '-',
      });

      setDataRows(dataTableValue);
    });
  };

  useEffect(() => {
    handleRespDataApi(data)
  }, [data])
  
  return (
    <TableStatic
      columnsConfig={columns}
      rowsData={dataRows}
      containerClass='table-responsive table'
      styles={{ height: '14rem' }}
    />
  );
}
