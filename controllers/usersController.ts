import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../models/Users';

/* GET all Users */
export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: 'Data not Found' });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Users' });
  }
};

/* GET a Single User */
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

/* PUT a Single User */
export const putUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const userToUpdate = await Users.findById(userId);
      if (formData.name === userToUpdate.name) {
        const user = await Users.findByIdAndUpdate(userId, formData);
        res.status(200).json(user);
      }
      const nameExists = await Users.findOne({ name: formData.name });
      if (nameExists) {
        res.status(400).json({ error: 'Name already exists' });
        return;
      }
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while updating User!' });
  }
};

/* POST a User */
export const postUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    Users.create(formData, (err: Error, data: any) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

/* GET a Single User by Username */
export const getUserByUsername = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { username } = req.query;

    const user = await Users.findOne({ name: username });
    if (!user) {
      throw new Error('No user found with that Username!');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
};
