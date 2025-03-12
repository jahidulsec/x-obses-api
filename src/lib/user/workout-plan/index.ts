import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  createWorkOutPlanInputsTypes,
  updateWorkOutPlanInputTypes,
  workOutPlansQueryInputTypes,
} from "../../../schemas/workout-plan";

const getMulti = async (queries: workOutPlansQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.workoutGoal.findMany({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
          mobile: {
            startsWith: queries.search || undefined,
          },
          id: queries.search || undefined,
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.workoutGoal.count({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
          mobile: {
            startsWith: queries.search || undefined,
          },
          id: queries.search || undefined,
        },
      },
    }),
  ]);

  return { data, count, page, size };
};

const getMultiById = async (
  queries: workOutPlansQueryInputTypes,
  idObj: requiredIdTypes
) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";
  const startDate = queries?.startDate;
  const endDate = queries?.endDate;

  const { id } = idObj;

  const [data, count] = await Promise.all([
    db.workoutGoal.findMany({
      where: {
        user: {
          id: id,
        },
        startDate: {
          gte: startDate,
        },
        endDate: {
          lte: endDate,
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.workoutGoal.count({
      where: {
        user: {
          id: id,
        },
      },
    }),
  ]);

  return { data, count, page, size };
};

const getSingle = async (idObj: requiredIdTypes) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const data = await db.workoutGoal.findUnique({
    where: { id },
  });

  return data;
};

const getSingleByToken = async (idObj: requiredIdTypes, userId: string) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const data = await db.workoutGoal.findUnique({
    where: { id: id, userId: userId },
  });

  return data;
};

const createNew = async (info: createWorkOutPlanInputsTypes) => {
  const data = await db.workoutGoal.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateWorkOutPlanInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.workoutGoal.update({
    where: { id: id },
    data: { ...info },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.workoutGoal.delete({
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
  getMultiById,
  getSingleByToken,
};
