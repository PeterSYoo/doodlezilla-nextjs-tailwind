import { NextApiRequest, NextApiResponse } from 'next';
import Comments from '../models/Comments';

/* GET all Comments */
export const getComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const comments = await Comments.find({});

    if (!comments) return res.status(404).json({ error: 'Comments not Found' });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching all Comments' });
  }
};

/* PUT a Single Comment */
export const putComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { commentId } = req.query;
    const formData = req.body;

    if (commentId && formData) {
      const comment = await Comments.findByIdAndUpdate(commentId, formData);
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Comment!' });
  }
};

/* POST a Comment */
export const postComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    Comments.create(formData, (err: any, data: any) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

/* DELETE a Comment */
export const deleteComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { commentsId }: any = req.query;

    if (commentsId) {
      const comments = await Comments.findByIdAndDelete(commentsId);
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting Comments' });
  }
};

/* PUT Increment Likes Prop on a Single Comment by 1 */
export const putCommentLikes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { commentId } = req.query;
    const formData = req.body;

    if (commentId && formData) {
      const comment = await Comments.findOneAndUpdate(
        { _id: commentId },
        { $inc: { likes: 1 } },
        { new: true }
      ).then((likes) => console.log(likes.likes));
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Comment!' });
  }
};
