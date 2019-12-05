const  express = require('express');
const router = express.Router();

const {Genre} = require('../models/genre.model');
const isAdmin = require('../middleware/auth-isAdmin');
const _ = require('lodash');

router.get("/", isAdmin, (req, res) => {
    const genre = await Genre.find();
    res.send(genre);
});

router.get("/:id", isAdmin, (req, res) => {
    const genre = await Genre.findById(req.body._id);
    res.send(genre);
});

router.post("/", isAdmin, (req, res) => {
});

module.exports = router;