// import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { API_PATH } from "@app/services/_path.service";
import React, { useEffect, useState } from "react";
import TablePelangganBulanan from "@app/modules/opsisdis/TablePelangganBulan";
// import TableGangguanSistemUp3MingguanKom from "@app/modules/opsisdis/TableGangguanSistemUp3BulananKom";
import Filter from "./FilterColNewULP";
// import { timeFormSelect } from '@app/helper/time.helper';
// import { useSelector } from 'react-redux';

import { infoLabelsNewTarget } from "@app/configs/opsis-select.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import {
  PELANGGAN_BULAN,
  // TARGET_BULANAN_ULP_KOMULATIF,
} from "@app/configs/jqwidget/pengukuran-beban-penyulang.column.config";
// import moment from "moment";
import { Tab, Tabs } from "react-bootstrap";
// import { useSelector } from 'react-redux';

export default function BulananULPPage() {
  const url = API_PATH().opsisdis.jadwal_pemeliharaan.pelanggan;
  const [columns, setColumns] = useState<any>([]);
  const [dataRows, setDataRows] = useState<any>([]);
  const [roleActions, setRoleActions] = useState<any>({});
  const [activeTab, setActiveTab] = useState("up3");


  useEffect(() => {
    let roleAccess = ROLE_ACCESS("input-pelanggan-bulan");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      generate: ROLE_ACTION(roleAccess, "generate"),
      update: ROLE_ACTION(roleAccess, "update"),
    };
    setRoleActions(roleAct);
    // setOptionsTimes(times)

    return () => {
      // source.cancel()
      // setOptionsTimes(null)
    };
  }, []);

  useEffect(() => {
    let fields: any = PELANGGAN_BULAN();
    setColumns(fields);
  }, [roleActions]);


  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    dataTableValue = data?.map((item: any) => {
      item.id_trans_jadwal_har_plgn_bln = item?.id_trans_jadwal_har_plgn_bln;
      item.nama_lokasi = item?.nama_lokasi;
      item.id_lokasi = item?.id_lokasi;
      item.pemilik = item?.pemilik;
      item.tahun = item?.tahun;
      item.jenis = item?.jenis;
      return item;
    });

    dataTableValue.sort((a: any, b: any) => {
      if (a.nama_lokasi < b.nama_lokasi) return -1;
      if (a.nama_lokasi > b.nama_lokasi) return 1;
      return 0;
    });

    dataTableValue = dataTableValue.map((item: any, index: number) => ({
      ...item,
      number: index + 1,
    }));

    setDataRows(() => {
      return dataTableValue;
    });
  };


  return (
    <>
      {roleActions?.view && <Filter />}

      <br />
      <br />

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k ?? "up3")}
        id="pelanggan-tabs"
        className="mb-3"
      >
        <Tab eventKey="up3" title="UP3">
          {activeTab === "up3" && roleActions?.view && (
            <>
              <TablePelangganBulanan
                editAble={true}
                path={url}
                primaryKey="id"
                filterable={true}
                exportbtn={false}
                infoLabels={infoLabelsNewTarget()}
                filterParams={{
                  jenis: "UP3",
                }}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                columnsConfig={columns}
              />

              <br />

            </>
          )}
        </Tab>
      </Tabs>
    </>
  );
}
