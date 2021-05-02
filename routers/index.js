var express = require('express');
var router = express.Router();
var path = require('path');
const sleep = require('util').promisify(setTimeout);

// Home page route.
router.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'../assets/html/index.html'));
    console.log(req.app.scrawler);
})

router.post('/', async function(req,res){
    console.log(req.body);
    let uid = req.body.uid;
    let userUrl = 'https://facebook.com/'+uid;
    console.log(userUrl);
    let msg = 'OK';
    try{
        let link = await req.app.scrawler.solve(userUrl);
        msg = link;
    } catch(err){
        console.log('Error:',err);
        msg = JSON.stringify(err);
    }
    console.log(msg);
    res.send(msg);
})


module.exports = router;