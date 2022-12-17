import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';

export default async function tickersApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
