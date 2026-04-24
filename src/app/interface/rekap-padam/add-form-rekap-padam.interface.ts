interface IInputRekapPadam {
  no_apkt: string,
  jam_padam: string,  // 2022-08-26T08:39:45.259Z
  id_ref_indikasi: string,  //Ref Ep Indikasi API
  beban_padam: string,
  penyebab: string,
  jenis_padam: string,
  r: string,
  s: string,
  t: string,
  n: string,
  fai_arus_ggn_hmi: string,
  keterangan: string,
  lbs_manual: string,
  jenis_peralatan: string,
  id_keypoint: string, // peralatan - belum pasti
  id_up3: string,
  id_ulp: string,
  jlh_gardu_padam: string,
  pelanggan_tm: string,
  pelanggan_vip: string,
  wilayah_padam: string, // from alamat ref lokasi
  id_ref_ep_cuaca: string, // Ref ep cuaca
}

export const AddRekapPadamField = {
  no_apkt: null,
  beban_padam: null,
  id_ref_ep_ag_hmi: null,
  id_ref_ep_indikasi: null,
  id_keypoint: null,
  jenis_padam: null,
  jenis_peralatan: null,
  penyebab: null,
  r: null,
  s: null,
  t: null,
  n: null,
  id_ref_ep_cuaca: null,
  gangguan_padam: null,
  keterangan: null,
  lbs_manual: null,
  jenis_keypoint: null,
  nama_lokasi: null,
  id_ref_lokasi: null,
};


export type { IInputRekapPadam };