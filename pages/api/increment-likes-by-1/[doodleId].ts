import { NextApiRequest, NextApiResponse } from 'next';
import { putIsLikesDoodleTrue } from '../../../controllers/isLikesController';

import usersConnect from '../../../database/usersConnect';

export default async function doodleIdApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'PUT':
      putIsLikesDoodleTrue(req, res);
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
