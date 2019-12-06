const  express = require('express');
const router = express.Router();
const checkUser = require('../middleware/auth-user');
const {checkId} = require("../modules/objectId");
const {User} = require('../models/user.model');
const {Game} = require('../models/game.model');

router.get('/all', checkUser, async (req, res) => {
    let user = await User.findById(req.body.userId);
    res.send( user.cart);
});

router.post("/add", checkUser, async (req, res) => {
    let user = await User.findById(req.body.userId);
    
    for (let value of req.body.cart){
        
        const {error} = checkId(value);
        if (error) res.status(404).send("The game with the given Id was not found"); 
        let game = await Game.findById(value);
        user.cart.push(game);
    }

    user = await user.save();

    res.send(user.cart);
});

router.delete("/delete", checkUser, async (req, res) => {
    let user = await User.findById(req.body.userId);
    
    for (let value of req.body.cart){
        
        const {error} = checkId(value);
        if (error) res.status(404).send("The game with the given Id was not found"); 
        let game = await Game.findById(value);
        
        for (let i = 0; i < user.cart.length; i++){
            if (user.cart[i].name === game.name){
                user.cart.splice(i, 1);
                break;
            };
    
        };
    };

    user = await user.save();
    res.send(user.cart);
});



module.exports = router;