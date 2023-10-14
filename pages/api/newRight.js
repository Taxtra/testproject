import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      //POST new right
      const newRight = await prisma.right.create({
        data: {
          name: req.body.name,
        },
      });

      return res.status(200).json(newRight);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
