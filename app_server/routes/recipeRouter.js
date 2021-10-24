const express = require('express');
const path = require('path');
const router = express.Router();

const poop = 'poopoo';
const pee = 'peepee';

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/recipes.html'));
});
module.exports=router;