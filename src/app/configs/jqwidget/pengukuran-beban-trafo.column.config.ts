import { CeilBackgroundPengukuranBeban } from "@app/helper/jq-widget.helper";
import { NO_DATAFIELD_JQWidget } from "./_more-jqwidget.datafield.config";

export const validateData = (value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai min 0" };
  }
  // else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}
export const validateDataCOSPHI = (value: any) => {
  if (value < 0 || !value || value === "") {
    return { result: false, message: "Nilai antara 0 sampai 1" };
  }
  //  else if (isNaN(Number(value)) === true)
  //   return { result: false, message: "Nilai harus angka" };
  return true;
}

export const PENGUKURAN_BEBAN_TRAFO_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 160, pinned: true, editable: false, },
      { text: 'Gardu Induk', cellsalign: 'left', align: 'center', datafield: 'nama_parent', width: 160, pinned: true, editable: false },
      { text: 'Trafo', cellsalign: 'left', align: 'center', datafield: 'nama_lokasi', editable: false, width: 160, pinned: true },
      {
        text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
        {
        text: 'Daya reaktif (MVAR)', cellsalign: 'right', align: 'center', datafield: 'q', editable: false, width: 140,
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
      {
        text: 'COS PHI', cellsalign: 'right', align: 'center', datafield: 'cosq', width: 100, editable: roleActions?.update || false,
      },
     
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}


export const RC_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50,  editable: false },
      { text: 'B1 (Lokasi)', cellsalign: 'center', align: 'center', datafield: 'b1', width: 160,  editable: false, },
      { text: 'B2 (Tegangan)', cellsalign: 'left', align: 'center', datafield: 'b2', width: 160,  editable: false },
      { text: 'B3 (Bay)', cellsalign: 'left', align: 'center', datafield: 'b3', editable: false, width: 160,  },
      {
        text: 'Element', cellsalign: 'right', align: 'center', datafield: 'element', editable: false, width: 130,
      },
      {
        text: 'Operator', cellsalign: 'right', align: 'center', datafield: 'operator', editable:  false,  width: 130
      },
      {
        text: 'Eksekusi Remote', cellsalign: 'right', align: 'center', datafield: 'status_1', editable: false, width: 170
      },
      {
        text: 'Tanggal Eksekusi Remote', cellsalign: 'right', align: 'center', datafield: 'tgl_mulai_remote', width: 210, editable:false,
      },
      {
        text: 'Tanggal Response Remote', cellsalign: 'right', align: 'center', datafield: 'datum_2', width: 210, editable: roleActions?.update || true,
      },
      {
        text: 'Status Remote',
        cellsalign: 'right',
        align: 'center',
        datafield: 'status_2',
        width: 130,
        editable: roleActions?.update || true,
        columntype: 'dropdownlist',
        createeditor: (row: any, cellvalue: any, editor: any) => {
          const dropdownContainer = document.createElement('div');
          const select = document.createElement('select');
          
          // Tambahkan kelas CSS untuk mengubah gaya dropdown
          select.classList.add('custom-dropdown');
          
          // Set lebar dan tinggi yang lebih kecil untuk elemen select
          select.style.width = '60px'; // Sesuaikan lebar sesuai kebutuhan
          select.style.height = '20px'; // Sesuaikan tinggi sesuai kebutuhan
          
          const options = ['GAGAL', 'BERHASIL'];
          options.forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            select.appendChild(optionElement);
          });
          
          select.value = cellvalue;
          dropdownContainer.appendChild(select);
          editor[0].appendChild(dropdownContainer);
          
          select.addEventListener('change', () => {
            // Perbarui nilai editor saat pilihan berubah
            editor.jqxDropDownList('val', select.value);
          });
          
          editor.on('valuechanged', () => {
            // Perbarui datafield saat nilai editor berubah
            const selectedValue = editor.jqxDropDownList('val');
            row.datafield = selectedValue;
          });
        },
      },
      {
        text: 'Durasi Waktu Remote (dd:hh:mm:ss)', cellsalign: 'right', align: 'center', datafield: 'durasi', width: 269,editable:  false, 
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}







export const PENGUKURAN_BEBAN_GH_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 160, pinned: true, editable: false, },
      { text: 'Gardu Induk/Penyulang', cellsalign: 'left', align: 'center', datafield: 'parent_lokasi', width: 160, pinned: true, editable: false },
      { text: 'Gardu Hubung', cellsalign: 'left', align: 'center', datafield: 'lokasi', editable: false, width: 160, pinned: true },
      // {
      //   text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      // },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
        {
        text: 'Daya reaktif (MVAR)', cellsalign: 'right', align: 'center', datafield: 'q', editable: false, width: 140,
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
      {
        text: 'COS PHI', cellsalign: 'right', align: 'center', datafield: 'cosq', width: 100, editable: roleActions?.update || false,
      },
      {
        // text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p', width: 130, editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, validation: validateData,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}

export const PENGUKURAN_BEBAN_KP_COLUMN_JQWIDGET = (roleActions: any) => {
  return {
    columns: [
      { text: 'NO', cellsalign: 'center', align: 'center', datafield: 'number', width: 50, pinned: true, editable: false },
      { text: 'Tanggal', cellsalign: 'center', align: 'center', datafield: 'datum', width: 160, pinned: true, editable: false, },
      { text: 'Gardu Induk/Penyulang', cellsalign: 'left', align: 'center', datafield: 'parent_lokasi', width: 160, pinned: true, editable: false },
      { text: 'Keypoint', cellsalign: 'left', align: 'center', datafield: 'lokasi', editable: false, width: 160, pinned: true },
      // {
      //   text: 'I. Max (A)', cellsalign: 'right', align: 'center', datafield: 'i_max', editable: false, width: 130,
      // },
      {
        text: 'Arus (A)', cellsalign: 'right', align: 'center', datafield: 'i', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
        {
        text: 'Daya reaktif (MVAR)', cellsalign: 'right', align: 'center', datafield: 'q', editable: false, width: 140,
      },
      {
        text: 'Tegangan (kV)', cellsalign: 'right', align: 'center', datafield: 'v', editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, width: 130
      },
      {
        text: 'COS PHI', cellsalign: 'right', align: 'center', datafield: 'cosq', width: 100, editable: roleActions?.update || false,
      },
      {
        // text: 'Daya Aktif (MW)', cellsalign: 'right', align: 'center', datafield: 'p', width: 130, editable: roleActions?.update || false, cellclassname: CeilBackgroundPengukuranBeban, validation: validateData,
      }
    ],
    dataField: [
      ...NO_DATAFIELD_JQWidget(),
    ]
  }
}
