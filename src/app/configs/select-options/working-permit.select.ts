const PELUANG_OPTIONS: any = [
  { value: 'A', label: 'A = Hampir pasti akan terjadi/almost certain' },
  { value: 'B', label: 'B = Cenderung untuk terjadi/likely' },
  { value: 'C', label: 'C = Mungkin dapat terjadi' },
  { value: 'D', label: 'D = Kecil kemungkinan terjadi/unlikely' },
  { value: 'E', label: 'E = Jarang terjadi/rare' },
];

const AKIBAT_OPTIONS: any = [
  { value: '1', label: '1. Tidak ada cedera, kerugian materi kecil' },
  { value: '2', label: '2. Cedera ringan/P3K, kerugian materi sedang' },
  { value: '3', label: '3. Cedera, kerugian cukup besar' },
  { value: '4', label: '4. Cacat, kerugian materi besar' },
  { value: '5', label: '5. Kematian, kerugian materi sangat besar' },
];

const JENIS_PEKERJAAN_OPTIONS: any = [
  { value: 'INTERNAL', label: 'INTERNAL' },
  { value: 'EXTERNAL', label: 'EXTERNAL' },
];
const KOODINASI_PROTEKSI_OPTIONS: any = [
  { value: 'KP >> KP', label: 'KP >> KP' },
  { value: 'KP >> GH', label: 'KP >> GH' },
  { value: 'KP >> KOPEL GH', label: 'KP >> KOPEL GH' },
  { value: 'KP >> INC GH', label: 'KP >> INC GH' },
  { value: 'KP >> GI', label: 'KP >> GI' },
  { value: 'GH >> KP', label: 'GH >> KP' },
  { value: 'GH >> KOPEL GH', label: 'GH >> KOPEL GH' },
  { value: 'GH >> INC GH', label: 'GH >> INC GH' },
  { value: 'GH >> GI', label: 'GH >> GI' },
  { value: 'GI >> KOPEL GI ', label: 'GI >> KOPEL GI ' },
  { value: 'GI >> INC GI', label: 'GI >> INC GI' },
];

export { PELUANG_OPTIONS, AKIBAT_OPTIONS, JENIS_PEKERJAAN_OPTIONS, KOODINASI_PROTEKSI_OPTIONS };
