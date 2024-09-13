require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth');
const uploadProfilePicture = require('./routes/upload-profile-picture');

app.use(express.json()); // Pour traiter les JSON dans les requêtes
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si vous avez besoin de cookies ou d'autres credentials
}));

// Ajout des en-têtes pour plus de sécurité
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/auth', authRoutes);
app.use('/uploads', cors({ origin: process.env.FRONTEND_URL }), express.static(path.join(__dirname, 'uploads')));
app.use('/upload-profile-picture', uploadProfilePicture);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to Personal Shelter Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
