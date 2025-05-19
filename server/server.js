const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();//load environments variable from a .env file into process.env

// importing a module located at ./routes/tasks.js (or tasks/index.js if it's a folder). 
const taskRoutes=require('./routes/tasks');

//instance of express app
const app = express();

const PORT=process.env.PORT || 5000;

// ===== MIDDLEWARE ===== //
app.use(cors());
app.use(express.json());

// ===== ROUTES ===== //
app.use('/api/tasks', taskRoutes); 


// ===== DATABASE CONNECTION & SERVER START ===== //

//This is an object with options passed to Mongoose's MongoDB driver.
//mongoose.connect(...) returns a Promise.
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
