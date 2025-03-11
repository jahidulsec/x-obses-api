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

  while (startDate <= endDate) {
    if (startDate.getDay() === days.findIndex((item) => item === day)) {
      count++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  return count;
};

export { countDays };
