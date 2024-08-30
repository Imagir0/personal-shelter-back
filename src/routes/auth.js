const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hachage du mot de passe
        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error("Error during registration", err);
        res.status(500).json({ error: err.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Rechercher l'utilisateur par son nom d'utilisateur
        const [rows] = await pool.query('SELECT id, username, password_hash FROM users WHERE username = ?', [username]);

        // Vérifier si l'utilisateur existe
        if (rows.length > 0) {
            const user = rows[0];

            // Comparer le mot de passe fourni avec le mot de passe haché stocké
            const match = await bcrypt.compare(password, user.password_hash);

            if (match) {
                res.json({
                    userId: user.id,
                    username: user.username
                });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rows] = await pool.query('SELECT username, email FROM users WHERE id = ?', [userId]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
