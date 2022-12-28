import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../models/Users';

/* GET all Users */
export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: 'Users not Found' });
    if (users) return res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Users' });
  }
};

/* GET a Single User */
export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    const user = await Users.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not Found' });
    if (user) return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
};

/* PUT a Single User */
export const putUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    /* 

    - If Username in the Form Data object already exists in any of the User's documents in the User collection, except userId's name in the users collection ,then return a 404 error 'Name already exists'.

    - If Username in the Form Data object is the same as the User document's Username, then update 'name', 'biography' and 'location' props using the Form Data object.

    - If Username in the Form Data object is not the same as the User document's Username,
    then update 'name', 'biography' and 'location' props using the Form Data object.

    */

    const { userId } = req.query;
    const formData = req.body;

    // Check if the username in the form data already exists in any of the User's documents
    const existingUser = await Users.findOne({
      // except the current user's document (identified by userId)
      _id: { $ne: userId },
      name: formData.name,
    });

    if (existingUser) {
      // Check if the name in the form data is the same as the current user's document's name
      const currentUser = await Users.findById(userId);
      if (currentUser.name !== formData.name)
        return res.status(404).json({ error: 'Name already exists' });

      if (currentUser.name === formData.name) {
        const updatedUser = await Users.findByIdAndUpdate(userId, formData);
        return res.status(200).json(updatedUser);
      }
    }

    if (!existingUser) {
      const updatedUser = await Users.findByIdAndUpdate(userId, formData);
      return res.status(200).json(updatedUser);
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

    if (formData) {
      Users.create(formData, (err: Error, data: any) => {
        return res.status(200).json(data);
      });
    }
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
    }

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
};
