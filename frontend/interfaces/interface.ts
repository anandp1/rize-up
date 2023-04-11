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
}

export interface Message {
  sender: string;
  receiver: string;
  time: string;
  content: string;
  tEmail: string;
  mEmail: string;
}

export interface TrainerInformation {
  about_me: string;
  interests: string[];
  experience: TrainerExperience[];
  trainerInfo: Trainer;
}

interface TrainerExperience {
  trainer_email: string;
  description: string;
  years_of_experience: number;
  education: string;
}

export interface TrainersInformationMap {
  [email: string]: TrainerInformation;
}

export interface ClassSection {
  name: string;
  length: number;
  cost: number;
  sec: number;
  time: string;
  day: number;
  capacity: number;
  room: number;
  tFname: string;
  tLname: string;
  joined: number;
  trainer?: string;
}

export interface ClassSectionsMap {
  [key: string]: ClassSection[];
}
