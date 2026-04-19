import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from '@app/services/_path.service';
import React, { useEffect, useState } from 'react'
// import Filter from '@app/modules/opsisdis/Filter';


import {
  Column,
} from 'devextreme-react/data-grid';

// import { useApp } from '@app/context/AppContext';
import TablePengukuranBeban from '@app/modules/opsisdis/TablePengukuranBeban';
import { PENGUKURAN_BEBAN_TRAFO_GI_KTT } from '@app/configs/react-table/opsisdis.column.config';
import DiffCeilDataGrid from '@app/modules/Table/DiffCeilDataGrid';
import Filter from './Filter';
import { timeFormSelect } from '@app/helper/time.helper';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import ModalForm from '@app/components/Modals/ModalForm';
import PbTrafoGIKTTUploadForm from './PbTrafoGIKTTUploadForm';

export default function PbTrafoGIKTTPage() {
  // const queryParams = qs.parse(location.search);
  const url = API_PATH().opsisdis.pengukuran_beban.trafo_gi_ktt;
  const urlCountNull = API_PATH().opsisdis.pengukuran_beban.trafo_gi_ktt_total;
  const [add, setAdd] = useState<any>(false)
  const columns: any = PENGUKURAN_BEBAN_TRAFO_GI_KTT()
  const customFilter = [{
    search: "__trafo_gi",
    field: "id_lokasi",
  }]
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Upload Data Beban KTT`,
  });
  const [loading, setLoading] = useState<any>(true)
  const [optionsGarduInduk, setOptionsGarduInduk] = useState<any>()
  const source = axios.CancelToken.source();
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const { application } = useSelector((state: any) => state.ui);
  const callBackCount = (valid: boolean, filter: any) => {
    let addValid: any = false;
    if (valid && !filter?.id_lokasi && filter?.id_parent_lokasi) {
      addValid = true
    }
    setAdd(addValid)
  }

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
        jenis_layanan_in: "KTT,CAMPURAN"
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
    getAllData();
    let interval = application?.def_generate_time == 30 ? 48 : 24;
    let time = application?.def_generate_time ? application?.def_generate_time : 60;
    let times = timeFormSelect(interval, time)

    setOptionsTimes(times)
    return (() => {
      source.cancel()
      setOptionsGarduInduk(null)
      setOptionsTimes(null)
    })
  }, [])

  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }))
  }
  return (

    <>
      <TopBarLoader isLoading={loading} />
      {optionsGarduInduk &&
        <>

          <TableDataListAction
            generate={add}
            column={false}
            add={false}
            module="Telemetring Trafo KTT"
            filterLayout="card"
            isUpload
            onShowModal={onShowModal}
          >
            <Filter
              setAdd={setAdd}
              optionsTimes={optionsTimes}
              optionsGarduInduk={optionsGarduInduk}
            />
          </TableDataListAction>
          <div>
            <TablePengukuranBeban
              pathServiceCountNull={urlCountNull}
              pathService={url}
              primaryKey="id_trans_tm_trafo_gi"
              callBackCount={callBackCount}
              label="Telemetring Trafo KTT"
              module="Telemetring Trafo KTT"
              customFilter={customFilter}
              customParams={{
                jenis_layanan: "KTT"
              }}
            >

              {columns.map((item: any, index: number) => (
                <Column
                  dataField={item?.accessor} allowEditing={item?.allowEditing} allowUpdating={item?.allowUpdating} caption={item?.Header} key={index} minWidth={item?.minWidth} enabled={item?.enabled} cellRender={DiffCeilDataGrid} fixed={item?.fixed ? item?.fixed : false} />
              ))}
            </TablePengukuranBeban>
          </div>
        </>
      }
      <ModalForm modalProps={modal}>
        <PbTrafoGIKTTUploadForm />
      </ModalForm>
    </>
  )
}
