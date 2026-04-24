// OPSISDIS SLD
interface IOpsisdisSLD {
  id_daf_sld_gi: number;
  nama_file: string;
  kelompok: string;
  keterangan: string;
  tgl_upload: string;
  id_gardu_induk: string;
  gardu_induk: any;
}

export const OpsisdisSLDField = {
  id_daf_sld_gi: undefined,
  nama_file: '',
  kelompok: '',
  keterangan: '',
  id_gardu_induk: null,
};

export type { IOpsisdisSLD };
