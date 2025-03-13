import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
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

  const data = await db.workout.aggregate({
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
      steps: true,
      durationMs: true,
    },
    _avg: {
      heartPts: true,
    },
  });

  return { ...data._avg, ...data._sum };
};

const createNew = async (info: createWorkOutInputsTypes) => {
  const data = await db.workout.create({
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

export = {
  getMulti,
  getSingle,
  createNew,
  updateOne,
  deleteOne,
  getUserWorkOutStats,
};
