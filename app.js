const createError = require('http-errors');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const port = 8000;
const app = express();
const recipeRouter = require('./app_server/routes/recipeRouter');

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'html');

app.use('/recipes', recipeRouter);
app.get('/customisation', (req, res)=>{
    res.sendFile(path.join(__dirname, 'app_server/views/customisation.html'));
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'app_server/views/index.html'));
})



app.listen(port, ()=>{
    console.log("listening on localhost " + chalk.green(port));
})

module.exports=app;