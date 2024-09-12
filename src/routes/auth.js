const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, email, password, birthday, secondary_email, first_name, last_name, postal_address, phone_number, dial_code } = req.body;
    const password_hash = await bcrypt.hash(password, 10); // Hachage du mot de passe
    const dial_code_temp = "+33"; // Indicatif temporaire

    try {
        const user = await User.create({
            username,
            email,
            password_hash,
            birthday,
            secondary_email,
            first_name,
            last_name,
            postal_address,
            phone_number,
            dial_code: dial_code_temp,
        });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Server error');
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user) {
            const match = await bcrypt.compare(password, user.password_hash);

            if (match) {
                res.json({
                    userId: user.id,
                    username: user.username,
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
    const { username, email, birthday, secondary_email, first_name, last_name, postal_address, phone_number, dial_code } = req.body;

    try {
        const [updated] = await User.update(
            {
                username,
                email,
                birthday,
                secondary_email,
                first_name,
                last_name,
                postal_address,
                phone_number,
                dial_code,
            },
            { where: { id: userId } }
        );

        if (updated) {
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).send('Server error');
    }
});

// Sélectionner un utilisateur
router.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOne({
            where: { id: userId },
            attributes: [
                'username', 'email', 'birthday', 'secondary_email', 'first_name', 
                'last_name', 'postal_address', 'phone_number', 'dial_code', 'profile_picture_url'
            ],
        });

        if (user) {
            res.json(user);
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
        const deleted = await User.destroy({ where: { id: userId } });

        if (deleted) {
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
