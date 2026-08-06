export const sendSMS = async (mobile: string, message: string) => {
  // send sms to mobile
  const send = await fetch(
    `https://api.mobireach.com.bd/SendTextMessage?Username=${process.env.SMS_USERNAME}&Password=${process.env.SMS_PASSWORD}&From=Impala&To=${mobile}&Message=${message}`,
    {
      method: "GET",
    },
  );

  if (!send.ok) {
    throw new Error("Something went wrong");
  }
};
