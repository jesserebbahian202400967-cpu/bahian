const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve HTML
app.use(express.static(path.join(__dirname, 'bahian')));

const chairs = [
  {
    name: 'monoblock',
    description: 'comfortable',
  },
  {
    name: 'gaming chair',
    description: 'soft',
  },
];

// GET all chairs
app.get('/api/chairs', (req, res) => {
  res.json(chairs);
});

// POST new chair
app.post('/api/chairs', (req, res) => {
  const { name, description } = req.body;

  const newChair = { name, description };

  chairs.push(newChair);

  res.status(201).json({
    message: 'Chair added successfully',
    chair: newChair,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
