import { ACTION_COLUMN } from "./_more.columns.config";

export const MASTER_PENYEBAB_GANGGUAN = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Kategori', accessor: 'kategori', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};


export const MASTER_FREQUENSI_METER = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Sumber Data', accessor: 'datascada', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Point Number', accessor: 'point_number', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Path1', accessor: 'path1', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Path2', accessor: 'path2', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Path3', accessor: 'path3', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Interval Logging', accessor: 'interval_logging', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Logging', accessor: 'logging', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Scale', accessor: 'scale', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Slave ID', accessor: 'slave_id', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Modbus ADR', accessor: 'address', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Mode', accessor: 'mode', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Parity', accessor: 'parity', minWidth: 40, disableFilters: true, show: true },
    { Header: 'Port', accessor: 'port', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Baut Rate', accessor: 'baut_rate', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Stop Bits', accessor: 'stop_bits', minWidth: 150, disableFilters: true, show: true },
    { Header: 'Byte Size', accessor: 'byte_size', minWidth: 150, disableFilters: true, show: true },
    { Header: 'RTS Control', accessor: 'xonxoff', minWidth: 150, disableFilters: true, show: true },
    { Header: 'IP Host', accessor: 'ip_host', minWidth: 150, disableFilters: true, show: true },
    { Header: 'IP Port', accessor: 'ip_port', minWidth: 100, disableFilters: true, show: true },
    
    ...ACTION_COLUMN(),
  ];
};


export const TRANS_FREQUENSI_HISTORY = () => {
  return [
    { Header: 'Folder', accessor: 'folder', minWidth: 200, disableFilters: true, show: true },
  ];
};

export const TRANS_FREQUENSI_HISTORY_LIST_DIRECTORY = () => {
  return [
    { Header: 'Folder', accessor: 'directory_name', minWidth: 200, disableFilters: true, show: true },
  ];
};
export const TRANS_FREQUENSI_HISTORY_DETAIL = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Filename', accessor: 'filename', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Action', accessor: 'dokumen', minWidth: 100, disableFilters: true, show: true },
  ];
};

export const MASTER_AMR_CUSTOMER = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Customer RID', accessor: 'customer_rid', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Lokasi', accessor: 'lok', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Meter ID', accessor: 'meter_id', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Meter Type', accessor: 'meter_type', minWidth: 150, disableFilters: true, show: true },

    { Header: 'Rate', accessor: 'rate', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Modem ADR', accessor: 'modem_adr', minWidth: 140, disableFilters: true, show: true },
    { Header: 'Daya', accessor: 'daya', minWidth: 100, disableFilters: true, show: true },
    { Header: 'BAPM', accessor: 'bapm', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Faktor Kali', accessor: 'faktor_kali', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Nofa', accessor: 'nofa', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Gol Tarif', accessor: 'goltarif', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Kode Gardu', accessor: 'kodegardu', minWidth: 150, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const FORM_CHECKLIST_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Kategori Aset', accessor: 'kategori', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Level', accessor: 'level', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const FORM_CHECKLIST_DETAIL_COLUMN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nilai Acuan', accessor: 'nilai_acuan', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Satuan', accessor: 'satuan', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 100, disableFilters: true, show: true },
    { Header: 'Tipe', accessor: 'tipe', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const FORM_CHECKLIST_DETAIL_LOGIC_COLUMN = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Nilai/Range', accessor: 'nilai_range', minWidth: 50, disableFilters: true, show: true },
    { Header: 'Kesimpulan', accessor: 'kesimpulan', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DATA_PETUGAS_REGU = () => {
  return [
    { Header: 'Nama Petugas', accessor: 'fullname', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Regu', accessor: 'regu', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};


export const MASTER_DATA_TOKEN = () => {
  return [
    { Header: 'No', accessor: 'number', width: '20px', disableFilters: true, show: true },
    { Header: 'Nama Token', accessor: 'namatoken', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Token', accessor: 'token', minWidth: 200, disableFilters: true, show: true },
    { Header: 'User', accessor: 'user_token', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Tanggal Buat', accessor: 'tanggal_buat', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_MODULE_API = () => {
  return [
    { Header: 'No', accessor: 'number', width: '20px', disableFilters: true, show: true },
    { Header: 'Nama Module', accessor: 'namamodule', minWidth: 200, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_ROLES_TOKEN = () => {
  return [
    { Header: 'Nama Module', accessor: 'namamodule', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Id Module', accessor: 'id_module', minWidth: 200, disableFilters: true, show: true },
  ];
};



export const MASTER_INDIKASI = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_FIOHL= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_FAILMTRZ= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },    
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_FAILHMI= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },    
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_FDIR= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_CUACA= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_CATEGORI_GANGGUAN= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
export const MASTER_STATUS_PROTEKSI= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const MASTER_DISPATCHER= () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: 100, disableFilters: true, show: true },
    ...ACTION_COLUMN(),
  ];
};
