import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  marathonsQueryInputTypes,
  createMarathonInputsTypes,
  updateMarathonInputTypes,
} from "../../../schemas/marathon";

const getMulti = async (queries: marathonsQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";
  const type = queries?.type;

  const [data, count] = await Promise.all([
    db.marathon.findMany({
      where: {
        type: type,
        title: {
          startsWith: queries.search || undefined,
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.marathon.count({
      where: {
        type: type,
        title: {
          startsWith: queries.search || undefined,
        },
      },
    }),
  ]);

  return { data, count, page, size };
};

const getSingle = async (idObj: requiredIdTypes) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const [data, totalParticiants] = await Promise.all([
    db.marathon.findUnique({
      where: { id },
    }),
    db.marathonUser.count({
      where: { marathonId: id },
    }),
  ]);

  return { data, totalParticiants };
};

const createNew = async (info: createMarathonInputsTypes) => {
  const rewardsList = info.rewards.map((title) => ({
    text: title,
  }));

  const data = await db.marathon.create({
    data: {
      title: info.title,
      about: info.about,
      startDate: info.startDate,
      endDate: info.endDate,
      description: info.description,
      type: info.type,
      distanceKm: info.distanceKm,
      imagePath: info.imagePath,
      Rewards: {
        createMany: {
          data: rewardsList,
        },
      },
    },
    include: {
      Rewards: true,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateMarathonInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.marathon.update({
    where: { id: id },
    data: {
      ...info,
      ...(info.rewards && {
        Rewards: {
          createMany: {
            data: info.rewards.map((title) => ({
              text: title,
            })),
          },
        },
      }),
    },
    include: {
      Rewards: true,
    },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.marathon.delete({
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
};
