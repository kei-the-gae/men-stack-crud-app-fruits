const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const fruitsCtrl = require('./controllers/fruits');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', fruitsCtrl.home);
app.get('/fruits', fruitsCtrl.index);
app.get('/fruits/new', fruitsCtrl.new);
app.post('/fruits', fruitsCtrl.create);
app.get('/fruits/:fruitId', fruitsCtrl.show);
app.delete('/fruits/:fruitId', fruitsCtrl.delete);
app.get('/fruits/:fruitId/edit', fruitsCtrl.edit);
app.put('/fruits/:fruitId', fruitsCtrl.update);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});