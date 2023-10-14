import prisma from '../../prisma/client';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const userId = req.body.id;

      // Hier wird die Many-to-Many-Beziehung verwaltet
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          username: req.body.username,
          groupId: req.body.groupId,
          rights: {
            // Verwenden Sie `set`, um die Rechte des Benutzers zu ersetzen
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
