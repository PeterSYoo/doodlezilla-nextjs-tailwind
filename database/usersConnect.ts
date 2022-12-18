import mongoose from 'mongoose';

const DB_URL: string = process.env.NEXT_PUBLIC_MONGODB_URL_USERDB as string;

const usersConnect = async (): Promise<boolean> => {
  try {
    const { connection } = await mongoose.connect(DB_URL);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default usersConnect;
