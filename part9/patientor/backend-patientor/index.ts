import express from 'express';
import cors from "cors";

// Internal imports
import diagnosisRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});