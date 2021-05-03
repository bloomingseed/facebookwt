function parseForm(formElement){
    return new Promise(resolve=>{
        let inputs = [...formElement.querySelectorAll('input'),...formElement.querySelectorAll('textarea')];
        let form = {}
        inputs.forEach(elm=>form[elm.getAttribute('name')]=elm);
        resolve(form);
    });
    
}

function processInputs(indx){
    let uidList = inputs['uidList'].value.split('\n');
    if(indx>=0 && indx<uidList.length){
        uid = uidList[indx];
        formData = new URLSearchParams();
        for(let key in inputs){
            input=inputs[key];
            formData.append(input.getAttribute('name'),input.value);
        }
        formData.append('uid',uid);
        formData.append('randomUidList',inputs['randomUidList'].value);
        fetch('/',{
            method:'POST',
            body:formData
        }).then(res=>{
            console.log(res);
            taskConfig.count++;
            processInputs(indx+1);
            return res.text();
        }).catch(e=>console.log(e)).then(body=>{
            console.log(body);
            if(FB && postImageUrl && pageInfo){
                postImageUrl(FB,pageInfo,body);
            }
        });
    }
}
function toggleInputs(ids){
    for(let id of ids)
        document.querySelector(id).toggleAttribute('disabled');
}

const form = document.querySelector('form');
var taskConfig;
var inputs;

form.addEventListener('submit',function(event){
    if(pageInfo){
        pageInfo.id = inputs['pageId'].value;
    }
    taskConfig = {
        breakPeriod: Number.parseInt(inputs['breakPeriod'].value),
        existInactivePeriod: inputs['existInactivePeriod'].checked,
        inactivePeriod:[inputs['inactivePeriodFrom'].value,inputs['inactivePeriodTo'].value],
        count:0,
        threshold:inputs['taskThreshold'].value
    };
    
    processInputs(0);
    event.preventDefault();
    event.stopPropagation();
})
parseForm(form).then((inputs)=>{
    globalThis.inputs = inputs;
    inputs['existInactivePeriod'].addEventListener('click',function(){toggleInputs(['#inactivePeriodFromInput','#inactivePeriodToInput']);});
    initFacebookApi();
})
