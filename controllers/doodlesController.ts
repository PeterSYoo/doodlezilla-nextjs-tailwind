import { NextApiRequest, NextApiResponse } from 'next';
import Comments from '../models/Comments';
import Doodles from '../models/Doodles';
import Likes from '../models/Likes';
import Users from '../models/Users';

/* GET all Doodles */
export const getAllDoodles = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const doodles = await Doodles.find({});

    if (!doodles) {
      return res.status(404).json({ error: 'Doodles not Found' });
    }

    if (doodles) {
      res.status(200).json(doodles);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching all Doodles' });
  }
};

/* GET a Single Doodle */
export const getDoodle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { doodleId } = req.query;

    if (!doodleId) {
      return res.status(404).json({ error: 'Doodle not Found' });
    }

    if (doodleId) {
      const doodle = await Doodles.findById(doodleId);
      res.status(200).json(doodle);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the Single Doodle!' });
  }
};

/* PUT a Single Doodle */
export const putDoodle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { doodleId } = req.query;
    const formData = req.body;

    if (!doodleId || !formData) {
      return res.status(404).json({ error: 'Error Updating Doodle' });
    }

    if (doodleId && formData) {
      const doodle = await Doodles.findByIdAndUpdate(doodleId, formData);
      res.status(200).json(doodle);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Doodle!' });
  }
};

/* POST a Doodle */
export const postDoodle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    if (formData) {
      Doodles.create(formData, (err: Error, data: any) => {
        return res.status(200).json(data);
      });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

/* DELETE a Doodle */
export const deleteDoodle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId }: any = req.query;

    if (!doodleId) {
      return res.status(404).json({ error: 'Error Deleting Doodle!' });
    }

    if (doodleId) {
      await Doodles.findByIdAndDelete(doodleId);
      await Comments.deleteMany({ doodle: doodleId });
      await Likes.deleteMany({ doodle: doodleId });
      res.status(200).json('Deleted Doodles with Comments.');
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting Doodles' });
  }
};

/* GET all User's Doodles */
export const getUserDoodles = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;
    const user = await Doodles.find({ user: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};

/* GET all User's Doodles by Username */
export const getUserDoodlesByUsername = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { username } = req.query;
    const user = await Users.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user) {
      const doodles = await Doodles.find({ user: user._id });

      if (!doodles) {
        return res.status(404).json({ error: 'Doodle not found' });
      }

      if (doodles) {
        res.status(200).json(doodles);
      }
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
