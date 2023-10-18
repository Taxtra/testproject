import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (!req.body.username || !req.body.groupId)
    res.status(500).json('Ein fehler ist aufgetreten');

  if (req.method === 'POST') {
    try {
      //POST new Right
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          group: {
            connect: { id: req.body.groupId },
          },
          rights: {
            connect: req.body.rights.map(right => ({ id: right })),
          },
        },
      });

      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
