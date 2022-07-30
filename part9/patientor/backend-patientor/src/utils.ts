import { NewPatient, Gender, NewEntry, Diagnosis, HealthCheckRating, VisitType, Discharge, SickLeave } from './types';

type Fields = { name:unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDOB(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};

export { toNewPatient, toNewEntry };


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Wrong name format');
    }
    return name;
};

const parseDOB = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Wrong DOB format');
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Wrong ssn format');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Wrong gender format');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Wrong occupation format');
    }
    return occupation;
};




// ENTRY
const isType = (type: any): type is VisitType => {
    console.log("utils.ts / isType() / typeof type: ", typeof type);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(VisitType).includes(type);
  };

  const parseType = (type: unknown): VisitType => {
    if (!type || !isType(type)) {
        throw new Error('Wrong type format');
    }
    return type;
};
  
  const parseDescription = (description: unknown): string => {
    if ( !description || !isString(description) ) {
      throw new Error("Incorrect or missing description: " + description);
    }
    return description;
  };
  
  const parseSpecialist = (specialist: unknown): string => {
    if ( !specialist || !isString(specialist) ) {
      throw new Error("Incorrect or missing specialist: " + specialist);
    }
    return specialist;
  };
  
  const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnosis["code"]> => {
    return typeof diagnosisCodes === "object" || diagnosisCodes instanceof Array;
  };
  
  const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> => {
    if ( !diagnosisCodes || !isDiagnosisCodes(diagnosisCodes) ) {
      throw new Error("Incorrect or missing diagnosisCodes: " + diagnosisCodes);
    }
    return diagnosisCodes;
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(rating);
  };
  
  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (( healthCheckRating !== 0 && !healthCheckRating ) || !isHealthCheckRating(healthCheckRating) ) {
      throw new Error("Incorrect or missing healthCheckRating: " + healthCheckRating);
    }
    return healthCheckRating;
  };
  
  const isDischarge = (discharge: unknown): discharge is Discharge => {
    return typeof discharge === "object" || discharge instanceof Array;
  };
  
  const parseDischarge = (discharge: unknown): Discharge => {
    if ( !discharge || !isDischarge(discharge) ) {
      throw new Error("Incorrect or missing discharge: " + discharge);
    }
    return discharge;
  };
  
  const parseEmployerName = (employerName: unknown): string => {
    if ( !employerName || !isString(employerName) ) {
      throw new Error("Incorrect or missing employerName: " + employerName);
    }
    return employerName;
  };
  
  const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
    return typeof sickLeave === "object" || sickLeave instanceof Object;
  };
  
  const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if ( !isSickLeave(sickLeave) ) {
      throw new Error("Missing sickLeave: " + sickLeave);
    }
    return sickLeave;
  };
  
  type EntryFields = {
    type: unknown,
    description: unknown,
    date: unknown,
    specialist: unknown,  
    diagnosisCodes?: unknown,
    healthCheckRating?: unknown,
    discharge?: unknown,
    employerName?: unknown,
    sickLeave?: unknown
  };
  
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const toNewEntry = ({ 
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
    healthCheckRating,
    discharge,
    employerName,
    sickLeave,
  }: EntryFields) : NewEntry => {
    const baseEntry = {
      type: parseType(type),
      description: parseDescription(description),
      date: parseDOB(date),
      specialist: parseSpecialist(specialist),
      ...diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)} : null,
    };
    console.log('utils / toNewEntry / baseEntry', baseEntry);
  
    switch (type) {
      case "HealthCheck":
        const newHealthCheckEntry: NewEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };
        return newHealthCheckEntry;
  
      case "Hospital":
        const newHospitalEntry: NewEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(discharge),
        };
        return newHospitalEntry;
  
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: NewEntry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(employerName),
          ...sickLeave ? {sickLeave: parseSickLeave(sickLeave)} : null,
        };
        return newOccupationalHealthcareEntry;
  
      default:
        return assertNever(type as never);
    }
  };
