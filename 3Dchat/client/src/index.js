let socket = new WebSocket(`wss://${location.host}`);

let inputName;

window.addEventListener("load", () => {
  inputName = document.getElementById("regName");
  let char1 = document.getElementById("char1");
  let char2 = document.getElementById("char2");
  let char3 = document.getElementById("char3");

  char1.addEventListener("click", () => {if (inputName.value != "") {socket.send(JSON.stringify({type: "enter", value: inputName.value, charecter: 0}))}})
  char2.addEventListener("click", () => {if (inputName.value != "") {socket.send(JSON.stringify({type: "enter", value: inputName.value, charecter: 1}))}})
  char3.addEventListener("click", () => {if (inputName.value != "") {socket.send(JSON.stringify({type: "enter", value: inputName.value, charecter: 2}))}})
})

function initializeCommunication() {
  socket.onopen = (e) => {
    socket.send("Hello from client");
  }
  socket.onmessage = (e) => {
    try {
      let js = JSON.parse(e.data.toString());
      if (js.type == "enter") {
        window.sessionStorage.setItem("userName", js.value);
        window.sessionStorage.setItem("userCharecter", js.charecter);
        window.location.href = "/play";
      }
    } catch {}
  }
}

initializeCommunication()