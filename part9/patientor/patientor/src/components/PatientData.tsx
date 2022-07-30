import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { uid } from "react-uid";

import { Patient, Discharge, SickLeave, Entry, HealthCheckRating } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatientDetails } from '../state';
import { Container } from '@material-ui/core';
import { Transgender, Female, Male } from "@mui/icons-material";
import { LocalHospital, Sick, MonitorHeart, Favorite } from '@mui/icons-material/';

const Hospital = ({ discharge }: { discharge: Discharge }) => {
    return (
      <>
        Discharge:<br/>
        {discharge.date}: {discharge.criteria}
      </>
    );
  };
  
  const OccupationalSickLeave = ({ sickLeave }: { sickLeave: SickLeave }) => {
    return (
      <>
        Sick leave:<br/>
        {sickLeave.startDate} - {sickLeave.endDate}
      </>
    );
  };

  const HealthCheck = ({ healthCheckRating }: { healthCheckRating: HealthCheckRating }) => {
    switch (healthCheckRating) {
        case 0:
            return (
                <>
                    Health check rating: {healthCheckRating} {" "}
                    <Favorite style={{ fill: '#02b308' }} /><br/>
                </>
            );
        case 1:
            return (
                <>
                    Health check rating: {healthCheckRating} {" "}
                    <Favorite style={{ fill: '#f5e902' }} /><br/>
                </>
            );
        case 2:
            return (
                <>
                    Health check rating: {healthCheckRating} {" "}
                    <Favorite style={{ fill: '#f58d05' }} /><br/>
                </>
            );
        case 3:
            return (
                <>
                    Health check rating: {healthCheckRating} {" "}
                    <Favorite style={{ fill: '#f50505' }} /><br/>
                </>
            );
        default:
            return (
                <>no rating provided</>
            );
    }

  };

const PatientData = () => {

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    
    const { id } = useParams<{ id: string }>();
    const patient = patients[id as string];
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const assertNever:any = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
    
      const entryDetails = (entry: Entry) => {
        switch (entry.type) {
          case "Hospital":
            return <Hospital discharge={entry.discharge} />;
          case "OccupationalHealthcare":
            if (entry.sickLeave) {  
              return (
                <>
                  Employer: {entry.employerName}<br/>
                  <OccupationalSickLeave sickLeave={entry.sickLeave} />
                </>
              );
            }
            return <>Employer: {entry.employerName}<br/></>;
          case "HealthCheck":
            return <HealthCheck healthCheckRating={entry.healthCheckRating}/>;
          default:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            return assertNever(entry);
        }
      };
    
      const entryIcon = (entry: Entry) => {
        switch (entry.type){
          case "Hospital":
            return <LocalHospital />;
          case "OccupationalHealthcare":
            return <Sick />;
          case "HealthCheck":
            return <MonitorHeart />;
          default:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            return assertNever(entry);
        }
      };

      const styles = {
        border: '1px solid red'
   };
    
    return (
        <Container>
            <h1>{patient.name} {genderIcon(patient)}</h1>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {entries.map(entry => (
                <div style={styles} key={entry.id} >
                    <p>{entry.date} {entryIcon(entry)}: {entry.description}</p>
                    <ul>
                    {entry.diagnosisCodes?.map((code) => (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    <li key={uid({})}>
                        {code} - {diagnoses[code] && diagnoses[code].name}
                    </li>
                    ))}
                </ul>
                <p>{entryDetails(entry)}</p>
                Diagnose by <i>{entry.specialist}</i>
                </div>
                ))}


        </Container>
    );
};

export default PatientData;