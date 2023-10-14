import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // GET Groups
      const getGroups = await prisma.group.findMany({
        include: {
          rights: true,
        },
      });

      return res.status(200).json(getGroups);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
