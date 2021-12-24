const express = require('express');

const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const questionRoutes = require('./routes/questions');

const app = express();

app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/questions', questionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})