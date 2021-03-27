const newDuty=document.querySelector(".input-duty");
const newDutyAddButton=document.querySelector(".btn-add-duty");
const DutyList=document.querySelector(".toDo-list");

newDutyAddButton.addEventListener("click",AddDuty);
DutyList.addEventListener("click",dutyDoneDelete);
document.addEventListener("DOMContentLoaded",readLocalStorage);


function dutyDoneDelete(e){
    const clickedItem=e.target;
    if(clickedItem.classList.contains("duty-btn-check")){
        console.log("check tiklandi");
        clickedItem.parentElement.classList.toggle("duty-done");
    }
    if(clickedItem.classList.contains("duty-btn-delete")){

        if(confirm("are you sure?")){
            clickedItem.parentElement.classList.toggle("lose");
            const dutyToDelete=clickedItem.parentElement.children[0].innerText;
            DeleteItemFromLocal(dutyToDelete);
            clickedItem.parentElement.addEventListener("transitionend",function(e){
                clickedItem.parentElement.remove();
       
    
        });
      
    }
}}

function AddDuty(e){
    e.preventDefault();
    if(newDuty.value.length>0){
        createDutyItem(newDuty.value);
AddToLocalStorage(newDuty.value);
newDuty.value="";
    }else{
        alert("you can not add a duty without value");
    }


}

function AddToLocalStorage(newDuty){


    let duties;
    if(localStorage.getItem("duties")===null){
        duties=[];
    }else{
        duties=JSON.parse(localStorage.getItem("duties"));
    }
    duties.push(newDuty);
    localStorage.setItem("duties",JSON.stringify(duties));

}

function createDutyItem(duty){
    const dutyDiv=document.createElement("div");
dutyDiv.classList.add("duty-item");

const dutyLi =document.createElement("li");
dutyLi.classList.add("duty-description");
dutyLi.innerText=duty;

dutyDiv.appendChild(dutyLi);

const dutyDoneBtn=document.createElement("button");
dutyDoneBtn.classList.add("duty-btn");
dutyDoneBtn.classList.add("duty-btn-check");
dutyDoneBtn.innerHTML='  <i class="far fa-check-square"></i>';
dutyDiv.appendChild(dutyDoneBtn);

const dutyDeleteBtn=document.createElement("button");
dutyDeleteBtn.classList.add("duty-btn");
dutyDeleteBtn.classList.add("duty-btn-delete");
dutyDeleteBtn.innerHTML='<i class="far fa-trash-alt"></i>';
dutyDiv.appendChild(dutyDeleteBtn);

DutyList.appendChild(dutyDiv);

}

function readLocalStorage(){
    let duties;
    if(localStorage.getItem("duties")===null){
        duties=[];
    }else{
        duties=JSON.parse(localStorage.getItem("duties"));
    }
    duties.forEach(function(duty){
        createDutyItem(duty);

    });
}
function DeleteItemFromLocal (duty){
    let duties;
    if(localStorage.getItem("duties")===null){
        duties=[];
    }else{
        duties=JSON.parse(localStorage.getItem("duties"));
    }

    //splice remove item from array
    const itemToDeleteIndex=duties.indexOf(duty);
    console.log(itemToDeleteIndex);
    duties.splice(itemToDeleteIndex,1);
    localStorage.setItem("duties",JSON.stringify(duties));

}


