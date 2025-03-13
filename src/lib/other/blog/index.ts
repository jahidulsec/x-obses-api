import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import {
  blogsQueryInputTypes,
  createBlogInputsTypes,
  updateBlogInputTypes,
} from "../../../schemas/blog";

const getMulti = async (queries: blogsQueryInputTypes) => {
  const size = queries?.size ?? 20;
  const page = queries?.page ?? 1;
  const sort = queries?.sort ?? "desc";

  const [data, count] = await Promise.all([
    db.blogs.findMany({
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
    db.blogs.count({
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
  const data = await db.blogs.findUnique({
    where: { id },
  });

  return data;
};

const createNew = async (info: createBlogInputsTypes) => {
  const data = await db.blogs.create({
    data: {
      ...info,
    },
  });

  return data;
};

const updateOne = async (
  idObj: requiredIdTypes,
  info: updateBlogInputTypes
) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const updatedData = await db.blogs.update({
    where: { id: id },
    data: { ...info },
  });
  return updatedData;
};

const deleteOne = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.blogs.delete({
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
