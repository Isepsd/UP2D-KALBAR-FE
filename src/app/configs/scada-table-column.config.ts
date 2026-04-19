export const KINERJA_AVAILABILITY = [
  { Header: '#', accessor: 'number', minWidth: '5%', show: true },
  { Header: 'Point Kinerja', accessor: 'point_kinerja', minWidth: '25%', show: true },
  { Header: 'Jumlah Point', accessor: 'jumlah_point', minWidth: '25%', show: true },
  { Header: 'Bulan ini (%)', accessor: 'bulan_ini', minWidth: '25%', show: true },
  { Header: 'Hari Kemarin (%)', accessor: 'hari_kemarin', minWidth: '25%', show: true },
]

export const KINERJA_REMOTE = [
  { Header: '#', accessor: 'number', show: true },
  { Header: 'Nama Kinerja', accessor: 'nama_kinerja', show: true },
  { Header: 'Jumlah Sukses', accessor: 'jumlah_sukses', show: true },
  { Header: 'Jumlah Gagal', accessor: 'jumlah_gagal', show: true },
  { Header: 'Kinerja (%)', accessor: 'kinerja', show: true },
]

export const PENYULANG_TRIP = [
  { Header: 'Hari Ini', accessor: 'hari_ini', show: true },
  { Header: 'Kemarin', accessor: 'kemarin', show: true },
  { Header: 'Bulan ini', accessor: 'bulan_ini', show: true },
]