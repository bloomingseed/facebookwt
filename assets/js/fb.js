
var appInfo = {
    id:'201557361779080',
    secret:'2bfadb7923d35383dc4673540cc2e911'
}
var apiConfig = {
    version:'v10.0',
    host:'https://graph.facebook.com'
}
var pageInfo = {
    id:'109960724577650'
}
var userInfo={
    access_token:'',
    access_token_no_expire:''
}

function initFacebookApi(){
    window.fbAsyncInit = function() {
        FB.init({
        appId      : `${appInfo.id}`,
        cookie     : true,
        xfbml      : true,
        version    : `${apiConfig.version}`
        });
        
        
    FB.getLoginStatus(function(response) {
        if(response.status!='connected'){
            let permissionConfig = {
                scope:'pages_show_list,pages_read_engagement,pages_manage_posts,public_profile'
            }
            FB.login(statusChangeCallback,permissionConfig);
        } else{
            statusChangeCallback(response);
        }
    }); 
        globalThis.FB = FB;
        
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
}

function statusChangeCallback(response){
    if(response.status==='connected'){
        console.log('User authenticated');
        token = response.authResponse.accessToken;
        console.log('User Access Token: ',token);
        globalThis.authenticated = true;
        globalThis.userInfo.access_token = token;
        getLongLivedUserAccessToken(token);
        // testGraphApi();
    } else{
        alert('Xác minh Facebook thất bại. Hãy tải lại trang để thử lại xác minh.')
    }
}
    
// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//         statusChangeCallback(response);
//     });
// }

function postImageUrl(FB,pageInfo,imgUrl){
    let endpoint = `/${pageInfo.id}/photos`;
    console.log(FB.api(endpoint,'POST',{
        url:encodeURI(imgUrl),
        access_token:pageInfo['access_token']
    }, function(response){
            console.log(response);
            let endpoint = `/${pageInfo.id}/feed`;
            console.log(FB.api(endpoint,'GET',{
                access_token:pageInfo['access_token']
            }, function(response){
                    console.log(response);
    }));
    }));
    
    // endpoint = `/${pageId}?fields=access_token&access_token=${userAccessToken}`
    // FB.api(endpoint,'GET', function(response){
    //     if(response && !response.error){
    //         console.log(response);
    //         pageAccessToken = response.access_token;
    //         endpoint = `/${pageId}/feed`;
    //         let imgUrl = 'https://i.pinimg.com/236x/2b/47/d3/2b47d3129dad0194edceb5897b4b3aa0.jpg';
            
    //         FB.api(
    //             endpoint,
    //             "POST",
    //             {
    //                 link: encodeURI(imgUrl),
    //                 access_token: pageAccessToken
    //             },
    //             function (response) {
    //                 console.log(response);
    //             }
    //         );
    //     }
    // });

}

function getLongLivedUserAccessToken(shortLivedUserAccessToken, callback){
    console.log('getting long-lived user access token..');
    let endpoint = `/oauth/access_token?grant_type=fb_exchange_token&client_id=${appInfo.id}&client_secret=${appInfo.secret}&fb_exchange_token=${shortLivedUserAccessToken}`;
    FB.api(endpoint, 'GET', function(response){
        console.log(response);
        if(response){
            let token = response.access_token;
            globalThis.userInfo.access_token_no_expire=token;
            console.log('Received long-lived user access token.');
        }
    })
}

function getLongLivedPageAccessToken(longLivedUserAccessToken, callback){
    console.log('getting long-lived page access token..');
    // before this, request for page id
    let endpoint = `/${pageInfo.id}?fields=access_token&access_token=${longLivedUserAccessToken}`;
    FB.api(endpoint,'GET',function(response){
        console.log(response);
        if(response){
            let token = response.access_token;
            globalThis.pageInfo['access_token'] = token;
            console.log('Received long-lived page access token.');
            if(callback && typeof(callback)===typeof(function(){})){
                callback();
            }
        }
    })
}
