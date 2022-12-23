import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteLikesNum,
  postLikesNum,
} from '../../../../../controllers/likesNumController';
import usersConnect from '../../../../../database/usersConnect';

export default async function likesNumUserIdApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'POST':
      postLikesNum(req, res);
      break;
    case 'DELETE':
      deleteLikesNum(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
