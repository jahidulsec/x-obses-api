import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  createStepsInputsTypes,
  createWorkOutInputsTypes,
  updateWorkOutInputTypes,
  workOutsQueryInputTypes,
} from "../../../schemas/workout";

const getMulti = async (queries: workOutsQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.workout.findMany({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
          mobile: {
            startsWith: queries.search || undefined,
          },
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.workout.count({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
          mobile: {
            startsWith: queries.search || undefined,
          },
        },
      },
    }),
  ]);

  return { data, count, page, size };
};

const getSingle = async (idObj: requiredIdTypes) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const data = await db.workout.findUnique({
    where: { id },
  });

  return data;
};

const getUserWorkOutStats = async (
  idObj: requiredIdTypes,
  queries: workOutsQueryInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const view = queries?.view;

  const now = new Date();

  let startDate: Date;

  //   get start date on view type
  switch (view) {
    case "monthly":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;

    case "weekly":
      const previousWeek = new Date();
      previousWeek.setDate(now.getDate() - 7);
      startDate = previousWeek;
      break;

    default:
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = yesterday;
      break;
  }

  const [data, steps] = await Promise.all([
    db.workout.aggregate({
      where: {
        userId: id,
        createdAt: {
          gt: startDate,
          lte: now,
        },
      },
      _sum: {
        calories: true,
        distanceKm: true,
        durationMs: true,
      },
      _avg: {
        heartPts: true,
      },
    }),
    db.steps.aggregate({
      where: {
        userId: id,
        createdAt: {
          gt: startDate,
          lte: now,
        },
      },
      _sum: {
        steps: true,
      },
    }),
  ]);

  return { ...data._avg, ...data._sum, ...steps._sum };
};

const createNew = async (info: createWorkOutInputsTypes) => {
  const data = await db.workout.create({
    data: {
      ...info,
    },
  });

  return data;
};

const createNewSteps = async (info: createStepsInputsTypes) => {
  const data = await db.steps.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateWorkOutInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.workout.update({
    where: { id: id },
    data: { ...info },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.workout.delete({
    where: { id: id },
  });

  return deleted;
};

const getActivityHistory = async (
  idObj: requiredIdTypes,
  queries: workOutsQueryInputTypes
) => {
  const { id } = idObj;
  const view = queries?.view || "daily";
  const now = queries?.date ? new Date(queries.date) : new Date();
  let startDate: Date;

  if (view === "monthly") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 30);
  } else if (view === "weekly") {
    startDate = new Date();
    startDate.setDate(now.getDate() - 7);
  } else {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  }

  const [workouts, steps] = await Promise.all([
    db.workout.findMany({
      where: {
        userId: id,
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    db.steps.findMany({
      where: {
        userId: id,
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Grouping logic
  const result: any = {
    summary: {
      steps: 0,
      calories: 0,
      heartPts: 0,
      workoutTimeMs: 0,
      distanceKm: 0,
    },
    charts: {
      steps: [],
      calories: [],
      workoutTime: [],
    },
    view,
  };

  // Calculate summary
  workouts.forEach((w) => {
    result.summary.calories += Number(w.calories);
    result.summary.heartPts += Number(w.heartPts);
    result.summary.workoutTimeMs += w.durationMs;
    result.summary.distanceKm += Number(w.distanceKm);
  });
  steps.forEach((s) => {
    result.summary.steps += s.steps;
  });

  // Calculate average heart rate if there are workouts
  if (workouts.length > 0) {
    result.summary.heartPts = result.summary.heartPts / workouts.length;
  }

  // Pre-fill chart points based on view
  const pointsMap: Record<string, { steps: number; calories: number; workoutTime: number }> = {};
  
  if (view === "daily") {
    for (let i = 0; i < 24; i++) {
      const label = i.toString().padStart(2, "0");
      pointsMap[label] = { steps: 0, calories: 0, workoutTime: 0 };
    }
    workouts.forEach((w) => {
      const hour = new Date(w.createdAt).getHours().toString().padStart(2, "0");
      if (pointsMap[hour]) {
        pointsMap[hour].calories += Number(w.calories);
        pointsMap[hour].workoutTime += w.durationMs;
      }
    });
    steps.forEach((s) => {
      const hour = new Date(s.createdAt).getHours().toString().padStart(2, "0");
      if (pointsMap[hour]) {
        pointsMap[hour].steps += s.steps;
      }
    });
  } else {
    // Weekly or Monthly
    const days = view === "weekly" ? 7 : 30;
    for (let i = days; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const label = d.toISOString().split("T")[0];
      pointsMap[label] = { steps: 0, calories: 0, workoutTime: 0 };
    }
    workouts.forEach((w) => {
      const day = new Date(w.createdAt).toISOString().split("T")[0];
      if (pointsMap[day]) {
        pointsMap[day].calories += Number(w.calories);
        pointsMap[day].workoutTime += w.durationMs;
      }
    });
    steps.forEach((s) => {
      const day = new Date(s.createdAt).toISOString().split("T")[0];
      if (pointsMap[day]) {
        pointsMap[day].steps += s.steps;
      }
    });
  }

  // Convert map to sorted array
  const sortedLabels = Object.keys(pointsMap).sort();
  sortedLabels.forEach((label) => {
    result.charts.steps.push({ label, value: pointsMap[label].steps });
    result.charts.calories.push({ label, value: pointsMap[label].calories });
    result.charts.workoutTime.push({ label, value: pointsMap[label].workoutTime / (60 * 1000) }); // in minutes
  });

  return result;
};

const getMyWorkouts = async (
  idObj: requiredIdTypes,
  queries: workOutsQueryInputTypes
) => {
  const { id } = idObj;
  const size = queries?.size ?? 10;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.workout.findMany({
      where: {
        userId: id,
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.workout.count({
      where: {
        userId: id,
      },
    }),
  ]);

  return { data, count, page, size };
};

export = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
  getUserWorkOutStats,
  getActivityHistory,
  createNewSteps,
  getMyWorkouts,
};
