import { NextApiRequest, NextApiResponse } from 'next';
import Comments from '../models/Comments';
import Doodles from '../models/Doodles';
import LikesNum from '../models/LikesNum';
import Users from '../models/Users';

/* GET all Doodles With all Comments Referencing Each Individual Doodle Document. */
export const getAllDoodlesWithAllComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const doodles = await Doodles.find({});
    if (!doodles) return res.status(404).json({ error: 'Data not Found' });

    const doodleIds = [];

    for (let i = 0; i < doodles.length; i++) {
      doodleIds.push(doodles[i]._id);
    }

    const combinedData = [];
    for (let i = 0; i < doodleIds.length; i++) {
      let comments = await Comments.find({ doodle: doodleIds[i] });
      combinedData.push({
        doodle: doodleIds[i],
        comments: comments,
      });
    }

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
/*  */

/* GET all User Doodles With all Comments Referencing Each Individual Doodle Document. */
export const getUserDoodleWithAllComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const doodles = await Doodles.find({ user: userId });
      if (!doodles) return res.status(404).json({ error: 'Data not Found' });

      let combinedData = [];
      for (let i = 0; i < doodles.length; i++) {
        let comments = await Comments.find({ doodle: doodles[i]._id });

        combinedData.push({
          doodle: doodles[i],
          comments: comments,
        });
      }

      res.status(200).json(combinedData);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
/*  */

/* GET a Doodle Document and all Comments Referencing the Doodle Document. */
export const getDoodleWithAllComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { doodleId } = req.query;

    if (doodleId) {
      const doodle = await Doodles.findById(doodleId);
      if (!doodle) return res.status(404).json({ error: 'Doodle not found' });

      if (doodle) {
        const comments = await Comments.find({ doodle: doodle._id });
        if (!comments) {
          return res.status(404).json({ error: 'Comments not found' });
        }

        const usersAndComments: any = [];

        const combinedData = {
          doodle,
          usersAndComments,
        };

        for (let i = 0; i < comments.length; i++) {
          let users = await Users.findById(comments[i].user);
          usersAndComments.push({
            user: users,
            comments: comments[i],
          });
        }

        res.status(200).json(combinedData);
      }
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
/*  */

/* GET all User Doodles With all Comments and Likes Num */
export const getUserDoodleWithAllCommentsAndLikesNum = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const doodles = await Doodles.find({ user: userId });
      if (!doodles) return res.status(404).json({ error: 'Data not Found' });

      let combinedData = [];
      for (let i = 0; i < doodles.length; i++) {
        let comments = await Comments.find({ doodle: doodles[i]._id });
        let likesNum = await LikesNum.find({ doodle: doodles[i]._id });

        combinedData.push({
          doodle: doodles[i],
          likesNum: likesNum,
          comments: comments,
        });
      }

      res.status(200).json(combinedData);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users doodles' });
  }
};
/*  */
