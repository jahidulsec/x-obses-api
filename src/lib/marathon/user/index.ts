import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  marathonUsersQueryInputTypes,
  createMarathonUserInputsTypes,
  updateMarathonUserInputTypes,
} from "../../../schemas/marathon-user";

const getMulti = async (queries: marathonUsersQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";
  const marathonId = queries?.marathonId;

  const [data, count] = await Promise.all([
    db.marathonUser.findMany({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
        },
        marathonId: marathonId,
      },
      include: {
        user: {
          select: {
            fullName: true,
            image: true,
          },
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: [
        {
          distanceKm: sort,
        },
        {
          durationMs: "asc",
        },
      ],
    }),
    db.marathonUser.count({
      where: {
        user: {
          fullName: {
            startsWith: queries.search || undefined,
          },
        },
        marathonId: marathonId,
      },
    }),
  ]);

  return { data, count, page, size };
};

const getSingle = async (idObj: requiredIdTypes) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const data = await db.marathonUser.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          fullName: true,
          image: true,
        },
      },
    },
  });

  return data;
};

const getSingleLeaderboard = async (idObj: requiredIdTypes) => {
  const { id } = idObj;

  //extract id from validated id by zod
  const user = await db.marathonUser.findUnique({
    where: {
      id,
    },
  });

  // get rank by stats
  const data = await db.marathonUser.count({
    where: {
      distanceKm: {
        gt: user?.distanceKm ?? 0,
      },
      durationMs: {
        gt: user?.durationMs ?? 0,
      },
    },
  });

  const rank = data + 1;

  return {user, rank};
};

const createNew = async (info: createMarathonUserInputsTypes) => {
  const data = await db.marathonUser.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateMarathonUserInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.marathonUser.update({
    where: { id: id },
    data: {
      ...info,
    },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.marathonUser.delete({
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
  getSingleLeaderboard,
};
