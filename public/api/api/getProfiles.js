
uimport fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'profiles.json');

  try {
    const profiles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // On retourne seulement les profils publics
    let result = profiles.filter(p => p.public === true);

    // Recherche si ?search= est utilisé
    const search = req.query.search?.toLowerCase();

    if (search) {
      result = result.filter(p =>
        (p.email && p.email.toLowerCase().includes(search)) ||
        (p.statut && p.statut.toLowerCase().includes(search)) ||
        (p.ville && p.ville.toLowerCase().includes(search))
      );
    }

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: "Erreur lecture profiles.json" });
  }
}
