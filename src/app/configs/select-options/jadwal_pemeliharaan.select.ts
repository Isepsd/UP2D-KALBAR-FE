export const JADWAL = () => {
  return [
    { label: 'RUTIN', value: 'RUTIN' },
    { label: 'KOREKTIF', value: 'KOREKTIF' },
    { label: 'DARURAT', value: 'DARURAT' },
    { label: 'SUSULAN', value: 'SUSULAN' },
    { label: 'TERENCANA', value: 'TERENCANA' },
  ]
}

export const JENIS_PELAYANAN = () => {
  return [
    { label: 'KHUSUS', value: 'KHUSUS' },
    { label: 'UMUM', value: 'UMUM' },
    { label: 'TM-TM', value: 'TM-TM' },
    { label: 'TR-TR', value: 'TR-TR' },
  ]
}

export const STATUS_PELAKSANAAN = () => {
  return [
    { label: 'SEMUA', value: '' },
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'RENCANA PEMELIHARAAN', value: 'RENCANA PEMELIHARAAN' },
    { label: 'DISETUJUI SPV BAGIAN', value: 'DISETUJUI SPV BAGIAN' },
    { label: 'DISETUJUI REN', value: 'DISETUJUI REN' },
    { label: 'DISETUJUI OPSIS', value: 'DISETUJUI OPSIS' },
    { label: 'PELAKSANAAN', value: 'PELAKSANAAN',  type: "pelaksanaan"},
    { label: 'SUDAH MANUVER', value: 'SUDAH MANUVER', type: "pelaksanaan" },
    { label: 'SELESAI PELAKSANAAN', value: 'SELESAI PELAKSANAAN', type: "pelaksanaan" }
  ]
}

export const STATUS_PELAKSANA = () => {
  return [
    
    { label: 'ALL', value: 'Di setujui opsis,pelaksanaan,selesai pelaksaaan,selesai manuver' },
    { label: 'DISETUJUI OPSIS', value: 'DI SETUJUI OPSIS' },
    { label: 'PELAKSANAAN', value: 'PELAKSANAAN',  type: "pelaksanaan"},
    { label: 'SUDAH MANUVER', value: 'SUDAH MANUVER', type: "pelaksanaan" },
    { label: 'SELESAI PELAKSANAAN', value: 'SELESAI PELAKSANAAN', type: "pelaksanaan" }
  ]
}