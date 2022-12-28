import { NextApiRequest, NextApiResponse } from 'next';
import Likes from '../models/Likes';
import LikesNum from '../models/LikesNum';

/* GET all LikesNum Document Using DoodleId */
export const getAllLikesNum = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;
    const likes = await LikesNum.find({
      doodle: doodleId,
    });

    if (!likes)
      return res.status(404).json({ error: 'LikesNum Document not Found' });
    if (likes) return res.status(200).json(likes);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching LikesNum' });
  }
};
/*  */

/* POST a LikesNum Document Using DoodleId & UserId */
export const postLikesNum = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId, userId } = req.query;
    const likes = await Likes.findOneAndUpdate(
      { user: userId, doodle: doodleId },
      {
        $set: { likes: true },
      }
    );

    if (!likes)
      return res.status(404).json({ error: 'Likes document does not exist.' });
    if (likes) {
      const likesNum = await LikesNum.create({
        doodle: doodleId,
        user: userId,
      });

      if (!likesNum)
        return res.status(404).json({ error: 'Likes Document not Found' });
      if (likesNum) return res.status(200).json(likesNum);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Likes' });
  }
};
/*  */

/* DELETE a LikesNum by DoodleId & UserId */
export const deleteLikesNum = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId, userId } = req.query;
    const likes = await Likes.findOneAndUpdate(
      { user: userId, doodle: doodleId },
      {
        $set: { likes: false },
      }
    );

    if (!likes)
      return res.status(404).json({ error: 'Likes document does not exist.' });
    if (likes) {
      await LikesNum.findOneAndDelete({ doodle: doodleId, user: userId });
      return res.status(200).json('Deleted LikesNum');
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching LikesNum' });
  }
};
/*  */
