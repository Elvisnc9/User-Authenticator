const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const port = 9876 || process.env.PORT
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.listen(port, () => console.log('Server running on port ' + port));