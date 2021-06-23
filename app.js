const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const path = require('path');

const usersRoute = require('./routes/users.js')

app.use('/', usersRoute);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})