import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (!req.body.name || !req.body.groupRights)
    res.status(500).json('Ein fehler ist aufgetreten');

  if (req.method === 'POST') {
    try {
      //Post new Group
      const newGroup = await prisma.group.create({
        data: {
          name: req.body.name,
          rights: {
            connect: req.body.groupRights,
          },
        },
      });

      return res.status(200).json(newGroup);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
