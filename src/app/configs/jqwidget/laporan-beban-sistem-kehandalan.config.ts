import {  KINERJA_JQWidget, JANUARI_JQWidget, NO_JQWidget, Februari_JQWidget, MARET_JQWidget, APRIL_JQWidget, YEAR_JQWidget, MEI_JQWidget,JUNI_JQWidget,JULI_JQWidget,AGUSTUS_JQWidget,SEPTEMBER_JQWidget,OKTOBER_JQWidget,NOVEMBER_JQWidget,DESEMBER_JQWidget} from "./_more-jqwidget.column.config"
import { DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, GARDU_INDUK_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const BEBAN_EKSKURSI_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      ...KINERJA_JQWidget(),
      ...JANUARI_JQWidget(),
      ...Februari_JQWidget(),
      ...MARET_JQWidget(),
      ...APRIL_JQWidget(),
      ...MEI_JQWidget(),
      ...JUNI_JQWidget(),
      ...JULI_JQWidget(),
      ...AGUSTUS_JQWidget(),
      ...SEPTEMBER_JQWidget(),
      ...OKTOBER_JQWidget(),
      ...NOVEMBER_JQWidget(),
      ...DESEMBER_JQWidget(),
      // ...LOADfAKTOR_JQWidget()
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

