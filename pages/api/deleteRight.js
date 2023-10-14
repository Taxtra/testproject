import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      //DELETE RIGHT
      const deleteRight = await prisma.right.delete({
        where: { id: req.body.id },
      });

      return res.status(200).json(deleteRight);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
