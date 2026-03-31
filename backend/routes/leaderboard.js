const express = require('express');
const router = express.Router();

// Mock get leaderboard
router.get('/', (req, res) => {
    // Futuramente conectar com Firestore Collection 'leaderboards'
    res.json([
        { player: 'Player1', score: 1500, crowns: 3 },
        { player: 'Player2', score: 1200, crowns: 2 }
    ]);
});

// Mock post score
router.post('/score', (req, res) => {
    const { player, score, crowns } = req.body;
    // Logica futura de Insert no Firestore
    res.status(201).json({ message: 'Score salvo com sucesso', data: { player, score, crowns } });
});

module.exports = router;
