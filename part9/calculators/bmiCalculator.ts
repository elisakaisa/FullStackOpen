//export const bmiCalculator = (args: Array<string>): String  => {
export const bmiCalculator = (height: number, weight: number): string  => {

    /*
    if (args.length != 4) {
        throw new Error('Incorrect number of arguments');
    }

    const height: number = Number(args[2])
    //console.log(height)
    const weight: number = Number(args[3])
    //console.log(weight)
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('height & weight must be numbers');
    } */

    const BMI: number = weight / Math.pow((height / 100), 2);
    if (BMI < 16) {
        return "Underweight (Severe thinness)";
    } else if (BMI >= 16 && BMI <17) {
        return "Underweight (Moderate thinness)";
    } else if (BMI >= 17 && BMI <18.5) {
        return "Underweight (Mild thinness)";
    } else if (BMI >= 18.5 && BMI <25) {
        return "Normal range";
    } else if (BMI >= 25 && BMI <30) {
        return "Overweight (pre-obese)";
    } else if (BMI >= 30 && BMI <35) {
        return "Obese (class I)";
    } else if (BMI >= 35 && BMI <40) {
        return "Obese (class II)";
    } else {
        return "Obese (class III)";
    } 
    
};

//console.log(bmiCalculator(process.argv))