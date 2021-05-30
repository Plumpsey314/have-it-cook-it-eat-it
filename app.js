const createError = require('http-errors');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const port = 8000;
const app = express();



app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views/index.html'));
})
app.use('/customisation', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'views/customisation.html'));
});

app.listen(port, ()=>{
    console.log("listening on localhost " + chalk.green(port));
})

module.exports=app;