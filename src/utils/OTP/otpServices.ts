import client from '../../loaders/redis';

// Function to generate a random OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (userId: string): Promise<string> => {
  const otp = generateOtp();
  const result = await client.setEx(`otp:${userId}`, 300, otp);
  console.log(result, userId);

  console.log(otp);

  return otp;
};

export const verifyOtp = async (
  userId: string,
  otp: number
): Promise<boolean> => {
  const storedOtp = await client.get(`otp:${userId}`);
  if (Number(storedOtp) === otp) {
    await client.del(`otp:${userId}`);
    return true;
  } else {
    return false;
  }
};
