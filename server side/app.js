
const express = require('express');
const bodyParser = require('body-parser');
const wordRoutes = require('./routes/word');
const RankRoutes = require('./routes/rank')
var cors = require('cors')
var app = express()
 
var corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())





app.use('/words', wordRoutes);
app.use('/rank', RankRoutes);


app.listen(3000);

