
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).send('Bad Request: user and message required');
  }

  const chatPath = path.join(process.cwd(), 'data', 'chat.json');

  try {
    const chat = JSON.parse(fs.readFileSync(chatPath, 'utf8'));

    chat.push({
      user,
      message,
      timestamp: Date.now()
    });

    fs.writeFileSync(chatPath, JSON.stringify(chat, null, 2));

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: 'Erreur lecture/ecriture chat.json' });
  }
}
