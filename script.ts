let submitButton = document.querySelector("#submitButton");
let inputForm = document.querySelector("#inputForm");
let progressTable = document.querySelector("#progressTable");
let completedTable = document.querySelector("#completedTable");
let selectAssignee = document.querySelector("#selectAssignee");
let temp1 = document.querySelector("#staskName") as HTMLInputElement;
let temp2 = document.querySelector("#sassigneeName") as HTMLInputElement;
let temp3 = document.querySelector("#sdueDate") as HTMLInputElement;
let taskName:FormDataEntryValue;
let dateAdded:FormDataEntryValue;
let assignee:FormDataEntryValue;
let hash = 0;
let assigneeName = ["Abdul" , "Anubhv" , "Chetan" , "Hari" , "Jayesh" , "Prabhjot" ,"Rahul", "Rakesh", "Rishabh","Sarthak", "Shibo",];
let createAssignees = () => {
    for(let aname of assigneeName){
        let newOption = document.createElement("option");
        newOption.value = aname;
        newOption.innerHTML = aname;
        selectAssignee.appendChild(newOption);
    }
}
enum taskStatus{
    IN_PROGRESS,
    COMPLETED
}
interface task{
    taskDetails : string;
    aName : string;
    dueDate : string;
    id : number;
    taskStatus : taskStatus;
}
let tasksArray: task[] = [];
createAssignees();
let createTaskObj = (taskName:string,assignee:string,data3:string) => {
    let newTask : task = {
        taskDetails : taskName,
        aName : assignee.toString(),
        dueDate : data3,
        id : hash -1,
        taskStatus : taskStatus.IN_PROGRESS
       }
       tasksArray.push(newTask);
       console.log(tasksArray[hash - 1]);
}
let createNewTask = () => {
   let newRow = document.createElement("tr");
   let data1 = document.createElement("td");
   let data2 = document.createElement("td");
   let data3 = document.createElement("td");
   let data4 = document.createElement("td");
   let checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   checkbox.addEventListener("click",taskCompleted);
   checkbox.id =  hash.toString();
   hash++;
   data1.innerHTML = taskName.toString();
   data2.innerHTML = assignee.toString();
   data3.innerHTML = (dateAdded.toString()).split("-").reverse().join("-");
   data4.appendChild(checkbox);
   newRow.appendChild(data1);
   newRow.appendChild(data2);
   newRow.appendChild(data3);
   newRow.appendChild(data4);
   progressTable.appendChild(newRow);
   createTaskObj(taskName.toString(),assignee.toString(),data3.innerHTML);
}
let taskCompleted = (event : PointerEvent) => {
    let taskid = (event.target as HTMLInputElement).getAttribute('id');
    let task = document.getElementById(taskid);
    let parent = task.closest("tr");
    let pparent = task.parentNode;
    pparent.removeChild(task);
    completedTable.appendChild(parent);
    tasksArray[parseInt(taskid)].taskStatus = taskStatus.COMPLETED;
    console.log(tasksArray[parseInt(taskid)]);
}
let clearErrors = () => {
        temp1.innerHTML = "";
        temp2.innerHTML = "";
        temp3.innerHTML = "";   
}
let clearInputs = () => {
    let temp = inputForm as HTMLFormElement;
    temp.reset();
}
let validateData = (task:string,assignee:string,date:string) => {
    let ok : boolean = true;
    if(task == ""){
        temp1.innerHTML = "ENTER A VALID TASK";
        ok = false;
    }
    if(assignee == "default"){
        temp2.innerHTML = "SELECT A VALID  NAME";
        ok = false;
    }
    if(date == ""){
        temp3.innerHTML = "ENTER A VALID DATE";
        ok = false;
    }
    if(ok){
        clearInputs();
        clearErrors();
        createNewTask();
    }
}
let getFormValues = (event:PointerEvent) => {
    clearErrors();
   event.preventDefault();
   let data = new FormData(inputForm as HTMLFormElement);
   taskName = data.get("taskName");
   assignee = data.get("assigneeName")
   dateAdded = data.get("dueDate");   
   validateData(taskName.toString(),assignee.toString(),dateAdded.toString());
}
submitButton.addEventListener("click",getFormValues);