import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (!req.body.id || !req.body.name || !req.body.rights)
    res.status(500).json('Ein fehler ist aufgetreten');

  if (req.method === 'PUT') {
    try {
      const groupId = req.body.id;

      const updatedGroup = await prisma.group.update({
        where: { id: groupId },
        data: {
          name: req.body.name,
          rights: {
            set: req.body.rights.map(right => ({ id: right })),
          },
        },
      });

      return res.status(200).json(updatedGroup);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
