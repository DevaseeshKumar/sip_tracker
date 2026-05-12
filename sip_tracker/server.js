const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import pgManager to establish database connection
require('./utility/pgManager');

const app = express();

app.use(cors(
    allowlist = ['http://localhost:3000', 'http://localhost:5173']
));
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/investors', require('./routes/investorRoutes'));
app.use('/api/funds', require('./routes/fundRoutes'));
app.use('/api/sips', require('./routes/sipRoutes'));

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});