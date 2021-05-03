function parseForm(formElement){
    return new Promise(resolve=>{
        let inputs = [...formElement.querySelectorAll('input'),...formElement.querySelectorAll('textarea')];
        let form = {}
        inputs.forEach(elm=>form[elm.getAttribute('name')]=elm);
        resolve(form);
    });
    
}

function processInputs(randomUidList,uidList,indx){
    if(indx>=0 && indx<uidList.length){
        console.log(`Task number ${index+1}/${uidList.length}...`);
        uid = uidList[indx];
        formData = new URLSearchParams();
        for(let key in inputs){
            input=inputs[key];
            formData.append(input.getAttribute('name'),input.value);
        }
        formData.append('uid',uid);
        formData.append('randomUidList',inputs['randomUidList'].value);
        let now = new Date().toTimeString();
        now = now.substring(0,5);
        // if now is inactive period then stop working.
        // can be refactored to wait until next active period
        if(taskConfig.existInactivePeriod && taskConfig.inactivePeriod[0]<=now && taskConfig.inactivePeriod[1]>=now){
            console.warn('Now is inactive period. Tasks done: ',taskConfig.count,'Shutting down..');
        } else{
            fetch('/',{
                method:'POST',
                body:formData
            }).then(res=>{
                taskConfig.count++;
                if(taskConfig.count%taskConfig.taskThreshold==0 && randomUidList.length>0){
                    
                    if(randomUidList.length>0){
                        let randomIndx = Number.parseInt(Math.random()*randomUidList.length);;
                        window.open(`https://facebook.com/${randomUidList[randomIndx]}`,'_blank');
                        randomUidList.splice(randomIndx,1);
                    }
                }
                console.warn(`Entering break period of ${taskConfig.breakPeriod}..`);
                setTimeout(function(){
                    console.warn('Break period over.');
                    processInputs(randomUidList,uidList,indx+1);
                },taskConfig.breakPeriod,)
                return res.text();
            }).catch(e=>console.error(e)).then(body=>{
                console.log(`Task #${indx+1}, cover photo link: `,body);
                if(FB && postImageUrl && pageInfo){
                    postImageUrl(FB,pageInfo,body);
                }
            });
        }
    } else if(indx>=uidList.length){
        console.log('All UIDs have been processed.');
    }
}
function toggleInputs(ids){
    for(let id of ids)
        document.querySelector(id).toggleAttribute('disabled');
}

const form = document.querySelector('form');
var taskConfig;
var inputs;

// const tareaCounters = [...document.querySelectorAll('.textarea-counter')];
// tareaCounters.forEach(counter=>{
//     let tarea = document.querySelector('#'+counter.getAttribute('for'));
//     tarea.addEventListener('blur',function(){
//         let txt = tarea.value.trim();
//         let lines = 0;
//         if(txt!=''){
//             lines = txt.split('\n').length;
//         }
//         counter.innerText = 'Số task: '+lines;
//     })
// })

form.addEventListener('submit',function(event){
    if(pageInfo){
        pageInfo.id = inputs['pageId'].value;
    }
    taskConfig = {
        breakPeriod: Number.parseInt(inputs['breakPeriod'].value),
        existInactivePeriod: inputs['existInactivePeriod'].checked,
        inactivePeriod:[inputs['inactivePeriodFrom'].value,inputs['inactivePeriodTo'].value],
        count:0,
        taskThreshold:Number.parseInt(inputs['taskThreshold'].value)
    };
    let uidList = inputs['uidList'].value.trim();
    if(uidList!=""){
        uidList = uidList.split('\n');
        let randomUidList = inputs['randomUidList'].value.trim();
        if(randomUidList==''){
            randomUidList=[];
        } else{
            randomUidList = randomUidList.split('\n');
        }
        // console.log(uidList, randomUidList);
        processInputs(randomUidList,uidList,0);
    }
    event.preventDefault();
    event.stopPropagation();
})
parseForm(form).then((inputs)=>{
    globalThis.inputs = inputs;
    inputs['existInactivePeriod'].addEventListener('click',function(){toggleInputs(['#inactivePeriodFromInput','#inactivePeriodToInput']);});
    initFacebookApi();
})
