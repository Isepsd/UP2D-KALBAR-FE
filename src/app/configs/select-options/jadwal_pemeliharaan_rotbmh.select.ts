export const JADWAL = () => {
  return [
    { label: 'RUTIN', value: 'RUTIN' },
    { label: 'KOREKTIF', value: 'KOREKTIF' },
    { label: 'SUSULAN', value: 'SUSULAN' },
    { label: 'TERENCANA', value: 'TERENCANA' },
    { label: 'EMERGENCY', value: 'EMERGENCY' },
    { label: 'SIAGA', value: 'SIAGA' },
  ]
}

export const KATEGORI_ROTBMH = () => {
  return [
    { label: 'ROT', value: 'ROT' },
    { label: 'ROB', value: 'ROB' },
    { label: 'ROM', value: 'ROM' },
    { label: 'ROH', value: 'ROH' },
    { label: 'EMERGENCY', value: 'EMERGENCY' },
  ]
}

export const SIFAT_PEKERJAAN_2 = () => {
  return [
    { label: 'Kode 1 : Pemadaman beban distribusi selama pekerjaan', value: '1' },
    { label: 'Kode 2 : Pemadaman beban distribusi selama manuver', value: '2' },
    { label: 'Kode 3 : Peralatan bebas tegangan selama pekerjaan', value: '3' },
    { label: 'Kode 4 : Peralatan bebas tegangan selama manuver', value: '4' },
    { label: 'Kode 5 : Peralatan bertegangan', value: '5' },
    { label: 'ABK : Akan diberitahu kemudian', value: 'ABK' },
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
    { label: 'PELAKSANAAN', value: 'PELAKSANAAN', type: "pelaksanaan" },
    { label: 'SUDAH MANUVER', value: 'SUDAH MANUVER', type: "pelaksanaan" },
    { label: 'SELESAI PELAKSANAAN', value: 'SELESAI PELAKSANAAN', type: "pelaksanaan" }
  ]
}

export const STATUS_PELAKSANA = () => {
  return [

    { label: 'ALL', value: 'Di setujui opsis,pelaksanaan,selesai pelaksaaan,selesai manuver' },
    { label: 'DISETUJUI OPSIS', value: 'DI SETUJUI OPSIS' },
    { label: 'PELAKSANAAN', value: 'PELAKSANAAN', type: "pelaksanaan" },
    { label: 'SUDAH MANUVER', value: 'SUDAH MANUVER', type: "pelaksanaan" },
    { label: 'SELESAI PELAKSANAAN', value: 'SELESAI PELAKSANAAN', type: "pelaksanaan" }
  ]
}