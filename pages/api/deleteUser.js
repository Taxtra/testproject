import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      //DELETE Group
      const deleteGroup = await prisma.user.delete({
        where: { id: req.body.id },
      });

      return res.status(200).json(deleteGroup);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
