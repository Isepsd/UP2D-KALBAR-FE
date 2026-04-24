import { cdnUrl } from '@app/helper/cdn.helper';
import { ACTION_COLUMN, NO } from "./_more.columns_drafting.config";
// import React from 'react';


export const SCADATEL_WO_DRAFTING = () => {
  return [
    { Header: 'No', accessor: 'number', minWidth: '50px', pinned: true, stickyLeft: 0,disableSortBy: true, disableFilters: true, show: true, fixed: true },
    { Header: 'Aksi', accessor: 'action', minWidth: '20px',pinned: true, stickyLeft: 50, disableSortBy: true,maxWidth: '20px', canFilter: false, show: true, hideColumn: false , disableFilters: true,},
    {
      Header: "Progres",
      accessor: "progres",
      minWidth: "70px",
      show: true,
      pinned: true, stickyLeft: 245,
      disableFilters: false,
    
    },

    {
      Header: "No WO",
      accessor: "no_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Tgl WO",
      accessor: "tgl_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Uraian",
      accessor: "uraian_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Kegiatan",
      accessor: "id_ref_kegiatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Area",
      accessor: "id_ref_lokasi_up3",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Bidang",
      accessor: "id_bidang",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Kategori Peralatan",
      accessor: "peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Jenis Peralatan",
      accessor: "jns_peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },

    {
      Header: "GI",
      accessor: "id_ref_lokasi_gi",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },

    {
      Header: "Penyulang",
      accessor: "id_ref_lokasi_peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Dokumen Sebelum",
      accessor: "foto_sebelum",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },
    {
      Header: "Dokumen Sesudah",
      accessor: "foto_sesudah",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },
    {
      Header: "Pembuat WO",
      accessor: "id_user_created",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Approve SPV Scadatel",
      accessor: "approve_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Scadatel",
      accessor: "nama_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    
    {
      Header: "Approve SPV Bidang",
      accessor: "approve_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Bidang",
      accessor: "nama_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
   
    },
    {
      Header: "Approve SPV Opsis",
      accessor: "approve_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Opsis",
      accessor: "nama_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Posting WO",
      accessor: "posting_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
  
  ];
};
    export const SCADATEL_WO_DRAFTING_GRID = () => {
      const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
        const progress = data.progres;

            // Mengembalikan kelas CSS berdasarkan nilai progress
            if (progress === 'CLOSING WO') {
              return 'green-background';
            } else if (progress === 'MENUNGGU APPROVE SPV') {
              return 'yellow-background';
            } else if (progress === 'RELEASE WO') {
              return 'red-background';
            }

            return ''; // Tidak ada kelas jika tidak cocok
          };

      return {
        datafields: [
          { name: 'number', type: 'number' },
          { name: 'progres', type: 'string' },
          { name: 'id_trans_drafting_wo', type: 'string' },
          { name: 'view', type: 'string' },
          { name: 'no_wo', type: 'string' },
          { name: 'tgl_wo', type: 'string' },
          { name: 'uraian_wo', type: 'string' },
          { name: 'id_ref_kegiatan', type: 'string' },
          { name: 'id_ref_lokasi_up3', type: 'string' },
          { name: 'id_bidang', type: 'string' },
          { name: 'peralatan', type: 'string' },
          { name: 'jns_peralatan', type: 'string' },
          { name: 'id_ref_lokasi_gi', type: 'string' },
          { name: 'id_ref_lokasi_peralatan', type: 'string' },
          { name: 'foto_sebelum', type: 'string' },
          { name: 'foto_sesudah', type: 'string' },
          { name: 'id_user_created', type: 'string' },
          { name: 'approve_spv_scada', type: 'string' },
          { name: 'nama_spv_scada', type: 'string' },
          { name: 'approve_spv_data', type: 'string' },
          { name: 'nama_spv_data', type: 'string' },
          { name: 'approve_spv_opsis', type: 'string' },
          { name: 'nama_spv_opsis', type: 'string' },
          { name: 'posting_wo', type: 'string' },
          { name: 'action', type: 'string' },
        ],
        columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false, cellclassname: cellClass },
       { text: 'Progres', datafield: 'progres', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'Uraian', datafield: 'uraian_wo', width: '40%', editable: false, cellclassname: cellClass },
       { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false, cellclassname: cellClass },
       { text: 'Area', datafield: 'id_ref_lokasi_up3', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'Bidang', datafield: 'id_bidang', width: '20%', editable: false, cellclassname: cellClass },
       { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%', editable: false, cellclassname: cellClass },
       { text: 'Jenis Peralatan', datafield: 'jns_peralatan', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false, cellclassname: cellClass },
       { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false, cellclassname: cellClass },
       {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '30%',
        editable: false,
        cellclassname: cellClass,
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '30%',
        editable: false,
        cellclassname: cellClass
    
      },
      
          { text: 'Pembuat WO', datafield: 'id_user_created', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Approve SPV Scadatel', datafield: 'approve_spv_scada', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Nama SPV Scadatel', datafield: 'nama_spv_scada', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Approve SPV Bidang', datafield: 'approve_spv_data', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Nama SPV Bidang', datafield: 'nama_spv_data', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Approve SPV Opsis', datafield: 'approve_spv_opsis', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Nama SPV Opsis', datafield: 'nama_spv_opsis', width: '10%', editable: false, cellclassname: cellClass },
          { text: 'Posting WO', datafield: 'posting_wo', width: '10%', editable: false, cellclassname: cellClass },
          
        ],
      };
    };


    export const SCADATEL_PELAKSANAAN_WO = () => {
      return [
        ...NO(),
        ...ACTION_COLUMN(),
        {
          Header: "Progres",
          accessor: "progres",
          minWidth: "70px",
          show: true,
          pinned: true, stickyLeft: 210,
          disableFilters: false,
        
        },
    
        {
          Header: "No WO",
          accessor: "no_wo",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Tgl WO",
          accessor: "tgl_wo",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Nama WO",
          accessor: "uraian_wo",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Kegiatan",
          accessor: "id_ref_kegiatan",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Pembuat WO",
          accessor: "id_user_created",
          minWidth: "150px",
          show: true,
          disableFilters: false,
        
        },
        {
          Header: "Area",
          accessor: "id_ref_lokasi_up3",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Bidang",
          accessor: "id_bidang",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Nama Pelaksana",
          accessor: "nama_user_mulai_wo",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Kategori Peralatan",
          accessor: "peralatan",
          minWidth: "150px",
          show: true,
          disableFilters: false,
         
        },
        {
          Header: "Jenis Peralatan",
          accessor: "jns_peralatan",
          minWidth: "150px",
          show: true,
          disableFilters: false,
          
        },
    
        {
          Header: "GI",
          accessor: "id_ref_lokasi_gi",
          minWidth: "150px",
          show: true,
          disableFilters: false,
        
        },
    
        {
          Header: "Penyulang",
          accessor: "id_ref_lokasi_peralatan",
          minWidth: "150px",
          show: true,
          disableFilters: false,
        
        },
        {
          Header: "Dokumen Sebelum",
          accessor: "foto_sebelum",
          minWidth: "150px",
          show: true,
          disableFilters: false,
          
        },
        {
          Header: "Dokumen Sesudah",
          accessor: "foto_sesudah",
          minWidth: "150px",
          show: true,
          disableFilters: false,
          
        },
      
        // {
        //   Header: "Approve SPV Scadatel",
        //   accessor: "approve_spv_scada",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
         
        // },
        // {
        //   Header: "Nama SPV Scadatel",
        //   accessor: "nama_spv_scada",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
         
        // },
        
        // {
        //   Header: "Approve SPV Bidang",
        //   accessor: "approve_spv_data",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
         
        // },
        // {
        //   Header: "Nama SPV Bidang",
        //   accessor: "nama_spv_data",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
       
        // },
        // {
        //   Header: "Approve SPV Opsis",
        //   accessor: "approve_spv_opsis",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
         
        // },
        // {
        //   Header: "Nama SPV Opsis",
        //   accessor: "nama_spv_opsis",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
        
        // },
        // {
        //   Header: "Posting WO",
        //   accessor: "posting_wo",
        //   minWidth: "150px",
        //   show: true,
        //   disableFilters: false,
         
        // },
      
      ];
    };
export const SCADATEL_PELAKSANAAN_WO_GRID = () => {
  const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
    const postingg = data.posting_wo;
  
        // Mengembalikan kelas CSS berdasarkan nilai progress
        if (postingg == '3') {
          return 'green-background';
        } else if (postingg == '0') {
          return 'yellow-background';
        } else if (postingg == '4') {
          return 'red-background';
        }

        return ''; // Tidak ada kelas jika tidak cocok
      };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'progres', type: 'string' },
      { name: 'id_trans_drafting_wo', type: 'string' },
      { name: 'view', type: 'string' },
      { name: 'no_wo', type: 'string' },
      { name: 'tgl_wo', type: 'string' },
      { name: 'uraian_wo', type: 'string' },
      { name: 'id_ref_kegiatan', type: 'string' },
      { name: 'id_ref_lokasi_up3', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'jns_peralatan', type: 'string' },
      { name: 'id_ref_lokasi_gi', type: 'string' },
      { name: 'id_ref_lokasi_peralatan', type: 'string' },
      { name: 'foto_sebelum', type: 'string' },
      { name: 'foto_sesudah', type: 'string' },
      { name: 'id_user_created', type: 'string' },
      { name: 'approve_spv_scada', type: 'string' },
      { name: 'nama_user_mulai_wo', type: 'string' },
      { name: 'nama_spv_scada', type: 'string' },
      { name: 'approve_spv_data', type: 'string' },
      { name: 'nama_spv_data', type: 'string' },
      { name: 'approve_spv_opsis', type: 'string' },
      { name: 'nama_spv_opsis', type: 'string' },
      { name: 'posting_wo', type: 'string' },
      { name: 'st_mulai_wo', type: 'string' },
      { name: 'st_selesai_wo', type: 'string' },


    ],
    columns: [
    
      { text: 'NO', datafield: 'number', width: '3%', editable: false,cellclassname: cellClass },
      { text: 'Progres', datafield: 'progres', width: '13%', editable: false, cellclassname: cellClass },
      // { text: 'Selesai WO', datafield: 'st_selesai_wo', width: '13%', editable: false, cellclassname: cellClass },
      { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false, cellclassname: cellClass },
      { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false, cellclassname: cellClass },
   
      { text: 'Nama WO', datafield: 'uraian_wo', width: '40%' , editable: false, cellclassname: cellClass},
   
      { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false, cellclassname: cellClass },
      { text: 'Pembuat WO', datafield: 'id_user_created', width: '10%', editable: false, cellclassname: cellClass },
      { text: 'Area', datafield: 'id_ref_lokasi_up3', width: '10%', editable: false, cellclassname: cellClass },
   
      { text: 'Nama Pelaksana', datafield: 'nama_user_mulai_wo', width: '20%', editable: false, cellclassname: cellClass },
      { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%' , editable: false, cellclassname: cellClass},
      { text: 'Jenis Peralatan', datafield: 'jns_peralatan', width: '10%', editable: false, cellclassname: cellClass },
      { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false, cellclassname: cellClass },
      { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false, cellclassname: cellClass },
      {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '30%',
        editable: false,
       cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '30%',
        editable: false
        , cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
    ],
  };
};
export const SCADATEL_WO_DRAFTING_DOKUMEN_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'id', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'id_modules', type: 'string' },
      { name: 'url', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      {
        text: 'Dokumen',
        datafield: 'description',
        width: '97%',
        editable: false,
        cellsRenderer: function (row: any, column: any, value: any, defaultHtml: any, columnSettings: any, rowData: any) {
          // Mengambil URL dari rowData
          const fullUrl = cdnUrl(rowData.url); // Pastikan 'url' ada di rowData
          
          // Membuat tautan dengan `description` sebagai teks dan `url` sebagai href
          return `<div style="height: 30px; line-height: 30px; text-align: center;">
                    <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
                      <span style="color: red;">${value}</span>
                    </a>
                  </div>`;
        }
      },
    ],
  };
};


export const SCADATEL_WO_APPROVE = () => {
  return [
    ...NO(),
    ...ACTION_COLUMN(),
    {
      Header: "Progres",
      accessor: "progres",
      minWidth: "70px",
      show: true,
      pinned: true, stickyLeft: 180,
      disableFilters: false,
    
    },

    {
      Header: "No WO",
      accessor: "no_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Tgl WO",
      accessor: "tgl_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama WO",
      accessor: "uraian_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama Pelaksana",
      accessor: "nama_user_mulai_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Approve SPV Scadatel",
      accessor: "approve_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Scadatel",
      accessor: "nama_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    
    {
      Header: "Approve SPV Bidang",
      accessor: "approve_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Bidang",
      accessor: "nama_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
   
    },
    {
      Header: "Approve SPV Opsis",
      accessor: "approve_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Opsis",
      accessor: "nama_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Kegiatan",
      accessor: "id_ref_kegiatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
   
   
    {
      Header: "Kategori Peralatan",
      accessor: "peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
   

    {
      Header: "GI",
      accessor: "id_ref_lokasi_gi",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },

    {
      Header: "Penyulang",
      accessor: "id_ref_lokasi_peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Dokumen Sebelum",
      accessor: "foto_sebelum",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },
    {
      Header: "Dokumen Sesudah",
      accessor: "foto_sesudah",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },

    // {
    //   Header: "Jenis Peralatan",
    //   accessor: "jns_peralatan",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
      
    // },
    // {
    //   Header: "Pembuat WO",
    //   accessor: "id_user_created",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
    
    // },
    // {
    //   Header: "Area",
    //   accessor: "id_ref_lokasi_up3",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
    // {
    //   Header: "Bidang",
    //   accessor: "id_bidang",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
   
    // {
    //   Header: "Posting WO",
    //   accessor: "posting_wo",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
  
  ];
};
export const SCADATEL_WO_APPROVE_GRID = () => {

  const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
    const postingg = data.posting_wo;
  
        // Mengembalikan kelas CSS berdasarkan nilai progress
        if (postingg == '1') {
          return 'green-background';
        } else if (postingg == '0') {
          return 'yellow-background';
        } else if (postingg == '2') {
          return 'red-background';
        }

        return ''; // Tidak ada kelas jika tidak cocok
      };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'progres', type: 'string' },
      { name: 'id_trans_drafting_wo', type: 'string' },
      { name: 'view', type: 'string' },
      { name: 'no_wo', type: 'string' },
      { name: 'tgl_wo', type: 'string' },
      { name: 'uraian_wo', type: 'string' },
      { name: 'id_ref_kegiatan', type: 'string' },
      { name: 'id_ref_lokasi_up3', type: 'string' },
      { name: 'nama_user_mulai_wo', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'jns_peralatan', type: 'string' },
      { name: 'id_ref_lokasi_gi', type: 'string' },
      { name: 'id_ref_lokasi_peralatan', type: 'string' },
      { name: 'foto_sebelum', type: 'string' },
      { name: 'foto_sesudah', type: 'string' },
      { name: 'id_user_created', type: 'string' },
      { name: 'approve_spv_scada', type: 'string' },
      { name: 'nama_spv_scada', type: 'string' },
      { name: 'approve_spv_data', type: 'string' },
      { name: 'nama_spv_data', type: 'string' },
      { name: 'approve_spv_opsis', type: 'string' },
      { name: 'nama_spv_opsis', type: 'string' },
      { name: 'posting_wo', type: 'string' },
    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false,cellclassname: cellClass },
      { text: 'Progres', datafield: 'progres', width: '13%', editable: false, cellclassname: cellClass  },
      { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false , cellclassname: cellClass },
      { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Nama WO', datafield: 'uraian_wo', width: '40%' , editable: false, cellclassname: cellClass },
      { text: 'Nama Pelaksana', datafield: 'nama_user_mulai_wo', width: '40%' , editable: false, cellclassname: cellClass },
      { text: 'Approve SPV Scadatel', datafield: 'approve_spv_scada', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Nama SPV Scadatel', datafield: 'nama_spv_scada', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Approve SPV Bidang', datafield: 'approve_spv_data', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Nama SPV Bidang', datafield: 'nama_spv_data', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Approve SPV Opsis', datafield: 'approve_spv_opsis', width: '10%' , editable: false, cellclassname: cellClass },
      { text: 'Nama SPV Opsis', datafield: 'nama_spv_opsis', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false , cellclassname: cellClass },
      { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%' , editable: false , cellclassname: cellClass },
      { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false, cellclassname: cellClass  },
      { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false , cellclassname: cellClass  },
      {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '35%',
        editable: false,
        cellclassname: cellClass 
       
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '35%',
        editable: false,
        cellclassname: cellClass 
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      
    ],
  };
};

export const SCADATEL_WO_APPROVE_BIDANG = () => {
  return [
    ...NO(),
    ...ACTION_COLUMN(),
    {
      Header: "Progres",
      accessor: "progres",
      minWidth: "70px",
      show: true,
      pinned: true, stickyLeft: 180,
      disableFilters: false,
    
    },

    {
      Header: "No WO",
      accessor: "no_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Tgl WO",
      accessor: "tgl_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama WO",
      accessor: "uraian_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama Pelaksana",
      accessor: "nama_user_mulai_wo",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Approve SPV Scadatel",
      accessor: "approve_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Scadatel",
      accessor: "nama_spv_scada",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    
    {
      Header: "Approve SPV Bidang",
      accessor: "approve_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Bidang",
      accessor: "nama_spv_data",
      minWidth: "150px",
      show: true,
      disableFilters: false,
   
    },
    {
      Header: "Approve SPV Opsis",
      accessor: "approve_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
    {
      Header: "Nama SPV Opsis",
      accessor: "nama_spv_opsis",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Kegiatan",
      accessor: "id_ref_kegiatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
   
   
    {
      Header: "Kategori Peralatan",
      accessor: "peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
     
    },
   

    {
      Header: "GI",
      accessor: "id_ref_lokasi_gi",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },

    {
      Header: "Penyulang",
      accessor: "id_ref_lokasi_peralatan",
      minWidth: "150px",
      show: true,
      disableFilters: false,
    
    },
    {
      Header: "Dokumen Sebelum",
      accessor: "foto_sebelum",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },
    {
      Header: "Dokumen Sesudah",
      accessor: "foto_sesudah",
      minWidth: "150px",
      show: true,
      disableFilters: false,
      
    },

    // {
    //   Header: "Jenis Peralatan",
    //   accessor: "jns_peralatan",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
      
    // },
    // {
    //   Header: "Pembuat WO",
    //   accessor: "id_user_created",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
    
    // },
    // {
    //   Header: "Area",
    //   accessor: "id_ref_lokasi_up3",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
    // {
    //   Header: "Bidang",
    //   accessor: "id_bidang",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
   
    // {
    //   Header: "Posting WO",
    //   accessor: "posting_wo",
    //   minWidth: "150px",
    //   show: true,
    //   disableFilters: false,
     
    // },
  
  ];
};
export const SCADATEL_WO_APPROVE_BIDANG_GRID = () => {
  const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
    const postingg = data.posting_wo;
  
        // Mengembalikan kelas CSS berdasarkan nilai progress
        if (postingg == '1') {
          return 'green-background';
        } else if (postingg == '0') {
          return 'yellow-background';
        } else if (postingg == '2') {
          return 'red-background';
        }

        return ''; // Tidak ada kelas jika tidak cocok
      };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'progres', type: 'string' },
      { name: 'id_trans_drafting_wo', type: 'string' },
      { name: 'view', type: 'string' },
      { name: 'no_wo', type: 'string' },
      { name: 'tgl_wo', type: 'string' },
      { name: 'uraian_wo', type: 'string' },
      { name: 'id_ref_kegiatan', type: 'string' },
      { name: 'id_ref_lokasi_up3', type: 'string' },
      { name: 'id_bidang', type: 'string' },
      { name: 'nama_user_mulai_wo', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'jns_peralatan', type: 'string' },
      { name: 'id_ref_lokasi_gi', type: 'string' },
      { name: 'id_ref_lokasi_peralatan', type: 'string' },
      { name: 'foto_sebelum', type: 'string' },
      { name: 'foto_sesudah', type: 'string' },
      { name: 'id_user_created', type: 'string' },
      { name: 'approve_spv_scada', type: 'string' },
      { name: 'nama_spv_scada', type: 'string' },
      { name: 'approve_spv_data', type: 'string' },
      { name: 'nama_spv_data', type: 'string' },
      { name: 'approve_spv_opsis', type: 'string' },
      { name: 'nama_spv_opsis', type: 'string' },
      { name: 'posting_wo', type: 'string' },


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false,cellclassname: cellClass },
      { text: 'Progres', datafield: 'progres', width: '13%', editable: false,cellclassname: cellClass },
      { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false ,cellclassname: cellClass},
      { text: 'Nama WO', datafield: 'uraian_wo', width: '40%' , editable: false,cellclassname: cellClass},
      { text: 'Nama Pelaksana', datafield: 'nama_user_mulai_wo', width: '40%' , editable: false,cellclassname: cellClass},
      { text: 'Approve SPV Scadatel', datafield: 'approve_spv_scada', width: '10%', editable: false ,cellclassname: cellClass},
      { text: 'Bidang', datafield: 'id_bidang', width: '20%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Scadatel', datafield: 'nama_spv_scada', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Bidang', datafield: 'approve_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Bidang', datafield: 'nama_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Opsis', datafield: 'approve_spv_opsis', width: '10%' , editable: false,cellclassname: cellClass},
      { text: 'Nama SPV Opsis', datafield: 'nama_spv_opsis', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false,cellclassname: cellClass },
      { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%' , editable: false,cellclassname: cellClass},
      { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false,cellclassname: cellClass },
      {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '35%',
        editable: false,
        cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '35%',
        editable: false,
        cellclassname: cellClass
      //   cellsRenderer: function (row: any, column: any, value: any) {
      //     // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
      //     const fullUrl = cdnUrl(value);
          
      //     return `<div style="height: 30px; line-height: 30px; text-align: center;">
      //               <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
      //                 <span style="color: red;">${value}</span>
      //               </a>
      //             </div>`;
      //   }
      } 
    ],
  };
};


export const SCADATEL_WO_APPROVE_OPSIS_GRID = () => {
  const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
    const postingg = data.posting_wo;
  
        // Mengembalikan kelas CSS berdasarkan nilai progress
        if (postingg == '1') {
          return 'green-background';
        } else if (postingg == '0') {
          return 'yellow-background';
        } else if (postingg == '2') {
          return 'red-background';
        }

        return ''; // Tidak ada kelas jika tidak cocok
      };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'progres', type: 'string' },
      { name: 'id_trans_drafting_wo', type: 'string' },
      { name: 'view', type: 'string' },
      { name: 'no_wo', type: 'string' },
      { name: 'tgl_wo', type: 'string' },
      { name: 'uraian_wo', type: 'string' },
      { name: 'id_ref_kegiatan', type: 'string' },
      { name: 'id_ref_lokasi_up3', type: 'string' },
      { name: 'nama_user_mulai_wo', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'jns_peralatan', type: 'string' },
      { name: 'id_ref_lokasi_gi', type: 'string' },
      { name: 'id_ref_lokasi_peralatan', type: 'string' },
      { name: 'foto_sebelum', type: 'string' },
      { name: 'foto_sesudah', type: 'string' },
      { name: 'id_user_created', type: 'string' },
      { name: 'approve_spv_scada', type: 'string' },
      { name: 'nama_spv_scada', type: 'string' },
      { name: 'approve_spv_data', type: 'string' },
      { name: 'nama_spv_data', type: 'string' },
      { name: 'approve_spv_opsis', type: 'string' },
      { name: 'nama_spv_opsis', type: 'string' },
      { name: 'posting_wo', type: 'string' },


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false,cellclassname: cellClass },
      { text: 'Progres', datafield: 'progres', width: '13%', editable: false,cellclassname: cellClass },
      { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama WO', datafield: 'uraian_wo', width: '40%' , editable: false,cellclassname: cellClass},
      // { text: 'Nama Pelaksana', datafield: 'nama_user_mulai_wo', width: '40%' , editable: false},
      { text: 'Approve SPV Scadatel', datafield: 'approve_spv_scada', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Scadatel', datafield: 'nama_spv_scada', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Bidang', datafield: 'approve_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Bidang', datafield: 'nama_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Opsis', datafield: 'approve_spv_opsis', width: '10%' , editable: false,cellclassname: cellClass},
      { text: 'Nama SPV Opsis', datafield: 'nama_spv_opsis', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false ,cellclassname: cellClass},
      { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%' , editable: false,cellclassname: cellClass},
      { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false,cellclassname: cellClass },
      {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '35%',
        editable: false,
        cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '35%',
        editable: false,
        cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      
    ],
  };
};


export const SCADATEL_MONITORING_WO_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'bidang', type: 'string' },
      { name: 'jlhwo', type: 'string' },
      { name: 'create', type: 'string' },
      { name: 'revisi', type: 'string' },
      { name: 'release', type: 'string' },
      { name: 'closing', type: 'string' },
      { name: 'selesai', type: 'string' },
 


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Bidang', datafield: 'bidang', width: '13%', editable: false },
      { text: 'Jumlah WO', datafield: 'jumlah_wo', width: '10%', editable: false },
      { text: 'Pembuatan', datafield: 'pembuatan', width: '10%', editable: false },
      { text: 'Revisi', datafield: 'revisi', width: '40%' , editable: false},
      { text: 'Release', datafield: 'release', width: '40%' , editable: false},
      { text: 'Closing', datafield: 'closing', width: '10%', editable: false },
      { text: 'Selesai', datafield: 'selesai', width: '20%', editable: false },
     
    ],
  };
};
export const SCADATEL_MONITORING_WO_SPV_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'bidang', type: 'string' },
      { name: 'tgl01', type: 'string' },
      { name: 'tgl02', type: 'string' },
      { name: 'tgl03', type: 'string' },
      { name: 'tgl04', type: 'string' },
      { name: 'tgl05', type: 'string' },
      { name: 'tgl06', type: 'string' },
      { name: 'tgl07', type: 'string' },
      { name: 'tgl08', type: 'string' },
      { name: 'tgl09', type: 'string' },
      { name: 'tgl10', type: 'string' },
      { name: 'tgl11', type: 'string' },
      { name: 'tgl12', type: 'string' },
      { name: 'tgl13', type: 'string' },
      { name: 'tgl14', type: 'string' },
      { name: 'tgl15', type: 'string' },
      { name: 'tgl16', type: 'string' },
      { name: 'tgl17', type: 'string' },
      { name: 'tgl18', type: 'string' },
      { name: 'tgl19', type: 'string' },
      { name: 'tgl20', type: 'string' },
      { name: 'tgl21', type: 'string' },
      { name: 'tgl22', type: 'string' },
      { name: 'tgl23', type: 'string' },
      { name: 'tgl24', type: 'string' },
      { name: 'tgl25', type: 'string' },
      { name: 'tgl26', type: 'string' },
      { name: 'tgl27', type: 'string' },
      { name: 'tgl28', type: 'string' },
      { name: 'tgl29', type: 'string' },
      { name: 'tgl30', type: 'string' },
      { name: 'tgl31', type: 'string' },
      { name: 'jlhwo', type: 'string' },
    
 


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Bidang', datafield: 'bidang', width: '13%', editable: false },
      { text: 'TGL01', datafield: 'tgl01', width: '13%', editable: false },
      { text: 'TGL02', datafield: 'tgl02', width: '13%', editable: false },
      { text: 'TGL03', datafield: 'tgl03', width: '13%', editable: false },
      { text: 'TGL04', datafield: 'tgl04', width: '13%', editable: false },
      { text: 'TGL05', datafield: 'tgl05', width: '13%', editable: false },
      { text: 'TGL06', datafield: 'tgl06', width: '13%', editable: false },
      { text: 'TGL07', datafield: 'tgl07', width: '13%', editable: false },
      { text: 'TGL08', datafield: 'tgl08', width: '13%', editable: false },
      { text: 'TGL09', datafield: 'tgl09', width: '13%', editable: false },
      { text: 'TGL10', datafield: 'tgl10', width: '13%', editable: false },
      { text: 'TGL11', datafield: 'tgl11', width: '13%', editable: false },
      { text: 'TGL12', datafield: 'tgl12', width: '13%', editable: false },
      { text: 'TGL13', datafield: 'tgl13', width: '13%', editable: false },
      { text: 'TGL14', datafield: 'tgl14', width: '13%', editable: false },
      { text: 'TGL15', datafield: 'tgl15', width: '13%', editable: false },
      { text: 'TGL16', datafield: 'tgl16', width: '13%', editable: false },
      { text: 'TGL17', datafield: 'tgl17', width: '13%', editable: false },
      { text: 'TGL18', datafield: 'tgl18', width: '13%', editable: false },
      { text: 'TGL19', datafield: 'tgl19', width: '13%', editable: false },
      { text: 'TGL20', datafield: 'tgl20', width: '13%', editable: false },
      { text: 'TGL21', datafield: 'tgl21', width: '13%', editable: false },
      { text: 'TGL22', datafield: 'tgl22', width: '13%', editable: false },
      { text: 'TGL23', datafield: 'tgl23', width: '13%', editable: false },
      { text: 'TGL24', datafield: 'tgl24', width: '13%', editable: false },
      { text: 'TGL25', datafield: 'tgl25', width: '13%', editable: false },
      { text: 'TGL26', datafield: 'tgl26', width: '13%', editable: false },
      { text: 'TGL27', datafield: 'tgl27', width: '13%', editable: false },
      { text: 'TGL28', datafield: 'tgl28', width: '13%', editable: false },
      { text: 'TGL29', datafield: 'tgl29', width: '13%', editable: false },
      { text: 'TGL30', datafield: 'tgl30', width: '13%', editable: false },
      { text: 'TGL31', datafield: 'tgl31', width: '13%', editable: false },
      { text: 'Jumlah WO', datafield: 'jumlah_wo', width: '10%', editable: false },
     
    ],
  };
};

export const SCADATEL_MONITORING_WO_PELAKSANA_GRID = () => {
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'pelaksana', type: 'string' },
      { name: 'tgl01', type: 'string' },
      { name: 'tgl02', type: 'string' },
      { name: 'tgl03', type: 'string' },
      { name: 'tgl04', type: 'string' },
      { name: 'tgl05', type: 'string' },
      { name: 'tgl06', type: 'string' },
      { name: 'tgl07', type: 'string' },
      { name: 'tgl08', type: 'string' },
      { name: 'tgl09', type: 'string' },
      { name: 'tgl10', type: 'string' },
      { name: 'tgl11', type: 'string' },
      { name: 'tgl12', type: 'string' },
      { name: 'tgl13', type: 'string' },
      { name: 'tgl14', type: 'string' },
      { name: 'tgl15', type: 'string' },
      { name: 'tgl16', type: 'string' },
      { name: 'tgl17', type: 'string' },
      { name: 'tgl18', type: 'string' },
      { name: 'tgl19', type: 'string' },
      { name: 'tgl20', type: 'string' },
      { name: 'tgl21', type: 'string' },
      { name: 'tgl22', type: 'string' },
      { name: 'tgl23', type: 'string' },
      { name: 'tgl24', type: 'string' },
      { name: 'tgl25', type: 'string' },
      { name: 'tgl26', type: 'string' },
      { name: 'tgl27', type: 'string' },
      { name: 'tgl28', type: 'string' },
      { name: 'tgl29', type: 'string' },
      { name: 'tgl30', type: 'string' },
      { name: 'tgl31', type: 'string' },
      { name: 'jlhwo', type: 'string' },
    
 


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false },
      { text: 'Pelaksana', datafield: 'pelaksana', width: '13%', editable: false },
      { text: 'TGL01', datafield: 'tgl01', width: '13%', editable: false },
      { text: 'TGL02', datafield: 'tgl02', width: '13%', editable: false },
      { text: 'TGL03', datafield: 'tgl03', width: '13%', editable: false },
      { text: 'TGL04', datafield: 'tgl04', width: '13%', editable: false },
      { text: 'TGL05', datafield: 'tgl05', width: '13%', editable: false },
      { text: 'TGL06', datafield: 'tgl06', width: '13%', editable: false },
      { text: 'TGL07', datafield: 'tgl07', width: '13%', editable: false },
      { text: 'TGL08', datafield: 'tgl08', width: '13%', editable: false },
      { text: 'TGL09', datafield: 'tgl09', width: '13%', editable: false },
      { text: 'TGL10', datafield: 'tgl10', width: '13%', editable: false },
      { text: 'TGL11', datafield: 'tgl11', width: '13%', editable: false },
      { text: 'TGL12', datafield: 'tgl12', width: '13%', editable: false },
      { text: 'TGL13', datafield: 'tgl13', width: '13%', editable: false },
      { text: 'TGL14', datafield: 'tgl14', width: '13%', editable: false },
      { text: 'TGL15', datafield: 'tgl15', width: '13%', editable: false },
      { text: 'TGL16', datafield: 'tgl16', width: '13%', editable: false },
      { text: 'TGL17', datafield: 'tgl17', width: '13%', editable: false },
      { text: 'TGL18', datafield: 'tgl18', width: '13%', editable: false },
      { text: 'TGL19', datafield: 'tgl19', width: '13%', editable: false },
      { text: 'TGL20', datafield: 'tgl20', width: '13%', editable: false },
      { text: 'TGL21', datafield: 'tgl21', width: '13%', editable: false },
      { text: 'TGL22', datafield: 'tgl22', width: '13%', editable: false },
      { text: 'TGL23', datafield: 'tgl23', width: '13%', editable: false },
      { text: 'TGL24', datafield: 'tgl24', width: '13%', editable: false },
      { text: 'TGL25', datafield: 'tgl25', width: '13%', editable: false },
      { text: 'TGL26', datafield: 'tgl26', width: '13%', editable: false },
      { text: 'TGL27', datafield: 'tgl27', width: '13%', editable: false },
      { text: 'TGL28', datafield: 'tgl28', width: '13%', editable: false },
      { text: 'TGL29', datafield: 'tgl29', width: '13%', editable: false },
      { text: 'TGL30', datafield: 'tgl30', width: '13%', editable: false },
      { text: 'TGL31', datafield: 'tgl31', width: '13%', editable: false },
      { text: 'Jumlah WO', datafield: 'jumlah_wo', width: '10%', editable: false },
     
    ],
  };
};

export const SCADATEL_DETAIL_WO_DRAFTING_GRID = () => {

  const cellClass = (row: any, columnfield: any, value: any, data: any): string => {
    const postingg = data.posting_wo;
  
        // Mengembalikan kelas CSS berdasarkan nilai progress
        if (postingg == '1') {
          return 'green-background';
        } else if (postingg == '0') {
          return 'yellow-background';
        } else if (postingg == '2') {
          return 'red-background';
        }

        return ''; // Tidak ada kelas jika tidak cocok
      };
  return {
    datafields: [
      { name: 'number', type: 'number' },
      { name: 'progres', type: 'string' },
      { name: 'id_trans_drafting_wo', type: 'string' },
      { name: 'view', type: 'string' },
      { name: 'no_wo', type: 'string' },
      { name: 'tgl_wo', type: 'string' },
      { name: 'uraian_wo', type: 'string' },
      { name: 'id_ref_kegiatan', type: 'string' },
      { name: 'id_ref_lokasi_up3', type: 'string' },
      { name: 'nama_bidang', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'jns_peralatan', type: 'string' },
      { name: 'id_ref_lokasi_gi', type: 'string' },
      { name: 'id_ref_lokasi_peralatan', type: 'string' },
      { name: 'foto_sebelum', type: 'string' },
      { name: 'foto_sesudah', type: 'string' },
      { name: 'id_user_created', type: 'string' },
      { name: 'approve_spv_scada', type: 'string' },
      { name: 'nama_spv_scada', type: 'string' },
      { name: 'approve_spv_data', type: 'string' },
      { name: 'nama_spv_data', type: 'string' },
      { name: 'approve_spv_opsis', type: 'string' },
      { name: 'nama_spv_opsis', type: 'string' },
      { name: 'posting_wo', type: 'string' },


    ],
    columns: [
      { text: 'NO', datafield: 'number', width: '3%', editable: false,cellclassname: cellClass },
      { text: 'Progres', datafield: 'progres', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'No WO', datafield: 'no_wo', width: '10%', editable: false ,cellclassname: cellClass},
      { text: 'Tgl WO', datafield: 'tgl_wo', width: '10%', editable: false,cellclassname: cellClass },
   
      { text: 'Uraian', datafield: 'uraian_wo', width: '40%' , editable: false,cellclassname: cellClass},
   
      { text: 'Kegiatan', datafield: 'id_ref_kegiatan', width: '40%', editable: false,cellclassname: cellClass },
      { text: 'Area', datafield: 'id_ref_lokasi_up3', width: '10%', editable: false,cellclassname: cellClass },
   
      { text: 'Bidang', datafield: 'nama_bidang', width: '20%', editable: false ,cellclassname: cellClass},
      { text: 'Kategori Peralatan', datafield: 'peralatan', width: '20%' , editable: false,cellclassname: cellClass},
      { text: 'Jenis Peralatan', datafield: 'jns_peralatan', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'GI', datafield: 'id_ref_lokasi_gi', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Penyulang', datafield: 'id_ref_lokasi_peralatan', width: '10%', editable: false ,cellclassname: cellClass},
      {
        text: 'Dokumen Sebelum',
        datafield: 'foto_sebelum',
        width: '30%',
        editable: false,
        cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      {
        text: 'Dokumen Sesudah',
        datafield: 'foto_sesudah',
        width: '30%',
        editable: false,
        cellclassname: cellClass
        // cellsRenderer: function (row: any, column: any, value: any) {
        //   // Gunakan fungsi cdnUrl untuk membentuk URL lengkap
        //   const fullUrl = cdnUrl(value);
          
        //   return `<div style="height: 30px; line-height: 30px; text-align: center;">
        //             <a href="${fullUrl}" target="_blank" onclick="event.stopPropagation();">
        //               <span style="color: red;">${value}</span>
        //             </a>
        //           </div>`;
        // }
      },
      
      
      { text: 'Pembuat WO', datafield: 'id_user_created', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Scadatel', datafield: 'approve_spv_scada', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Scadatel', datafield: 'nama_spv_scada', width: '10%', editable: false ,cellclassname: cellClass},
      { text: 'Approve SPV Bidang', datafield: 'approve_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Nama SPV Bidang', datafield: 'nama_spv_data', width: '10%', editable: false,cellclassname: cellClass },
      { text: 'Approve SPV Opsis', datafield: 'approve_spv_opsis', width: '10%' , editable: false,cellclassname: cellClass},
      { text: 'Nama SPV Opsis', datafield: 'nama_spv_opsis', width: '10%', editable: false,cellclassname: cellClass },
    ],
  };
};