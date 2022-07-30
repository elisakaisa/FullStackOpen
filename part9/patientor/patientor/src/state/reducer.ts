import { State } from "./state";
import { Patient, Diagnosis, AddEntry, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: AddEntry;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
      case "ADD_ENTRY":
        console.log("reducer.ts -> ADD_ENTRY -> action.payload:", action.payload);

        const patientBeforeNewEntry = state.patients[action.payload.patientId];
        console.log("reducer.ts -> ADD_ENTRY -> patientBeforeNewEntry{}:", patientBeforeNewEntry);
        //const PatientAfterNewEntry: Patient = patientBeforeNewEntry.entries.concat(action.payload.entry);
        const patientAfterNewEntry = {
          ...patientBeforeNewEntry,
          entries: [...patientBeforeNewEntry.entries, action.payload.entry]
        };
        console.log("reducer.ts -> ADD_ENTRY -> patientAfterNewEntry{}:", patientAfterNewEntry);

        return { 
          ...state,
          patients: {
            ...state.patients,
            [action.payload.patientId]: patientAfterNewEntry
          }
        };
    default:
      return state;
  }
};

// 9.18
export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const getPatientDetails = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  console.log('diagnoses', diagnoses);
  return { 
    type: "SET_DIAGNOSIS_LIST", 
    payload: diagnoses 
  };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry,
      patientId
    }
  };
};