import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatientDetails } from '../state';
import { Container } from '@material-ui/core';
import { Transgender, Female, Male } from "@mui/icons-material";

const PatientData = () => {

    const [{ patients }, dispatch] = useStateValue();
    
    const { id } = useParams<{ id: string }>();

    const patient = patients[id as string];

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
            <p>
                <strong>SSN:</strong> {patient.ssn}
            </p>
            <p>
                <strong>Occupation:</strong> {patient.occupation}
            </p>

        </Container>
    );
};

export default PatientData;