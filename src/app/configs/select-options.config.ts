export const OPTIONS_UNIT_TIME = [
  { label: 'Minute', value: 'minute' },
  { label: 'Hour', value: 'hour' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
];


export const OPTIONS_STATUS_JARINGAN = () => {
  return [
    {
      label: "BERBEBAN",
      value: "BERBEBAN"
    },
    {
      label: "EXPRESS",
      value: "EXPRESS"
    },
    {
      label: "EXPRESS BERBEBAN",
      value: "EXPRESS BERBEBAN"
    },
    {
      label: "PEMBANGKIT",
      value: "PEMBANGKIT"
    },
    {
      label: "SPOTILOAD",
      value: "SPOTILOAD"
    },
    {
      label: "DOUBLE CIRCUIT",
      value: "DOUBLE CIRCUIT"
    }
  ]
}

export const OPTIONS_JENIS_JARINGAN = () => {
  return [
    {
      label: "CAMPURAN",
      value: "CAMPURAN"
    },
    {
      label: "SKTM",
      value: "SKTM"
    },
    {
      label: "SUTM",
      value: "SUTM"
    }
  ]
}

export const OPTIONS_LAYOUT = () => {
  return [
    {
      label: "Lembang",
      value: "lembang"
    }
  ]
}
export const OPTIONS_THEME_MODE = () => {
  return [
    {
      label: "Light",
      value: "light"
    },
    {
      label: "Dark",
      value: "dark"
    }
  ]
}

export const OPTIONS_COLOR_SCHEME = () => {
  return [
    {
      label: "Enamel blue",
      value: "enamel-blue"
    },
    {
      label: "Red",
      value: "red-power"
    },
    {
      label: "Yellow",
      value: "yellow-butter"
    }
  ]
}

export const OPTIONS_DISPLAY_SCALE = () => {
  return [
    {
      label: "mini",
      value: "mini"
    },
    {
      label: "Tiny",
      value: "tiny"
    },
    {
      label: "Small",
      value: "small"
    },
    {
      label: "Medium",
      value: "medium"
    },
    {
      label: "Large",
      value: "large"
    },
    {
      label: "Big",
      value: "big"
    },
    {
      label: "huge",
      value: "huge"
    },
    {
      label: "massive",
      value: "massive"
    }
  ]
}

export const KONEKSI_KE_ALAT = () => {
  return [
    {
      label: "SERIAL",
      value: "SERIAL"
    }, {
      label: "TCI/IP",
      value: "TCI/IP"
    }
  ]
}
export const SERIAL_PORT = () => {
  return [
    {
      label: "CM05",
      value: "CM05"
    },
  ]
}
export const SERIAL_PARITY = () => {
  return [
    {
      label: "NONE",
      value: "NONE"
    },
  ]
}
export const SERIAL_BAUT_RATE = () => {
  return [
    {
      label: "9600",
      value: "9600"
    },
  ]
}
export const SERIAL_MODE = () => {
  return [
    {
      label: "INT",
      value: "INT"
    },
    {
      label: "FLOAT",
      value: "FLOAT"
    },
  ]
}
export const SERIAL_RTS = () => {
  return [
    {
      label: "RTU ENABLE",
      value: 1
    },
  ]
}
export const SERIAL_STOP_BITS = () => {
  return [
    {
      label: "ONE",
      value: 1
    },
  ]
}

export const SELECT_UFR = () => {
  return [
    {
      label: "1",
      value: "1"
    },
    {
      label: "2",
      value: "2"
    },
    {
      label: "3",
      value: "3"
    },
    {
      label: "4",
      value: "4"
    },
    {
      label: "5",
      value: "5"
    },
    {
      label: "6",
      value: "6"
    },
    {
      label: "7",
      value: "7"
    },
    {
      label: "8",
      value: "8"
    },
    {
      label: "9",
      value: "9"
    },
    {
      label: "10",
      value: "10"
    },
  ]
}

export const OPTIONS_OBJECT_PEMELIHARAAN = () => ([
  { label: 'Gardu Hubung', value: 'gh' },
  { label: 'Gardu Induk', value: 'gi' },
  { label: 'KP', value: 'kp' },
]);
export const OPTIONS_PRIORITAS = () => ([
  { label: 'HIGH', value: 'high' },
  { label: 'NORMAL', value: 'normal' },
  { label: 'LOW', value: 'low' },
]);
export const OPTIONS_SIFAT_PEMELIHARAAN = () => ([
  { label: 'RUTIN', value: 'rutin' },
  { label: 'NON RUTIN', value: 'non_rutin' },
  { label: 'EMERGENCY', value: 'emergency' },
  { label: 'KONSTRUKSI', value: 'konstruksi' },
]);
export const OPTIONS_LEVEL_PEMELIHARAAN = () => ([
  { label: '1', value: '1' },
]);
export const OPTIONS_KONDISI_PEKERJAAN = () => ([
  { label: 'PADAM', value: 'padam' },
  { label: 'TANPA PADAM', value: 'tanpa padam' },
]);
export const SELECT_JENIS_PADAM = () => {
  return [
    {
      label: "TERENCANA",
      value: "TERENCANA"
    },
    {
      label: "TIDAK TERENCANA",
      value: "TIDAK TERENCANA"
    },
  ]
}

export const SELECT_ZONA = () => {
  return [
    {
      label: "ZONA 1",
      value: "ZONA 1"
    },
    {
      label: "ZONA 2",
      value: "ZONA 2"
    },
  ]
}

export const SELECT_GANGGUAN = () => {
  return [
    {
      label: "Draft",
      value: "Draft"
    },
    {
      label: "Proses Kirim Ke MCC",
      value: "Proses Kirim Ke MCC"
    },
    {
      label: "Proses Penugasan Regu",
      value: "Proses Penugasan Regu"
    },
    {
      label: "Selesai",
      value: "Selesai"
    },
  ]
}


export const SELECT_PRIORITAS = () => {
  return [
    {
      label: "High",
      value: "High"
    },

    {
      label: "Normal",
      value: "Normal"
    },

    {
      label: "Low",
      value: "Low"
    },

  ]
}
export const SELECT_BULAN = () => {
  return [
    {
      label: "Januari",
      value: 1
    },

    {
      label: "Februari",
      value: 2
    },

    {
      label: "Maret",
      value: 3
    },
    {
      label: "April",
      value: 4
    },

    {
      label: "Mei",
      value: 5
    },

    {
      label: "Juni",
      value: 6
    },
    {
      label: "Juli",
      value: 7
    },

    {
      label: "Agustus",
      value: 8
    },

    {
      label: "Sepetember",
      value: 9
    },
    {
      label: "Oktober",
      value: 10
    },

    {
      label: "November",
      value: 11
    },

    {
      label: "Desember",
      value: 12
    },

  ]
}