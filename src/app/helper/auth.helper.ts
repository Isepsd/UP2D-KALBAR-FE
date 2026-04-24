import store from '@store/index';
import { stringToJSON } from './data.helper';

/** GET ALL ROLES ACTION IN A MODULE */
const ROLE_ACCESS = (module: string) => {
  const access = store.getState().auth?.access;

  const getRoleAccess = stringToJSON(access?.privileges);

  const roleAccess: any = getRoleAccess ? getRoleAccess : {};

  if (roleAccess[module]) {
    const priv = roleAccess[module];
    return priv;
  } else if (module == 'all') {
    return roleAccess;
  }
  return [];
};

/** CHECK ROLE ACTION IN MODULE */
const ROLE_ACTION = (roleAccess: any = [], action: string) => {
  const priv = roleAccess.indexOf(action);
  return priv >= 0 ? true : false;
};

/** EXPORT FUNCTION */
export { ROLE_ACCESS, ROLE_ACTION };
