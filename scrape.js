const puppeteer = require('puppeteer');

class Scrawler{
    async init(){
        this.browser = await this.initBrowser();
    }
    initBrowser(){
        return new Promise(async (resolve, reject) => {
            try{
                const browser = await puppeteer.launch();
                resolve(browser);
            } catch(e){
                reject(e);
            }
        });
    }

    createNewPage(browser){
        return new Promise(async (resolve, reject) => {
            try{
                const page = await browser.newPage();
                resolve(page);
            } catch(e){
                reject(e);
            }
        });
    }

    solve(url){
        return new Promise(async (resolve, reject) => {
            let page;
            try{
                page = await this.createNewPage(this.browser);
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
                } finally{
                    if(page){
                        page.close();
                    }
                }
            } catch(e){
                reject(e);
            }
        });
    }

    closeBrowser(){
        this.browser.close();
    }

    process(urls){
        try{
            let coverUrls = [];
            let promises =[]
            for(let url of urls){
                console.log('Processing url: '+url);
                promises.push(solve(newPage, url).then(url=>coverUrls.push(url))).catch(e=>{});
            }
            return promises;
        } catch(e){
            console.log(e);
        }
    }
}
async function test(){
    let scrawler = new Scrawler();
    await scrawler.init();
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
    ];
    let promises = [];
    friendUrls.forEach(url=>{
        console.log(url);
        promises.push(scrawler.solve(url).catch(e=>{}));
    });
    return await Promise.all(promises);
}
// (async ()=>{
//     let links = await test();
//     console.log(links);
// })()

module.exports = {Scrawler};