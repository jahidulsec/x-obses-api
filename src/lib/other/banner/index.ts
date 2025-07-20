import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  bannersQueryInputTypes,
  createBannerInputsTypes,
  updateBannerInputTypes,
} from "../../../schemas/banner";

const getMulti = async (queries: bannersQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.banner.findMany({
      where: {
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
    db.banner.count({
      where: {
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
  const data = await db.banner.findUnique({
    where: { id },
  });

  return data;
};

const createNew = async (info: createBannerInputsTypes) => {
  const data = await db.banner.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateBannerInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.banner.update({
    where: { id: id },
    data: { ...info },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.banner.delete({
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
