import mongoose from 'mongoose';

const DB_URL: any = process.env.NEXT_PUBLIC_MONGODB_URL_USERDB;

const usersConnect = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URL);

    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default usersConnect;
