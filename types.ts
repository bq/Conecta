export interface ITimeTable {
  L?: number[];
  M?: number[];
  X?: number[];
  J?: number[];
  V?: number[];
  S?: number[];
  D?: number[];
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  availability: ITimeTable;
}
