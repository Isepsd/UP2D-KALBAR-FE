export const infoLabels = () => {
  return [
    // { name: "Beban belum diupdate", "color": "outline-dark" },
    { name: "Data dari Operator", "color": "outline-dark" },
    { name: "Data dari SCADA/AMR", "color": "trust" },
    { name: "Data dari SCADA/AMR melebihi I.Max", "color": "anger" },
    // { name: "Data dari SCADA/AMR sudah diupdate Operator", "color": "joy" },
    { name: "Data Minus dari SCADA/AMR", "color": "anticipation" },
    // { name: "Data Minus", "color": "surprise" },
  ]
}
export const infoLabelsCustom = () => {
  return [
    { name: "Note : Klik pada cell (Value) lalu tekan Eter untuk update record", "color": "outline-info" }
  ]
}