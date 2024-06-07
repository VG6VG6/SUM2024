import { vec3 , mat4, cam, matView } from "./mth/mth_def";
import {shaderCreation, render} from "./mylib"

// GL context
let gl, element, camera;

// load GL function
function loadGL() {
  element = document.querySelector("#glCanvas"); 
  gl = element.getContext("webgl2");

  if (gl == null) {
    alert("WebGL2 not supported");
    return;
  }
  gl.clearColor(0.3, 0.47, 0.8, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  shaderCreation(gl, element);
  camera = matView(vec3(10, 10, 0), vec3(0, 1, 0), vec3(0));
  console.log(camera);
  const anim = () => {
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    render();
    window.requestAnimationFrame(anim);
  }
  anim();
}

window.addEventListener("load", () => {
  loadGL();
})

// console.log(mat4([[0, 0, 0, 1], [1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 1, 1]]));
// console.log(cam());
// console.log(cam().set(vec3(10, 10, 0), vec3(0), vec3(0, 1, 0)));

function a(...args) {
  console.log("HI:");
  console.log(...args[0]);
  console.log("HI:");
  console.log(...args);
  console.log("HI:");
}

a([1, 2, 3, 4], [2, 3, 4, 5], [6, 7, 8, 9], [1, 1, 1, 1]);