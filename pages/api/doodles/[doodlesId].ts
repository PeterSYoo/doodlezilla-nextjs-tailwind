import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';

export default async function tickersIdApi(
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
    case 'POST':
      break;
    case 'DELETE':
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
