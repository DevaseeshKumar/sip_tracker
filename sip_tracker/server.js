const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/investors', require('./routes/investorRoutes'));
app.use('/api/funds', require('./routes/fundRoutes'));
app.use('/api/sips', require('./routes/sipRoutes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});