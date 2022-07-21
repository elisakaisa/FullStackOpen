import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getPatients = ():NonSensitivePatient[] => {
    return patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
      }));
};

const addPatient = (
    patient: NewPatient
): Patient => {
    const newPatient = {
        id: uuidv4(), 
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {getPatients, addPatient};