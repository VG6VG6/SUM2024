import { vec3 , mat4, cam, matView } from "./mth/mth_def";
import {render, renderInit} from "./mylib"
import { Timer } from "./res/timer";
import { shader } from "./res/shader";
import { initPrim1 } from "./res/prim";

// GL context
let camera, flag;

class rend {
  gl;
  shd;
  prg;
  canvas;
  camera;
  worldLoc;
}

// load GL function
function loadGL() {
  let rnd = new rend();
  rnd.canvas = document.querySelector("#glCanvas"); 
  rnd.gl = rnd.canvas.getContext("webgl2");

  if (rnd.gl == null) {
    alert("WebGL2 not supported");
    return;
  }
  rnd.gl.clearColor(0.3, 0.47, 0.8, 1);
  rnd.gl.clear(rnd.gl.COLOR_BUFFER_BIT);

  ///shaderCreation(gl, element);
  rnd.shd = shader("def", rnd);
  flag = false;
  
  rnd.camera = cam();
  rnd.camera.setSize(600, 600);
  // camera.FrameH = 600;
  // camera.FrameW = 600;
  rnd.camera.setProj(0.1, 0.1, 300);
  rnd.camera.set(vec3(0, 10, 10), vec3(0), vec3(0, 1, 0));

  const anim = () => {
    rnd.gl.clearColor(1, 0, 0, 1);

    if (flag) {
      render(rnd);
    } else {
      if (rnd.shd.id != null) {
        // shd.apply();
        // // Vertex buffer creation
        // const size = 0.99;
        // const vertexes = [
        //   -size,
        //   size,
        //   0,
        //   -size,
        //   -size,
        //   0,
        //   size,
        //   size,
        //   0,
        //   size,
        //   -size,
        //   0,
        // ];
        // const posLoc = gl.getAttribLocation(shd.id, "InPosition");
        // let vertexArray = gl.createVertexArray();
        // gl.bindVertexArray(vertexArray);
        // let vertexBufer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
        // if (posLoc != -1) {
        //   gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        //   gl.enableVertexAttribArray(posLoc);
        // }
        initPrim1(rnd);
        renderInit(rnd);
        rnd.shd.updateShaderData()
        rnd.prg = rnd.shd.id;
        flag = true;
      }
    }
    
    window.requestAnimationFrame(anim);
  }
  anim();
}

window.addEventListener("load", () => {
  loadGL();
})

