import { NextApiRequest, NextApiResponse } from 'next';
import Doodles from '../models/Doodles';
import UserIsLikesDoodle from '../models/UserIsLikesDoodle';

/* GET a UserIsLikesDoodle */
export const getUserIsLikesDoodle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await UserIsLikesDoodle.findOne({ user: userId });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
};
/*  */

/* POST a UserisLikesDoodle */
export const postIsLikesDoodle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, doodleId } = req.query;
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    /* Get User's Object Id from UserIsLikesDoodle */
    let user;
    try {
      const result = await UserIsLikesDoodle.findOne({ user: userId }).select(
        'user'
      );
      user = result.user.toString();
    } catch (error) {
      console.log(error);
    }
    /*  */

    /* Get Doodle's Object Id from UserIsLikesDoodle */
    let doodle;
    try {
      const result = await UserIsLikesDoodle.findOne({
        doodle: doodleId,
      }).select('doodle');
      doodle = result.doodle.toString();
    } catch (error) {
      console.log(error);
    }
    /*  */

    /* Check to see if User and Doodle Object Id's Match With the Id's in the req.query */
    if (user === userId && doodle === doodleId) {
      return res
        .status(404)
        .json({ error: 'User already has a likes document for this doodle' });
    } else {
      UserIsLikesDoodle.create(formData, (err: Error, data: any) => {
        if (!data) {
          return res.status(404).json({ err });
        }
        return res.status(200).json(data);
      });
    }
    /*  */
  } catch (error) {
    return res.status(404).json({ error });
  }
};
/*  */

/* PUT Increment Likes Prop, if likesTrueFalse is True, then increment likes by 1 */
export const putIsLikesDoodleTrue = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;

    if (doodleId) {
      const isLikes = await UserIsLikesDoodle.findOneAndUpdate(
        { doodle: doodleId },
        {
          isLikes: true,
        }
      );

      if (!isLikes) return res.status(404).json({ error: 'Likes not found' });

      if (isLikes) {
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
/*  */

/* PUT Decrement Likes Prop, if likesTrueFalse is False, then decrement likes by 1 */
export const putIsLikesDoodleFalse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;

    if (doodleId) {
      const isLikes = await UserIsLikesDoodle.findOneAndUpdate(
        { doodle: doodleId },
        {
          isLikes: false,
        }
      );
      if (!isLikes) return res.status(404).json({ error: 'Likes not found' });

      if (isLikes) {
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
/*  */
