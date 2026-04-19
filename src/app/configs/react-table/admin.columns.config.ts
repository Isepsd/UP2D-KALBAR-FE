import { SliderColumnFilter } from '@app/components/ReactTable/ReactTableFilter';
import { ACTION_COLUMN } from './_more.columns.config';

export const USERS_MANAGEMENT_COLUMNS = () => {
  return [
    {
      Header: 'Nama ',
      accessor: 'fullname',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    {
      Header: 'Kontak',
      accessor: 'phone',
      minWidth: 200,
      filter: 'fuzzyText',
      show: true,
      disableFilters: true
    },
    { Header: 'Email', accessor: 'email', show: true, disableFilters: true },
    { Header: 'Status', accessor: 'status', canFilter: false, show: true, disableFilters: true },
    ...ACTION_COLUMN(),
  ];
};

export const ROLE_COLUMNS = () => {
  return [
    { Header: 'Nama', accessor: 'name', show: true, minWidth: '30%', disableFilters: true },
    {
      Header: 'Level',
      accessor: 'level',
      Filter: SliderColumnFilter,
      filter: 'equals',
      show: true,
      minWidth: '30%',
      disableFilters: true
    },
    {
      Header: 'Deskripsi',
      accessor: 'description',
      show: true,
      minWidth: '33%',
      disableFilters: true
    },
    ...ACTION_COLUMN(),
  ];
};


export const APP_SETTINGS_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'satuan', type: 'string' },
      { name: 'group_name', type: 'string' },
      { name: 'keterangan', type: 'string' },
      { name: 'status_data', type: 'number' },
      { name: 'tipe_data', type: 'bool' },
    ],
    columns: [
      { text: 'ID', datafield: 'id', width: '3%', editable: false },
      { text: 'Name', datafield: 'name', width: '17%', editable: false, },
      { text: 'Value', datafield: 'value', width: '15%', editable: true, },
      { text: 'Satuan', datafield: 'satuan', width: '15%', editable: true, },
      { text: 'Nama Group', datafield: 'group_name', width: '15%', editable: false, },
      { text: 'Keterangan', datafield: 'keterangan', width: '15%', editable: false, },
      { text: 'Tipe Data', datafield: 'tipe_data', width: '10%', editable: false, },
      { text: 'Status', datafield: 'status_data', width: '10%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
};

export const APP_RETENCY_JQX = () => {
  return {
    datafields: [
      { name: 'id', type: 'number' },
      { name: 'nama_table', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'satuan', type: 'string' },
      { name: 'col_datum', type: 'string' },
      { name: 'status', type: 'bool', },
    ],
    columns: [
      { text: 'ID', datafield: 'id', width: '3%', editable: false },
      { text: 'Nama Table', datafield: 'nama_table', width: '20%', editable: false, },
      { text: 'Value', datafield: 'value', width: '20%', editable: true, },
      { text: 'Satuan', datafield: 'satuan', width: '20%', editable: true, },
      { text: 'Nama Group', datafield: 'col_datum', width: '20%', editable: false, },
      { text: 'Status', datafield: 'status', width: '17%', editable: false, columntype: 'checkbox', filtertype: 'bool' },
    ],
  };
};