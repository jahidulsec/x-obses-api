import db from "../../../db/db";
import { requiredIdTypes } from "../../../schemas/required-id";
import { createLoginInputTypes } from "../../../schemas/user-login";
import { addMinutesToDate, generateOtp } from "../../../utils/otp";

const getLoginOtp = async (info: createLoginInputTypes) => {
  // get user
  const user = await db.users.findUnique({
    where: { mobile: info.mobile },
  });

  //   generate otp
  const expireAt = addMinutesToDate(new Date(), 5);
  const code = generateOtp();

  // create otp by user id
  const data = await db.otp.create({
    data: {
      userId: user?.id,
      code: code,
      useCase: "login",
      expiresAt: expireAt,
    },
  });

  return data;
};

const getSignUpOtp = async (info: createLoginInputTypes) => {
  //   generate otp
  const expireAt = addMinutesToDate(new Date(), 5);
  const code = generateOtp();

  // create otp by user id
  const data = await db.otp.create({
    data: {
      mobile: info.mobile,
      code: code,
      useCase: "signup",
      expiresAt: expireAt,
    },
  });

  return data;
};

const getOtpById = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  // get otp profile
  const data = await db.otp.findUnique({
    where: { id },
  });

  return data;
};

const createUser = async (info: createLoginInputTypes) => {
  const data = await db.users.create({
    data: {
      mobile: info.mobile,
    },
  });

  return data;
};

const deleteOtp = async (idObj: requiredIdTypes) => {
  //extract id from validated id by zod
  const { id } = idObj;

  const deleted = await db.otp.delete({
    where: { id },
  });

  return deleted;
};

export = {
  getLoginOtp,
  getSignUpOtp,
  getOtpById,
  createUser,
  deleteOtp,
};
