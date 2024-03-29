// declare global {

var isDev: boolean;

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [k: string | number]: JSONValue }
  | JSONValue[];

interface IResources<T> {
  resources: T[];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
}

interface IResource<T> {
  resource?: T;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}

interface IItems {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}

type ExpendIncome = "expenses" | "income";

interface Tag {
  id: number;
  sign: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  name: string;
  kind: "expenses" | "income";
}

interface Balance {
  balance: number;
  expenses: number;
  income: number;
}
// }
