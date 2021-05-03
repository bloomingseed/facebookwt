function parseForm(formElement){
    return new Promise(resolve=>{
        let inputs = [...formElement.querySelectorAll('input'),...formElement.querySelectorAll('textarea')];
        let form = {}
        inputs.forEach(elm=>form[elm.getAttribute('name')]=elm);
        resolve(form);
    });
    
}

function processInputs(randomUidList,uidList,indx){
    if(taskConfig.cancel && taskConfig.cancel==true){
        let msg = `Task bị hủy bỏ. Số tasks đã hoàn thành: ${taskConfig.count}.`;
        alert(msg);
        console.log(msg);
        return;
    }
    if(indx>=uidList.length){
        let msg = 'Để xử lý xong mọi UIDs.';
        console.log(msg);
        alert(msg);
        return;
    }
    // if now is inactive period then stop working.
    // can be refactored to wait until next active period
    let now = new Date().toTimeString();
    now = now.substring(0,5);
    if(taskConfig.existInactivePeriod && taskConfig.inactivePeriod[0]<=now && taskConfig.inactivePeriod[1]>=now){
        let msg = `Hiện đang là thời gian ngưng hoạt động. Tasks đã hoàn thành: ${taskConfig.count}.`;
        console.warn(msg);
        alert(msg);
    }
    if(indx>=0 && indx<uidList.length){
        console.log(`Task number ${indx+1}/${uidList.length}...`);
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
        }).then(res=>res.text())
        .catch(e=>console.error(e))
        .then(body=>{
            console.log(`Task #${indx+1}, cover photo link: `,body);
            postImageUrl(FB,pageInfo,body);
            taskConfig.count++;
            let progress = Math.floor(taskConfig.count*100/uidList.length);
            setProgress(progress);
            if(taskConfig.count%taskConfig.taskThreshold==0 && randomUidList.length>0){
                if(randomUidList.length>0){
                    let randomIndx = Number.parseInt(Math.random()*randomUidList.length);;
                    window.open(`https://facebook.com/${randomUidList[randomIndx]}`,'_blank');
                    randomUidList.splice(randomIndx,1);
                }
            }
            console.warn(`Bắt đầu thời gian dừng ${taskConfig.breakPeriod}ms..`);
            setTimeout(function(){
                console.warn('Hết thời gian dừng.');
                processInputs(randomUidList,uidList,indx+1);
            },taskConfig.breakPeriod,);
        });
    
    }
}
function toggleInputs(ids){
    for(let id of ids)
        document.querySelector(id).toggleAttribute('disabled');
}
function setProgress(value){
    progressBar.setAttribute('aria-valuenow',value);
    progressBar.style.width=value+"%";
}

const form = document.querySelector('form');
var authenticated = false;
var taskConfig;
var inputs;
const progressBar = document.querySelector('.progress-bar');
const cancelBtn = document.querySelector('button#cancelBtn');
cancelBtn.addEventListener('click',function(e){
    taskConfig.cancel = true;
    e.preventDefault();
    e.stopPropagation();
});

form.addEventListener('submit',function(event){
    setProgress(0);
    if(pageInfo){
        pageInfo.id = inputs['pageId'].value;
    }
    taskConfig = {
        breakPeriod: Number.parseInt(inputs['breakPeriod'].value),
        existInactivePeriod: inputs['existInactivePeriod'].checked,
        inactivePeriod:[inputs['inactivePeriodFrom'].value,inputs['inactivePeriodTo'].value],
        count:0,
        taskThreshold:(num=>num<0?0:num)(Number.parseInt(inputs['taskThreshold'].value)),
        cancel: false
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
        console.log(uidList, randomUidList);
        if(authenticated){
            alert('Task đang thực thi. Mở console của trình duyệt để theo dõi tiến trình (Ctrl+Shift+J).');
            processInputs(randomUidList,uidList,0);
        } else{
            alert('Chưa xác minh Facebook, chưa thể thực hiện task. Hãy tải lại trang để tiến hành xác minh.');
        }
    }
    event.preventDefault();
    event.stopPropagation();
})
parseForm(form).then((inputs)=>{
    globalThis.inputs = inputs;
    inputs['existInactivePeriod'].addEventListener('click',function(){toggleInputs(['#inactivePeriodFromInput','#inactivePeriodToInput']);});
    initFacebookApi();
})
