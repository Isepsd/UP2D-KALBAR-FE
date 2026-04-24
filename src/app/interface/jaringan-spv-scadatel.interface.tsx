import moment from 'moment';
// ASET STATUS
interface IFasopApproveWO {
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
  id_trans_drafting_wo?:any
  id_ref_bagian?:any
  tgl_wo?:any
  tgl_mulai_wo?:any
  id_user?:any
  id_user_updated?:any
  tgl_approve_spv_scada?:any
  nama_gi?:any
  id_modules?:any
  id_ref_lokasi_gi?:any
  fullname?:any
  uraian_wo?:any
  tgl_posting_wo?:any
  id_spv_scada?:any
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
  approve_spv_scada?:any
}

export const IFasopApproveWOField = {
 approve_spv_scada: null,
 progres:null,
 tgl_approve_spv_scada:moment().format("YYYY-MM-DD"),
 id_spv_scada:null,
 
};



export type { IFasopApproveWO };
