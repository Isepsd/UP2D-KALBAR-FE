import React, { useEffect, useState } from 'react'
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
// import Filter from '@app/modules/opsisdis/Filter';
import Filter from './Filter';
import { timeFormSelect } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import { PENGUKURAN_BEBAN_PEMBANGKIT_COLUMN_JQWIDGET } from '@app/configs/jqwidget/pengukuran-beban-pembangkit.config';

export default function PbPembangkitPage() {
  const url = API_PATH().opsisdis.pengukuran_beban.pembangkit;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.pembangkit_total;
  const [add, setAdd] = useState<any>(false)
  const [loading, setLoading] = useState<any>(true)
  const [optionsUnitPembangkit, setOptionsUnitPembangkit] = useState<any>()
  const [columns, setColumns] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
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


  useEffect(() => {
    let fields: any = PENGUKURAN_BEBAN_PEMBANGKIT_COLUMN_JQWIDGET(roleActions)
    setColumns(fields)
  }, [roleActions])

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data?.map((item: any) => {
      item.nama_gardu_induk = item?.ref_parent_lokasi?.nama_gardu_induk
      item.kode_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi
      item.penyulang_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi
      item.kode_penyulang = item?.ref_lokasi?.kode_lokasi
      item.nama_lokasi = item?.ref_lokasi?.nama_lokasi
      item.pemilik = item?.ref_lokasi?.pemilik
      item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi
      item.up3 = item?.ref_lokasi?.up3_1 ? item?.ref_lokasi?.up3_1?.nama_lokasi : null
      item.datum = moment(item?.datum).format("DD MMM YYYY HH:mm")
      return item;
    });
    setDataRows(() => {
      return dataTableValue
    })
  }

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

          <TablePengukuranBeban
            columnsConfig={columns}
            roleActions={roleActions}
            pathServiceCountNull={urlCountNull}
            pathService={url}
            primaryKey="id_trans_tm_pembangkit"
            callBackCount={callBackCount}
            label="Telemetring Pembangkit"
            module="Telemetring Pembangkit"
            customFilter={customFilter}
            respDataApi={handleRespDataApi}
            rowData={dataRows}
          />
        </>
      }

    </>
  )
}
