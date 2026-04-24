export const infoLabels = () => {
  return [
    // { name: "Beban belum diupdate", "color": "outline-dark" },
    { name: "Data dari Operator", color: "outline-dark" },
    { name: "Data dari SCADA/AMR", color: "trust" },
    { name: "Data dari SCADA/AMR melebihi I.Max", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    { name: "Data Minus dari SCADA/AMR", color: "anticipation" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};
export const infoLabelsCustom = () => {
  return [
    { name: "Note : Klik pada cell (Value) lalu tekan Eter untuk update record", "color": "outline-info" }
  ]
}


export const infoLabelsNew = () => {
  return [
    // { name: "BELUM DIUPDATE", color: "outline-white" },
    { name: "DATA DARI SCADA/AMR", color: "trust" },
    { name: "DATA DARI ENTRI OPERATOR", color: "joy" },
    { name: "DATA DARI SCADA/AMR DIUPDATE OPERATOR", color: "surprise" },
    {
      name: "⏰ DATA beban terbaru tersedia 5 menit setelah sinkronisasi. Harap refresh sebelum Entri Beban.",
      color: "mint"
    }

    // { name: "DATA DARI SCADA/AMR MELEBIHI I.MAX", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};
export const infoLabelsNewTeg = () => {
  return [
    // { name: "BELUM DIUPDATE", color: "outline-white" },
    { name: "DATA DARI SCADA/AMR", color: "trust" },
    { name: "DATA DARI ENTRI OPERATOR", color: "joy" },
    { name: "DATA DARI SCADA/AMR DIUPDATE OPERATOR", color: "surprise" },
    // { name: "DATA beban terbaru tersedia 5 menit setelah sinkronisasi.Harap refresh sebelum Entri Beban.", color: "anticipation" },
    // { name: "DATA DARI SCADA/AMR MELEBIHI I.MAX", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};
export const infoLabelsNewTarget = () => {
  return [
    // { name: "BELUM DIUPDATE", color: "outline-white" },
    { name: "DATA DARI SCADA", color: "trust" },
    { name: "DATA DARI SCADA/DIUPDATE OPERATOR", color: "surprise" },
    // { name: "DATA beban terbaru tersedia 5 menit setelah sinkronisasi.Harap refresh sebelum Entri Beban.", color: "anticipation" },
    // { name: "DATA DARI SCADA/AMR MELEBIHI I.MAX", color: "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    // { name: "Data Minus", "color": "surprise" },
  ];
};
