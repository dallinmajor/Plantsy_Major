const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://plantsy:Pin4Plantsy@ds151382.mlab.com:51382/plantsy",
    { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json({ useNewUrlParser: true }));
app.use(methodOverride("_method"));
app.use(router);

app.use(function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const port = 3001;

app.listen(port, () => console.log(`server started on port ${port}`));