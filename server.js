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

const allowedOrigins = [
    'https://edamame-sudoku-moyo-sas-projects.vercel.app',
    'https://edamame-sudoku-git-main-moyo-sas-projects.vercel.app',
    'http://localhost:5173/'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/sudoku', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)); 
