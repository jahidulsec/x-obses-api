export type Days =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const countDays = (startDate: Date, endDate: Date, day: Days) => {
  let count = 0;

  const targetDayIndex = days.findIndex((item) => item === day);

  const currentDate = new Date(startDate); // Clone to avoid mutating the original startDate

  while (currentDate <= endDate) {
    if (currentDate.getDay() === targetDayIndex) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};

export { countDays };
