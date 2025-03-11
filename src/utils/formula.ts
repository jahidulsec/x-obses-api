import { $Enums } from "@prisma/client";
import { gender } from "../types/user";

const calculateHeartPts = (
  milliseconds: number = 0,
  type?: $Enums.WorkoutType
) => {
  let heartPts = 0;
  const minutes = milliseconds / (1000 * 60);

  if (type === "cycling") {
    heartPts = minutes * 1.5; // cycling = duration * 1.5 || notes: const value varies on intensity
  } else if (type === "running") {
    heartPts = minutes * 2; // cycling = duration * 2
  } else {
    heartPts = minutes; // cycling = duration * 1
  }

  return heartPts;
};

const calculateCaloriesBurn = (
  duration: number = 0,
  weightKg: number,
  type?: $Enums.WorkoutType
) => {
  /**
   * Calculates calories burned during an activity.
   *
   * This function uses the MET formula to estimate calories burned based on
   * the type of activity, the user's weight, and the duration of the activity.
   *
   * @param {$Enums.WorkoutType} type - User workout type.
   * @param {number} weightKg - Weight of the person in kilograms.
   * @param {number} duration - Duration of the activity in milliseconds.
   * @returns {number} Calories burned during the activity in kCal.
   */
  const MET = type === "cycling" ? 6 : type === "running" ? 9.8 : 3.5; // 1 MET = energy burned while resting

  const minutes = duration / (1000 * 60 );

  return MET * weightKg * minutes * 3.5 / 200; // Cal
};

const calculateBMR = (
  weight: number,
  heightFt: number,
  heightIn: number,
  gender: gender,
  age: number
) => {
  // BMR Formula (Mifflin-St Jeor):
  //     Men: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (years) + 5
  //     Women: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (years) - 161
  let bmr = 0;

  const heightCM = (heightFt * 0.3048 + heightIn * 0.0254) / 100; // cm

  if (gender === "male") {
    bmr = 10 * weight + heightCM * 6.25 - 5 * age + 5;
  } else {
    bmr = 10 * weight + heightCM * 6.25 - 5 * age - 161;
  }
  return bmr;
};

const calculateBMI = (weight: number, heightFt: number, heightIn: number) => {
  const height = heightFt * 0.3048 + heightIn * 0.0254;

  let bmi;

  if (height === 0) {
    bmi = 0;
  } else {
    bmi = weight / Math.pow(height, 2);
  }

  return bmi.toFixed(2);
};

const calculateAge = (birthDate: Date) => {
  let birth = new Date(birthDate);
  let today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  let monthDiff = today.getMonth() - birth.getMonth();
  let dayDiff = today.getDate() - birth.getDate();

  // Adjust age if birthday hasn't occurred this year yet
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

const calculateCaloriesGoal = (type: $Enums.GoalType, BMR: number) => {
  let calorieGoal = 0;
  if (type === "gain_muscle") {
    calorieGoal = BMR * 1.3; // Surplus for muscle gain
  } else if (type === "lose_weight") {
    calorieGoal = BMR * 0.8; // Deficit for weight loss
  } else {
    calorieGoal = BMR * 1.1; // Maintenance for keeping fit
  }

  return calorieGoal;
};

export {
  calculateHeartPts,
  calculateCaloriesBurn,
  calculateBMI,
  calculateBMR,
  calculateAge,
  calculateCaloriesGoal,
};
