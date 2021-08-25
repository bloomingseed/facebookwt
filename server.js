const express = require('express'); 
const bodyParser = require('body-parser');
const indexRouter = require('./routers/index.js');

var {Scrawler} = require('./scrape.js');
var scrawler = new Scrawler();
scrawler.init().then(()=>console.log("Scrawler initialized"), err=>console.log("Scrawler failed to initialize.",err));

const app = express(); 
app.scrawler = scrawler;

const port = 4321; 

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('assets'))

app.use('/',indexRouter);


app.listen(port, function(){
    console.log("Your app running on port " + port);
})