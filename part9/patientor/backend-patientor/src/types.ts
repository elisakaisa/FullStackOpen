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

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
}
  
export enum HealthCheckRating {
"Healthy" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

export interface Discharge {
date: string;
criteria: string;
}
export interface HospitalEntry extends BaseEntry {
type: "Hospital";
discharge: Discharge;
}

export interface SickLeave {
startDate: string;
endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
type: "OccupationalHealthcare";
employerName: string;
sickLeave?: SickLeave;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, "id">;

export enum VisitType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = "OccupationalHealthcare",
}

export type NewBaseEntry = UnionOmit<
  Entry, "id" | "healthCheckRating" | "discharge" | "employerName" | "sickLeave"
>;

export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;