interface IPertanyaanRQC {
  id_pertanyaan_qrc: number,
  pertanyaan_qrc: string,
  pertanyaan_qrc_point: number,
  number: number,
}

interface ILaranganTanggungJawabRQC {
  id_larangan_tanggung_jawab_mitra: number,
  uraian: string,
  number: number,
}

interface IRiskPointRQC {
  low_risk_point_min: number,
  low_risk_point_max: number,
  medium_risk_point_min: number,
  medium_risk_point_max: number,
  high_risk_point: number
  number: number,
}

interface IApprovalManagementWp {
  id_jabatan: number,
  id_user: number,
  id_departemen: number,
  jabatan: any,
  user: any,
  departemen: any,
  nama_pegawai: string,
  nama_jabatan: string,
  nama_departemen: string
  number: number,
}

interface IWpMasterBagian {
  id_wp_master_bagian: number,
  name: string
}

export const FWpMasterBagian = {
  id_wp_master_bagian: undefined,
  name: ''
}

export const FPertanyaanRQC = {
  id_pertanyaan_qrc: null,
  pertanyaan_qrc: '',
  pertanyaan_qrc_point: 0
}

export const FLaranganTanggungJawabRQC = {
  id_larangan_tanggung_jawab_mitra: null,
  uraian: ''
}

export const FRiskPointRQC = ['low_risk_point_min', 'low_risk_point_max', 'medium_risk_point_min', 'medium_risk_point_max', 'high_risk_point']

export const FApprovalManagementWp = {
  id_approval_management_wp: null,
  id_user: null,
  id_jabatan: null,
  id_departemen: null
}

export type { IPertanyaanRQC, ILaranganTanggungJawabRQC, IRiskPointRQC, IApprovalManagementWp, IWpMasterBagian }