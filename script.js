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

            showToast("Please fill all fields.");

            return;

        }

        showToast("Login Successful!");

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

            showToast("Please complete the form.");

            return;

        }

        if(password.length<8){

            showToast("Password should contain at least 8 characters.");

            return;

        }

        if(password!==confirm){

            showToast("Passwords do not match.");

            return;

        }

        showToast("Account Created Successfully!");

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

       
taskContainer.innerHTML=`

<div id="emptyState" class="text-center py-5">

<img
src="preview.jpeg"
class="img-fluid mb-4"
style="max-width:220px;">

<h3>

No Tasks Yet 🌸

</h3>

<p>

Start organizing your day by creating your first task.

</p>

<button
<a
href="#taskForm"
class="btn btn-primary mt-3">

Create First Task

</a>
</button>

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

    if(taskContainer){

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

        showToast("Please enter a task title.");

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
if(taskContainer){
taskContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("deleteBtn")) {

        const index = e.target.dataset.index;

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

});
}
// ============================
// Complete Task
// ============================
if(taskContainer){
taskContainer.addEventListener("click", function (e) {

    if (e.target.classList.contains("completeBtn")) {

        const index = e.target.dataset.index;

        tasks[index].completed = !tasks[index].completed;

        saveTasks();

        displayTasks();

    }

});
}
// ============================
// Edit Task
// ============================
if(taskContainer){
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
}
// ============================
// Load Dashboard
// ============================

displayTasks();




// ============================
// Live Search
// ============================
if(searchTask){
searchTask.addEventListener("keyup", function () {
   

    displayTasks();

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


});
}
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
/* ==========================================
PASSWORD VAULT
========================================== */

const passwordForm=document.getElementById("passwordForm");

if(passwordForm){

const website=document.getElementById("website");

const username=document.getElementById("username");

const password=document.getElementById("password");

const category=document.getElementById("category");

const searchPassword=document.getElementById("searchPassword");

const passwordContainer=document.getElementById("passwordContainer");

let passwords=JSON.parse(localStorage.getItem("passwords"))||[];

function savePasswords(){

localStorage.setItem("passwords",JSON.stringify(passwords));

}

function displayPasswords(){

passwordContainer.innerHTML="";

const keyword=searchPassword.value.toLowerCase();

const filtered=passwords.filter(item=>

item.website.toLowerCase().includes(keyword)||

item.username.toLowerCase().includes(keyword)

);

if(filtered.length===0){


passwordContainer.innerHTML=`

<div id="emptyState" class="text-center py-5">

<img
src="preview.jpeg"
class="img-fluid mb-4"
style="max-width:220px;">

<h3>

No passwords Yet 🔐

</h3>

<p>

Start organizing your day by creating your first task.

</p>

<button
class="btn btn-primary mt-3">

+ Create First Task

</button>

</div>

`;




return;

}

filtered.forEach((item,index)=>{

const card=document.createElement("div");

card.className="password-card";

card.innerHTML=`

<div class="password-top">

<h4>${item.website}</h4>

<span class="badge bg-secondary">${item.category}</span>

</div>

<div class="password-email">

👤 ${item.username}

</div>

<div class="password-hidden" id="pass${index}">

••••••••••

</div>

<div class="password-actions">

<button class="showBtn" data-index="${index}">

👁 Show

</button>

<button class="copyBtn" data-index="${index}">

📋 Copy

</button>

<button class="editPassword" data-index="${index}">

✏ Edit

</button>

<button class="deletePassword" data-index="${index}">

🗑 Delete

</button>

</div>

`;

passwordContainer.appendChild(card);

});

}

passwordForm.addEventListener("submit",function(e){

e.preventDefault();

passwords.push({

website:website.value,

username:username.value,

password:password.value,

category:category.value

});

savePasswords();

displayPasswords();

passwordForm.reset();

});

passwordContainer.addEventListener("click",function(e){

const index=e.target.dataset.index;

if(e.target.classList.contains("deletePassword")){

passwords.splice(index,1);

savePasswords();

displayPasswords();

}

if(e.target.classList.contains("showBtn")){

const pass=document.getElementById("pass"+index);

pass.textContent=passwords[index].password;

}

if(e.target.classList.contains("copyBtn")){

navigator.clipboard.writeText(passwords[index].password);

showToast("Password Copied!");

}

if(e.target.classList.contains("editPassword")){

website.value=passwords[index].website;

username.value=passwords[index].username;

password.value=passwords[index].password;

category.value=passwords[index].category;

passwords.splice(index,1);

savePasswords();

displayPasswords();

}

});

searchPassword.addEventListener("keyup",displayPasswords);

displayPasswords();

}
/* ==========================================
PROFILE PAGE
========================================== */

const saveProfile=document.getElementById("saveProfile");

if(saveProfile){

const profileName=document.getElementById("profileName");

const profileEmail=document.getElementById("profileEmail");

const profilePhone=document.getElementById("profilePhone");

const profileLocation=document.getElementById("profileLocation");

const profileBio=document.getElementById("profileBio");

// Load Profile

const profile=JSON.parse(localStorage.getItem("profile"));

if(profile){

profileName.value=profile.name;

profileEmail.value=profile.email;

profilePhone.value=profile.phone;

profileLocation.value=profile.location;

profileBio.value=profile.bio;

}

// Save Profile

saveProfile.addEventListener("click",function(){

const user={

name:profileName.value,

email:profileEmail.value,

phone:profilePhone.value,

location:profileLocation.value,

bio:profileBio.value

};

localStorage.setItem("profile",JSON.stringify(user));

showToast("Profile Saved Successfully 🌸");

});

// Dashboard Statistics

const profileTasks=JSON.parse(localStorage.getItem("tasks"))||[];

const total=document.getElementById("profileTotalTasks");

const completed=document.getElementById("profileCompletedTasks");

const high=document.getElementById("profileHighPriority");

if(total){

total.textContent=tasks.length;

}

if(completed){

completed.textContent=

tasks.filter(task=>task.completed).length;

}

if(high){

high.textContent=

tasks.filter(task=>task.priority==="High").length;

}

}
/* ==========================================
        ANALYTICS PAGE
========================================== */

const analyticsTotal=document.getElementById("analyticsTotal");

if(analyticsTotal){

const analyticsCompleted=document.getElementById("analyticsCompleted");

const analyticsPending=document.getElementById("analyticsPending");

const analyticsHigh=document.getElementById("analyticsHigh");

const analyticsTasks=

JSON.parse(localStorage.getItem("tasks"))||[];

const total=analyticsTasks.length;

const completed=

analyticsTasks.filter(task=>task.completed).length;

const pending=

analyticsTasks.filter(task=>!task.completed).length;

const high=

analyticsTasks.filter(task=>task.priority==="High").length;

analyticsTotal.textContent=total;

analyticsCompleted.textContent=completed;

analyticsPending.textContent=pending;

analyticsHigh.textContent=high;

const pie=document.getElementById("pieChart");

if(pie){

new Chart(pie,{

type:"doughnut",

data:{

labels:[

"Completed",

"Pending"

],

datasets:[{

data:[

completed,

pending

],

backgroundColor:[

"#9BB89C",

"#B07A87"

]

}]

}

});

}

const bar=document.getElementById("barChart");

if(bar){

new Chart(bar,{

type:"bar",

data:{

labels:[

"High",

"Medium",

"Low"

],

datasets:[{

label:"Priority",

data:[

high,

analyticsTasks.filter(t=>t.priority==="Medium").length,

analyticsTasks.filter(t=>t.priority==="Low").length

]

}]

}

});

}

}
/*=================================
CALENDAR
=================================*/

const calendarGrid=document.getElementById("calendarGrid");

if(calendarGrid){

const monthYear=document.getElementById("monthYear");

const taskList=document.getElementById("calendarTaskList");

const calenderTasks=JSON.parse(localStorage.getItem("tasks"))||[];

const today=new Date();

const month=today.getMonth();

const year=today.getFullYear();

monthYear.textContent=

today.toLocaleString("default",{

month:"long",

year:"numeric"

});

for(let i=1;i<=daysInMonth;i++){

const day=document.createElement("div");

day.className="calendar-day";

if(i===today.getDate()){

day.classList.add("today");

}

const taskExists=

tasks.some(task=>{

if(!task.date)return false;

return new Date(task.date).getDate()===i;

});

if(taskExists){

day.classList.add("task-day");

}

day.innerHTML=`<strong>${i}</strong>`;

calendarGrid.appendChild(day);

}

taskList.innerHTML="";

tasks

.filter(task=>task.date)

.sort((a,b)=>new Date(a.date)-new Date(b.date))

.forEach(task=>{

const li=document.createElement("li");

li.className="list-group-item";

li.innerHTML=`<strong>${task.title}</strong> - ${task.date}`;

taskList.appendChild(li);

});

}
/*==================================
NOTES
==================================*/

const noteForm=document.getElementById("noteForm");

if(noteForm){

const noteTitle=document.getElementById("noteTitle");

const noteText=document.getElementById("noteText");

const notesContainer=document.getElementById("notesContainer");

const searchNote=document.getElementById("searchNote");

let notes=

JSON.parse(localStorage.getItem("notes"))||[];

function saveNotes(){

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}

function displayNotes(){

notesContainer.innerHTML="";

const keyword=

searchNote.value.toLowerCase();

notes

.filter(note=>

note.title.toLowerCase().includes(keyword)||

note.text.toLowerCase().includes(keyword)

)

.forEach((note,index)=>{

const card=document.createElement("div");

card.className="note-card";

card.innerHTML=`

<h4>${note.title}</h4>

<p>${note.text}</p>

<div class="note-actions">

<button
class="editNote"
data-index="${index}">

✏ Edit

</button>

<button
class="deleteNote"
data-index="${index}">

🗑 Delete

</button>

</div>

`;

notesContainer.appendChild(card);

});

}

noteForm.addEventListener("submit",function(e){

e.preventDefault();

notes.push({

title:noteTitle.value,

text:noteText.value

});

saveNotes();

displayNotes();

noteForm.reset();

});

notesContainer.addEventListener("click",function(e){

const index=e.target.dataset.index;

if(e.target.classList.contains("deleteNote")){

notes.splice(index,1);

saveNotes();

displayNotes();

}

if(e.target.classList.contains("editNote")){

noteTitle.value=notes[index].title;

noteText.value=notes[index].text;

notes.splice(index,1);

saveNotes();

displayNotes();

}

});

searchNote.addEventListener(

"keyup",

displayNotes

);

displayNotes();

}
/*=================================
POMODORO
=================================*/

const timerDisplay=document.getElementById("timerDisplay");

if(timerDisplay){

let seconds=1500;

let timer;

let running=false;

function updateTimer(){

let min=Math.floor(seconds/60);

let sec=seconds%60;

timerDisplay.textContent=

`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

document.getElementById("startTimer").onclick=function(){

if(running) return;

running=true;

timerDisplay.classList.add("timer-running");

timer=setInterval(()=>{

seconds--;

updateTimer();

if(seconds<=0){

clearInterval(timer);

showToast("🍅 Time's Up!");
new Audio("alarm.mp3").play();

running=false;

timerDisplay.classList.remove("timer-running");

}

},1000);

};

document.getElementById("pauseTimer").onclick=function(){

clearInterval(timer);

running=false;

timerDisplay.classList.remove("timer-running");

};

document.getElementById("resetTimer").onclick=function(){

clearInterval(timer);

running=false;

seconds=1500;

updateTimer();

timerDisplay.classList.remove("timer-running");

};

updateTimer();

}
/*=================================
HABIT TRACKER
=================================*/

const habitContainer=document.getElementById("habitContainer");

if(habitContainer){

let habits=

JSON.parse(localStorage.getItem("habits"))||

[

"Drink Water 💧",

"Workout 💪",

"Read Book 📚",

"Study 📖",

"Meditation 🧘"

];

function saveHabits(){

localStorage.setItem(

"habits",

JSON.stringify(habits)

);

}

function displayHabits(){

habitContainer.innerHTML="";

habits.forEach((habit,index)=>{

const card=document.createElement("div");

card.className="habit-card";

card.innerHTML=`

<div class="habit-name">

${habit}

</div>

<input

type="checkbox"

class="habit-check">

`;

habitContainer.appendChild(card);

});

}

document.getElementById("addHabit").onclick=function(){

const habit=prompt("Enter New Habit");

if(habit){

habits.push(habit);

saveHabits();

displayHabits();

}

};

displayHabits();

}
/*=================================
SETTINGS
=================================*/

const saveSettings=document.getElementById("saveSettings");

if(saveSettings){

const darkMode=document.getElementById("darkMode");

const notifications=document.getElementById("notifications");

const accentColor=document.getElementById("accentColor");

const settings=

JSON.parse(localStorage.getItem("settings"))||{};

if(settings.darkMode){

darkMode.checked=true;

}

if(settings.notifications){

notifications.checked=true;

}

if(settings.accentColor){

accentColor.value=settings.accentColor;

}

saveSettings.addEventListener("click",()=>{

const data={

darkMode:darkMode.checked,

notifications:notifications.checked,

accentColor:accentColor.value

};

localStorage.setItem(

"settings",

JSON.stringify(data)

);

document.documentElement.style.setProperty(

"--color-primary",

accentColor.value

);

showToast("Settings Saved 🌸");

});

}


    /* ============================
   TOAST
============================ */

function showToast(message){

    const toast=document.createElement("div");
    
    toast.className="custom-toast";
    
    toast.innerHTML=message;
    
    document.body.appendChild(toast);
    
    setTimeout(()=>{
    
    toast.classList.add("show");
    
    },100);
    
    setTimeout(()=>{
    
    toast.classList.remove("show");
    
    setTimeout(()=>{
    
    toast.remove();
    
    },300);
    
    },2500);
    
    }
/*=========================
ACTIVE NAVBAR
=========================*/

const currentPage=window.location.pathname.split("/").pop();

document.querySelectorAll(".navbar .nav-link").forEach(link=>{

const href=link.getAttribute("href");

if(href===currentPage){

link.classList.add("active-page");

}

});

/*=========================
LOADER
=========================*/

window.addEventListener("load", function(){

    const loader = document.getElementById("loader");

    if(loader){

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    }

});
    /*====================================
SCROLL REVEAL
====================================*/

const revealElements=document.querySelectorAll(".planner-card,.dashboard-card,.hero-box");

function revealOnScroll(){

revealElements.forEach(el=>{

const windowHeight=window.innerHeight;

const revealTop=el.getBoundingClientRect().top;

if(revealTop<windowHeight-100){

el.classList.add("active");

}else{

el.classList.remove("active");

}

});

}

revealElements.forEach(el=>{

el.classList.add("reveal");

});

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();
/*====================================
BACK TO TOP
====================================*/

const topBtn=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};
