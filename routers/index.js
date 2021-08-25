var express = require('express');
var router = express.Router();
var path = require('path');

// Home page route.
router.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'../assets/html/index.html'));
})

function isUsername(token){
    return token.match('[a-zA-Z]')!=null;
}

router.post('/', async function(req,res){
    console.log('Request received.',req.body);
    let uid = req.body.uid;
    let baseUrl = 'https://www.facebook.com'
    let userUrl = isUsername(uid)?`${baseUrl}/${uid}` : `${baseUrl}/profile.php?id=${uid}`;
    console.log(userUrl);
    let msg = {};
    try{
        // console.log(req.app.scrawler);
        let link = await req.app.scrawler.solve(userUrl);
        console.log('Wallpaper link: ',link);
        msg = link;
    } catch(err){
        console.log('Could not get wallpaper url.',err);
    }
    console.log('Server response:',msg);
    res.send(msg);
})


module.exports = router;