const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

require('dotenv').config();

app.use(cors());
app.use(express.json()); // Pour traiter les JSON dans les requêtes
app.use('/auth', authRoutes);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to Personal Shelter Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
