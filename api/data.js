// Vercel Serverless Function: GET+POST /api/data
// NOTE: Vercel's filesystem is ephemeral (read-only in production).
// Progress data is persisted in the browser via localStorage on the client side.
// This endpoint validates auth and returns/accepts data as a pass-through.
// For full server-side persistence, integrate a database (e.g. Vercel KV, PlanetScale).

module.exports = (req, res) => {
  const AUTH_TOKEN = process.env.AUTH_TOKEN || 'rohan-auth-token-xyz';

  const token = req.headers.authorization;
  if (token !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Return empty data — client uses localStorage as the source of truth
    return res.status(200).json({
      success: true,
      data: {
        progress: {
          hiragana: 0, katakana: 0, kanji: 0, vocab: 0,
          grammar: 0, reading: 0, listening: 0, mocktest: 0,
        },
        srsData: {},
        theme: 'light'
      }
    });
  }

  if (req.method === 'POST') {
    // Acknowledge the save (client handles actual persistence in localStorage)
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};
