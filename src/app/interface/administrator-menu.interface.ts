interface IMenu {
  idParent: string;
  display: string;
  name: string;
  path: string;
  icon: string;
  privileges: string;
  hidden: boolean;
  search: boolean;
  divider: boolean;
  no: number;
}

export const MenuField = {
  id: undefined,
  idParent: '',
  display: '',
  name: '',
  path: '',
  icon: '',
  privileges: ['view','create', 'update', 'delete'],
  hidden: false,
  search: false,
  divider: false,
  no: 0
};

export type { IMenu };
