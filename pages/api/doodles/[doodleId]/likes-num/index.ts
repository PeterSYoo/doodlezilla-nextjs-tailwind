import { NextApiRequest, NextApiResponse } from 'next';
import { getAllLikesNum } from '../../../../../controllers/likesNumController';
import usersConnect from '../../../../../database/usersConnect';

export default async function likesNumApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getAllLikesNum(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
