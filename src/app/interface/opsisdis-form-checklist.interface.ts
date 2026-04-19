interface IFormChecklist {
  id_ref_pm: any
  nama: string,
  status: 0,
  level_pm: 0,
  id_ref_aset_jenis?: any,
  id_user_entri?: any,
  id_user_update?: any
}

export const IFormChecklistField = {
  id_ref_pm: 0,
  nama: "",
  status: 0,
  level_pm: 0,
  id_ref_aset_jenis: null,
  id_user_entri: null,
  id_user_update: null
};

/** HIRARC DETAIL */
interface IFormChecklistDetail {
  nama: string,
  satuan: string,
  id_induk_ref_pm_detail: number,
  induk: number,
  nilai_acuan: string,
  no_urut: number,
  tipe_data: string,
  nilai_pemeriksaan: string,
  id_ref_pm: number,
  id_user_entri: number,
  id_user_update: number
}

export const IFormChecklistDetailField = {
  nama: "",
  satuan: "",
  id_induk_ref_pm_detail: 0,
  induk: 0,
  nilai_acuan: "",
  no_urut: 0,
  tipe_data: "",
  nilai_pemeriksaan: "",
  id_ref_pm: 0,
  id_user_entri: 0,
  id_user_update: 0
};

/** HIRARC DETAIL */
interface IFormChecklistDetailLogic {
  kesimpulan: string,
  nilai_range: string,
  id_ref_pm_detail: any,
}

export const IFormChecklistDetailLogicField = {
  kesimpulan: "",
  nilai_range: "",
  id_ref_pm_detail: 0,
  id_ref_pm_detail_logic: 0,
};

export type { IFormChecklist, IFormChecklistDetail, IFormChecklistDetailLogic };
