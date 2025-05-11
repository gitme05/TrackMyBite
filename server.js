const express = require('express');
const path = require('path');
const app = express();
const pagesRoutes = require('./back-end/routes/pages');


app.use(express.json()); 

app.use('/front-end/styles', express.static(path.join(__dirname, 'front-end/styles')));
app.use('/front-end/scripts', express.static(path.join(__dirname, 'front-end/scripts')));
app.use('/front-end/assets', express.static(path.join(__dirname, 'front-end/assets')));


app.use('/', pagesRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
