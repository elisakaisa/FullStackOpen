import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getAll = ():Array<Diagnosis> => {
    return diagnosisData;
};

export default {getAll};