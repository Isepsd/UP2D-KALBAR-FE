import { DATETIME_JQWidget, GARDU_INDUK_JQWidget, MONTH_YEAR_JQWidget, MORE_TEGANGAN_MULTI_COLUMN_JQWidget, NO_JQWidget, TRAFO_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Tegangan (kV)', cellsalign: 'center', align: 'center', datafield: 'v' }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
    ]
  }
}

export const BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      ...MORE_TEGANGAN_MULTI_COLUMN_JQWidget()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...MONTH_YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      ...MORE_TEGANGAN_MULTI_COLUMN_JQWidget()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      ...MORE_TEGANGAN_MULTI_COLUMN_JQWidget()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
    ],

  }
}