import moment from "moment";
import "moment/locale/id";

export const generateWhatsappText = (data: any, tanggalSubmit: string) => {
  const tanggal = moment(tanggalSubmit).format("DD-MM-YYYY");
  const list = data?.results || [];

  const getStatusIcon = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "SUDAH DILAKSANAKAN":
        return "✅";
      case "BATAL DILAKSANAKAN":
        return "❌";
      case "RENCANA JADWAL PEKERJAAN":
        return "⏰";
      default:
        return "⚠️";
    }
  };

  const getFlisrIcon = (flisr?: string) => {
    switch (flisr?.toUpperCase()) {
      case "AUTO":
        return "🟢";
      case "BELUM":
        return "🟡";
      case "NORMAL":
        return "🔃";
      case "BELUM_NORMAL":
        return "🟣";
      default:
        return "";
    }
  };

  // ===============================
  // FILTER DATA
  // ===============================
  const butuhPadam = list.filter((x: any) => x.butuh_padam === 1 && x.kategori_rotbmh?.toUpperCase() !== "EMERGENCY");
  const tidakPadam = list.filter((x: any) => x.butuh_padam === 0 && x.kategori_rotbmh?.toUpperCase() !== "EMERGENCY");
  const safeValue = (val: any) => {
        if (val === null || val === undefined || val === "") {
            return "-";
        }
        return val;
        };
  // ✅ emergency dipisah dulu
    const emergency = list.filter(
    (x: any) => x.kategori_rotbmh?.toUpperCase() === "EMERGENCY"
    );
     
//   const autoPadam = butuhPadam.filter((x: any) => x.tipe_input === "AUTO");
//   const manualPadam = butuhPadam.filter((x: any) => x.tipe_input === "MANUAL");

  // ===============================
  // HEADER
  // ===============================
  let text = `Ykh Manajemen UID Banten, Manajemen UP, disampaikan jadwal Pekerjaan Terencana Harian
Tgl ${tanggal}

`;

  // ===============================
  // BUTUH PADAM
  // ===============================
  text += `Butuh Gardu Padam :
Kode P Auto :
`;

  if (!butuhPadam.length) {
    text += `Nihil\n`;
  } else {
    butuhPadam.forEach((item: any, i: number) => {
      text += `${i + 1}. ${safeValue(item.kode_p)} / ${item.nama_area} / ${item.jam_pekerjaan} / ${item.nama_penyulang} / ${item.sifat_pekerjaan} / ${safeValue(item.nama_gardu)}${getStatusIcon(item.status_pekerjaan)}${getFlisrIcon(item.flisr)}
`;
    });
  }

  text += `
Kode P Manual :
`;
  // ===============================
  // TIDAK BUTUH PADAM
  // ===============================
  text += `
Tidak Butuh Gardu Padam :
`;

  if (!tidakPadam.length) {
    text += `Nihil\n`;
  } else {
    tidakPadam.forEach((item: any, i: number) => {
      text += `${i + 1}. ${item.nama_area} / ${item.jam_pekerjaan} / ${item.nama_penyulang} / ${item.sifat_pekerjaan} / ${item.jtm}${getStatusIcon(item.status_pekerjaan)}${getFlisrIcon(item.flisr)}
`;
    });
  }

  // ===============================
  // FOOTER
  // ===============================
  // ===============================
// EMERGENCY
// ===============================
text += `
Pekerjaan emergency :
`;

if (!emergency.length) {
  text += `Nihil\n`;
} else {
  emergency.forEach((item: any, i: number) => {
    text += `${i + 1}. ${safeValue(item.nama_area)} / ${safeValue(item.jam_pekerjaan)} / ${safeValue(item.nama_penyulang)} / ${safeValue(item.sifat_pekerjaan)} / ${safeValue(item.jtm)}${getStatusIcon(item.status_pekerjaan)}${getFlisrIcon(item.flisr)}
`;
  });
}
  text += `

Ket. Pekerjaan:
✅ Terlaksana
❌ Batal
⏰ Belum dilaksanakan
⚠️ Tidak ada informasi

Ket. kondisi Flisr:
🟢 FLISR Auto
🟡 Belum ada FLISR
🔃 Sudah Normal Jaringan
🟣 Belum Normal Jaringan

Terima Kasih
DCC BANTEN
`;

  return text;
};