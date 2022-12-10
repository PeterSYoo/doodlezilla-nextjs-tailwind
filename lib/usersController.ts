import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../models/Users';

// GET all users
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: 'Data not Found' });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Users' });
  }
};

// GET single user
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
};

// PUT single user
export const putUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while updating User!' });
  }
};

// POST
export const postUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    Users.create(formData, (err: any, data: any) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
