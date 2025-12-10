// Vercel Serverless Function za Search API
// Ovo je mock API za test svrhe - vraća test podatke za Modrića

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel serverless funkcije koriste req.query direktno
  // Ali za lokalno testiranje možda trebamo parsirati URL
  let query = req.query || {};
  if (!query || Object.keys(query).length === 0) {
    // Ako query nije postavljen, pokušaj parsirati iz URL-a
    try {
      const url = new URL(req.url, 'http://localhost');
      query = Object.fromEntries(url.searchParams);
    } catch (e) {
      console.error('Error parsing URL:', e);
    }
  }

  const { q, type, limit = 5 } = query;
  
  console.log('[API Handler] Request:', { method: req.method, url: req.url, query, q, type, limit });

  // Mock podaci za različite igrače
  const mockPlayers = {
    modric: [
      {
        id: 1,
        model_type: 'player',
        model_id: 101,
        title: 'Luka Modrić',
        full_name: 'Luka Modrić',
        name: 'Luka Modrić',
        position: 'MF',
        position_primary: 'MF',
        club: { name: 'Real Madrid' },
        club_name: 'Real Madrid',
        market_value: 10000000,
        quality_index: 85,
        score: 95.5
      },
      {
        id: 2,
        model_type: 'player',
        model_id: 102,
        title: 'Luka Modrić (Hrvatska)',
        full_name: 'Luka Modrić',
        name: 'Luka Modrić',
        position: 'CM',
        position_primary: 'CM',
        club: { name: 'Real Madrid' },
        club_name: 'Real Madrid',
        market_value: 10000000,
        quality_index: 85,
        score: 94.2
      }
    ],
    ronaldo: [
      {
        id: 3,
        model_type: 'player',
        model_id: 201,
        title: 'Cristiano Ronaldo',
        full_name: 'Cristiano Ronaldo dos Santos Aveiro',
        name: 'Cristiano Ronaldo',
        position: 'FW',
        position_primary: 'ST',
        club: { name: 'Al Nassr' },
        club_name: 'Al Nassr',
        market_value: 15000000,
        quality_index: 88,
        score: 97.8
      },
      {
        id: 4,
        model_type: 'player',
        model_id: 202,
        title: 'Cristiano Ronaldo (Portugal)',
        full_name: 'Cristiano Ronaldo',
        name: 'Cristiano Ronaldo',
        position: 'LW',
        position_primary: 'LW',
        club: { name: 'Al Nassr' },
        club_name: 'Al Nassr',
        market_value: 15000000,
        quality_index: 88,
        score: 97.5
      }
    ],
    messi: [
      {
        id: 5,
        model_type: 'player',
        model_id: 301,
        title: 'Lionel Messi',
        full_name: 'Lionel Andrés Messi Cuccittini',
        name: 'Lionel Messi',
        position: 'FW',
        position_primary: 'RW',
        club: { name: 'Inter Miami' },
        club_name: 'Inter Miami',
        market_value: 20000000,
        quality_index: 90,
        score: 98.5
      },
      {
        id: 6,
        model_type: 'player',
        model_id: 302,
        title: 'Lionel Messi (Argentina)',
        full_name: 'Lionel Messi',
        name: 'Lionel Messi',
        position: 'AM',
        position_primary: 'AM',
        club: { name: 'Inter Miami' },
        club_name: 'Inter Miami',
        market_value: 20000000,
        quality_index: 90,
        score: 98.2
      }
    ],
    reus: [
      {
        id: 7,
        model_type: 'player',
        model_id: 401,
        title: 'Marco Reus',
        full_name: 'Marco Reus',
        name: 'Marco Reus',
        position: 'MF',
        position_primary: 'AM',
        club: { name: 'Borussia Dortmund' },
        club_name: 'Borussia Dortmund',
        market_value: 8000000,
        quality_index: 82,
        score: 92.3
      },
      {
        id: 8,
        model_type: 'player',
        model_id: 402,
        title: 'Marco Reus (Germany)',
        full_name: 'Marco Reus',
        name: 'Marco Reus',
        position: 'LW',
        position_primary: 'LW',
        club: { name: 'Borussia Dortmund' },
        club_name: 'Borussia Dortmund',
        market_value: 8000000,
        quality_index: 82,
        score: 91.8
      }
    ],
    mbappe: [
      {
        id: 9,
        model_type: 'player',
        model_id: 501,
        title: 'Kylian Mbappé',
        full_name: 'Kylian Mbappé Lottin',
        name: 'Kylian Mbappé',
        position: 'FW',
        position_primary: 'ST',
        club: { name: 'Paris Saint-Germain' },
        club_name: 'Paris Saint-Germain',
        market_value: 180000000,
        quality_index: 91,
        score: 96.5
      }
    ],
    haaland: [
      {
        id: 10,
        model_type: 'player',
        model_id: 601,
        title: 'Erling Haaland',
        full_name: 'Erling Braut Haaland',
        name: 'Erling Haaland',
        position: 'FW',
        position_primary: 'ST',
        club: { name: 'Manchester City' },
        club_name: 'Manchester City',
        market_value: 180000000,
        quality_index: 90,
        score: 96.2
      }
    ],
    benzema: [
      {
        id: 11,
        model_type: 'player',
        model_id: 701,
        title: 'Karim Benzema',
        full_name: 'Karim Mostafa Benzema',
        name: 'Karim Benzema',
        position: 'FW',
        position_primary: 'ST',
        club: { name: 'Al Ittihad' },
        club_name: 'Al Ittihad',
        market_value: 12000000,
        quality_index: 86,
        score: 94.5
      }
    ],
    neymar: [
      {
        id: 12,
        model_type: 'player',
        model_id: 801,
        title: 'Neymar Jr',
        full_name: 'Neymar da Silva Santos Júnior',
        name: 'Neymar',
        position: 'FW',
        position_primary: 'LW',
        club: { name: 'Al Hilal' },
        club_name: 'Al Hilal',
        market_value: 50000000,
        quality_index: 87,
        score: 95.1
      }
    ]
  };

  // Normalizacija query-ja (bez dijakritika)
  const queryLower = (q || '').toLowerCase().trim();
  const queryNormalized = queryLower.replace(/[čćđšžáéíóúàèìòùâêîôûäëïöüé]/g, (match) => {
    const map = { 
      'č': 'c', 'ć': 'c', 'đ': 'd', 'š': 's', 'ž': 'z',
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
      'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
      'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u'
    };
    return map[match] || match;
  });

  let results = {
    players: [],
    clubs: [],
    staff: [],
    leagues: [],
    matches: []
  };

  // Pronađi matching igrače - poboljšana logika
  const matchedPlayers = [];
  
  // Modrić - matchuje "modric", "modrić", "luka modric", "modric luka"
  if (queryNormalized.includes('modric') || queryLower.includes('modrić') || queryNormalized.includes('luka')) {
    matchedPlayers.push(...mockPlayers.modric);
  }
  
  // Ronaldo - matchuje "ronaldo", "cr7", "cristiano", "c ronaldo"
  if (queryNormalized.includes('ronaldo') || queryNormalized.includes('cr7') || queryNormalized.includes('cristiano') || queryNormalized.includes('c.ronaldo')) {
    matchedPlayers.push(...mockPlayers.ronaldo);
  }
  
  // Messi - matchuje "messi", "lionel", "lionel messi"
  if (queryNormalized.includes('messi') || queryNormalized.includes('lionel')) {
    matchedPlayers.push(...mockPlayers.messi);
  }
  
  // Reus - matchuje "reus", "marco reus", "marco"
  if (queryNormalized.includes('reus') || (queryNormalized.includes('marco') && queryNormalized.length > 3)) {
    matchedPlayers.push(...mockPlayers.reus);
  }
  
  // Mbappé - matchuje "mbappe", "mbappé", "mbape", "kylian"
  if (queryNormalized.includes('mbappe') || queryNormalized.includes('mbape') || queryNormalized.includes('kylian')) {
    matchedPlayers.push(...mockPlayers.mbappe);
  }
  
  // Haaland - matchuje "haaland", "erling", "erling haaland"
  if (queryNormalized.includes('haaland') || queryNormalized.includes('erling')) {
    matchedPlayers.push(...mockPlayers.haaland);
  }
  
  // Benzema - matchuje "benzema", "karim", "karim benzema"
  if (queryNormalized.includes('benzema') || queryNormalized.includes('karim')) {
    matchedPlayers.push(...mockPlayers.benzema);
  }
  
  // Neymar - matchuje "neymar", "neymar jr"
  if (queryNormalized.includes('neymar')) {
    matchedPlayers.push(...mockPlayers.neymar);
  }
  
  // Debug log
  console.log('[API] Search query:', q);
  console.log('[API] Query normalized:', queryNormalized);
  console.log('[API] Matched players count:', matchedPlayers.length);

  // Dodaj rezultate
  results.players = matchedPlayers.slice(0, parseInt(limit));

  // Filtriraj po tipu ako je naveden
  if (type && type !== 'player') {
    results.players = [];
  }

  return res.status(200).json(results);
}

