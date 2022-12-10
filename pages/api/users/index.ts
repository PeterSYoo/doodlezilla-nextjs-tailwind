import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';
import { getUsers, postUsers } from '../../../lib/usersController';

export default async function usersApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getUsers(req, res);
      break;
    case 'POST':
      postUsers(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
