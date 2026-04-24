interface IFaker {
  uuid: string;
  findName: string;
  sentences: string;
  boolean: boolean,
  number: number,
  longNumber: number,
  email: string,
  phoneNumber: any,
  username: string,
  avatar: string,
  datetime: any,
  ip: any,
  alpha: string,
}

export type { IFaker };