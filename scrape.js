const { builtinModules } = require('node:module');
const puppeteer = require('puppeteer');

function initBrowser(){
    return new Promise(async (resolve, reject) => {
        try{
            const browser = await puppeteer.launch();
            resolve(browser);
        } catch(e){
            reject(e);
        }
    });
}

function createNewPage(browser){
    return new Promise(async (resolve, reject) => {
        try{
            const page = await browser.newPage();
            resolve(page);
        } catch(e){
            reject(e);
        }
    });
}

function solve(page, url){
    return new Promise(async (resolve, reject) => {
        try{
            
            await page.goto(url,{waitUntil:'networkidle2'});
            // await page.screenshot({path:`example${Date.now()}.jpg`});
            try{
                let coverPhotoUrl = await page.evaluate(() => {
                    let coverPhotoElement = document.querySelector('img[data-imgperflogname]');
                    if(coverPhotoElement==null){
                        coverPhotoElement = document.querySelector('.coverPhotoImg');    // fall back for old facebook UI
                        if(coverPhotoElement==null){    // if still null
                            throw {trivial:true, error:"Cannot get coverPhotoElement. The DOM tree may have changed. coverPhotoElement is null. Selector: img[data-imgperflogname] and img[.coverPhotoImg]"};
                        }
                    }
                    let photoUrl = coverPhotoElement.getAttribute('src');
                    if(photoUrl==null){
                        throw {error:"coverPhotoElement src attribute is null."};
                    }
                    return photoUrl;
                })
                resolve(coverPhotoUrl);
            } catch(e){
                if(e.trivial){  // url has no cover photo
                    resolve(null);
                } else throw e;
            }
        } catch(e){
            reject(e);
        }
    });
}

function closeBrowser(browser){
    browser.close();
}

async function process(urls){
    try{
        browser = await initBrowser();
        newPage = await createNewPage(browser);
        coverUrls = [];
        for(let url of urls){
            console.log('Processing url: '+url);
            try{
                coverUrl = await solve(newPage, url);
                if(coverUrl==null){
                    console.log('This user has no cover photo!');
                }
                coverUrls.push(coverUrl);    
            } catch(e){
                // skipping
            };
        }
        console.log(coverUrls.join('\n'));
        closeBrowser(browser);
    } catch(e){
        console.log(e);
    }
}
function test(){
    let friendUrls = [
        'https://www.facebook.com/ngothuat78',
        'https://www.facebook.com/jindo.katori.146',
        'https://www.facebook.com/votranhieu',
        'https://www.facebook.com/profile.php?id=100009489131753',
        'https://www.facebook.com/profile.php?id=100065490511573',
        'https://www.facebook.com/profile.php?id=100016075691791',
        'https://www.facebook.com/ngocnam.nguyen.2402',
        'https://www.facebook.com/vui.nguyen.9250',
        'https://www.facebook.com/namha.nguyen.1042',
    ]
    process(friendUrls);
}

module.exports = {process}