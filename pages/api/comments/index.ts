import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllComments,
  postComment,
} from '../../../controllers/commentsController';
import usersConnect from '../../../database/usersConnect';

export default async function commentsApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getAllComments(req, res);
      break;
    case 'POST':
      postComment(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
