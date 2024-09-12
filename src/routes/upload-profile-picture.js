const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User'); // Assurez-vous d'importer correctement le modèle User

const router = express.Router();

// Configuration de multer pour enregistrer les fichiers dans le répertoire 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads')); // Chemin où l'image sera stockée
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Générer un nom de fichier unique
    }
});

const upload = multer({ storage: storage });

// Route pour uploader l'image
router.post('/', upload.single('profile_picture'), async (req, res) => {
    try {
        const userId = req.body.userId; // Assurez-vous que l'ID utilisateur est envoyé avec la requête
        const profilePicturePath = `../../uploads/${req.file.filename}`;

        // Mettre à jour l'utilisateur avec le chemin de l'image
        const user = await User.findByPk(userId);
        if (user) {
            user.profile_picture_url = profilePicturePath;
            await user.save();

            res.json({ message: 'Image uploadée avec succès', profilePicturePath });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image :', error);
        res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image' });
    }
});

module.exports = router;
