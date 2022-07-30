import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { uid } from "react-uid";

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatientDetails } from '../state';
import { Container } from '@material-ui/core';
import { Transgender, Female, Male } from "@mui/icons-material";

const PatientData = () => {

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    
    const { id } = useParams<{ id: string }>();

    const patient = patients[id as string];
    console.log(diagnoses);
    const entries = patient.entries;

    useEffect(() => {
        const fetchPatient = async () => {
          try {
            const { data: patientData } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id as string}`
            );            
            dispatch(getPatientDetails(patientData));
            
          } catch (e) {
            console.log(e);
          }
        };
    
        if (!patient.ssn ) {
            void fetchPatient();
        }
        
      }, [dispatch]);


    const genderIcon = (patient: Patient) => {
        switch (patient.gender) {
            case "male":
            return <Male />;
            case "female":
            return <Female />;
            case "other":
            return <Transgender />;
            default:
            return null;
        }
    };
    
    return (
        <Container>
            <h1>{patient.name} {genderIcon(patient)}</h1>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {entries.map(entry => (
                <div key={entry.id}>
                    <p>{entry.date}: {entry.description}</p>
                    <ul>
                    {entry.diagnosisCodes?.map((code) => (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    <li key={uid({})}>
                        {code} - {diagnoses[code] && diagnoses[code].name}
                    </li>
                    ))}
                </ul>
                </div>
                ))}


        </Container>
    );
};

export default PatientData;