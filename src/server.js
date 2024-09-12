const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const uploadProfilePicture = require('./routes/upload-profile-picture');

require('dotenv').config();

app.use(cors());
app.use(express.json()); // Pour traiter les JSON dans les requêtes
app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/upload-profile-picture', uploadProfilePicture);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to Personal Shelter Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
