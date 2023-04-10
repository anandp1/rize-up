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

interface TrainerInformation {
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
