const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, email, password, birthday, secondary_email, first_name, last_name, postal_address, phone_number, profile_picture_url } = req.body;
    const password_hash = await bcrypt.hash(password, 10); // Hachage du mot de passe

    try {
        const [result] = await pool.query(
            `INSERT INTO users (username, email, password_hash, birthday, secondary_email, first_name, last_name, postal_address, phone_number, profile_picture_url, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [username, email, password_hash, birthday, secondary_email, first_name, last_name, postal_address, phone_number, profile_picture_url]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Server error');
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

// Mise à jour des informations de l'utilisateur
router.put('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { username, email, birthday, secondary_email, first_name, last_name, postal_address, phone_number, profile_picture_url } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE users
            SET username = ?, email = ?, birthday = ?, secondary_email = ?, first_name = ?, last_name = ?, postal_address = ?, phone_number = ?, profile_picture_url = ?
            WHERE id = ?`,
            [username, email, birthday, secondary_email, first_name, last_name, postal_address, phone_number, profile_picture_url, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send('Server error');
    }
});


// Sélectionner un utilisateur
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

// Désinscription de l'utilisateur
router.delete('/unsubscribe/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows > 0) {
            res.status(200).send('User unsubscribed successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error during unsubscribe:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
