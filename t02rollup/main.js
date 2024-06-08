import { shaderInit, render } from "./mylib";

let col;

function main() {
  const element = document.querySelector("#glcanvas");
  col = document.querySelector("#col");
  const gl = element.getContext("webgl2");

  if (gl == null) {
    alert("WebGL2 not supported");
    return;
  }

  window.gl = gl;
  window.canvas = element;

  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  shaderInit();

  const anim = () => {
    gl.clearColor(0.3, 0.47, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    render();
    window.requestAnimationFrame(anim);
  };

  anim();
}
window.addEventListener("load", () => {
  main();
});