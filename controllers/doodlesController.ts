import { NextApiRequest, NextApiResponse } from 'next';
import Doodles from '../models/Doodles';
import Users from '../models/Users';

/* GET all Doodles */
export const getAllDoodles = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const doodles = await Doodles.find({});

    if (!doodles) return res.status(404).json({ error: 'Data not Found' });
    res.status(200).json(doodles);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching all Doodles' });
  }
};

/* GET a Single Doodle */
export const getDoodle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { doodleId } = req.query;

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

    Doodles.create(formData, (err: Error, data: any) => {
      return res.status(200).json(data);
    });
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

    if (doodleId) {
      const doodles = await Doodles.findByIdAndDelete(doodleId);
      res.status(200).json(doodles);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting Doodles' });
  }
};

/* PUT Increment Likes Prop, if likesTrueFalse is True, then increment likes by 1 */
export const putDoodleLikesTrue = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;

    if (doodleId) {
      const doodle = await Doodles.findByIdAndUpdate(doodleId, {
        likesTrueFalse: true,
      });
      if (!doodle) return res.status(404).json({ error: 'Doodle not found' });

      if (doodle) {
        const doodleLikesIncrement = await Doodles.findByIdAndUpdate(doodleId, {
          $inc: { likes: 1 },
        });
        res.status(200).json(doodleLikesIncrement);
      }
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Incrementing the Likes!' });
  }
};

/* PUT Decrement Likes Prop, if likesTrueFalse is False, then decrement likes by 1 */
export const putDoodleLikesFalse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;

    if (doodleId) {
      const doodle = await Doodles.findByIdAndUpdate(doodleId, {
        likesTrueFalse: false,
      });
      if (!doodle) return res.status(404).json({ error: 'Doodle not found' });

      if (doodle) {
        const doodleLikesDecrement = await Doodles.findByIdAndUpdate(doodleId, {
          $inc: { likes: -1 },
        });
        res.status(200).json(doodleLikesDecrement);
      }
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Decrementing the Likes!' });
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

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
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
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user) {
      const doodles = await Doodles.find({ user: user._id });
      if (!doodles) return res.status(404).json({ error: 'Doodle not found' });
      res.status(200).json(doodles);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
