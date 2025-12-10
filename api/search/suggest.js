// Vercel Serverless Function za Search Suggestions

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query || {};
  const { q, limit = 8 } = query;

  if (!q || q.length < 2) {
    return res.status(200).json([]);
  }

  const queryLower = (q || '').toLowerCase();
  const queryNormalized = queryLower.replace(/[čćđšžáéíóúàèìòùâêîôûäëïöü]/g, (match) => {
    const map = { 
      'č': 'c', 'ć': 'c', 'đ': 'd', 'š': 's', 'ž': 'z',
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
      'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
      'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u'
    };
    return map[match] || match;
  });

  const suggestions = [];

  // Modrić
  if (queryNormalized.includes('modric') || queryLower.includes('modrić')) {
    suggestions.push(
      { model_type: 'player', model_id: 101, title: 'Luka Modrić' },
      { model_type: 'player', model_id: 102, title: 'Luka Modrić (Hrvatska)' }
    );
  }
  
  // Ronaldo
  if (queryNormalized.includes('ronaldo') || queryNormalized.includes('cr7') || queryLower.includes('cristiano')) {
    suggestions.push(
      { model_type: 'player', model_id: 201, title: 'Cristiano Ronaldo' },
      { model_type: 'player', model_id: 202, title: 'Cristiano Ronaldo (Portugal)' }
    );
  }
  
  // Messi
  if (queryNormalized.includes('messi') || queryLower.includes('lionel')) {
    suggestions.push(
      { model_type: 'player', model_id: 301, title: 'Lionel Messi' },
      { model_type: 'player', model_id: 302, title: 'Lionel Messi (Argentina)' }
    );
  }
  
  // Reus
  if (queryNormalized.includes('reus') || queryLower.includes('marco')) {
    suggestions.push(
      { model_type: 'player', model_id: 401, title: 'Marco Reus' },
      { model_type: 'player', model_id: 402, title: 'Marco Reus (Germany)' }
    );
  }
  
  // Mbappé
  if (queryNormalized.includes('mbappe') || queryNormalized.includes('mbape') || queryLower.includes('kylian')) {
    suggestions.push({ model_type: 'player', model_id: 501, title: 'Kylian Mbappé' });
  }
  
  // Haaland
  if (queryNormalized.includes('haaland') || queryLower.includes('erling')) {
    suggestions.push({ model_type: 'player', model_id: 601, title: 'Erling Haaland' });
  }
  
  // Benzema
  if (queryNormalized.includes('benzema') || queryLower.includes('karim')) {
    suggestions.push({ model_type: 'player', model_id: 701, title: 'Karim Benzema' });
  }
  
  // Neymar
  if (queryNormalized.includes('neymar')) {
    suggestions.push({ model_type: 'player', model_id: 801, title: 'Neymar Jr' });
  }

  return res.status(200).json(suggestions.slice(0, parseInt(limit)));
}

