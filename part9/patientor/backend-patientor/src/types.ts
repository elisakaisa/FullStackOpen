export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
  }

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>; //entries omitted bc otherwise error in utils.ts with newpatient

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other',
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}
  
export enum HealthCheckRating {
"Healty" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

interface Discharge {
date: string;
criteria: string;
}
interface HospitalEntry extends BaseEntry {
type: "Hospital";
discharge: Discharge;
}

interface SickLeave {
startDate: string;
endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
type: "OccupationalHealthcare";
employerName: string;
sickLeave?: SickLeave;
}

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;