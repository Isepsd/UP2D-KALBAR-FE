import { BEBAN_PERJAM_JQWIDGET, DATETIME_JQWidget, MONTH_YEAR_JQWidget, MORE_BEBAN_MULTI_COLUMN_JQWidget, NO_JQWidget, UP3_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, GARDU_INDUK_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const BEBAN_UP3_PERJAM_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      // ...GARDU_INDUK_JQWidget(),
      ...UP3_JQWidget(),
      ...BEBAN_PERJAM_JQWIDGET()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...GARDU_INDUK_DATAFIELD_JQWidget(),
      // ...TRAFO_DATAFIELD_JQWidget(),
      // ...BEBAN_PERJAM_DATAFIELD_JQWidget()
    ]
  }
}

export const BEBAN_UP3_HARIAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      // ...GARDU_INDUK_JQWidget(),
      ...UP3_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Hari"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...GARDU_INDUK_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_UP3_BULAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...MONTH_YEAR_JQWidget(),
      // ...GARDU_INDUK_JQWidget(),
      ...UP3_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Bulan"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...GARDU_INDUK_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_UP3_TAHUN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      // ...GARDU_INDUK_JQWidget(),
      ...UP3_JQWidget(),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Tahun"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...GARDU_INDUK_DATAFIELD_JQWidget(),
    ],

  }
}