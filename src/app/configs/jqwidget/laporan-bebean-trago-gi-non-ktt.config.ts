import { BEBAN_PERJAM_JQWIDGET, DATETIME_JQWidget, GARDU_INDUK_JQWidget, MONTH_YEAR_JQWidget, NO_JQWidget, TRAFO_JQWidget, YEAR_JQWidget } from "./_more-jqwidget.column.config"
import { BEBAN_PERJAM_DATAFIELD_JQWidget, DATETIME_DATAFIELD_JQWidget, NO_DATAFIELD_JQWidget, TRAFO_DATAFIELD_JQWidget, UNIT_PEMBANGKIT_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config"

export const AMR_GROUP_JQWIDGET = () => {
  return [
    { text: 'Arus', name: 'arus', cellsalign: 'center', align: 'center', },
    { text: 'Hari', cellsalign: 'right', align: 'center', name: 'hari', parentgroup: "arus" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang', parentgroup: "arus" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam', parentgroup: "arus" },


    { text: 'Daya Aktif', name: 'daya_aktif', cellsalign: 'center', align: 'center', },
    { text: 'Hari', cellsalign: 'right', align: 'center', name: 'hari_daya', parentgroup: "daya_aktif" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang_daya', parentgroup: "daya_aktif" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam_daya', parentgroup: "daya_aktif" },



    { text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', name: 'Tegangan' },
    // { text: 'Threshold (kali)', cellsalign: 'right', align: 'center', name: 'Threshold', parentgroup: "DayaAktif" }
   



   
  ]
}

export const AMR_GROUP_BULAN_JQWIDGET = () => {
  return [
    { text: 'Arus', name: 'arus', cellsalign: 'center', align: 'center', },
    { text: 'Bulan', cellsalign: 'right', align: 'center', name: 'Bulan', parentgroup: "arus" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang', parentgroup: "arus" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam', parentgroup: "arus" },


    { text: 'Daya Aktif', name: 'daya_aktif', cellsalign: 'center', align: 'center', },
    { text: 'Bulan', cellsalign: 'right', align: 'center', name: 'Bulan_daya', parentgroup: "daya_aktif" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang_daya', parentgroup: "daya_aktif" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam_daya', parentgroup: "daya_aktif" },



    { text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', name: 'Tegangan' },
    // { text: 'Threshold (kali)', cellsalign: 'right', align: 'center', name: 'Threshold', parentgroup: "DayaAktif" }
   
   
  ]
}


export const AMR_GROUP_TAHUN_JQWIDGET = () => {
  return [
    { text: 'Arus', name: 'arus', cellsalign: 'center', align: 'center', },
    { text: 'Tahun', cellsalign: 'right', align: 'center', name: 'Tahun', parentgroup: "arus" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang', parentgroup: "arus" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam', parentgroup: "arus" },


    { text: 'Daya Aktif', name: 'daya_aktif', cellsalign: 'center', align: 'center', },
    { text: 'Tahun', cellsalign: 'right', align: 'center', name: 'Tahun_daya', parentgroup: "daya_aktif" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'siang_daya', parentgroup: "daya_aktif" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'malam_daya', parentgroup: "daya_aktif" },



    { text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', name: 'Tegangan' },
    // { text: 'Threshold (kali)', cellsalign: 'right', align: 'center', name: 'Threshold', parentgroup: "DayaAktif" }
   



   
  ]
}

export const BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),

      { text: 'Jenis Layanan', cellsalign: 'left', align: 'left', datafield: 'jenis_layanan', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'left', align: 'left', datafield: 'kapasitas', width: 140 },
      ...BEBAN_PERJAM_JQWIDGET()
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
      { name: 'jenis_layanan', type: 'string' },
      { name: 'kapasitas', type: 'string' },
      ...BEBAN_PERJAM_DATAFIELD_JQWidget()
    ]
  }
}

export const BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...DATETIME_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan ', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas ', width: 140 },
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Hari"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Hari"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),

      { text: 'Min (A)', datafield: 'i_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari" },
      { text: 'Max (A)', datafield: 'i_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari" },
      { text: 'AVG (A)', datafield: 'i_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari" },
      { text: 'Min (A)', datafield: 'i_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Max (A)', datafield: 'i_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'AVG (A)', datafield: 'i_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Min (A', datafield: 'i_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Max (A)', datafield: 'i_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'AVG (A)', datafield: 'i_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },

  
      { text: 'Min (MW)', datafield: 'p_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari_daya" },
      { text: 'Max (MW)', datafield: 'p_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "hari_daya" },
      { text: 'Min (MW)', datafield: 'p_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Max (MW)', datafield: 'p_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Min (MW)', datafield: 'p_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Max (MW)', datafield: 'p_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      
      { text: `Min`, cellsalign: 'right', align: 'center', datafield: `v_min`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Min`, cellsalign: 'center', align: 'center', datafield: `tgl_v_min`, columngroup: 'Tegangan', width: 160 },
      { text: `Max`, cellsalign: 'right', align: 'center', datafield: `v_max`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Max`, cellsalign: 'center', align: 'center', datafield: `tgl_v_max`, columngroup: 'Tegangan', width: 160 },


      
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...MONTH_YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan ', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas ', width: 140 },
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Bulan"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Bulan"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),
      { text: 'Min (A)', datafield: 'i_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan" },
      { text: 'Max (A)', datafield: 'i_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan" },
      { text: 'AVG (A)', datafield: 'i_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan" },
      { text: 'Min (A)', datafield: 'i_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Max (A)', datafield: 'i_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'AVG (A)', datafield: 'i_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Min (A', datafield: 'i_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Max (A)', datafield: 'i_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'AVG (A)', datafield: 'i_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },

  
      { text: 'Min (MW)', datafield: 'p_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan_daya" },
      { text: 'Max (MW)', datafield: 'p_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "Bulan_daya" },
      { text: 'Min (MW)', datafield: 'p_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Max (MW)', datafield: 'p_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'AVG(MW)', datafield: 'p_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Min(MW)', datafield: 'p_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Min(MW)', datafield: 'p_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Max(MW)', datafield: 'p_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Max(MW)', datafield: 'p_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'AVG(MW)', datafield: 'p_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },

      { text: `Min`, cellsalign: 'right', align: 'center', datafield: `v_min`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Min`, cellsalign: 'center', align: 'center', datafield: `tgl_v_min`, columngroup: 'Tegangan', width: 160 },
      { text: `Max`, cellsalign: 'right', align: 'center', datafield: `v_max`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Max`, cellsalign: 'center', align: 'center', datafield: `tgl_v_max`, columngroup: 'Tegangan', width: 160 },
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}

export const BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET = () => {
  return {
    columns: [
      ...NO_JQWidget(),
      ...YEAR_JQWidget(),
      ...GARDU_INDUK_JQWidget(),
      ...TRAFO_JQWidget(),
      { text: 'Jenis Layanan', cellsalign: 'center', align: 'center', datafield: 'jenis_layanan', width: 140 },
      { text: 'Kapasitas Trafo', cellsalign: 'center', align: 'center', datafield: 'kapasitas', width: 140 },
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "", "MW", "Tahun"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "", "A", "Tahun"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_siang", "MW", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_siang", "A", "Siang"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("p", "_malam", "MW", "Malam"),
      // ...MORE_BEBAN_MULTI_COLUMN_JQWidget("i", "_malam", "A", "Malam"),

      { text: 'Min (A)', datafield: 'i_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun" },
      { text: 'Max (A)', datafield: 'i_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun" },
      { text: 'AVG (A)', datafield: 'i_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun" },
      { text: 'Min (A)', datafield: 'i_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Max (A)', datafield: 'i_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'AVG (A)', datafield: 'i_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang" },
      { text: 'Min (A', datafield: 'i_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Min (A)', datafield: 'i_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Max (A)', datafield: 'i_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'Tgl Max (A)', datafield: 'i_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },
      { text: 'AVG (A)', datafield: 'i_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam" },

  
      { text: 'Min (MW)', datafield: 'p_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun_daya" },
      { text: 'Max (MW)', datafield: 'p_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg', width: '150', cellsalign: 'left', align: 'center', columngroup: "Tahun_daya" },
      { text: 'Min (MW)', datafield: 'p_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Max (MW)', datafield: 'p_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg_siang', width: '150', cellsalign: 'left', align: 'center', columngroup: "siang_daya" },
      { text: 'Min (MW)', datafield: 'p_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Min (MW)', datafield: 'p_tgl_min_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Max (MW)', datafield: 'p_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'Tgl Max (MW)', datafield: 'p_tgl_max_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },
      { text: 'AVG (MW)', datafield: 'p_avg_malam', width: '150', cellsalign: 'left', align: 'center', columngroup: "malam_daya" },

      { text: `Min`, cellsalign: 'right', align: 'center', datafield: `v_min`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Min`, cellsalign: 'center', align: 'center', datafield: `tgl_v_min`, columngroup: 'Tegangan', width: 160 },
      { text: `Max`, cellsalign: 'right', align: 'center', datafield: `v_max`, columngroup: 'Tegangan', width: 140 },
      { text: `Tgl Max`, cellsalign: 'center', align: 'center', datafield: `tgl_v_max`, columngroup: 'Tegangan', width: 160 },
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
      ...DATETIME_DATAFIELD_JQWidget(),
      ...UNIT_PEMBANGKIT_DATAFIELD_JQWidget(),
      ...TRAFO_DATAFIELD_JQWidget(),
    ],

  }
}