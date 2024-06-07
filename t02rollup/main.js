import { shaderInit, render, colorUpdate } from "./mylib";

let col;

function main() {
  const element = document.querySelector("#glcanvas");
  col = document.querySelector("#col");
  const gl = element.getContext("webgl2");

  if (gl == null) {
    alert("WebGL2 not supported");
    return;
  }
  if (col)
    col.addEventListener("change", () => {
      colorUpdate(col.value)
    })

  window.gl = gl;
  window.canvas = element;

  shaderInit();

  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

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