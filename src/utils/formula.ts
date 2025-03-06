import { $Enums } from "@prisma/client";

const calculateHeartPts = (minutes: number = 0, type?: $Enums.WorkoutType) => {
  let heartPts = 0;

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
  durationMinutes: number = 0,
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
   * @param {number} durationMinutes - Duration of the activity in minutes.
   * @returns {number} Calories burned during the activity in kCal.
   */
  const MET = type === "cycling" ? 6 : type === "running" ? 9.8 : 3.5; // 1 MET = energy burned while resting

  const hours = durationMinutes / 60;

  return MET * weightKg * hours; // kCal
};

export { calculateHeartPts, calculateCaloriesBurn };
