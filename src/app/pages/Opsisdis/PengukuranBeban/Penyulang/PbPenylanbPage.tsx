import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import Filter from './Filter';
import { timeFormSelect } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { infoLabels } from '@app/configs/opsis-select.config';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { PENGUKURAN_BEBAN_PENYULANG_COLUMN_JQWIDGET } from '@app/configs/jqwidget/pengukuran-beban-penyulang.column.config';
import moment from 'moment';

export default function PbPenylanbPage() {
  const url = API_PATH().opsisdis.pengukuran_beban.penyulang;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.penyulang_total;
  const [add, setAdd] = useState<any>(false)
  const [loading, setLoading] = useState<any>(true)
  const source = axios.CancelToken.source();
  const [columns, setColumns] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const customFilter = [{
    search: "__gardu_induk",
    field: "id_gardu_induk",
  }, {
    search: "__penyulang",
    field: "id_lokasi",
  }
  ]

  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();
  const { application } = useSelector((state: any) => state.ui);
  const callBackCount = (valid: boolean, filter: any) => {

    let addValid: any = false;
    if (valid && filter?.id_gardu_induk && !filter?.id_penyulang) {
      addValid = true
    }
    setAdd(addValid)
  }

  /** GET DATA gardu induk */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        // id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk
        id_ref_jenis_lokasi_in: `${JENIS_LOKASI().pembangkit},${JENIS_LOKASI().trafo_gi},${JENIS_LOKASI().gardu_hubung}`
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
      setOpiotnsGarduInduk(unit)
    } catch (err: any) {
      setLoading(false)
      setOpiotnsGarduInduk(null)
    }
  };


  useEffect(() => {
    let interval = application?.def_generate_time == 30 ? 48 : 24;
    let time = application?.def_generate_time ? application?.def_generate_time : 60;
    let times = timeFormSelect(interval, time)
    let roleAccess = ROLE_ACCESS("pengukuran-beban-penyulang")
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, 'generate'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
    setOptionsTimes(times)
    getAllData();
    return (() => {
      source.cancel()
      setOpiotnsGarduInduk(null)
      setOptionsTimes(null)
    })
  }, [])

  useEffect(() => {
    let fields: any = PENGUKURAN_BEBAN_PENYULANG_COLUMN_JQWIDGET(roleActions)
    setColumns(fields)
  }, [roleActions])

  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data?.map((item: any) => {
      item.nama_gardu_induk = item?.ref_parent_lokasi?.nama_gardu_induk
      item.trafo = item?.ref_parent_lokasi?.nama_lokasi
      item.kode_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.kode_lokasi
      item.penyulang_gardu_induk = item?.ref_parent_lokasi?.parent_lokasi?.nama_lokasi
      item.kode_penyulang = item?.ref_lokasi?.kode_lokasi
      item.nama_lokasi = item?.ref_lokasi?.nama_lokasi
      item.pemilik = item?.ref_lokasi?.pemilik
      item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi
      item.up3 = item?.ref_lokasi?.up3_1 ? item?.ref_lokasi?.up3_1?.nama_lokasi : null
      item.ulp = item?.ulp
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
      {opiotnsGarduInduk &&
        <>

          <TableDataListAction
            generate={add}
            column={false}
            add={false}
            module="Telemetring Penyulang"
            filterLayout="card"
            infoLabels={infoLabels()}
          >
            <Filter
              setAdd={setAdd}
              optionsTimes={optionsTimes}
              optionsGarduInduk={opiotnsGarduInduk}
            />
          </TableDataListAction>
          <div>
            <TablePengukuranBeban
              roleActions={roleActions}
              pathServiceCountNull={urlCountNull}
              pathService={url}
              primaryKey="id_trans_tm_penyulang"
              callBackCount={callBackCount}
              label="Telemetring Penyulang"
              module="Telemetring Penyulang"
              customFilter={customFilter}
              ChangeColorRow={true}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              columnsConfig={columns}
            />


          </div>
        </>
      }
    </>
  )
}
