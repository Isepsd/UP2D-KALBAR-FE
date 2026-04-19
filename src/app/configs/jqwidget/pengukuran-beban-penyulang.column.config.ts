

import { CeilBackgroundPengukuranBeban } from "@app/helper/jq-widget.helper";
import { ULP_JQWidget, UP3_JQWidget } from "./_more-jqwidget.column.config"
import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";

export const validateData = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}

export const validateDataCOSPHI = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai antara 0 sampai 1" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}
export const PENGUKURAN_BEBAN_GH_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 160, pinned: true, editable: false, },
      { text: 'Gardu Hubung', cellsalign: 'left', align: 'center', datafield: 'nama_parent', width: 160, pinned: true, editable: false },
      { text: 'Trafo', cellsalign: 'left', align: 'center', datafield: 'nama_lokasi', editable: false, width: 160, pinned: true },
      {
        text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
      {
        text: 'COS PHI', cellsalign: 'right', align: 'center', datafield: 'cosq', width: 100, editable: roleActions?.update || false,
      },
      {
        text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p', width: 130, editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, validation: validateData,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}

export const PENGUKURAN_BEBAN_PENYULANG_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false, },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 140, pinned: true, editable: false, },
      { text: 'Gardu Induk', cellsalign: 'left', align: 'center', datafield: 'nama_gardu_induk', width: 160, pinned: true, editable: false },

      { text: 'Trafo', cellsalign: 'left', align: 'center', datafield: 'trafo', editable: false, width: 160 },
      { text: 'Penyulang', cellsalign: 'left', align: 'center', datafield: 'nama_lokasi', editable: false, width: 160 },
      ...UP3_JQWidget(),
      ...ULP_JQWidget(),

      {
        text: 'Pemilik', cellsalign: 'right', align: 'center', datafield: 'pemilik', editable: false, width: 140
      },
      {
        text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 140,
      },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 140
      },
      {
        text: 'Daya reaktif (MVAR)', cellsalign: 'right', align: 'center', datafield: 'q', editable: false, width: 140,
      },
      // {
      //   text: 'I. Max (MW)', cellsalign: 'right', align: 'center', datafield: 'i_max_p', editable: false, width: 140,
      // },
      // {
      //   text: 'Arus (MW)', cellsalign: 'right', align: 'center', datafield: 'i_p', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 140
      // },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 140,
      },
      {
        text: 'COS PHI', cellsalign: 'right', align: 'center', datafield: 'cosq', width: 140, editable: roleActions?.update || false, validation: validateData,
      },
      {
        text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p', width: 140, editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, validation: validateData,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}
