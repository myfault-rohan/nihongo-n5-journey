// Vercel Serverless Function: GET /api/health
module.exports = (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Nihongo backend is running on Vercel!' });
};
