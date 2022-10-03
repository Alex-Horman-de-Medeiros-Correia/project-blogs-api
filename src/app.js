const express = require('express');
const controlL = require('./controllers/controlL');
const controlU = require('./controllers/controlU');
const categoriaC = require('./controllers/categoriaC');
const controlP = require('./controllers/controlP');

// ...

const app = express();

app.use(express.json());
app.use('/login/', controlL);
app.use('/user/', controlU);
app.use('/categories/', categoriaC);
app.use('/post/', controlP);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
