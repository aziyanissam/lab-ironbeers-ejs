const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.get('/beers', (req, res) => {
  res.render('beers.ejs');
});
app.get('/random-beer', (req, res) => {
  res.render('randombeer.ejs');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.send('An error occurred while fetching the beers.');
    });
});


app.listen(3001, () => console.log('🏃‍ on port 3000'));
