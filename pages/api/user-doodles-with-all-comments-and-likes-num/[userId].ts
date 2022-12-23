import { NextApiRequest, NextApiResponse } from 'next';
import { getUserDoodleWithAllCommentsAndLikesNum } from '../../../controllers/doodleWithAllCommentsController';
import usersConnect from '../../../database/usersConnect';

export default async function userDoodlesWithAllCommentsAndLikesNumAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch(() => {
    res.status(405).json({ error: 'Error in connecting to users database' });
  });

  const { method } = req;

  switch (method) {
    case 'GET':
      getUserDoodleWithAllCommentsAndLikesNum(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
