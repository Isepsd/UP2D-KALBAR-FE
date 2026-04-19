// import { SliderColumnFilter } from '@app/components/ReactTable/ReactTableFilter';

export const ACTION_COLUMN = () => {
  return [
    {
      Header: 'Aksi',
      accessor: 'action',
      minWidth: '7%',
      canFilter: false,
      show: true,
    },
  ];
};

export const USERS_MANAGEMENT_COLUMNS = () => {
  return [
    {
      Header: 'Nama ',
      accessor: 'fullname',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
    },
    {
      Header: 'Kontak',
      accessor: 'phone',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
    },
    { Header: 'Email', accessor: 'email', show: true },
    { Header: 'Jabatan', accessor: 'jabatan', show: true },
    { Header: 'Hak Akses', accessor: 'hak_akses', canFilter: false, show: true },
    { Header: 'Status', accessor: 'status', canFilter: false, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const ROLE_COLUMNS = () => {
  return [
    { Header: 'Nama', accessor: 'name', show: true, minWidth: '30%' },
    // {
    //   Header: 'Level',
    //   accessor: 'level',
    //   Filter: SliderColumnFilter,
    //   filter: 'equals',
    //   show: true,
    //   minWidth: '30%',
    // },
    {
      Header: 'Deskripsi',
      accessor: 'description',
      show: true,
      minWidth: '33%',
    },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_ASET_ASET = () => {
  return [
    {
      Header: 'No Aset',
      accessor: 'id_ref_aset',
      minWidth: 200,
      filter: 'fuzzyText',
    },
    {
      Header: 'Gruop Aset',
      accessor: 'grup_aset',
      minWidth: 200,
      filter: 'fuzzyText',
    },
    { Header: 'Kategori', accessor: 'jenis_aset' },
    { Header: 'Nama Aset', accessor: 'name', filter: 'fuzzyText' },
    { Header: 'Station', accessor: 'station', filter: 'fuzzyText' },
    { Header: 'Bay', accessor: 'bay', filter: 'fuzzyText' },
    { Header: 'Pengelola', accessor: 'pengelola', filter: 'fuzzyText' },
    { Header: 'PIC', accessor: 'pic', filter: 'fuzzyText' },
    { Header: 'No Seri', accessor: 'no_seri', filter: 'fuzzyText' },
    {
      Header: 'Manufaktur',
      accessor: 'id_aset_manufaktur',
      filter: 'fuzzyText',
    },
    { Header: 'Tipe', accessor: 'tipe', filter: 'fuzzyText' },
    { Header: 'Tahun', accessor: 'tahun', filter: 'fuzzyText' },
    { Header: 'Status Aset', accessor: 'status', canfilter: false },
    ...ACTION_COLUMN(),
  ];
};

/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_STATUS_ASET = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, filter: 'fuzzyText' },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 100,
      filter: 'fuzzyText',
    },
    {
      Header: 'Tanggal Buat',
      accessor: 'tgl_entri',
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: 'Tanggal Ubah',
      accessor: 'tgl_update',
      minWidth: 100,
      canfilter: false,
    },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_JENIS_ASET = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, filter: 'fuzzyText' },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 100,
      filter: 'fuzzyText',
    },
    {
      Header: 'Tree Jaringan',
      accessor: 'tree_jaringan',
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: 'Tanggal Buat',
      accessor: 'tgl_entri',
      minWidth: 100,
      canfilter: false,
    },
    {
      Header: 'Tanggal Ubah',
      accessor: 'tgl_update',
      minWidth: 100,
      canfilter: false,
    },
    ...ACTION_COLUMN(),
  ];
};
