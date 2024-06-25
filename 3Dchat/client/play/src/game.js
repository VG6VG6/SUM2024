import { render } from "./rnd";
import { vec3 , mat4, cam } from "./mth/mth_def";
import { prim } from "./res/prim";
import { unit } from "./units/unitsList";
import { input } from "./input";

let socket = new WebSocket("ws://localhost:8000");
let canvas, chat, messageBox, lastMessage;
let rnd;

window.addEventListener("load", () => {
  canvas = document.getElementById("gameCanv");
  chat = document.getElementById("chat2D");
  messageBox = document.getElementById("messageBox");
  let myInput = document.getElementById("myTextArea");
  initializeCommunication();

  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener("click", () => {
    canvas.focus();
    myInput.blur();
  })
  myInput.addEventListener("keyup", (e) => {
    if (e.code == 'Enter' && myInput.value != "") {
      socket.send(JSON.stringify({type: "message", 
                                  name: window.sessionStorage.getItem("userName"),
                                  text: myInput.value}))
      myInput.value = "";
    }
  })

  main();
})

window.addEventListener("resize", () => {
  canvas.width = document.body.clientWidth// - //chat.clientWidth - 20;
  canvas.height = window.innerHeight;

  rnd.resize(canvas.width, canvas.height);
})

const camUp = vec3(0, 1, 0);
const projDist = 0.1;
const projSize = 0.1;
const farClip = 300;
const camLoc = vec3(0, 1.5, 1);

function main() {
  let camera = cam();

  camera.set(camLoc, vec3(0), camUp);
  camera.setProj(projSize, projDist, farClip);
  camera.setSize(canvas.width, canvas.height);
  rnd = render(canvas, camera);
  rnd.playerName = window.sessionStorage.getItem("userName")
  unit().init(rnd);

  rnd.isOn = false;
  $("#toggleButton").animate({"right": "5px"}, 500);
  $("#chat2D").animate({"right": "-400px"}, 500);
  $("#toggleButton").click(() => {
    if (rnd.isOn) {
      $("#toggleButton").animate({"right": "5px"}, 500);
      $("#chat2D").animate({"right": "-400px"}, 500);
      rnd.isOn = !rnd.isOn;
    } else {
      $("#toggleButton").animate({"right": "410px"}, 500);
      $("#chat2D").animate({"right": "10px"}, 500);
      rnd.isOn = !rnd.isOn;
    }
  })

  rnd.draw()
}

function initializeCommunication() {
  socket.onopen = (e) => {}

  socket.onmessage = (e) => {
    try {
      let js = JSON.parse(e.data);
      if (js.type == "message array") {
        for (let e of js.array) {
          if (e.name == rnd.playerName)
            messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="myMassege">' + e.text + '</div></div></td>');
          else if (lastMessage && lastMessage.name == e.name)
            messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="otherMessage">' + e.text + '</div></div></td>');
          else
          if (e.logo)
            messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="otherMessage"><div id="otherUserName">${e.name}<img src="${e.logo}" class="messageLogo"></div>${e.text}</div></div></td>`);
          else
            messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="otherMessage"><div id="otherUserName">${e.name}<img src="bin/images/logo.png" class="messageLogo"></div>${e.text}</div></div></td>`);
          lastMessage = e;
        }
        chat.scrollTo(0, chat.scrollHeight);
      } else if (js.type == "message") {
        if (js.name == rnd.playerName)
          messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="newMyMassege">' + js.text + '</div></div></td>');
        else 
          if (lastMessage && lastMessage.name == js.name)
            messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="newOtherMessage">' + js.text + '</div></div></td>');
          else
          if (js.logo)
            messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="newOtherMessage"><div id="otherUserName">${js.name}<img src="${js.logo}" class="messageLogo"></div>${js.text}</div></div></td>`);
          else
            messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="newOtherMessage"><div id="otherUserName">${js.name}<img src="bin/images/logo.png" class="messageLogo"></div>${js.text}</div></div></td>`);
        lastMessage = js;
        $("#newMyMassege").hide()
        $("#newMyMassege").toggle(1000).attr('id', 'myMassege');
        
        $("#newOtherMessage").hide()
        $("#newOtherMessage").toggle(1000).attr('id', 'otherMessage');

        let intervalID = setInterval(() => {
          chat.scrollTo(0, chat.scrollHeight);
        }, 10)
        setTimeout(() => {
          clearInterval(intervalID);
        }, 1000)
      }
    } catch {}
  }
}

