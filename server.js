const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const pagesRoutes = require('./back-end/routes/pages');

const viewsPath = path.join(__dirname, 'front-end/views'); // ✅ DEFINE THIS

app.use(cookieParser());
app.use(express.json());

// Static assets
app.use('/front-end/styles', express.static(path.join(__dirname, 'front-end/styles')));
app.use('/front-end/scripts', express.static(path.join(__dirname, 'front-end/scripts')));
app.use('/front-end/assets', express.static(path.join(__dirname, 'front-end/assets')));

// Routes
app.use('/', pagesRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
