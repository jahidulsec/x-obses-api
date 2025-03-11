import { $Enums } from "@prisma/client";

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

  const hours = duration / (1000 * 60 * 60);

  return MET * weightKg * hours; // kCal
};

// BMR Formula (Mifflin-St Jeor):

//     Men: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (years) + 5
//     Women: 10 × weight (kg) + 6.25 × height (cm) - 5 × age (years) - 161

export { calculateHeartPts, calculateCaloriesBurn };
