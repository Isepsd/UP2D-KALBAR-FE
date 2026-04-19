export const NO_JQWidget = () => [{ text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true },
]
export const TAHUN_BULAN_JQWidget = () => [{ text: 'Tahun', cellsalign: 'center', align: 'center', datafield: 'tahun', width: 50, pinned: true },]
export const KINERJA_JQWidget = () => [{ text: 'Kinerja', cellsalign: 'center', align: 'center', datafield: 'kinerja', width: 115, pinned: true },]
export const JANUARI_JQWidget = () => [{ text: 'Januari', cellsalign: 'center', align: 'center', datafield: 'jan', width: 115, pinned: true },]
export const Februari_JQWidget = () => [{ text: 'Ferbruari', cellsalign: 'center', align: 'center', datafield: 'feb', width: 115, pinned: true },]
export const MARET_JQWidget = () => [{ text: 'Maret', cellsalign: 'center', align: 'center', datafield: 'maret', width: 115, pinned: true },]
export const APRIL_JQWidget = () => [{ text: 'April', cellsalign: 'center', align: 'center', datafield: 'april', width: 115, pinned: true },]
export const MEI_JQWidget = () => [{ text: 'Mei', cellsalign: 'center', align: 'center', datafield: 'mei', width: 115, pinned: true },]
export const JUNI_JQWidget = () => [{ text: 'Juni', cellsalign: 'center', align: 'center', datafield: 'jun', width: 115, pinned: true },]
export const JULI_JQWidget = () => [{ text: 'Juli', cellsalign: 'center', align: 'center', datafield: 'jul', width: 115, pinned: true },]
export const AGUSTUS_JQWidget = () => [{ text: 'Agustus', cellsalign: 'center', align: 'center', datafield: 'agus', width: 115, pinned: true },]
export const SEPTEMBER_JQWidget = () => [{ text: 'September', cellsalign: 'center', align: 'center', datafield: 'sep', width: 115, pinned: true },]
export const OKTOBER_JQWidget = () => [{ text: 'Okbober', cellsalign: 'center', align: 'center', datafield: 'okt', width: 115, pinned: true },]
export const NOVEMBER_JQWidget = () => [{ text: 'November', cellsalign: 'center', align: 'center', datafield: 'nov', width: 115, pinned: true },]
export const DESEMBER_JQWidget = () => [{ text: 'Desember', cellsalign: 'center', align: 'center', datafield: 'des', width: 115, pinned: true },]

export const UNIT_PEMBANGKIT_JQWidget = () => [{ text: 'Unit Pembangkit', cellsalign: 'left', align: 'center', datafield: 'unit_pembangkit', width: 160, pinned: true }]
export const GARDU_INDUK_JQWidget = () => [{ text: 'Gardu Induk', cellsalign: 'left', align: 'center', datafield: 'gi', width: 160, pinned: true }]
export const GARDU_INDUK_PENYULANG_JQWidget = () => [{ text: 'Gardu Induk', cellsalign: 'left', align: 'center', datafield: 'gi_penyulang', width: 160, pinned: true }]

export const DATETIME_JQWidget = () => [{ text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 200, pinned: true }]

export const DATE_JQWidget = () => [{ text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'date', width: 140, pinned: true }]

export const MONTH_YEAR_JQWidget = () => [{ text: 'Bulan Tahun', cellsalign: 'center', align: 'center', datafield: 'month_year', width: 200, pinned: true }]
export const YEAR_JQWidget = () => [{ text: 'Tahun', cellsalign: 'center', align: 'center', datafield: 'year', width: 200, pinned: true }]

export const PEMBANGKIT_JQWidget = () => [{ text: 'Pembangkit', cellsalign: 'left', align: 'center', datafield: 'pembangkit', width: 200, pinned: true }]

export const TRAFO_JQWidget = () => [{ text: 'Trafo', cellsalign: 'left', align: 'center', datafield: 'trafo', width: 200, pinned: true }]

export const PENYULANG_JQWidget = () => [{ text: 'Penyulang', cellsalign: 'left', align: 'center', datafield: 'penyulang', width: 200, pinned: true }]
export const GH_JQWidget = () => [{ text: 'Gardu Hubung', cellsalign: 'left', align: 'center', datafield: 'gardu_hubung', width: 200, pinned: true }]
export const KEYPOINT_JQWidget = () => [{ text: 'Keypoint', cellsalign: 'left', align: 'center', datafield: 'kp', width: 200, pinned: true }]
export const UP3_JQWidget = (pinned: any = false) => [{ text: 'UP3', cellsalign: 'left', align: 'center', datafield: 'up3', width: 160, pinned: pinned, editable: false }]
export const UP2B_JQWidget = (pinned: any = false) => [{ text: 'UP2B', cellsalign: 'left', align: 'center', datafield: 'up2b', width: 160, pinned: pinned, editable: false }]
export const ULP_JQWidget = (pinned: any = false) => [{ text: 'ULP', cellsalign: 'left', align: 'center', datafield: 'ulp', width: 160, pinned: pinned, editable: false }]
export const SUBSISTEM_JQWidget = (pinned: any = false) => [{ text: 'Sub Sistem', cellsalign: 'left', align: 'center', datafield: 'subsistem', width: 200, pinned: pinned }]
export const UID_JQWidget = (pinned: any = false) => [{ text: 'Unit Induk', cellsalign: 'left', align: 'center', datafield: 'nama_uid', width: 200, pinned: pinned }]
export const LOADfAKTOR_JQWidget = (pinned: any = false) => [{ text: 'Load Faktor', cellsalign: 'right', align: 'center', datafield: 'load_faktor', width: 200, pinned: pinned }]

export const DAYA_AKTIF_JQWidget = () => {
  return [
    { text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p' }
  ]
}

export const BEBAN_PERJAM_JQWIDGET = () => {
  return [
    { text: 'Arus (A)', datafield: 'i', cellsalign: 'right', align: 'center', minWidth: '150px', disableFilters: true, show: true },
    { text: 'Daya Aktif (MW)', datafield: 'p', cellsalign: 'right', align: 'center', minWidth: '150px', disableFilters: true, show: true }
  ]
}

export const GROUP_DAYA_AKTIF_JQWidget = (label: string) => {
  return [
    { text: 'Daya Aktif', cellsalign: 'right', align: 'center', name: 'DayaAktif' },
    { text: label, cellsalign: 'right', align: 'center', name: label, parentgroup: "DayaAktif" },
    { text: 'Siang', cellsalign: 'right', align: 'center', name: 'Siang', parentgroup: "DayaAktif" },
    { text: 'Malam', cellsalign: 'right', align: 'center', name: 'Malam', parentgroup: "DayaAktif" }
  ]
}

export const MORE_BEBAN_MULTI_COLUMN_JQWidget = (field: string, type: string = "", satuan: string = "", columnGroup: string) => {
  return [
    { text: `Min (${satuan})`, cellsalign: 'right', align: 'center', datafield: `${field}_min${type}`, columngroup: columnGroup, width: 140 },
    { text: `Tgl Min (${satuan})`, cellsalign: 'center', align: 'center', datafield: `${field}_tgl_min${type}`, columngroup: columnGroup, width: 160 },
    { text: `Max (${satuan})`, cellsalign: 'right', align: 'center', datafield: `${field}_max${type}`, columngroup: columnGroup, width: 140 },
    { text: `Tgl Max (${satuan})`, cellsalign: 'center', align: 'center', datafield: `${field}_tgl_max${type}`, columngroup: columnGroup, width: 160 },
    { text: `AVG(${satuan})`, cellsalign: 'right', align: 'center', datafield: `${field}_avg${type}`, columngroup: columnGroup, width: 140 },
  ]
}

export const GROUP_TEGANGAN_JQWidget = () => {
  return [
    { text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', name: 'Tegangan' },
    { text: 'Threshold (kali)', cellsalign: 'right', align: 'center', name: 'Threshold', parentgroup: "DayaAktif" }
  ]
}

export const MORE_TEGANGAN_MULTI_COLUMN_JQWidget = () => {
  return [
    { text: `Min`, cellsalign: 'right', align: 'center', datafield: `v_min`, columngroup: 'Tegangan', width: 140 },
    { text: `Tgl Min`, cellsalign: 'center', align: 'center', datafield: `tgl_v_min`, columngroup: 'Tegangan', width: 160 },
    { text: `Max`, cellsalign: 'right', align: 'center', datafield: `v_max`, columngroup: 'Tegangan', width: 140 },
    { text: `Tgl Max`, cellsalign: 'center', align: 'center', datafield: `tgl_v_max`, columngroup: 'Tegangan', width: 160 },
    { text: 'Range >=20,2 s.d <=20,7', datafield: 'v_jlh_normal', width: 200, cellsalign: 'right', align: 'center', columngroup: 'Threshold' },
    { text: '< 20,2', datafield: 'v_jlh_kurang', width: 100, cellsalign: 'center', align: 'right', columngroup: 'Threshold' },
    { text: '> 20,7', datafield: 'v_jlh_lebih', width: 100, cellsalign: 'center', align: 'right', columngroup: 'Threshold' },
  ]
}


