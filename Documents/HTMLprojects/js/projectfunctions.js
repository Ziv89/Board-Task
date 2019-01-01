
var task_array = [];

var id = 0;
var id2 = 999;
var flagrefersetable = false;
var flagaddtask = false;
var timenumber = 9;
/** LocalStorage **/



function deleteTask(elementId) {
    document.getElementById("error").style.opacity = "0";

        setTimeout(myTimingfadeing, 100, elementId);
}

function myTimingfadeing(elementId) {

    document.getElementById(elementId).style.opacity = "0." + timenumber;
    timenumber--;
    if (timenumber >= 0) {
        deleteTask(elementId);
    }

    if (timenumber == -1) {

        deleteTasking(elementId);
        return;
    }

    return;
}




function deleteTasking(elementId) {

  
    timenumber = 9;
    let tasks = JSON.parse(localStorage.task);

    tasks.splice(elementId, 1);
    localStorage.task = JSON.stringify(tasks);

    flagrefersetable = true;

    document.getElementById("task_table").innerHTML = "";
    document.getElementById("save_task").click();
   

}




function Fadeinclass() {
    document.querySelector("body").style.opacity = 1;
}
window.onload = function () {

    //new Vue({
    //    el: '#div',
    //    data: {
    //        show: true
    //    }
    //})



        let addTask = function (task) {
            
        let tasks = JSON.parse(localStorage.task);



        tasks.push(task);
        localStorage.task = JSON.stringify(tasks);
        addRowToTable(task);
    };

    let addRowToTable = function (task) {

        let tr = document.createElement("tr");

        // Data
        //for (let key in task) {
        //    let td = document.createElement("td");
        //    td.innerText = task[key];
        //    tr.appendChild(td);
        //}


        var x = document.createElement("TR");
        x.setAttribute("id", "myTr");
        x.style.frameBorder = "0";

   
        document.getElementById("task_table").appendChild(x);

            var y = document.createElement("td");

        y.innerHTML = '<div id="' + id + '"><img src="projectimages/notebg.png" alt=""/></div>';

        y.innerHTML += '<div id="' + id + '" class="top-right"><p class="glyphicon glyphicon-remove-circle" id="' + id2 + '"onclick="deleteTask('+ id +')"></p></div>';

        y.innerHTML += '<div  align="center" id="' + id + '" > <textarea class="centered"  id="' + id2 + '"  rows="8"  cols="20" readonly>' + task.task + '</textarea></div>';

        y.innerHTML += '<div id="' + id + '"  class="bottom-left">' + task.hour + '</div>';

        y.innerHTML += '<div id="' + id + '"  class="bottom-right">' + task.date + '</div>';


   

        ///y.appendChild(t);


        document.getElementById("myTr").appendChild(y);
        if (flagaddtask == true) {
           // document.getElementById(id).style.opacity = "0";
            //FadeinTiming(id);
            flagaddtask = false;
        }

        id++;
        id2 = id * 1000;

    };

    document.querySelector("#save_task").addEventListener("click", function () {
        document.getElementById("error").style.opacity = "0";
        flagaddtask = true;


        if (flagrefersetable == true) {
            flagaddtask = false;
        }

        if (flagrefersetable == true) {
            if (typeof localStorage.task == 'undefined') {
                localStorage.task = JSON.stringify([]);
            } else {
                let task = JSON.parse(localStorage.task);
                id = 0;
                for (let i = 0; i < task.length; i++) {
                    task_array.push(task[i]);
                    addRowToTable(task[i]);
                }
            }

            flagrefersetable = false;
            return;
        }
     
        var Id = JSON.parse(localStorage.task).length;
       // document.getElementById("myText").required;

        var task = document.querySelector("#myText").value;
        if (document.querySelector("#myDateText").value.length == 10) {


            var date = new Date(document.querySelector("#myDateText").value);
            date = date.toLocaleDateString();
        }
        else {
            var date = new Date("null");
        }
        var hour = (document.querySelector("#myHourText").value);


        if (task == "" || document.querySelector("#myDateText").value == "" || hour == "") {
            return;
        }



        var ishourValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(hour);
        if (date.toString().includes("Invalid Date") == false &&
            ishourValid == true && hour.length == 8) {
            // Ok
            //document.querySelector("#error_alert").style = "display:none;";

            addTask({
                Id,
                task,
                date,
                hour,
            });

   

        } else {
            // error
            document.getElementById("error").style.opacity = "1";
            flagaddtask = false;
        }
    });
    if (typeof localStorage.task== 'undefined') {
        localStorage.task = JSON.stringify([]);
    } else {
        let task = JSON.parse(localStorage.task);
        id = 0;
        for (let i = 0; i < task.length; i++) {
            task_array.push(task[i]);
            addRowToTable(task[i]);
        }
    }
    }
