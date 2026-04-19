export const STATUS_GARDU = [
  { value: '', label: '-' },
  { value: 'RENCANA', label: 'RENCANA' },
  { value: 'OPERASI', label: 'OPERASI' },
  { value: 'BONGKAR', label: 'BONGKAR' }
]

export const FUNGSI_MP = [
  { value: '', label: '-' },
  { value: 'RTU', label: 'RTU' },
  { value: 'DS', label: 'DS' },
  { value: 'CDS', label: 'CDS' }
]

export const FUNGSI_SCADA = [
  { value: '', label: '-' },
  { value: 'GI', label: 'GI' },
  { value: 'GH', label: 'GH' },
  { value: 'KP', label: 'KP' },
  { value: 'FI', label: 'FI' },
  { value: 'EVM', label: 'EVM' },
  { value: 'MASTER', label: 'MASTER' },
]

export const JENIS_GI = [
  { value: '', label: '-' },
  { value: 'GI', label: 'GI' },
  { value: 'GIS', label: 'GIS' },
]
export const JENIS_LAYANAN = [
  { value: 'NON KTT', label: 'NON KTT' },
  { value: 'KTT', label: 'KTT' },
]
export const JENIS_TRAFO = [
  { value: 'PS', label: 'PS' },
  { value: 'DAYA', label: 'DAYA' },
]

export const STATUS_TRAFO = [
  { value: 'OPERASI', label: 'OPERASI' },
  { value: 'TIDAK OPERASI', label: 'TIDAK OPERASI' },
]

export const SINKRON_DATA = [
  { value: 'AMR', label: 'AMR' },
  { value: 'SCADA', label: 'SCADA' },
  { value: 'PORTAL EXT', label: 'PORTAL EXT' },
]

export const OPTIONS_JENIS_PENYULANG = [
  { value: 'PENYULANG GI', label: 'PENYULANG GI' },
  { value: 'PENYULANG GH', label: 'PENYULANG GH' },
  // { value: 'RECLOSER', label: 'RECLOSER' },
  // { value: 'MOTORIZED', label: 'MOTORIZED' },
]
export const OPTIONS_FUNGSI_PERALATAN = [
  { value: 'OUTGOING', label: 'OUTGOING' },
  { value: 'KOPLING', label: 'KOPLING' },
  { value: 'INCOMING', label: 'INCOMING' },
  { value: 'BUSBAR', label: 'BUSBAR' },
  { value: 'FEEDER', label: 'FEEDER' },
  { value: 'RISER', label: 'RISER' },
]

export const JENIS_GARDU = [
  { value: 'BT', label: 'BT' },
  { value: 'PT', label: 'PT' },
  { value: 'CI', label: 'CI' },
  { value: 'KIOS', label: 'KIOS' },
  { value: 'RMU', label: 'RMU' },
  { value: 'TINGKAT', label: 'TINGKAT' },
  { value: '1 TIANG', label: '1 TIANG' },
  { value: '2 TIANG', label: '2 TIANG' },
]
export const JENIS_GARDU_GH = [
  { value: 'BT', label: 'BT' },
]


export const FUNGSI_SCADA_GD = [
  { value: 'Tidak Ada', label: 'Tidak Ada' },
  { value: 'MP', label: 'MP' },
]

export const FUNGSI_SCADA_GH = [
  { value: 'Tidak Ada', label: 'Tidak Ada' },
  { value: 'GH', label: 'GH' },
]
export const OPTIONS_JENIS_SUTM: any = [{
  "value": 35,
  "label": "EVM",
  "id_user_entri": 1,
  "id_user_update": 1,
  "tgl_entri": "2022-11-30",
  "tgl_update": "2022-11-30"
},
{
  "value": 34,
  "label": "FIOHL",
  "id_user_entri": 1,
  "id_user_update": 1,
  "tgl_entri": "2022-11-30",
  "tgl_update": "2022-11-30"
},
{
  "value": 31,
  "label": "RECLOSER",
  "id_user_entri": 1,
  "id_user_update": 1,
  "tgl_entri": "2022-11-30",
  "tgl_update": "2022-11-30"
},
{
  "value": 32,
  "label": "LBS",
  "id_user_entri": 1,
  "id_user_update": 1,
  "tgl_entri": "2022-11-30",
  "tgl_update": "2022-11-30"
},
{
  "value": 33,
  "label": "SSO",
  "id_user_entri": 1,
  "id_user_update": 1,
  "tgl_entri": "2022-11-30",
  "tgl_update": "2022-11-30"
}]

export const FUNGSI_SCADA_SUTM = [
  { value: 'MP', label: 'MP' },
  { value: 'GH', label: 'GH' },
  { value: 'KP', label: 'KP' },
  { value: 'OG', label: 'OG' },
  { value: 'Tidak Ada', label: 'Tidak Ada' },
]
export const FUNGSI_LOKASI = [
  { value: 'GH', label: 'GH' },
  { value: 'ZONE', label: 'ZONE' },
  { value: 'SECTION', label: 'SECTION' },
  { value: 'SEGMENT', label: 'SEGMENT' },
]
export const JENSI_PERALATAN = [
  { value: 'CB', label: 'CB' },
  { value: 'LBS', label: 'LBS' },
  { value: 'LBS3WAY', label: 'LBS3WAY' },
  { value: 'SSO', label: 'SSO' },
  { value: 'RECLOSER', label: 'RECLOSER' },
  { value: 'FIOHL', label: 'FIOHL' },
  { value: 'TRAFO', label: 'TRAFO' },
  { value: 'EVM', label: 'EVM' },
  { value: 'MVCELL', label: 'MVCELL' },
]

export const OPTIONS_ZONA = [
  { label: 'ZONA 1', value: 'ZONA 1' },
  { label: 'ZONA 2', value: 'ZONA 2' },
  { label: 'ZONA 3', value: 'ZONA 3' },
  { label: 'ZONA 4', value: 'ZONA 4' },
]

