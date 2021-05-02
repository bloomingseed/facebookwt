var express = require('express');
var router = express.Router();
var path = require('path');
var scrape = require('../scrape.js');
var scrawler = new scrape.Scrawler();
// scrawler.init();
const sleep = require('util').promisify(setTimeout);

// Home page route.
router.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'../assets/html/index.html'));
})

router.post('/', async function(req,res){
    console.log(req.body);
    let uid = req.body.uid;
    let userUrl = 'https://facebook.com/'+uid;
    console.log(userUrl);
    // let link = await scrawler.solve(userUrl);
    await sleep(3000);
    res.send('OK');
})


module.exports = router;