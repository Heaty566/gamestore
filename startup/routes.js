const express = require('express');
const user = require('../routes/user.route');
const genre = require('../routes/genre.route');
const auth = require('../routes/auth.route');

module.exports = (app) => {
    app.use(express.json());
    app.use("/users", user);
    app.use("/users", auth);
    app.use("/genres", genre);
};