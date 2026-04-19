// MENU
interface IMenu {
  id: number;
  idParent: number | null;
  display: string;
  name: string;
  path: string;
  icon: string;
  hidden: boolean;
  search: boolean;
  privileges: string[];
  divider: boolean;
  no: number; // no urut
  createdAt: string;
  updatedAt: string;
}

export const MenuField = [
  'id',
  'idParent',
  'display',
  'name',
  'path',
  'icon',
  'hidden',
  'search',
  'privileges',
  'divider',
  'no',
];

export type { IMenu };
