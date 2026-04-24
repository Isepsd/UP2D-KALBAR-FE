import React, { useEffect, useState } from 'react'
import { Column } from 'devextreme-react/data-grid';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
// import Filter from '@app/modules/opsisdis/Filter';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import DiffCeilDataGrid from '@app/modules/Table/DiffCeilDataGrid';
import { PENGUKURAN_BEBAN_PEMBANGKIT } from '@app/configs/react-table/opsisdis.column.config';
import Filter from './Filter';
import { timeFormSelect } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function PbPembangkitPage() {
  const url = API_PATH().opsisdis.pengukuran_beban.pembangkit;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.pembangkit_total;
  const [add, setAdd] = useState<any>(false)
  const [loading, setLoading] = useState<any>(true)
  const [optionsUnitPembangkit, setOptionsUnitPembangkit] = useState<any>()
  const columns: any = PENGUKURAN_BEBAN_PEMBANGKIT()
  const customFilter = [{
    search: "__pembangkit",
    field: "id_lokasi",
  }]
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const { application } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();
  const [roleActions, setRoleActions] = useState<any>({});

  const callBackCount = (valid: boolean, filter: any) => {
    let addValid: any = false;
    if (valid && !filter?.id_lokasi && filter?.id_parent_lokasi) {
      addValid = true
    }
    setAdd(addValid)
  }

  /** GET DATA unit pembangkit */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit
      };


      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.nama_lokasi,
          value: item?.id_ref_lokasi
        })
      })
      setLoading(false)
      setOptionsUnitPembangkit(unit)
    } catch (err: any) {
      setOptionsUnitPembangkit(null)
      setLoading(false)
    }
  };

  useEffect(() => {
    let interval = application?.def_generate_time == 30 ? 48 : 24;
    let time = application?.def_generate_time ? application?.def_generate_time : 60;
    let times = timeFormSelect(interval, time)
    let roleAccess = ROLE_ACCESS("pembangkit")
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, 'generate'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
    setOptionsTimes(times)
    getAllData();
    return (() => {
      source.cancel()
      setOptionsUnitPembangkit(null)
      setOptionsTimes(null)
    })
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {optionsUnitPembangkit &&

        <>
          <TableDataListAction
            generate={add}
            add={false}
            column={false}
            module="Telemetring Pembangkit"
            filterLayout="card"
          >
            <Filter
              setAdd={setAdd}
              optionsTimes={optionsTimes}
              optionsUnitPembangkit={optionsUnitPembangkit}
            />
          </TableDataListAction>

          {/* <TablePengukuranBeban
            roleActions={roleActions}
            pathServiceCountNull={urlCountNull}
            pathService={url}
            primaryKey="id_trans_tm_pembangkit"
            callBackCount={callBackCount}
            label="Telemetring Pembangkit"
            module="Telemetring Pembangkit"
            customFilter={customFilter}
          >

            {columns.map((item: any, index: number) => (
              <Column
                dataField={item?.accessor} allowEditing={item?.allowEditing} allowUpdating={item?.allowUpdating} caption={item?.Header} key={index} minWidth={item?.minWidth} enabled={item?.enabled} cellRender={DiffCeilDataGrid} fixed={item?.fixed ? item?.fixed : false} />
            ))}
          </TablePengukuranBeban> */}
        </>
      }

    </>
  )
}
