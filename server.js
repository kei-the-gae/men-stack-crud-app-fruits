const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const Fruit = require('./models/fruit.js');

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});

app.post('/fruits', async (req, res) => {
    console.log(req.body);
    res.redirect('/fruits/new');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});