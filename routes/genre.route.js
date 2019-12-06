const  express = require('express');
const router = express.Router();

const {Genre, validate} = require('../models/genre.model');
const isAdmin = require('../middleware/auth-isAdmin');
const  {checkId} = require('../modules/objectId');
const _ = require('lodash');

router.get("/", isAdmin, async (req, res) => {
    const genre = await Genre.find();
    res.send(genre);
});

router.get("/:id", isAdmin, async(req, res) => {
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The genre with the given Id was not found"); 

    const genre = await Genre.findById(req.body._id);
    res.send(genre);
});

router.post("/", isAdmin, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre(_.pick(req.body, ["name"])); 
    
    genre = await genre.save();
    res.send(genre);
});

router.put("/:id", isAdmin, async (req, res) =>{
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The genre with the given Id was not found"); 

    const {error: error1} = validate(req.body);
    if (error1) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findById(req.params.id);
    genre = await genre.save();
    genre = _.pick(req.body, ["name"]);
   

    res.send(genre);
});

router.delete("/:id", isAdmin, async(req, res) => {
    const {error} = checkId(req.params.id);
    if (error) res.status(404).send("The genre with the given Id was not found"); 

    let genre =  await Genre.findByIdAndDelete(req.params.id);

    res.send(genre);
});


module.exports = router;