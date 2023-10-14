import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // GET RIGHTS
      const getRights = await prisma.right.findMany();

      return res.status(200).json(getRights);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
