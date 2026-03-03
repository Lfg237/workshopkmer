import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const chatPath = path.join(process.cwd(), 'data', 'chat.json');
    const chat = JSON.parse(fs.readFileSync(chatPath, 'utf8'));

    // Retourne tous les messages du chat
    res.status(200).json(chat);

  } catch (error) {
    res.status(500).json({ error: 'Erreur lecture chat.json' });
  }
}
