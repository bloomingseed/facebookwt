var express = require('express');
var router = express.Router();
var path = require('path');

// Home page route.
router.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'../assets/html/index.html'));
})

router.post('/', async function(req,res){
    console.log('Request received.',req.body);
    let uid = req.body.uid;
    let userUrl = 'https://facebook.com/'+uid;
    // console.log(userUrl);
    let msg = 'OK';
    try{
        let link = await req.app.scrawler.solve(userUrl);
        msg = link;
    } catch(err){
        // console.log('Error:',err);
        msg = JSON.stringify(err);
    }
    console.log('Server response:',msg);
    res.send(msg);
})


module.exports = router;