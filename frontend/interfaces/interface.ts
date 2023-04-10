import { StringLiteral } from "typescript";

export interface Customer {
  email: string;
  birthDate: string;
  age: number;
  gender: string;
  password?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateJoined: string;
  membershipName: string;
  gymId: number;
}

export interface Trainer {
  email: string;
  birthDate: string;
  age: number;
  gender: string;
  password?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gymId: number;
  about_me: string;
}

export interface Message {
  sender: string;
  receiver: string;
  time: string;
  content: string;
  tEmail: string;
  mEmail: string;
}
