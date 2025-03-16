import db from "../../db/db";
import { requiredIdTypes } from "../../schemas/required-id";
import {
  createAdminInputsTypes,
  updateAdminInputTypes,
  adminsQueryInputTypes,
} from "../../schemas/admin";

const getMulti = async (queries: adminsQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.admins.findMany({
      where: {
        name: {
          startsWith: queries.search || undefined,
        },
      },
      take: size,
      skip: size * (page - 1),
      orderBy: {
        createdAt: sort,
      },
    }),
    db.admins.count({
      where: {
        name: {
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
  const data = await db.admins.findUnique({
    where: { id },
  });

  return data;
};

const getSingleByUsername = async (username: string) => {
  //extract id from validated id by zod
  const data = await db.admins.findUnique({
    where: { username: username },
  });

  return data;
};

const createNew = async (info: createAdminInputsTypes) => {
  const data = await db.admins.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateAdminInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.admins.update({
    where: { id: id },
    data: { ...info },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.admins.delete({
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
  getSingleByUsername,
};
