const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const pagesRoutes = require('./back-end/routes/pages');

const app = express();
const PORT = 3000;
const viewsPath = path.join(__dirname, 'front-end/views');

app.use(cookieParser());
app.use(express.json());


app.use('/front-end/styles', express.static(path.join(__dirname, 'front-end/styles')));
app.use('/front-end/scripts', express.static(path.join(__dirname, 'front-end/scripts')));
app.use('/front-end/assets', express.static(path.join(__dirname, 'front-end/assets')));


app.use('/', pagesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
