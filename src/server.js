const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to Personal Shelter Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
