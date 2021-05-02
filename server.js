const express = require('express'); 
const bodyParser = require('body-parser');
const indexRouter = require('./routers/index.js')

const app = express(); 
const port = 4321; 

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('assets'))

app.use('/',indexRouter);


app.listen(port, function(){
    console.log("Your app running on port " + port);
})