import moment from 'moment';
// ASET STATUS
interface IFasopNoWO {
  penyulang_id?:any;
  jam_masuk_verifikasi?:any;
  status?:any;
  no_wo?:any
  get_nowo?:any
  posting_wo?:any
  st_mulai_wo?:any
  id_parent_lokasi?:any
  id_penyulang?:any
  nama_kegiatan?:any
  progres?:string
  id_user_created?:any
  id_ref_kegiatan?:any
  id_user_selesai_wo?:any
  id_trans_drafting_wo?:any
  id_ref_bagian?:any
  approve_spv_scada?:any
  approve_spv_data?:any
  approve_spv_opsis?:any
  tgl_wo?:any
  tgl_mulai_wo?:any
  tgl_selesai_wo?:any
  id_user?:any
  id_user_updated?:any
  nama_gi?:any
  id_modules?:any
  id_ref_lokasi_gi?:any
  fullname?:any
  uraian_wo?:any
  tgl_posting_wo?:any
  id_user_mulai_wo?:any
  id_ref_lokasi_up3?:any
  id_bidang?:any
  nama_bidang?:any
  foto_sebelum?:string
  foto_sesudah?:string
  peralatan?:any
  nama_peralatan?:any
  jns_peralatan?:any
  id_ref_lokasi_peralatan?:any
  st_selesai_wo?:any
}

export const IFasopNoWOField = {
  penyulang_id:null,
  jam_masuk_verifikasi:null,
  status:null,
  get_nowo: null,
  posting_wo: '0',
  st_mulai_wo: null,
  st_selesai_wo: null,
  no_wo: null,
  id_trans_drafting_wo: null,
  nama_kegiatan: null,
  id_ref_lokasi_up3: null,
  foto_sebelum: null,
  id_user_mulai_wo: null,
  foto_sesudah: null,
  id_ref_bagian: null,
  id_ref_kegiatan: null,
  id_ref_lokasi_peralatan: null,
  id_bidang: null,
  progres: null,
  nama_bidang: null,
  id_user_created: null,
  peralatan: null,
  id_user_selesai_wo: null,
  nama_peralatan: null,
  id_user_updated: null,
  nama_gi: null,
  id_ref_lokasi_gi: null,
  id_parent_lokasi: null,
  id_user: null,
  uraian_wo: null,
  fullname: null,
  jns_peralatan: null,
  id_penyulang: null,
  approve_spv_scada:null,
  approve_spv_data:null,
  approve_spv_opsis:null,
  tgl_wo: moment().format("YYYY-MM-DD"),
  tgl_posting_wo: moment().format("YYYY-MM-DD"),
  tgl_mulai_wo: moment().format("YYYY-MM-DD"),
  tgl_selesai_wo: moment().format("YYYY-MM-DD"),
 
};



export type { IFasopNoWO };
