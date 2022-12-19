import { NextApiRequest, NextApiResponse } from 'next';
import { getUserDoodlesByUsername } from '../../../controllers/doodlesController';
import usersConnect from '../../../database/usersConnect';

export default async function usernameApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getUserDoodlesByUsername(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
