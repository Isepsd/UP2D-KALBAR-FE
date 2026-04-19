interface IPengukuranBebanUpload {
  // datum_date?: any;
  id_parent_lokasi?: number;
  id_lokasi?: number;
  id_user_entri?: number;
}
/** YANG DI PAKE DI FORM */
export const PengukuranBebanUploadField: any = {
  // datum_date: "",
  id_parent_lokasi: null,
  id_lokasi: null,
  id_user_entri: 0,
  file: null
};

export type { IPengukuranBebanUpload };