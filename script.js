var submitButton = document.querySelector("#submitButton");
var inputForm = document.querySelector("#inputForm");
var progressTable = document.querySelector("#progressTable");
var completedTable = document.querySelector("#completedTable");
var selectAssignee = document.querySelector("#selectAssignee");
var temp1 = document.querySelector("#staskName");
var temp2 = document.querySelector("#sassigneeName");
var temp3 = document.querySelector("#sdueDate");
var taskName;
var dateAdded;
var assignee;
var hash = 0;
var assigneeName = ["Abdul" , "Anubhv" , "Chetan" , "Hari" , "Jayesh" , "Prabhjot" ,
    "Rahul", "Rakesh", "Rishabh",
    "Sarthak", "Shibo",];
var createAssignees = function () {
    for (var _i = 0, assigneeName_1 = assigneeName; _i < assigneeName_1.length; _i++) {
        var aname = assigneeName_1[_i];
        var newOption = document.createElement("option");
        newOption.value = aname;
        newOption.innerHTML = aname;
        selectAssignee.appendChild(newOption);
    }
};
var taskStatus;
(function (taskStatus) {
    taskStatus[taskStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    taskStatus[taskStatus["COMPLETED"] = 1] = "COMPLETED";
})(taskStatus || (taskStatus = {}));
var tasksArray = [];
createAssignees();
var createTaskObj = function (taskName, assignee, data3) {
    var newTask = {
        taskDetails: taskName,
        aName: assignee.toString(),
        dueDate: data3,
        id: hash - 1,
        taskStatus: taskStatus.IN_PROGRESS
    };
    tasksArray.push(newTask);
    console.log(tasksArray[hash - 1]);
};
var createNewTask = function () {
    var newRow = document.createElement("tr");
    var data1 = document.createElement("td");
    var data2 = document.createElement("td");
    var data3 = document.createElement("td");
    var data4 = document.createElement("td");
    var checkbox = document.createElement("input"); 
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", taskCompleted);
    checkbox.id = hash.toString();
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
    createTaskObj(taskName.toString(), assignee.toString(), data3.innerHTML);
};
var taskCompleted = function (event) {
    var taskid = event.target.getAttribute('id');
    var task = document.getElementById(taskid);
    var parent = task.closest("tr");
    var pparent = task.parentNode;
    pparent.removeChild(task);
    completedTable.appendChild(parent);
    tasksArray[parseInt(taskid)].taskStatus = taskStatus.COMPLETED;
    console.log(tasksArray[parseInt(taskid)]);
};
var clearErrors = function () {
    temp1.innerHTML = "";
    temp2.innerHTML = "";
    temp3.innerHTML = "";
};
var clearInputs = function () {
    var temp = inputForm;
    temp.reset();
};
var validateData = function (task, assignee, date) {
    var ok = true;
    if (task == "") {
        temp1.innerHTML = "ENTER A VALID TASK";
        ok = false;
    }
    if (assignee == "default") {
        temp2.innerHTML = "SELECT A VALID  NAME";
        ok = false;
    }
    if (date == "") {
        temp3.innerHTML = "ENTER A VALID DATE";
        ok = false;
    }
    if (ok) {
        clearInputs();
        clearErrors();
        createNewTask();
    }
};
var getFormValues = function (event) {
    clearErrors();
    event.preventDefault();
    var data = new FormData(inputForm);
    taskName = data.get("taskName");
    assignee = data.get("assigneeName");
    dateAdded = data.get("dueDate");
    validateData(taskName.toString(), assignee.toString(), dateAdded.toString());
};
submitButton.addEventListener("click", getFormValues);