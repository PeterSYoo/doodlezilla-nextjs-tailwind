import { NextApiRequest, NextApiResponse } from 'next';
import Doodles from '../models/Doodles';
import Likes from '../models/Likes';
import Users from '../models/Users';

/* GET a Likes Document Using UserId & DoodleId */
export const getLikesRelatedToUserAndDoodle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId, userId } = req.query;

    const likes = await Likes.findOne({
      doodle: doodleId,
      user: userId,
    });

    if (!likes)
      return res.status(404).json({ error: 'Likes Document not Found' });

    res.status(200).json(likes);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Likes' });
  }
};
/*  */

/* POST a new Like With UserId & DoodleId*/
export const postLike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, doodleId } = req.query;
    /* First look for a likes document that have the specific userId and doodleId prop then create a new like document if none was found */
    const likes = await Likes.findOne({
      doodle: doodleId,
      user: userId,
    });
    console.log(likes);
    if (likes === null) {
      /* create a new like document if none was found */
      await Likes.create({
        doodle: doodleId,
        user: userId,
      });
    }

    res.status(200).json({ error: 'Likes document already exists.' });
  } catch (error) {
    res.status(404).json({ error: 'Error While Creating Likes Document' });
  }
};
/*  */

/* PUT Find a Like Document by UserId and DoodleId. Find a Doodle Document by DoodleId. Update the Like Prop to True, then Update the Like Prop in the Doodle Document by +1. */
export const putLikeUpdateTrue = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, doodleId } = req.query;

    const likes = await Likes.findOneAndUpdate(
      { user: userId, doodle: doodleId },
      {
        $set: { likes: true },
      }
    );
    if (!likes) {
      res.status(404).json({ error: 'Likes document does not exist.' });
    }

    if (likes) {
      const ifLikesIsTrue = await Likes.findOne({
        user: userId,
        doodle: doodleId,
        likes: true,
      });
      if (ifLikesIsTrue.likes === true) {
        const updateDoodleLikes = await Doodles.findByIdAndUpdate(doodleId, {
          $inc: { likes: 1 },
        });

        res.status(200).json(updateDoodleLikes);
      }
    }

    res.status(200).json(likes);
  } catch (error) {
    res.status(404).json({ error: 'Error While Creating Likes Document' });
  }
};
/*  */

/* PUT Find a Like Document by UserId and DoodleId. Find a Doodle Document by DoodleId. Update the Like Prop to False, then Update the Like Prop in the Doodle Document by +1. */
export const putLikeUpdateFalse = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, doodleId } = req.query;

    const likes = await Likes.findOneAndUpdate(
      { user: userId, doodle: doodleId },
      {
        $set: { likes: false },
      }
    );
    if (!likes) {
      res.status(404).json({ error: 'Likes document does not exist.' });
    }

    if (likes) {
      const ifLikesIsFalse = await Likes.findOne({
        user: userId,
        doodle: doodleId,
        likes: false,
      });
      if (ifLikesIsFalse.likes === false) {
        const updateDoodleLikes = await Doodles.findByIdAndUpdate(doodleId, {
          $inc: { likes: -1 },
        });

        res.status(200).json(updateDoodleLikes);
      }
    }

    res.status(200).json(likes);
  } catch (error) {
    res.status(404).json({ error: 'Error While Creating Likes Document' });
  }
};
/*  */
