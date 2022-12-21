import { NextApiRequest, NextApiResponse } from 'next';
import { postIsLikesDoodle } from '../../../../../controllers/isLikesController';
import usersConnect from '../../../../../database/usersConnect';
export default async function usersApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'POST':
      postIsLikesDoodle(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
