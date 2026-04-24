export const REKAP_OOP_SAAT_INI_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jumlah', accessor: 'jumlah', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const REKAP_OOP_SAAT_INI_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'jumlah', type: 'number' },
      
    ],
    columns: [
      { text: 'No', datafield: 'id', width: 50, editable: false },
      { text: 'Nama', datafield: 'nama', width: 300, editable: false, },
      { text: 'Jumlah', datafield: 'number', width: 70, editable: false, },
    ],
  };
};



export const MASTER_COLUMNS_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'nama', type: 'string' },
      { name: 'group', type: 'number' },
      { name: 'status', type: 'number' },
      { name: 'tgl_terakhir', type: 'number' },
      { name: 'durasi', type: 'number' },
      
    ],
    columns: [
      { text: 'No', datafield: 'id', width: 50, editable: false },
      { text: 'Nama', datafield: 'nama', width: 300, editable: false, },
      { text: 'Group', datafield: 'group', width: 70, editable: false, },
      { text: 'Status', datafield: 'status', width: 70, editable: false, },
      { text: 'Tgl Terakhir', datafield: 'tgl_terakhir', width: 70, editable: false, },
      { text: 'Durasi (Menit)', datafield: 'durasi', width: 70, editable: false, },
    ],
  };
};



export const REKAP_OOP_HARIAN_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OOP - 08:00', accessor: 'oop_08', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'OOP - 016:00', accessor: 'oop_16', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Selisih', accessor: 'selisih', minWidth: '150px', disableFilters: true, show: true },
  ]
}

const STATUS_TGL_BERAKHIR_DURASI = () => [
  { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  { Header: 'Tgl Terakhir', accessor: 'tgl_terakhir', minWidth: '150px', disableFilters: true, show: true },
  { Header: 'Durasi (Menit)', accessor: 'durasi', minWidth: '150px', disableFilters: true, show: true },
]

export const MASTER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Group', accessor: 'group', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const NETWORK_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Network', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Point', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Group', accessor: 'group', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const GARDU_INDUK_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Induk', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gateway', accessor: 'gateway', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const PENYULANG_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1', accessor: 'b1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3', accessor: 'b3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const GARDU_HUBUNG_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu Hubung', accessor: 'gh', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gateway', accessor: 'gateway', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const RECLOSER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RCL', accessor: 'rcl', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'UP3', accessor: 'area', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const LBS_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '150px', disableFilters: true, show: true },
    ...STATUS_TGL_BERAKHIR_DURASI()
  ]
}

export const MESSAGE_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Tanggal', accessor: 'tanggal', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1text', accessor: 'b1text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B2text', accessor: 'b2text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3text', accessor: 'b3text', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Elementtext', accessor: 'elementtext', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Value', accessor: 'value', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Msgstatus', accessor: 'msgstatus', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_DIGITAL_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis Point', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B1', accessor: 'b1', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B2', accessor: 'b2', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'B3', accessor: 'b3', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Element', accessor: 'element', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Info', accessor: 'info', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'datetime', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_RTU_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis RTU', accessor: 'jenis_rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'RTU', accessor: 'rtu', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'last_update', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const STATUS_MASATER_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Jenis', accessor: 'jenis', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu', accessor: 'last_update', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status', accessor: 'status', minWidth: '150px', disableFilters: true, show: true },
  ]
}

export const UFR_COLUMNS = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu UFR', accessor: 'datetime_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Posisi UFR', accessor: 'posisi_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status UFR', accessor: 'status_ufr', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu CB', accessor: 'datetime_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Posisi CB', accessor: 'posisi_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Status CB', accessor: 'status_cb', minWidth: '150px', disableFilters: true, show: true },
    { Header: 'Waktu Beban', accessor: 'datetime_beban', minWidth: '180px', disableFilters: true, show: true },
    { Header: 'Beban (MW)', accessor: 'beban', minWidth: '150px', disableFilters: true, show: true },
  ]
}


export const SCADATEL_STATUS_TELESIGNAL_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },
      { name: 'nama_dcc', type: 'string' },
      { name: 'nama_up3', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'DCC', datafield: 'nama_dcc', width: '10%', editable: false, },
      { text: 'UP3', datafield: 'nama_up3', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '6%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '6%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Tanggal', datafield: 'datum_2', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row:any, column:any, value:any) {
            if (value === 'INVALID') {
                return '<div style="background-color: red; color: white;">' + value + '</div>';
            } else {
                return '<div style="background-color: green; color: white;">' + value + '</div>';
            }
        }
      },
    ],
  };
};

export const SCADATEL_STATUS_TELEMETERING_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'datum_capture', type: 'string' },
      { name: 'kesimpulan', type: 'string' },
      { name: 'nama_dcc', type: 'string' },
      { name: 'nama_up3', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'DCC', datafield: 'nama_dcc', width: '10%', editable: false, },
      { text: 'UP3', datafield: 'nama_up3', width: '10%', editable: false, },
      { text: 'Tipe Point', datafield: 'nama_pointtype', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '6%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '6%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Tanggal', datafield: 'datum_2', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row:any, column:any, value:any) {
            if (value === 'INVALID') {
                return '<div style="background-color: red; color: white;">' + value + '</div>';
            } else {
                return '<div style="background-color: green; color: white;">' + value + '</div>';
            }
        }
      },

    ],
  };
};


export const SCADATEL_STATUS_SOE_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'time_stamp', type: 'string' },
      { name: 'system_time_stamp', type: 'string' },
      { name: 'msec', type: 'string' },
      { name: 'message_text', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: "Time Stamp RTU", datafield: 'time_stamp', width: '13%', editable: false, },
      { text: "Time Stamp MASTER", datafield: 'system_time_stamp', width: '13%', editable: false, },
    
      {
        text: 'Messages',
        datafield: 'message_text',
        width: '77%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any) {
            // Convert value to lowercase to handle case-insensitivity
            const lowerCaseValue = value.toLowerCase();
            
            // Check for 'failed' or 'app' in the lowercased value
            if (lowerCaseValue.includes('failed') || lowerCaseValue.includes('app')) {
                return '<div style="color: red;">' + value + '</div>';
            } 
        }
      },
      
      
      

    ],
  };
};
export const SCADATEL_STATUS_TELEMETERING_5m_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'value', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      // { text: 'Tanggal', datafield: 'tanggal', width: '10%', editable: false, },
      // { text: 'Value', datafield: 'msec_akhir', width: '10%', editable: false, },

    ],
  };
};
export const SCADATEL_STATUS_TELEMETERING_5m_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'value', type: 'string' },

    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%',  },
      { label: 'Point Number', dataField: 'point_number', width: '17%',  },
      { label: 'B1', dataField: 'path1', width: '17%',  },
      { label: 'B2', dataField: 'path2', width: '17%',  },
      { label: 'B3', dataField: 'path3', width: '17%',  },
      { label: 'Element', dataField: 'path4', width: '14%',  },
      { label: 'Info', dataField: 'path5', width: '10%',  },
      // { label: 'Tanggal', dataField: 'tanggal', width: '10%',  },
      // { label: 'Value', dataField: 'msec_akhir', width: '10%',  },

    ],
  };
};
export const SCADATEL_STATUS_TELEMETERING_30m_COLUMN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'value', type: 'string' },

    ],
    columns: [
      { label: 'NO', dataField: 'number', width: '3%',  },
      { label: 'Point Number', dataField: 'point_number', width: '17%',  },
      { label: 'B1', dataField: 'path1', width: '17%',  },
      { label: 'B2', dataField: 'path2', width: '17%',  },
      { label: 'B3', dataField: 'path3', width: '17%',  },
      { label: 'Element', dataField: 'path4', width: '14%',  },
      { label: 'Info', dataField: 'path5', width: '10%',  },
      // { label: 'Tanggal', dataField: 'tanggal', width: '10%',  },
      // { label: 'Value', dataField: 'msec_akhir', width: '10%',  },

    ],
  };
};
export const SCADATEL_STATUS_TELEMETERING_30m_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'tanggal', type: 'string' },
      { name: 'msec_akhir', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '10%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '10%', editable: false, },
      // { text: 'Tanggal', datafield: 'tanggal', width: '10%', editable: false, },
      // { text: 'Value', datafield: 'msec_akhir', width: '10%', editable: false, },

    ],
  };
};


// export const SCADATEL_STATUS_TELEMETERING_COLUMN_JQX = () => {
//   const data = [
//     {
//       number: 1,
//       point_number: 'PN001',
//       path1: 'B1-001',
//       path2: 'B2-001',
//       path3: 'B3-001',
//       path4: 'Element-001',
//       path5: 'Info-001',
//       status_2: 'Active',
//       value: '100',
//       datum_capture: '2024-07-12 10:00:00'
//     },
//     {
//       number: 2,
//       point_number: 'PN002',
//       path1: 'B1-002',
//       path2: 'B2-002',
//       path3: 'B3-002',
//       path4: 'Element-002',
//       path5: 'Info-002',
//       status_2: 'Inactive',
//       value: '200',
//       datum_capture: '2024-07-12 11:00:00'
//     },
//     {
//       number: 3,
//       point_number: 'PN003',
//       path1: 'B1-003',
//       path2: 'B2-003',
//       path3: 'B3-003',
//       path4: 'Element-003',
//       path5: 'Info-003',
//       status_2: 'Active',
//       value: '300',
//       datum_capture: '2024-07-12 12:00:00'
//     },
//     {
//       number: 4,
//       point_number: 'PN004',
//       path1: 'B1-004',
//       path2: 'B2-004',
//       path3: 'B3-004',
//       path4: 'Element-004',
//       path5: 'Info-004',
//       status_2: 'Inactive',
//       value: '400',
//       datum_capture: '2024-07-12 13:00:00'
//     },
//     {
//       number: 5,
//       point_number: 'PN005',
//       path1: 'B1-005',
//       path2: 'B2-005',
//       path3: 'B3-005',
//       path4: 'Element-005',
//       path5: 'Info-005',
//       status_2: 'Active',
//       value: '500',
//       datum_capture: '2024-07-12 14:00:00'
//     },
//   ];

//   return {
//     datafields: [
//       { name: 'number', type: 'number' },
//       { name: 'point_number', type: 'string' },
//       { name: 'path1', type: 'string' },
//       { name: 'path2', type: 'string' },
//       { name: 'path3', type: 'string' },
//       { name: 'path4', type: 'string' },
//       { name: 'path5', type: 'string' },
//       { name: 'status_2', type: 'string' },
//       { name: 'value', type: 'string' },
//       { name: 'datum_capture', type: 'string' },
//     ],
//     columns: [
//       { text: 'NO', datafield: 'number', width: '3%', editable: false },
//       { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false },
//       { text: 'B1', datafield: 'path1', width: '10%', editable: false },
//       { text: 'B2', datafield: 'path2', width: '10%', editable: false },
//       { text: 'B3', datafield: 'path3', width: '10%', editable: false },
//       { text: 'Element', datafield: 'path4', width: '10%', editable: false },
//       { text: 'Info', datafield: 'path5', width: '10%', editable: false },
//       { text: 'Status', datafield: 'status_2', width: '10%', editable: false },
//       { text: 'Value', datafield: 'value', width: '10%', editable: false },
//       { text: 'Last Update', datafield: 'datum_capture', width: '10%', editable: false },
//     ],
//     localdata: data
//   };
// };



export const SCADATEL_STATUS_RTU_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'nama_pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },
      { name: 'nama_dcc', type: 'string' },
      { name: 'nama_up3', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '5%', editable: false, },
      { text: 'RTU', datafield: 'nama_pointtype', width: '30%', editable: false, },
      {
        text: 'Status',
        datafield: 'kesimpulan',
        width: '9%',
        editable: false,
    
        cellClassName: function (row: any, column: any, value: any) {
          if (value === 'INVALID') {
              return 'red-background'; // Kelas CSS untuk GAGAL
          } else if (value === 'VALID') {
              return 'green-background'; // Kelas CSS untuk BERHASIL
          } 
          return ''; // Default tanpa class tambahan
      }
      },
      { text: 'Tanggal', datafield: 'datum_2', width: '33%', editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: '23%', editable: false, },
    ],
  };
};


export const SCADATEL_STATUS_MASTER_STATION_COLUMN_JQX = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'point_number', type: 'string' },
      { name: 'pointtype', type: 'string' },
      { name: 'path1', type: 'string' },
      { name: 'path2', type: 'string' },
      { name: 'path3', type: 'string' },
      { name: 'path4', type: 'string' },
      { name: 'path5', type: 'string' },
      { name: 'status_2', type: 'string' },
      { name: 'datum_2', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'durasi', type: 'string' },
      { name: 'kesimpulan', type: 'string' },

    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, },
      { text: 'Point Number', datafield: 'point_number', width: '17%', editable: false, },
      { text: 'Tipe Point', datafield: 'pointtype', width: '17%', editable: false, },
      { text: 'B1', datafield: 'path1', width: '10%', editable: false, },
      { text: 'B2', datafield: 'path2', width: '10%', editable: false, },
      { text: 'B3', datafield: 'path3', width: '10%', editable: false, },
      { text: 'Element', datafield: 'path4', width: '6%', editable: false, },
      { text: 'Info', datafield: 'path5', width: '6%', editable: false, },
      { text: 'Value', datafield: 'value', width: '10%', editable: false, },
      { text: 'Tanggal', datafield: 'datum_2', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_2', width: '10%', editable: false, },
      { text: 'Durasi', datafield: 'durasi', width: '10%', editable: false, },
      {
        text: 'Kesimpulan',
        datafield: 'kesimpulan',
        width: '7%',
        editable: false,
        cellsRenderer: function (row:any, column:any, value:any) {
            if (value === 'INVALID') {
                return '<div style="background-color: red; color: white;">' + value + '</div>';
            } else {
                return '<div style="background-color: green; color: white;">' + value + '</div>';
            }
        }
      },

    ],
  };
};