const express = require('express');
const user = require('../routes/user.route');
const genre = require('../routes/genre.route');
const auth = require('../routes/auth.route');
const game = require('../routes/game.route');
const cart = require('../routes/carts.route');

module.exports = (app) => {
    app.use(express.json());
    app.use("/users", user);
    app.use("/users", auth);
    app.use("/genres", genre);
    app.use("/games", game);
    app.use("/games/cart", cart);
};