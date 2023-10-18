import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (!req.body.id || !req.body.username || !req.body.groupId)
    return res.status(500).json('Ein fehler ist aufgetreten');

  if (req.method === 'PUT') {
    try {
      const userId = req.body.id;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: req.body.username,
          groupId: req.body.groupId,
          rights: {
            set: req.body.rights.map(right => ({ id: right })),
          },
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
