let socket = new WebSocket("ws://localhost:8000");

let inputName;

window.addEventListener("load", () => {
  let canvas = document.getElementById("regCanvas");
  inputName = document.getElementById("regName");
  let inputButtonm = document.getElementById("regButton");
  let reg = document.getElementById("register");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  reg.style =
  `width: 30%; 
  height: 70%;
  margin-top: -${window.innerHeight - 100}px;
  margin-left: 60%;
  position: absolute;
  max-width: 300px;
  `;

  inputButtonm.addEventListener("click", () => {
    if (inputName.value != "") {
      socket.send(JSON.stringify({type: "enter", value: inputName.value}))
    }
  })
})

window.addEventListener("resize", () => {
  let canvas = document.getElementById("regCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

function initializeCommunication() {
  socket.onopen = (e) => {
    socket.send("Hello from client");
  }
  socket.onmessage = (e) => {
    try {
      let js = JSON.parse(e.data.toString());
      if (js.type == "enter") {
        window.localStorage.setItem("userName", js.value);
        window.location.href = "/play";
      }
    } catch {}
  }
}

initializeCommunication()