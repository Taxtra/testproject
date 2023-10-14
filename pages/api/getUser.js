import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // GET User
      const getUser = await prisma.user.findMany({
        include: {
          rights: true,
        },
      });

      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
