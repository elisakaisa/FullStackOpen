import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { PublicPatient, Patient, NewPatient } from '../types';

const getPatients = ():PublicPatient[] => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries
      }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
  };

const addPatient = (
    patient: NewPatient
): Patient => {
    const newPatient = {
        id: uuidv4(), 
        ...patient,
        entries:[]
    };
    patients.push(newPatient);
    return newPatient;
};

export default {getPatients, getPatient, addPatient};