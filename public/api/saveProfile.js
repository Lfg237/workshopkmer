import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const profile = req.body;

  if (!profile.email) {
    return res.status(400).json({ success: false, message: 'Email requis' });
  }

  const filePath = path.join(process.cwd(), 'data', 'profiles.json');

  try {
    const profiles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const index = profiles.findIndex(p => p.email === profile.email);
    if (index > -1) {
      // Met à jour le profil existant
      profiles[index] = profile;
    } else {
      // Ajoute un nouveau profil
      profiles.push(profile);
    }

    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lecture/ecriture profiles.json' });
  }
}
