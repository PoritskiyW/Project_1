import express from 'express';
import path from 'path';
//const express = require('express');

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;
// const homeRoutes = require('./routes/home');
// const aboutRoutes = require('./routes/about');
// const questionRoutes = require('./routes/questions');
// app.use('/', homeRoutes);
// app.use('/about', aboutRoutes);
// app.use('/questions', questionRoutes);

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
});