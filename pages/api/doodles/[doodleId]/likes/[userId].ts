import { NextApiRequest, NextApiResponse } from 'next';
import {
  getLikesRelatedToUserAndDoodle,
  postLike,
} from '../../../../../controllers/likesController';
import usersConnect from '../../../../../database/usersConnect';

export default async function doodleIdApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getLikesRelatedToUserAndDoodle(req, res);
      break;
    case 'POST':
      postLike(req, res);
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
