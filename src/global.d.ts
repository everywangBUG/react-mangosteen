// declare global {

var isDev: boolean;

type JSONValue = string | number | boolean | null | { [k: string | number]: JSONValue } | JSONValue[]

type IResources<T> = {
  resources: T[];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
}

type IResource<T> = {
  resource: T;
}

type IUser = {
  id: number;
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}

type IItems = {
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

type Tag = {
  id: number
  kind: IItems['kind']
  user_id: number
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

type Balance = {
  balance: number;
  expenses: number;
  income: number;
}
// }
