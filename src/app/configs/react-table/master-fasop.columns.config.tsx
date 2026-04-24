
import React from "react"
import { ACTION_COLUMN, NO } from "./_more.columns.config"

export const IP_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Pointpid', accessor: 'pointpid', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Hitung Kerja', accessor: 'hitung_kerja', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kirim Telegram', accessor: 'kirim_telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'IP 1', accessor: 'ip1', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'IP 2', accessor: 'ip2', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const POINT_ANALOG_DIGITAL_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Jenis Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Station', accessor: 'station', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Bay', accessor: 'bay', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Lokasi (B1)', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Tegangan (B2)', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Bay (B3)', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
    // ...B1(),
    // ...B2(),
    // ...B3(),
    { Header: 'Element', accessor: 'path4', minWidth: '150px', show: true, disableFilters: false },

    { Header: 'Info', accessor: 'path5', minWidth: '150px', show: true, disableFilters: false },

    { Header: 'Kelompok', accessor: 'tipe_point', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Capture Telemetering', accessor: 'capture_telemetring', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Hitung Kinerja', accessor: 'kinerja', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Send Telegram', accessor: 'send_telegram', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Path4', accessor: 'path4', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Path5', accessor: 'path5', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Value', accessor: 'value', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Last Update', accessor: 'last_update', minWidth: '150px', show: true, disableFilters: false },
    ...ACTION_COLUMN(),
  ]
}


export const WHATSAPP_KONTAK_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: 'number' },
      { name: 'id_wa_kontak', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'no_kontak', type: 'sting' },
      { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Kontak', datafield: 'nama', width: '40%' },
      { text: 'No Kontak', datafield: 'no_kontak', width: '40%' },
      { text: 'Status', datafield: 'status', width: '17%', columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
}
export const TELEGRAM_KONTAK_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: 'number' },
      { name: 'id_tel_kontak', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'no_kontak', type: 'sting' },
      { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Kontak', datafield: 'nama', width: '40%' },
      { text: 'No Kontak', datafield: 'no_kontak', width: '40%' },
      { text: 'Status', datafield: 'status', width: '17%', columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
}


export const WHATSAPP_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: 'id_wa_group', type: 'number' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'nama_bot', type: 'string' },
      { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Group', datafield: 'nama', width: '40%' },
      { text: 'Id Group', datafield: 'id_wa_group', width: '5%' },
      { text: 'Bot', datafield: 'nama_bot', width: '42%' },
      { text: 'Status', datafield: 'status', width: '10%', columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
}
export const TELEGRAM_GROUP_COLUMN_JQ = () => {
  return {
    datafields: [
      { name: 'id_tel_group', type: 'number' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'nama_bot', type: 'string' },
      { name: 'status', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Group', datafield: 'nama', width: '40%' },
      { text: 'Id Group', datafield: 'id_tel_group', width: '5%' },
      { text: 'Bot', datafield: 'nama_bot', width: '42%' },
      { text: 'Status', datafield: 'status', width: '10%', columntype: 'checkbox', filtertype: 'bool' },

    ],
  };
}

export const WHATSAPP_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: 'nama_kontak', type: 'string' },
      { name: 'no_kontak', type: 'number' },
      { name: 'id_wa_kontak', type: 'number' },
      { name: 'id', type: 'number' },
      { name: 'number', type: 'number' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Kontak', datafield: 'nama_kontak', width: '47%' },
      { text: 'No Kontak', datafield: 'no_kontak', width: '50%' },

    ],
  };
}


export const TELEGRAM_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: 'nama_kontak', type: 'string' },
      { name: 'no_kontak', type: 'number' },
      { name: 'id_tel_kontak', type: 'number' },
      { name: 'id', type: 'number' },
      { name: 'number', type: 'number' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%' },
      { text: 'Nama Kontak', datafield: 'nama_kontak', width: '47%' },
      { text: 'No Kontak', datafield: 'no_kontak', width: '50%' },

    ],
  };
}


export const WHATSAPP_TAMBAH_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: 'nama_kontak', type: 'string' },
      { name: 'no_kontak', type: 'number' },
      { name: 'id_wa_kontak', type: 'number' },

    ],
    columns: [
      { text: 'Nama Kontak', datafield: 'nama_kontak', width: 450 },
      { text: 'No Kontak', datafield: 'no_kontak', width: 150 },

    ],
  };
};


export const COPY_POINT_STATE_COLUMNS = () => {
  return {
    datafields: [
      { name: 'statekey', type: 'string' },
      { name: 'quality_code', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'valid', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'id_pointtype_state', type: 'string' },
      { name: 'id_pointtype', type: 'string' },
     

    ],
    columns: [
      { text: 'Value', datafield: 'statekey', width: 150 },
      { text: 'Quality Code', datafield: 'quality_code', width: 150 },
      { text: 'State Label', datafield: 'name', width: 150 },
      { text: 'Valid', datafield: 'valid', width: 150 },
      { text: 'Status', datafield: 'status', width: 150 },

    ],
  };
};

export const TELEGRAM_TAMBAH_KONTAK_GROUP_COLUMNS = () => {
  return {
    datafields: [
      { name: 'nama_kontak', type: 'string' },
      { name: 'no_kontak', type: 'number' },
      { name: 'id_tel_kontak', type: 'number' },

    ],
    columns: [
      { text: 'Nama Kontak', datafield: 'nama_kontak', width: 450 },
      { text: 'No Kontak', datafield: 'no_kontak', width: 150 },

    ],
  };
};



export const WHATSAPP_BOT_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: 'id_wa_bot', type: 'number' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'datum_created', type: 'string' },
      { name: 'token', type: 'string' },
      { name: 'instance_id', type: 'string' },

    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%', editable: false, },
      { text: 'Nama Bot', datafield: 'nama', width: '17%', editable: false, },
      { text: 'Url', datafield: 'url', width: '20%', editable: false, },
      { text: 'Token', datafield: 'token', width: '20%', editable: false, },
      { text: 'Instance ID', datafield: 'instance_id', width: '20%', editable: false, },
      { text: 'Status', datafield: 'status', width: '20%', columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
}



export const RTU_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'ID', accessor: 'id', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Station', accessor: 'station', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'B3Text', accessor: 'b3text', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Faktor', accessor: 'faktor', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Aktif', accessor: 'aktif', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Telegram', accessor: 'telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kinerja', accessor: 'kinerja', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const MASTER_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Station', accessor: 'station', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'B3Text', accessor: 'b3text', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Jenis Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Faktor', accessor: 'faktor', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Aktif', accessor: 'aktif', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Telegram', accessor: 'telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kinerja', accessor: 'kinerja', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

const HEADER_EXTRA_TREE_POINT_TYPE = () => {
  return [{
    id: "nama",
    accessor: 'nama',
    show: true,
    disableFilters: true,
    hideColumn: true,
    minWidth: '250px',
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>} Nama
      </span>
    ),
    Cell: ({ row }: any) =>
      row.canExpand ? (
        <div
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 1.25}rem`
            }
          })}
          className="d-flex gap-2"
        >
          {row.isExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>}
          <span> {row.original.nama}</span>
        </div>
      ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama}</div>,
  },
  ]
}

export const JENIS_POINT_COLUMNS = () => {
  return [
    ...HEADER_EXTRA_TREE_POINT_TYPE(),
    { Header: 'Tipe Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'id_pointtype', accessor: 'id', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'No Urut', accessor: 'no_urut', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Group Telegram', accessor: 'group_telegram', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Tampil Dashboard', accessor: 'tampil_dashboard', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kirim Ke Telegram', accessor: 'kirim_telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Format Pesan', accessor: 'format_pesan', minWidth: '350px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}


const HEADER_EXTRA_TREE_COPY_POINT_TYPE = () => {
  return [{
    id: "nama",
    accessor: 'nama',
    show: true,
    disableFilters: true,
    hideColumn: true,
    minWidth: '250px',
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>} Nama
      </span>
    ),
    Cell: ({ row }: any) =>
      row.canExpand ? (
        <div
          {...row.getToggleRowExpandedProps({
            style: {
              paddingLeft: `${row.depth * 1.25}rem`
            }
          })}
          className="d-flex gap-2"
        >
          {row.isExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>}
          <span> {row.original.nama}</span>
        </div>
      ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama}</div>,
  },
  ]
}

export const JENIS_POINT_COPY_COLUMNS = () => {
  return [
    ...HEADER_EXTRA_TREE_COPY_POINT_TYPE(),
    { Header: 'Tipe Point', accessor: 'jenis_point', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'id_pointtype', accessor: 'id', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'No Urut', accessor: 'no_urut', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Group Telegram', accessor: 'group_telegram', minWidth: '150px', show: true, disableFilters: true },
    // { Header: 'Tampil Dashboard', accessor: 'tampil_dashboard', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kirim Ke Telegram', accessor: 'kirim_telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Format Pesan', accessor: 'format_pesan', minWidth: '350px', show: true, disableFilters: true },
  
  ]
}


export const JENIS_POINT_DETAIL_COPY_COLUMNS = () => {
  return [
    { Header: 'ID', accessor: 'id', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Value', accessor: 'statekey', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Quality Code', accessor: 'quality_code', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'State Label', accessor: 'name', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Valid', accessor: 'valid', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', show: true, disableFilters: true },
   
  ]
}
export const JENIS_POINT_DETAIL_COLUMNS = () => {
  return [
    { Header: 'ID', accessor: 'id', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Quality Code', accessor: 'quality_code', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'State Label', accessor: 'state_label', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Valid', accessor: 'valid', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const REF_POINT_RC_TRIP_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Point Number', accessor: 'point_number', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Point Name', accessor: 'point_name', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Point Text', accessor: 'point_text', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Wilayah', accessor: 'ref_lokasi', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'RC', accessor: 'rc', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kirim RC Ke Telegram', accessor: 'kirim_rc_telegram', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'TRIP', accessor: 'trip', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Kirim TRIP Ke Telegram', accessor: 'kirim_trip_telegram', minWidth: '150px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}
export const REF_PATH1_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Path 1', accessor: 'path', minWidth: '150px', show: true, disableFilters: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}
export const REF_PATH3_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', width: '50px', disableFilters: true, show: true },
    { Header: 'Path 3', accessor: 'path', minWidth: '350px', show: true, disableFilters: true },
    { Header: 'Lokasi', accessor: 'lokasi', minWidth: '200px', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const TELEGRAM_BOT_COLUMNS = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: '90%', show: true, disableFilters: true },
    { Header: 'Chat Code', accessor: 'chat_code', minWidth: '20%', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}


export const TELEGRAM_BOT_COLUMNS_JQ = () => {
  return {
    datafields: [
      { name: 'id_wa_bot', type: 'number' },
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'datum_created', type: 'string' },
      { name: 'token', type: 'string' },


    ],
    columns: [
      { text: 'No', datafield: 'number', width: '3%', editable: false, },
      { text: 'Nama Bot', datafield: 'nama', width: '17%', editable: false, },
      { text: 'Url', datafield: 'url', width: '20%', editable: false, },
      { text: 'Token', datafield: 'token', width: '20%', editable: false, },
      { text: 'Status', datafield: 'status', width: '20%', columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
}

export const TELEGRAM_GROUP_COLUMNS = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: '90%', show: true, disableFilters: true },
    { Header: 'Id Chat', accessor: 'id_chat', minWidth: '20%', show: true, disableFilters: true },
    { Header: 'Bot', accessor: 'bot_name', minWidth: '20%', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const FASOP_KINERJA_SCADA = () => {
  return [
    { Header: 'Tahun', accessor: 'tahun', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Target', accessor: 'nama_pointtype', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Nama Unit', accessor: 'nama_unit', minWidth: '100px', show: true, disableFilters: true },
    { Header: 'Jan', accessor: 't_01', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Feb', accessor: 't_02', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Mar', accessor: 't_03', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Apr', accessor: 't_04', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Mei', accessor: 't_05', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Jun', accessor: 't_06', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Jul', accessor: 't_07', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Agu', accessor: 't_08', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Sep', accessor: 't_09', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Okt', accessor: 't_10', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Nov', accessor: 't_11', minWidth: '80px', show: true, disableFilters: true },
    { Header: 'Des', accessor: 't_12', minWidth: '80px', show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ]
}

export const API_WA_GATEWAY_COLUMN = () => {
  return {
    datafields: [
      { name: 'groupId', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'contacts', type: 'number' },
      { name: 'created_at', type: 'string' },
    ],
    columns: [
      { text: 'Group ID', datafield: 'groupId', width: '15%', },
      { text: 'Name Group', datafield: 'name', width: '70%', },
      // { text: 'Contacts', datafield: 'contacts', width: '50%', },
      { text: 'Created At', datafield: 'datum', width: '15%' },
    ],
  };
};


export const API_TEL_GATEWAY_COLUMN = () => {
  return {
    datafields: [
      { name: 'groupId', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'contacts', type: 'number' },
      { name: 'created_at', type: 'string' },
    ],
    columns: [
      { text: 'GroupId', datafield: 'groupId', width: '15%', },
      { text: 'Name Group', datafield: 'name', width: '20%', },
      { text: 'Contacts', datafield: 'contacts', width: '50%', },
      { text: 'Created_at', datafield: 'created_at', width: '15%' },
    ],
  };
};