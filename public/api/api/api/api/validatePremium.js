import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email requis' });
  }

  const filePath = path.join(process.cwd(), 'data', 'profiles.json');

  try {
    const profiles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const index = profiles.findIndex(p => p.email === email);
    if (index > -1) {
      profiles[index].premium = true;
      fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
      res.status(200).json({ success: true, premium: true });
    } else {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lecture/ecriture profiles.json' });
  }
}
