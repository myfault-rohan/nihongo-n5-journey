// Vercel Serverless Function: POST /api/login
module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const AUTH_USERNAME = process.env.AUTH_USERNAME || 'rohan phirke';
  const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'rohan@234';
  const AUTH_TOKEN    = process.env.AUTH_TOKEN    || 'rohan-auth-token-xyz';

  const { username, password } = req.body;

  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    res.status(200).json({ success: true, token: AUTH_TOKEN });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};
