// ASET STATUS
interface ITokenRole {
 id_token_role: number;
  id_token: string;
  ext_user_token: string;
  nama:string;
  id_module: string;
  ext_module:string;
  

  
}

export const ITokenRoleFeild = {
  id_token_role:undefined,
  id_token:undefined,
  ext_user_token: '',
  nama:'',
  id_module:undefined,
  ext_module:'',
  
  
};

export type { ITokenRole}