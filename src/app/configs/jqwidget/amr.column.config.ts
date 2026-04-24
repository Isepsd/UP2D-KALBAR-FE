import { DATETIME_JQWidget, NO_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const AMR_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      { text: 'Customer RID', datafield: 'customer_rid', width: '150', pinned: true, cellsalign: 'left', align: 'center', },
      { text: 'Customer Name', datafield: 'customer_name', width: '150', pinned: true, cellsalign: 'left', align: 'center', },
      { text: 'Faktor Kali', datafield: 'fk', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},
      { text: 'KWH', datafield: 'kwh_prev', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},
      { text: 'KVARH', datafield: 'kvarh_prev', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},
      { text: 'Rate 1', datafield: 'rate1_prev', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},
      { text: 'Rate 2', datafield: 'rate2_prev', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},
      { text: 'Rate 3', datafield: 'rate3_prev', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_awal"},

      { text: 'KWH', datafield: 'kwh', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_akhir" },
      { text: 'KVARH', datafield: 'kvarh', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_akhir" },
      { text: 'Rate 1', datafield: 'rate1', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_akhir" },
      { text: 'Rate 2', datafield: 'rate2', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_akhir" },
      { text: 'Rate 3', datafield: 'rate3', width: '150', cellsalign: 'left', align: 'center', columngroup: "stand_akhir" },

      { text: 'KWH Real', datafield: 'pe_kwh', width: '150', cellsalign: 'left', align: 'center', columngroup: "nilai" },
      { text: 'KVARH', datafield: 'pe_kvarh', width: '150', cellsalign: 'left', align: 'center', columngroup: "nilai" },
      { text: 'Rate 1 Real', datafield: 'pe_rate1', width: '150', cellsalign: 'left', align: 'center', columngroup: "nilai" },
      { text: 'Rate 2 Real', datafield: 'pe_rate2', width: '150', cellsalign: 'left', align: 'center', columngroup: "nilai" },
      { text: 'Rate 3 Real', datafield: 'pe_rate3', width: '150', cellsalign: 'left', align: 'center', columngroup: "nilai" },

      { text: 'Maxdem', datafield: 'maxdem', width: '150', cellsalign: 'left', align: 'center', },
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
    ]
  }
}
export const AMR_GROUP_JQWIDGET = () => {
  return [
    { text: 'Stand Awal', name: 'stand_awal', cellsalign: 'center', align: 'center', },
    { text: 'Stand Akhir', name: 'stand_akhir', cellsalign: 'center', align: 'center', },
    { text: 'Nilai', name: 'nilai', cellsalign: 'center', align: 'center', },
  ]
}