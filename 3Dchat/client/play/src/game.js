import { render } from "./rnd";
import { vec3 , mat4, cam } from "./mth/mth_def";
import { prim } from "./res/prim";
import { unit } from "./units/unitsList";

let socket = new WebSocket("ws://localhost:8000");
let canvas, chat;
let rnd;

window.addEventListener("load", () => {
  canvas = document.getElementById("gameCanv");
  chat = document.getElementById("chat2D");

  canvas.width = document.body.clientWidth - chat.clientWidth - 20;
  canvas.height = document.body.clientHeight;

  main();
})

window.addEventListener("resize", () => {
  canvas.width = document.body.clientWidth - chat.clientWidth - 20;
  
  let camera = cam();
  camera.set(camLoc, vec3(0), camUp);
  camera.setProj(projSize, projDist, farClip);
  camera.setSize(canvas.width, canvas.height);

  rnd.resize(camera);
})

function initializeCommunication() {
  socket.onopen = (e) => {
    socket.send("Hello from client");
  }
  socket.onmessage = (e) => {
    try {
      let js = JSON.parse(e.data.toString());
    } catch {}
  }
}

initializeCommunication()

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
  rnd.inputInit()
  unit().init(rnd);

  rnd.draw()
}