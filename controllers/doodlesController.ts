import { NextApiRequest, NextApiResponse } from 'next';
import Doodles from '../models/Doodles';

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

    Doodles.create(formData, (err: any, data: any) => {
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

/* PUT Increment Likes Prop on a Single Comment by 1 */
export const putDoodleLikes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;
    const formData = req.body;

    if (doodleId && formData) {
      const doodle = await Doodles.findOneAndUpdate(
        { _id: doodleId },
        { $inc: { likes: 1 } },
        { new: true }
      ).then((likes) => console.log(likes.likes));
      res.status(200).json(doodle);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Doodle!' });
  }
};
