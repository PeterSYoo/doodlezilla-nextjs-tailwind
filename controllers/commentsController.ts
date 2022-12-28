import { NextApiRequest, NextApiResponse } from 'next';
import Comments from '../models/Comments';

type Comment = {
  doodle: string;
  user: string;
  comment: string;
  _id: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
};

/* GET all Comments */
export const getAllComments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const comments = await Comments.find({});

    if (!comments) {
      return res.status(404).json({ error: 'Comments not Found' });
    }

    if (comments) {
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching all Comments' });
  }
};

/* PUT a Single Comment */
export const putComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { commentId } = req.query;
    const formData = req.body;

    if (!commentId || !formData) {
      res.status(404).json({ error: 'Error While Updating Comment' });
    }

    if (commentId && formData) {
      const comment = await Comments.findByIdAndUpdate(commentId, formData);
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Comment!' });
  }
};

/* POST a Comment */
export const postComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: 'Form data not provided!' });
    }

    if (formData) {
      Comments.create(formData, (err: Error, data: Comment) => {
        return res.status(200).json(data);
      });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

/* DELETE a Comment */
export const deleteComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { commentsId }: any = req.query;

    if (!commentsId) {
      res.status(404).json({ error: 'Error While Deleting Comment' });
    }

    if (commentsId) {
      const comments = await Comments.findByIdAndDelete(commentsId);
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting Comments' });
  }
};
