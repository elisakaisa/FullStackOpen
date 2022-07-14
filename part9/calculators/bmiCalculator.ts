const bmiCalculator = (height: number, weight: number): string => {
    const BMI: number = weight / Math.pow((height / 100), 2);
    if (BMI < 16) {
        return "Underweight (Severe thinness)"
    } else if (BMI >= 16 && BMI <17) {
        return "Underweight (Moderate thinness)"
    } else if (BMI >= 17 && BMI <18.5) {
        return "Underweight (Mild thinness)"
    } else if (BMI >= 18.5 && BMI <25) {
        return "Normal range"
    } else if (BMI >= 25 && BMI <30) {
        return "Overweight (pre-obese)"
    } else if (BMI >= 30 && BMI <35) {
        return "Obese (class I)"
    } else if (BMI >= 35 && BMI <40) {
        return "Obese (class II)"
    } else {
        return "Obese (class III)"
    } 
    
}

console.log(bmiCalculator(169, 42));