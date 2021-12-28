const express = require('express');
const path  = require('path');

const dataFill = require('./modules/dataFill.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', './../../web/dist/views/home.html'));
    res.status(200);
});

app.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, 'static', './../../web/dist/views/home.html'));
    res.status(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dataFill();
});