interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, trainingHours: Array<number>): Result => {

    /*
    if (args.length < 4) {
        throw new Error('Incorrect number of arguments');
    }

    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error('target must be a number');
    }

    const trainingHours : Array<number> = args.slice(3, args.length).map(hours => Number(hours));
    trainingHours.forEach(hours => {
        if (isNaN(hours)) {
          throw new Error('Weekly report must contain numbers');
        }
    }); */

    const periodLength : number = trainingHours.length;
    const totalHours : number = trainingHours.reduce((previous, current) => previous + current);
    const trainingDays : number = trainingHours.filter(day => day != 0).length;
    const average : number = totalHours / periodLength;
    
    const success : boolean = average >= target;
    let ratingDescription : string;
    let rating : number;
    
    if (success) {
        rating = 3;
        ratingDescription = "Goal achieved, congratulations!";
    }
    else if (average >= (target * 0.5)) {
        rating = 2;
        ratingDescription = "Halfway there";
    } 
    else {
        rating = 1;
        ratingDescription = "Go train you couch potato";
    }

    return {
        periodLength : periodLength,
        trainingDays : trainingDays,
        success : success,
        rating : rating,
        ratingDescription : ratingDescription,
        target : target,
        average : average
    };
};

export interface ParseExercises {
    daily_exercises: Array<number>;
    target: number;
  }

//console.log(calculateExercises(process.argv))