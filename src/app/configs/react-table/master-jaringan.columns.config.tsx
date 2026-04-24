import { SelectColumnFilter } from "@app/components/ReactTable/ReactTableFilter"
import React from "react"
import { ACTION_COLUMN, NO } from "./_more.columns.config"

export const GI_COLUMNS = () => {
  return [
    { Header: 'Nama Gardu Induk', accessor: 'nama', show: true },
    { Header: 'Alamat', accessor: 'alamat', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', show: true },
    { Header: 'UP3', accessor: 'up3', show: true },
    { Header: 'ULP', accessor: 'ulp', show: true }
  ]
}

export const ZONE_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Nama Zona', accessor: 'nama_zona', minWidth: '150px', show: true },
    { Header: 'Alamat Zona', accessor: 'alamat_zona', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const SECTION_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Section', accessor: 'kode_section', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const SEGMENT_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Segment', accessor: 'kode_segment', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Kode Zona', accessor: 'kode_zona', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Kode Section', accessor: 'kode_section', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const TRAFO_GI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Trafo', accessor: 'kode_trafo', minWidth: '120px', show: true },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '120px', show: true },
    { Header: 'Kode GI', accessor: 'kode_gi', minWidth: '120px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '120px', show: true },
    { Header: 'Alamat Trafo', accessor: 'alamat_trafo', minWidth: '120px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '120px', show: true },
    { Header: 'PHASE', accessor: 'phase', minWidth: '120px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const GARDU_DISTRIBUSI_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'No Gardu Dist', accessor: 'no_gardu_dist', minWidth: '150px', show: true },
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelamggan', minWidth: '150px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Jumlah Jurusan', accessor: 'jumlah_jurusan', minWidth: '150px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const TRAFO_GD_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Trafo', accessor: 'kode_trafo', minWidth: '150px', show: true },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '150px', show: true },
    { Header: 'Kode GI', accessor: 'kode_gi', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Alamat Trafo', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Jenis Trafo', accessor: 'jenis_trafo', minWidth: '150px', show: true },
    { Header: 'PHASE', accessor: 'phase', minWidth: '150px', show: true },
    { Header: 'Total Daya (KVA)', accessor: 'total_daya', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true }
  ]
}

export const PENYULANG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Kode Feeder', accessor: 'kode_feeder', minWidth: '150px', show: true },
    { Header: 'Nama Feeder', accessor: 'nama_feeder', minWidth: '150px', show: true },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '150px', show: true },
    { Header: 'Kode Gardu Induk', accessor: 'kode_gi', minWidth: '150px', show: true },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '150px', show: true },
    { Header: 'UP3', accessor: 'up3', minWidth: '170px', show: true },
    { Header: 'ULP', accessor: 'ulp', minWidth: '170px', show: true },
    { Header: 'Terakhir Update', accessor: 'last_update', minWidth: '150px', show: true },
  ]
}

export const GARDU_HUBUNG_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'No Aset', accessor: 'no_aset', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Gardu', accessor: 'gardu', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Fungsi Gardu', accessor: 'fungsi_gardu', minWidth: '150px', show: true },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true },
    { Header: 'GI', accessor: 'gi', minWidth: '150px', show: true },
    { Header: 'Feeder', accessor: 'feeder', minWidth: '170px', show: true },
    { Header: 'Zone', accessor: 'zone', minWidth: '170px', show: true },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true },
    ...ACTION_COLUMN(),
  ]
}

export const UNIT_PEMBANGKIT = () => {
  return [
    ...NO(),
    { Header: 'Nama Unit Pembangkit', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false },
    { Header: 'Tree Jaringan', accessor: 'tree_jaringan', minWidth: '100px', show: true, disableFilters: false },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false },
    ...ACTION_COLUMN(),
  ]
}

export const PEMBANGKIT_COLUMNS = () => {
  return [
    ...NO(),
    { Header: 'Nama Pembangkit', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    // { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Unit Pembangkit', accessor: 'parent_lokasi', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}

export const GARDU_INDUK = () => {
  return [
    ...NO(),
    { Header: 'Kode Gardu Induk', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: false },
      { Header: 'Kode SSOT', accessor: 'ssot_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Nama Gardu Induk', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis GI', accessor: 'jenis_gi', minWidth: '100px', show: true, disableFilters: false },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '130px', show: true, disableFilters: false },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, disableFilters: false }, // , Filter: SelectColumnFilter, filterOutside: true, filterType: 'unit-pembangkit'
    { Header: 'Pembangkit', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'UP2B', accessor: 'up2b', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false },
    ...ACTION_COLUMN(),
  ]
}
export const TRAFO_GI = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
       { Header: 'Kode SSOT', accessor: 'ssot_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Coverage', accessor: 'coverage', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '120px', show: true, disableFilters: false, },
    { Header: 'Kapasitas (MVA)', accessor: 'kapasitas', minWidth: '160px', show: true, disableFilters: false, },
    { Header: 'Sub Sistem', accessor: 'nama_sub_sistem', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Jenis Layanan', accessor: 'jenis_layanan', minWidth: '120px', show: true, disableFilters: false, },
    // { Header: 'I Max', accessor: 'i_max', minWidth: '100px', show: true, disableFilters: false, },
    // { Header: 'Ration CT', accessor: 'ratio_ct', minWidth: '100px', show: true, disableFilters: false, },
    // { Header: 'Ration TV', accessor: 'ratio_vt', minWidth: '100px', show: true, disableFilters: false, },
    // { Header: 'FK Meter', accessor: 'fk_meter', minWidth: '100px', show: true, disableFilters: false, },
    // { Header: 'FK Meter Pembanding', accessor: 'fk_meter_pembanding', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'Primer Tegangan Max', accessor: 'primer_tegangan_max', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'Primer Tegangan min', accessor: 'primer_tegangan_min', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'Sekunder Tegangan max', accessor: 'sekunder_tegangan_max', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'Sekunder Tegangan min', accessor: 'sekunder_tegangan_min', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Teg. Primer (kV)', accessor: 'def_pengukuran_teg_primer', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Teg. Sekunder (kV)', accessor: 'def_pengukuran_teg_sekunder', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'COS PHI', accessor: 'def_nilai_cosq', minWidth: '90px', show: true, disableFilters: false, },
    { Header: 'Sinkron Data', accessor: 'sinkron_data', minWidth: '120px', show: true, disableFilters: false, },

    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },

      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },
    { Header: 'Status Trafo', accessor: 'status_trafo', minWidth: '120px', show: true, disableFilters: false, },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },

    // { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const ZONE = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Penyulang', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Kode Recloser/OG', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Nama Recloser/OG', accessor: 'nama', minWidth: '180px', show: true, disableFilters: false },
    { Header: 'Zona', accessor: 'zona', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Penyulang', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Arus Max (A)', accessor: 'i_max', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Total Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'UP3/UP2D', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const SECTION = () => {
  return [
    ...NO(),
    { Header: 'Nama Section', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: false },

    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Zone', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },

    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },

    { Header: 'Path1', accessor: 'path1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Path2', accessor: 'path2', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Path3', accessor: 'path3', minWidth: '180px', show: true, disableFilters: false, },

    ...ACTION_COLUMN(),
  ]
}
export const SEGMENT = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Kode Gardu', accessor: 'kode_gardu', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Total Daya (kVa)', accessor: 'kva', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    // { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'Pembangkit', accessor: 'pembangkit', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: false },

    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Section', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    // { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    // { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const PENYULANG = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Kode SSOT', accessor: 'ssot_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo/Pembangkit/GH', accessor: 'parent_lokasi', minWidth: '90px', show: true, disableFilters: false },
    { Header: 'Kode Penyulang', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Nama Penyulang', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: false },
    // { Header: 'No Urut Cell', accessor: 'no_urut', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Jenis Penyulang', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Subsistem', accessor: 'sub_sistem', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '180px', show: true, disableFilters: false, },

    { Header: 'Unit Induk', accessor: 'uid', minWidth: '250px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Jumlah Gardu', accessor: 'count_gardu', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'I Max (A)', accessor: 'i_max', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Total Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'DCC', accessor: 'dcc', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '100px', show: true, disableFilters: false, },

    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: false, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID Q(Daya Reactive)', accessor: 'id_q', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },

    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '120px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '50px', show: true, disableFilters: false, },

    ...ACTION_COLUMN(),
  ]
}
export const PENYULANG_MODAL_COLUMN = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true },
    { Header: 'Trafo GI', accessor: 'parent', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Jaringan', accessor: 'jenis_jaringan', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Status Penyulang', accessor: 'status_penyulang', minWidth: '180px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_HUBUNG = () => {
  return [
    ...NO(),
    { Header: 'GI/Penyulang', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Kode Gardu Hubung', accessor: 'kode', minWidth: '200px', show: true, disableFilters: false },
    { Header: 'Nama Gardu Hubung', accessor: 'nama', minWidth: '200px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, }, {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID Q(Daya Reactive)', accessor: 'id_q', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_HUBUNG_DETAIL = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Jenis', accessor: 'id_ref_lokasi_child', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const GARDU_DISTRIBUSI = () => {
  return [
    ...NO(),
    { Header: 'Kode Gardu', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: false },
     { Header: 'Kode SSOT', accessor: 'ssot_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Nama Gardu', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '300px', show: true, disableFilters: false },
    // { Header: 'Coverage', accessor: 'coverage', minWidth: '300px', show: true, disableFilters: false },
    { Header: 'No Tiang', accessor: 'no_tiang', minWidth: '120px', show: true, disableFilters: false, },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '200px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}

export const PENGAMANAN_SUTM = () => {
  return [
    ...NO(),
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Kode KP', accessor: 'kode', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Nama KP', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Fungsi Lokasi', accessor: 'fungsi_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Peralatan', accessor: 'jenis_peralatan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Fungsi SCADA', accessor: 'fungsi_scada', minWidth: '150px', show: true, disableFilters: false },

    { Header: 'Zona', accessor: 'zona', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Gardu', accessor: 'jenis_gardu', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Coverage', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Panjang Jaringan', accessor: 'panjang_jaringan', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Jumlah Pelanggan', accessor: 'jumlah_pelanggan', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Total Daya(kVA)', accessor: 'kva', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '200px', show: true, disableFilters: false },
    { Header: 'UP3/UP2D', accessor: 'up3_1', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Pemilik', accessor: 'pemilik', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Provinsi', accessor: 'provinsi', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'Kab/Kota', accessor: 'kab', minWidth: '200px', show: true, disableFilters: false, },
    { Header: 'Kecamatan', accessor: 'kec', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    {
      Header: 'Mapping SCADA', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID I(Arus)', accessor: 'id_i', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID V(Tegangan)', accessor: 'id_v', minWidth: '140px', show: true, disableFilters: false, },
        { Header: 'ID P(Daya)', accessor: 'id_p', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'ID Q(Daya Reaktif)', accessor: 'id_q', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'Path1', accessor: 'path1', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path2', accessor: 'path2', minWidth: '150px', show: true, disableFilters: false },
        { Header: 'Path3', accessor: 'path3', minWidth: '150px', show: true, disableFilters: false },
      ]
    },
    {
      Header: 'Mapping AMR', accessor: '', minWidth: '150px', show: true, disableFilters: false, columns: [
        { Header: 'ID AMR', accessor: 'id_amr', minWidth: '150px', show: true, disableFilters: false, },

      ]
    },
    {
      Header: 'Mapping Portal External', accessor: '', minWidth: '120px', show: true, disableFilters: false, columns: [
        { Header: 'ID Portal EXT', accessor: 'id_portal_ext', minWidth: '120px', show: true, disableFilters: false, },
        { Header: 'URL Webservice', accessor: 'url_webservice', minWidth: '150px', show: true, disableFilters: false, },
      ]
    },
    { Header: 'Rekon Beban', accessor: 'rekon_beban', minWidth: '120px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}

export const TRAFO_GDISTRIBUSI = () => {
  return [
    ...NO(),
    { Header: 'Nama Trafo GD', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Kode SSOT', accessor: 'ssot_number', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '350px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'KVA', accessor: 'kva', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Phase', accessor: 'phase', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Gardu Induk', accessor: 'gardu_induk', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Trafo GI', accessor: 'trafo_gi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Penyulang', accessor: 'penyulang', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Zone', accessor: 'zone', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Section', accessor: 'section', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Segment', accessor: 'segment', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Gardu Distribusi', accessor: 'parent_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'uid', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp_1', minWidth: '180px', show: true, disableFilters: false, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}
export const KANTOR = () => {
  return [
    ...NO(),
    { Header: 'Nama Kantor', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '350px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Jenis', accessor: 'jenis', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'UPT', accessor: 'id_upt', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'ULTG', accessor: 'id_ultg', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}

export const SUBSISTEM = () => {
  return [
    ...NO(),
    { Header: 'Nama Subsistem', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Status', accessor: 'status', minWidth: '100px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}


export const HEADER_EXTRA_TREE: any = () => {
  return [
    {
      id: "aset",
      accessor: 'nama_lokasi',
      show: true,
      disableFilters: false,
      hideColumn: true,
      minWidth: '300px',
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
        // <span {...getToggleAllRowsExpandedProps()}>
        //   {isAllRowsExpanded ? <i className="bi bi-caret-down-fill"></i> : <i className="bi bi-caret-right"></i>} Aset
        // </span>
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>} Aset
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
            <span> {row.original.nama_lokasi}</span>
          </div>
        ) : <div style={{ paddingLeft: `${(row.depth ? row.depth * 1.55 : 1.65)}rem` }}>{row.original.nama_lokasi}</div>,
    },
    { Header: 'Kode Aset', accessor: 'kode_lokasi', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Aset', accessor: 'jenis_lokasi', minWidth: '180px', show: true, disableFilters: false },
    { Header: 'Fungsi Aset', accessor: 'fungsi_lokasi', minWidth: '180px', show: true, disableFilters: false }
  ]
}

export const TREE_JARINGAN = () => {
  return [
    ...HEADER_EXTRA_TREE(),
    // { Header: 'Kode', accessor: 'kode_lokasi', minWidth: '120px', show: true, disableFilters: false },
    { Header: 'Tiang Gardist', accessor: 'no_tiang', minWidth: 150, show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Coverage', accessor: 'coverage', minWidth: '170px', show: true, disableFilters: false },
    { Header: 'Unit Induk', accessor: 'unit_induk', minWidth: '200px', show: true, disableFilters: false },
    { Header: 'UP3', accessor: 'up31', minWidth: '170px', show: true, disableFilters: false },
    { Header: 'ULP', accessor: 'ulp1', minWidth: '170px', show: true, disableFilters: false },
    ...ACTION_COLUMN(),
  ];
};

export const STATION_OPTIONS_COLUMN = () => {
  return [
    ...NO(),
    { Header: 'Nama', accessor: 'nama', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Jenis Lokasi', accessor: 'ref_jenis_lokasi', minWidth: '200px', show: true, disableFilters: false, },
    { Header: 'Unit Pembangkit', accessor: 'unit_pembangkit', minWidth: '150px', show: true, Filter: SelectColumnFilter, filterOutside: true, filterType: 'unit-pembangkit' },
    { Header: 'Pembangkit', accessor: 'parent', minWidth: '150px', show: true, Filter: SelectColumnFilter, filterOutside: true, filterType: 'pembangkit' },
    { Header: 'latitude', accessor: 'lat', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'longitude', accessor: 'lon', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}


/* MASTER DATA ASET STATUS, LEVEL, KONDISI,RAK */
export const MASTER_DATA_JENIS_PEMBANGKIT = () => {
  return [
    { Header: 'Nama', accessor: 'nama', minWidth: 200, disableFilters: false, show: true },
    ...ACTION_COLUMN(),
  ];
};

export const PELANGGAN_VIP = () => {
  return [
    ...NO(),
    { Header: 'Penyulang/KP', accessor: 'nama_lokasi', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Nama Section', accessor: 'nama_section', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'Nama Pelanggan', accessor: 'nama', minWidth: '250px', show: true, disableFilters: false },
    { Header: 'ID Pelanggan', accessor: 'idpel', minWidth: '150px', show: true, disableFilters: false },
    { Header: 'Alamat', accessor: 'alamat', minWidth: '350px', show: true, disableFilters: false },
    { Header: 'No Kontak', accessor: 'no_kontak', minWidth: '100px', show: true, disableFilters: false },
    { Header: 'Daya Tersambung', accessor: 'daya_tersambung', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'Satuan Daya', accessor: 'satuan_daya_tersambung', minWidth: '100px', show: true, disableFilters: false, },
    { Header: 'ULP', accessor: 'ulp', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'UP3', accessor: 'up3', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'ULTG', accessor: 'ultg', minWidth: '150px', show: true, disableFilters: false, },
    { Header: 'Status', accessor: 'status', minWidth: '150px', show: true, disableFilters: false, },
    ...ACTION_COLUMN(),
  ]
}