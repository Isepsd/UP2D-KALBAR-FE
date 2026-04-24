import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";
export const validateData = (cell: any, value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}

export const PENGUKURAN_BEBAN_PEMBANGKIT_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false, },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 200, pinned: true, editable: false, },
      { text: 'Unit Pembangkit', cellsalign: 'left', align: 'center', datafield: 'nama_parent', width: 140, pinned: true, editable: false },
      { text: 'Pembangkit', cellsalign: 'left', align: 'center', datafield: 'nama_lokasi', editable: false, },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false,
      },
        {
        text: 'Daya reaktif (MVAR)', cellsalign: 'right', align: 'center', datafield: 'q', editable: false, width: 140,
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false,
      },
      {
        // text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p', width: 140, editable: roleActions?.update || false,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}
