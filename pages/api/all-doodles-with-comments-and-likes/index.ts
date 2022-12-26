import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';
import { getInfiniteQuriesAllDoodles } from '../../../controllers/doodleWithAllCommentsController';

export default async function doodlesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getInfiniteQuriesAllDoodles(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}