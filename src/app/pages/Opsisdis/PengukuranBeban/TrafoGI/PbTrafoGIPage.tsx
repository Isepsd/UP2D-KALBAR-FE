import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'
// import Filter from '@app/modules/opsisdis/Filter';

// import { useApp } from '@app/context/AppContext';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import Filter from './Filter';
import { timeFormSelect } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { infoLabels } from '@app/configs/opsis-select.config';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET } from '@app/configs/jqwidget/pengukuran-beban-trafo.column.config';
import moment from 'moment';

export default function PbTrafoGIPage() {
  // const queryParams = qs.parse(location.search);
  const url = API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.trafo_gi_non_ktt_total;
  const [add, setAdd] = useState<any>(false)
  const [loading, setLoading] = useState<any>(true)
  const [optionsGarduInduk, setOptionsGarduInduk] = useState<any>()
  const [columns, setColumns] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
  const customFilter = [{
    search: "__trafo_gi",
    field: "id_lokasi",
  }]
  const [roleActions, setRoleActions] = useState<any>({});


  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const { application } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();
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
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
        jenis_layanan_in: "NON KTT,CAMPURAN"
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
      setOptionsGarduInduk(unit)
    } catch (err: any) {
      setLoading(false)
      setOptionsGarduInduk(null)
    }
  };

  useEffect(() => {
    getAllData()
    let interval = application?.def_generate_time == 30 ? 48 : 24;
    let time = application?.def_generate_time ? application?.def_generate_time : 60;
    let times = timeFormSelect(interval, time)
    let roleAccess = ROLE_ACCESS("pengukuran-beban-trafo-gi")
    const roleAct = {
      generate: ROLE_ACTION(roleAccess, 'generate'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
    setOptionsTimes(times)
    return (() => {
      source.cancel()
      setOptionsGarduInduk(null)
      setOptionsTimes(null)
    })
  }, [])

  useEffect(() => {
    let fields: any = PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET(roleActions)
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
      item.jenis_layanan = item?.jenis_layanan
      item.nama_parent = item?.ref_parent_lokasi?.nama_lokasi
      item.up3 = item?.ref_lokasi?.up3_1 ? item?.ref_lokasi?.up3_1?.nama_lokasi : null
      item.datum = moment(item?.datum).format("DD MMM YYYY HH:mm")
      return item;
    });
    // console.log("dataTableValue", dataTableValue);

    setDataRows(() => {
      return dataTableValue
    })
  }
  return (
    <>
      <TopBarLoader isLoading={loading} />
      {optionsGarduInduk && (
        <>
          <TableDataListAction
            generate={add}
            column={false}
            add={false}
            module='Telemetring Trafo'
            filterLayout='card'
            infoLabels={infoLabels()}
            exportOptions={[{ label: 'MS-Excel', type: 'xlsx' }]}
          >
            <Filter
              setAdd={setAdd}
              optionsTimes={optionsTimes}
              optionsGarduInduk={optionsGarduInduk}
            />
          </TableDataListAction>
          <div>
            <TablePengukuranBeban
              roleActions={roleActions}
              pathServiceCountNull={urlCountNull}
              pathService={url}
              primaryKey='id_trans_tm_trafo_gi'
              callBackCount={callBackCount}
              label='Telemetring Trafo'
              module='Telemetring Trafo'
              customFilter={customFilter}
              customParams={{ jenis_layanan: 'NON KTT' }}
              ChangeColorRow={true}
              respDataApi={handleRespDataApi}
              rowData={dataRows}
              columnsConfig={columns}
            />

          </div>
        </>
      )}


    </>
  );
}
