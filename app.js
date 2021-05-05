var saved = localStorage.getItem("storedtodolist");
var muteUnmute = document.querySelector(".checkbox-container");
var mute = localStorage.getItem("muteSetting");

if (mute=='true') {
  muteUnmute.textContent = "Muted 🔇";
  mute=true;
} else if(mute=='false'){
  muteUnmute.textContent = "Sound on 🎶";
  mute=false;
}



var list = document.querySelector("#ordered-list");
var listContainer = document.querySelector('.todo-list-container');

if (saved) {
  list.innerHTML = saved;
}
var addTask = document.querySelector("#input-submit");

if (list.innerText == "") {
  listContainer.style.backgroundImage = "url(./imgs/empty.svg)";
}
muteUnmute.addEventListener("click", function () {
  if (!mute) {
    muteUnmute.textContent = "Muted 🔇";
    mute = true;
  } else {
    muteUnmute.textContent = "Sound on 🎶";
    mute = false;
  }
  localStorage.setItem("muteSetting", mute);
});
var input = document.querySelector("#input-task");
input.focus();
var counter = document.querySelector('#counter');
counter.innerText = `(${list.children.length})`
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


var audio = document.querySelector("#sound");
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

var clear = document.querySelector('#clearall')
clear.addEventListener('click',function() {
  if (!mute && list.children.length > 0) {
    audio.src = "./sounds/added-sound.mp3";
    audio.currentTime = 0;
    audio.play();
  }
  list.innerHTML='';
  listContainer.style.backgroundImage = "url(./imgs/empty.svg)";
  localStorage.setItem("storedtodolist", list.innerHTML);
  counter.innerText = `(${list.children.length})`;
  // console.log(list.children.length)
  
})