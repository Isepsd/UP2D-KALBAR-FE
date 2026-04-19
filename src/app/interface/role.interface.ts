// ROLE
interface IRole {
  id: number;
  name: string;
  level: 0;
  privilages: string; // object string
  description: string;
  createdAt: string;
  updatedAt: string;
}


export const RoleField = {
  "id": undefined,
  "name": "",
  "level": 0,
  "privileges": "",
  "description": "",
};

export type { IRole };
