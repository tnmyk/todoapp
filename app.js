// add total time focused
var audio = document.querySelector("#sound");

var saved = localStorage.getItem("storedtodolist");
var muteUnmute = document.querySelector(".checkbox-container");
var mute = localStorage.getItem("muteSetting");

if (mute == "true") {
  muteUnmute.textContent = "Muted 🔇";
  mute = true;
} else if (mute == "false") {
  muteUnmute.textContent = "Sound on 🎶";
  mute = false;
}
var list = document.querySelector("#ordered-list");
var listContainer = document.querySelector(".todo-list-container");

if (saved) {
  list.innerHTML = saved;
}
var addTask = document.querySelector("#input-submit");

if (list.innerText == "") {
  listContainer.style.backgroundImage = "url(./imgs/empty.svg)";
}
var time = document.querySelector('#time');
var seconds=0;
var minutes=0;
var hours=0;
function changeTime(){
  seconds++;
  if(seconds>60){
    minutes++;
    seconds=0;
  }
  if(minutes>60){
    hours++;
    minutes=0;
  }
  var secondstext = seconds
  var minutestext = minutes
  var hourstext = hours
  if(seconds<10){
    secondstext="0"+seconds
  }
  if(minutes<10){
    minutestext="0"+minutes
  }
  if(hours<10){
    hourstext="0"+hours
  }
  time.textContent=hourstext+":"+minutestext+":"+secondstext;
  console.log(secondstext)
}

var start = document.querySelector("#start");
var reset = document.querySelector("#reset");
var counting = false;
var stopwatch ;
start.addEventListener("click", function () {
  if(!counting){
    counting=true;
    stopwatch=setInterval(changeTime,1000);
    start.style.backgroundColor="yellow"
    start.textContent="Pause"
    if (!mute) {
      audio.src = "./sounds/timerstart.mp3";
      audio.currentTime = 0;
      audio.play();
    }
  }
  else{
    counting=false;
    clearInterval(stopwatch);
    start.style.backgroundColor = "lightgreen";
    start.textContent = "Resume";  
    if (!mute) {
      audio.src = "./sounds/timerstop.mp3";
      audio.currentTime = 0;
      audio.play();
    } 
  }
});
reset.addEventListener("click", function (){
    if (!mute && seconds != 0) {
      audio.src = "./sounds/timerreset.mp3";
      audio.currentTime = 0;
      audio.play();
    }   
    clearInterval(stopwatch);
    seconds=0;
    minutes=0;
    hours = 0;
    time.textContent="00:00:00";
    if(counting){
      counting = false;
      start.style.backgroundColor = "lightgreen";
      start.textContent = "Start";  
    }
    else{
      start.style.backgroundColor = "lightgreen";
      start.textContent = "Start";
    } 
    
})

muteUnmute.addEventListener("click", function () {
  if (!mute) {
    muteUnmute.textContent = "Muted 🔇";
    mute = true;
  } else {
    muteUnmute.textContent = "Sound on 🎶";
    mute = false;
    audio.src = "./sounds/timerstop.mp3";
    audio.currentTime = 0;
    audio.play();
  }
  localStorage.setItem("muteSetting", mute);
});
var input = document.querySelector("#input-task");
input.focus();
var counter = document.querySelector("#counter");
counter.innerText = `(${list.children.length})`;
addTask.addEventListener("click", function () {
  if (input.value.length > 0) {
    if (!mute) {
      audio.src = "./sounds/done-sound.mp3";
      audio.currentTime = 0;
      audio.play();
    }
    list.innerHTML += `<li>
                        <div class="task-text">${input.value}</div>
                        <div class="del-complete">
                            
                        <button class="done">
                        </button>
                        <button class="delete"></button>
                        </div>
                        
                    </li>`;
    input.value = "";
    localStorage.setItem("storedtodolist", list.innerHTML);
    if (list.innerText != "") {
      listContainer.style.backgroundImage = "none";
    }
    counter.innerText = `(${list.children.length})`;
  }
});

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && input.value.length > 0) {
    if (!mute) {
      audio.src = "./sounds/done-sound.mp3";
      audio.currentTime = 0;
      audio.play();
    }

    list.innerHTML += `<li>
                        <div class="task-text">${input.value}</div>
                        <div class="del-complete">
                            
                        <button class="done">
                        </button>
                        <button class="delete"></button>
                        </div>
                        
                    </li>`;
    input.value = "";
    localStorage.setItem("storedtodolist", list.innerHTML);
    if (list.innerText != "") {
      listContainer.style.backgroundImage = "none";
    }
    counter.innerText = `(${list.children.length})`;

    // console.log(list.children.length)
  }
});

audio.volume =0.5;
console.log(audio.volume);

audio.preload = "auto";
list.addEventListener("click", function (e) {
  const li = e.target.parentElement.parentElement;
  if (e.target.className == "delete") {
    list.removeChild(li);
    if (!mute) {
      audio.src = "./sounds/delete-sound.mp3";
      audio.currentTime = 0;
      audio.play();
    }
    if (list.innerText == "") {
      listContainer.style.backgroundImage = "url(./imgs/empty.svg)";
        if (!mute) {
          audio.src = "./sounds/listempty.mp3";
          audio.currentTime = 0;
          audio.play();
        }
    }
    counter.innerText = `(${list.children.length})`;

    localStorage.setItem("storedtodolist", list.innerHTML);
  } else if (e.target.className == "done") {
    if (li.style.color == "gray") {
      li.style.color = "white";
      li.querySelector(".task-text").style.textDecoration = "none";
      counter.innerText = `(${list.children.length})`;
      li.querySelector(".done").style.backgroundImage = "url(./imgs/done.svg)";
      li.querySelector(".done").style.backgroundColor = "rgb(31, 223, 31)";
      localStorage.setItem("storedtodolist", list.innerHTML);
    } else {
      if (!mute) {
        audio.src = "./sounds/added-sound.mp3";
        audio.currentTime = 0;
        audio.play();
      }
      li.style.color = "gray";
      li.querySelector(".task-text").style.textDecoration = "line-through";
      li.querySelector(".done").style.backgroundImage =
        "url(./imgs/remove-done.svg)";
      li.querySelector(".done").style.backgroundColor = "rgb(216, 216, 0)";
      localStorage.setItem("storedtodolist", list.innerHTML);
    }
  }
});

var clear = document.querySelector("#clearall");
clear.addEventListener("click", function () {
  if (!mute && list.children.length > 0) {
    audio.src = "./sounds/listempty.mp3";
    audio.currentTime = 0;
    audio.play();
  }
  list.innerHTML = "";
  listContainer.style.backgroundImage = "url(./imgs/empty.svg)";
  localStorage.setItem("storedtodolist", list.innerHTML);
  counter.innerText = `(${list.children.length})`;
  // console.log(list.children.length)
});
