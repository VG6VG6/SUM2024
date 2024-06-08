import { prim, vertex } from "./res/prim";
import { vec3 } from "./mth/mth_vec3";

let timeLoc, rnd,
  mouseLoc,
  mousePosX = 0,
  MouseZ = 0,
  mousePosY = 0;

let x = 0,
  OldMouseX,
  OldMouseY;

let IsMouseDown = false;
let tetr;

// Main render frame function.
export function render(rend) {
  rend.gl.clear(rend.gl.COLOR_BUFFER_BIT);

  // Uniform data
  timeLoc = rend.gl.getUniformLocation(rend.shd.id, "Time");
  mouseLoc = rend.gl.getUniformLocation(rend.shd.id, "Mouse");

  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

      rend.gl.uniform1f(timeLoc, t);
  }
  if (mouseLoc != -1) {
    rend.gl.uniform3f(mouseLoc, mousePosX, mousePosY, MouseZ);
  }
  ///gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  tetr.draw();
  
} /* End of 'render' finction */

function fractalMove(event) {
  let X = event.clientX,
    Y = event.clientY;

  if (IsMouseDown) {
    mousePosX -= X - OldMouseX;
    mousePosY += Y - OldMouseY;
    (OldMouseY = Y), (OldMouseX = X);
  }
}

export function renderInit(render) {
  rnd = render;
  rnd.canvas.addEventListener("mousedown", (event) => {
    OldMouseX = event.clientX;
    OldMouseY = event.clientY;
    IsMouseDown = true;
  });
  rnd.canvas.addEventListener("mousemove", (event) => {
    fractalMove(event);
  });
  rnd.canvas.addEventListener("mouseup", () => {
    IsMouseDown = false;
  });
  rnd.canvas.addEventListener("mouseout", () => {
    IsMouseDown = false;
  });
  rnd.canvas.addEventListener("mousewheel", (event) => {
    MouseZ += event.wheelDelta / 40000;
  });

  let V = [], ind=  [];
  V[0] = vertex();
  V[1] = vertex();
  V[2] = vertex();
  V[3] = vertex();
  V[0].pos = vec3(-1, 1, 0);
  V[1].pos = vec3(-1, -1, 0);
  V[2].pos = vec3(1, 1, 0);
  V[3].pos = vec3(1, -1, 0);
  V[0].n = vec3(0, 0, 1);
  V[1].n = vec3(0, 0, 1);
  V[2].n = vec3(0, 0, 1);
  V[3].n = vec3(0, 0, 1);

  ind[0] = 0;
  ind[1] = 0;
  ind[2] = 0;
  ind[3] = 0;
  tetr = prim(V, 4, ind, 4, rnd.gl.TRIANGLE_STRIP);
}

console.log("Done.");
