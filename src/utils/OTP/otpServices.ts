import client from '../../loaders/redis';

// Function to generate a random OTP
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (userId: string): Promise<string> => {
  const otp = generateOtp();
  await client.setEx(`otp:${userId}`, 300, otp);
  return otp;
};

export async function verifyOtp(userId: string, otp: string): Promise<boolean> {
  const storedOtp = await client.get(`otp:${userId}`);
  if (storedOtp === otp) {
    await client.del(`otp:${userId}`);
    return true;
  } else {
    return false;
  }
}
