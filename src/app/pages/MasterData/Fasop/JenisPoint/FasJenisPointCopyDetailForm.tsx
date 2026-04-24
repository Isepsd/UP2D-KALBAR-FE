import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

/** CONFIG */
import { JENIS_POINT_COPY_COLUMNS } from '@app/configs/react-table/master-fasop.columns.config';
import { IFasopPointType } from '@app/interface/fasop-pointtype.interface';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { get, truncate } from 'lodash';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import FasJenisPointCopyDetailFormDetail from './FasJenisPointCopyDetailFormDetail';

import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function FasJenisPointCopyDetailForm() {
  let [searchParams, setSearchParams] = useSearchParams();
  const pointTypeSearchParams = searchParams.get("point_type_copy")
  const { activePaging, closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [rowSelected, setRowSelected] = useState<any>({ id: pointTypeSearchParams });
  const [dataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [columns] = useState<any>(JENIS_POINT_COPY_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MODAL JENIS POINT */
  

  const remappedTreeJaringanData = (tree: any, level = 0) => {
    return tree
      ? tree?.map((item: IFasopPointType) => {
        return {
          key: (item as any)?.key,
          id: item.id_pointtype,
          no_urut: item.no_urut,
          nama: item.name,
          jenis_point: item.jenispoint,
          disabled: item?.id_induk_pointtype == null,
          tampil_dashboard: (
            <div className='position-relative text-center w-100'>
              <Form.Check checked={!!item?.show_grafik} disabled />
            </div>
          ),
          kirim_telegram: (
            <div className='position-relative text-center w-100'>
              <Form.Check checked={!!item?.send_telegram} disabled />
            </div>
          ),
          group_telegram: item?.telegram_group?.nama,
          status: <BadgeStatus status={item?.status}></BadgeStatus>,
          format_pesan: truncate(item.format_pesan, { length: 50 }),
          subRows: remappedTreeJaringanData(item?.child_pointtype, level + 1),
        
        };
      })
      : undefined;
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    const dataRows = remappedTreeJaringanData(data)
    setDataRows(dataRows);
  };



  const handleSelectedRows = (v: any) => {
    const selected = get(v, '0');
    if (selected?.id) {
      searchParams.delete('point_type_copy');
      searchParams.append('point_type_copy', selected?.id);
      setSearchParams(searchParams);
    }
    setRowSelected(selected);
  };

/** COLUMN SHOW HIDE EVENT HANDLE */
useEffect(() => {
  let cols: any = columns?.filter(({ show }: any) => show === true);
 
  setDataColumns(cols);
}, [columns]);

 

  useEffect(() => {
    if (pointTypeSearchParams) {
      setRowSelected({ id: pointTypeSearchParams ? pointTypeSearchParams : '0' })
    }
  }, [pointTypeSearchParams])

  useEffect(() => {
    if (activePaging) {
      searchParams.delete('point_type_copy');
      setSearchParams(searchParams);
    }
  }, [activePaging])

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  useEffect(() => {
    searchParams.delete("point_type_copy")
    searchParams.delete("ids")
    searchParams.delete("id")
    setSearchParams(searchParams)
  }, [])


  return (
    <>
  
      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().master.fasop.point_type + '-tree'}
        primaryKey={'id_pointtype'}
        action={action}
        selected={dataSelected}
        rowSelect={true}
        rowSelectType={'radio'}
        onCheckedRows={handleSelectedRows}
      ></TableData>

      <hr className='my-4' />

      <FasJenisPointCopyDetailFormDetail
      
        filterParams={{ id_pointtype: rowSelected?.id ? rowSelected?.id : null }}
      ></FasJenisPointCopyDetailFormDetail>

    </>
  );
}
