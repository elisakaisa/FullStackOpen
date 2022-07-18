import express from 'express';
import cors from "cors";

import { bmiCalculator } from './bmiCalculator';
import bodyParser from "body-parser";
import { calculateExercises, ParseExercises } from './exerciseCalculator';

const app = express();
//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

// BMI calculator
app.get('/bmi', (req, res) => {
    if (!req.query.height || !req.query.weight) {
        res.status(400).json({ error: 'parameters missing' });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi: string = bmiCalculator(height, weight);
    res.json({weight, height, bmi});
});


// Exercise calculator
app.post('/exercises', (req, res) => {
    
    if (!req.body.target || !req.body.daily_exercises) {
        res.status(400).json({ error: 'parameters missing' });
    }

    const parsedRequest = req.body as ParseExercises;
    const target = parsedRequest.target;
    if (isNaN(target)) {
        res.status(400).json({ error: 'malformatted parameters (target)' });
    }

    const trainingHours = parsedRequest.daily_exercises;
    
    let errorFound = false
    trainingHours.forEach(hours => {
        if (isNaN(hours)) {
            errorFound = true;
            console.log('error')
        }
    });

    if(errorFound) {
        res.status(400).json({ error: 'malformatted parameters (daily_exercises)' });
    }

    res.send(calculateExercises(target, trainingHours));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});