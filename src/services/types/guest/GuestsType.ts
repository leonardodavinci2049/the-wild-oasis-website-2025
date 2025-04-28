
export interface GuestsType {
  id?: number | string | null | undefined;
  created_at?: string;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string | null;
}


export interface InsertGuestsType {
  id?: number | string | null | undefined;
  created_at?: string;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string | null;
}


export interface UpdateGuestsType {
  id?: number | string | null | undefined;
  created_at?: string;
  fullName: string;
  email: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string | null;
}
