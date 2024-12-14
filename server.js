const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/sudokuRoutes');

require('dotenv').config();
console.log(process.env.MONGO_URI); // This should print your MongoDB URI


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/sudoku', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
