const mongoose = require('mongoose');
const {Game, validate} = require('../models/game.model');
const {Genre} = require('../models/genre.model');
const isAdmin = require('../middleware/auth-isAdmin');
const {checkId} = require('../modules/objectId');
const _ = require('lodash');

const express = require('express');
const router = express.Router();

router.get("/", isAdmin, async (req, res) => {
    const game = await Game.find();
    res.send(game);
});



router.get("/:id", isAdmin, async(req, res) => {
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The game with the given Id was not found"); 

    const game = await Game.findById(req.body._id);
    res.send(game);
});

router.post("/", isAdmin, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let game = new Game(_.pick(req.body, ["name", "isPublished", "price"]));

    const {error: error2} = checkId(req.body.genre);
    if (error2) res.status(404).send("The game with the given Id was not found"); 
    game.genre = await Genre.findById(req.body.genre);
    
    game = await game.save();
    res.send(game);
});

router.put("/:id", isAdmin, async (req, res) =>{
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The game with the given Id was not found"); 

    const {error: error1} = validate(req.body);
    if (error1) return res.status(400).send(error.details[0].message);

    let game = await Game.findById(req.params.id);
    game = _.pick(req.body, ["name", "isPublished", "price"]);

    const {error: error2} = checkId(req.body.genre);
    if (error2) res.status(404).send("The game with the given Id was not found"); 
    game.genre = await Genre.findById(req.body.genre);

    game = await game.save();
    res.send(game);
});

router.delete("/:id", isAdmin, async(req, res) => {
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The game with the given Id was not found"); 

    let game =  await Game.findByIdAndDelete(req.params.id);

    res.send(game);
});





module.exports = router;