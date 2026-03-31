const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend Arkanoid Steampunk online.' });
});

// Integrating leaderboard mock routes
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/leaderboard', leaderboardRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
