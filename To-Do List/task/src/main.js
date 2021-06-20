document.getElementById("add-task-button").addEventListener("click", function() {
    let newTask = document.getElementById("input-task").value;
    if (newTask !== "") {
        let list = document.getElementById("task-list");
        let newElement = document.createElement("li");
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";

        let newItem = document.createElement("span");
        newItem.innerHTML = newTask;
        newItem.className = "task";

        let newDeletebox = document.createElement("button");
        newDeletebox.innerHTML = "X";
        newDeletebox.className = "delete-btn";

        newElement.appendChild(newCheckbox);
        newElement.appendChild(newItem);
        newElement.appendChild(newDeletebox);
        list.appendChild(newElement);

        document.getElementById("input-task").value = "";

        resetEvents();
        saveTasks();

    } else (
        alert("You must write something.")
    )
})

function resetEvents() {
    let close = document.getElementsByClassName("delete-btn");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            this.parentElement.remove();
            saveTasks();
        }
    }

    let complete = document.querySelectorAll('input[type="checkbox"]');

    let j;
    for (j = 0; j < complete.length; j++) {
        complete[j].onclick = function() {
            if (this.checked == true) {
                this.nextElementSibling.style.textDecoration = "line-through";
            } else {
                this.nextElementSibling.style.textDecoration = "none";
            }
            saveTasks();
        };
    }



}

function saveTasks() {
    let taskList = document.querySelectorAll("ul > li");

    let tasks = [];
    let k;

    for (k = 0; k < taskList.length; k++) {
        let complete = taskList[k].children[0].checked;
        let taskName = taskList[k].children[1].innerHTML;

        let task = {
            complete: complete,
            task: taskName,
        };
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    let i;

    for (i = 0; i < taskList.length; i++) {
        //console.log(taskList[i]);

        let taskChecked = taskList[i].complete;
        let taskName = taskList[i].task;

        let list = document.getElementById("task-list");
        let newElement = document.createElement("li");
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.checked = taskChecked;

        let newItem = document.createElement("span");
        newItem.innerHTML = taskName;
        newItem.className = "task";

        if (taskChecked) {
            newItem.style.textDecoration = "line-through";
        }

        let newDeletebox = document.createElement("button");
        newDeletebox.innerHTML = "X";
        newDeletebox.className = "delete-btn";

        newElement.appendChild(newCheckbox);
        newElement.appendChild(newItem);
        newElement.appendChild(newDeletebox);
        list.appendChild(newElement);

        //document.getElementById("input-task").value = "";
    }

}

loadTasks();
resetEvents();