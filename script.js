/* ==========================================================
   shy_xhaTodo
   Frontend JavaScript
   Author: Shikha
   ========================================================== */
   
   document.addEventListener("DOMContentLoaded", () => {

    console.log("Welcome to shy_xhaTodo");

    smoothScrolling();

    navbarShadow();

    heroAnimation();

    buttonAnimation();

    loginValidation();

    signupValidation();

});


/* ======================================
   Smooth Scroll
====================================== */

function smoothScrolling(){

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link=>{

        link.addEventListener("click",function(e){

            e.preventDefault();

            const section=document.querySelector(this.getAttribute("href"));

            if(section){

                section.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}



/* ======================================
Navbar Shadow
====================================== */

function navbarShadow(){

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>50){

            navbar.style.boxShadow="0 8px 20px rgba(0,0,0,.15)";

        }

        else{

            navbar.style.boxShadow="none";

        }

    });

}



/* ======================================
Hero Animation
====================================== */

function heroAnimation(){

    const hero=document.querySelector("#hero img");

    if(hero){

        hero.animate([

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-12px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],{

            duration:3000,

            iterations:Infinity

        });

    }

}



/* ======================================
Buttons Hover
====================================== */

function buttonAnimation(){

    const buttons=document.querySelectorAll(".btn");

    buttons.forEach(btn=>{

        btn.addEventListener("mouseenter",()=>{

            btn.style.transform="scale(1.05)";

        });

        btn.addEventListener("mouseleave",()=>{

            btn.style.transform="scale(1)";

        });

    });

}



/* ======================================
Login Validation
====================================== */

function loginValidation(){

    const loginForm=document.querySelector("form");

    if(!document.getElementById("rememberMe")) return;

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const email=document.getElementById("email").value.trim();

        const password=document.getElementById("password").value.trim();

        if(email==="" || password===""){

            alert("Please fill all fields.");

            return;

        }

        alert("Login Successful!");

    });

}



/* ======================================
Signup Validation
====================================== */

function signupValidation(){

    const fullName=document.getElementById("fullName");

    if(!fullName) return;

    const signupForm=document.querySelector("form");

    signupForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name=fullName.value.trim();

        const email=document.getElementById("email").value.trim();

        const password=document.getElementById("password").value;

        const confirm=document.getElementById("confirmPassword").value;

        if(name==="" || email==="" || password===""){

            alert("Please complete the form.");

            return;

        }

        if(password.length<8){

            alert("Password should contain at least 8 characters.");

            return;

        }

        if(password!==confirm){

            alert("Passwords do not match.");

            return;

        }

        alert("Account Created Successfully!");

    });

}
/* ==========================================================
                    DASHBOARD JAVASCRIPT
========================================================== */

// ============================
// Global Variables
// ============================

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");

const taskContainer = document.getElementById("taskContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const priorityTasks = document.getElementById("priorityTasks");

const searchTask = document.getElementById("searchTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
// ============================
// Save Tasks
// ============================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
// ============================
// Update Statistics
// ============================

function updateStats(){

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    priorityTasks.textContent =
        tasks.filter(task => task.priority === "High").length;

}
// ============================
// Upcoming Deadlines
// ============================

function updateDeadlines(){

    const deadlineList =
        document.getElementById("deadlineList");

    if(!deadlineList) return;

    deadlineList.innerHTML = "";

    const upcoming = tasks
        .filter(task => task.date !== "")
        .sort((a,b)=>new Date(a.date)-new Date(b.date))
        .slice(0,5);

    if(upcoming.length===0){

        deadlineList.innerHTML =

        "<li>No upcoming deadlines 🌸</li>";

        return;

    }

    upcoming.forEach(task=>{

        const li=document.createElement("li");

        li.innerHTML=`

        <strong>${task.title}</strong><br>

        <small>${task.date}</small>

        `;

        deadlineList.appendChild(li);

    });

}
function updateGoalProgress(){

    const progress = document.getElementById("goalProgress");

    if(!progress) return;

    const completed = tasks.filter(task => task.completed).length;

    let percentage = 0;

    if(tasks.length>0){

        percentage = (completed/tasks.length)*100;

    }

    progress.style.width = percentage + "%";

}
// ============================
// Display Tasks
// ============================

function displayTasks(){

    taskContainer.innerHTML = "";
    tasks.forEach((task,index)=>{
        // Search Filter

const keyword = searchTask.value.toLowerCase();

if (
    !task.title.toLowerCase().includes(keyword) &&
    !task.description.toLowerCase().includes(keyword)
) {
    return;
}
// Filter Tasks

if (currentFilter === "completed" && !task.completed) return;

if (currentFilter === "pending" && task.completed) return;

if (
    currentFilter === "high" &&
    task.priority !== "High"
) return;
// ============================
// Filter Buttons
// ============================



        const card=document.createElement("div");
        

        card.className = task.completed
    ? "planner-card mb-3 completed-task"
    : "planner-card mb-3";
        
        card.innerHTML = `

<div class="task-card">

    <div class="task-top">

        <div>

            <h4 class="task-title">${task.title}</h4>

            <p class="task-description">${task.description}</p>

        </div>

        <input
            type="checkbox"
            class="completeBtn form-check-input"
            data-index="${index}"
            ${task.completed ? "checked" : ""}>

    </div>

    <div class="task-bottom">

        <div>

            <span class="badge bg-secondary">
                ${task.category}
            </span>

            <span class="priority-badge ${task.priority.toLowerCase()}">
                ${task.priority}
            </span>

            <span class="task-date">
                📅 ${task.date || "No Date"}
            </span>

        </div>

        <div class="task-actions">

            <button
                class="edit-btn editBtn"
                data-index="${index}">
                ✏️
            </button>

            <button
                class="delete-btn deleteBtn"
                data-index="${index}">
                🗑️
            </button>

        </div>

    </div>

</div>

`;
        
        taskContainer.appendChild(card);
        
        });

    

      

    

    if(tasks.length===0){

        taskContainer.innerHTML = `

        <div id="emptyState" class="text-center py-5">
        
            <img
                src="preview.jpeg"
                class="img-fluid mb-4"
                style="max-width:220px;">
        
            <h3>No Tasks Yet 🌸</h3>
        
            <p class="text-muted">
        
                Start organizing your beautiful day by adding your first task.
        
            </p>
        
        </div>
        
        `;
    }
    
    updateStats();
    
    updateDeadlines();
    
    updateGoalProgress();
    
    saveTasks();
    return;


}
// ============================
// Add New Task
// ====================

    if(taskForm){

        taskForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const task = {

        title: taskTitle.value.trim(),

        description: taskDescription.value.trim(),

        category: taskCategory.value,

        priority: taskPriority.value,

        date: taskDate.value,

        completed: false

    };
 

    // Prevent empty title
    if (task.title === "") {

        alert("Please enter a task title.");

        return;

    }

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskForm.reset();


});
}


// ============================
// Delete Task
// ============================

taskContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("deleteBtn")) {

        const index = e.target.dataset.index;

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

});
// ============================
// Complete Task
// ============================

taskContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("completeBtn")) {

        const index = e.target.dataset.index;

        tasks[index].completed = !tasks[index].completed;

        saveTasks();

        displayTasks();

    }

});
// ============================
// Edit Task
// ============================

taskContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("editBtn")) {

        const index = e.target.dataset.index;

        taskTitle.value = tasks[index].title;

        taskDescription.value = tasks[index].description;

        taskCategory.value = tasks[index].category;

        taskPriority.value = tasks[index].priority;

        taskDate.value = tasks[index].date;

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

});
// ============================
// Load Dashboard
// ============================

displayTasks();




// ============================
// Live Search
// ============================

searchTask.addEventListener("keyup", function () {
    document.querySelectorAll(".filter-btn").forEach(button=>{

        button.addEventListener("click",function(){
    
            currentFilter=this.dataset.filter;
    
            document.querySelectorAll(".filter-btn").forEach(btn=>{
    
                btn.classList.remove("active");
    
            });
    
            this.classList.add("active");
    
            displayTasks();
    
        });
    
    });

    displayTasks();


});
// ============================
// Today's Date
// ============================

const todayDate = document.getElementById("todayDate");

if(todayDate){

    const today = new Date();

    todayDate.textContent = today.toDateString();

}
// ============================
// Quote of the Day
// ============================

const quotes = [

    "Small progress each day adds up to big results.",

    "Discipline creates freedom.",

    "Dream big. Start small. Act now.",

    "Done is better than perfect.",

    "Focus on progress, not perfection."

];

const quote = document.querySelector("#quoteCard blockquote");

if(quote){

    quote.textContent = quotes[Math.floor(Math.random()*quotes.length)];

}
