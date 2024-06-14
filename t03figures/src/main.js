import { vec3 , mat4, cam, cameraControlsInit } from "./mth/mth_def";
import {render} from "./mylib"
import { timer } from "./res/timer";
import { shader } from "./res/shader";
import { tetr } from "./plat/tetr";
import { cube } from "./plat/cube";

const frameW = 300;
const frameH = 300;
const camUp = vec3(0, 1, 0);
const projDist = 0.1;
const projSize = 0.1;
const farClip = 300;
const camLoc = vec3(1, 3, 2);

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

class _getGL {
  constructor(canvasName) {
    this.canvas = document.querySelector("#" + canvasName); 
    this.gl = this.canvas.getContext("webgl2");
  
    this.gl.enable(this.gl.DEPTH_TEST)
    if (this.gl == null) {
      alert("WebGL2 not supported");
      return null;
    }
    this.gl.clearColor(0.3, 0.47, 0.8, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.shd = shader("def", this);
    this.flag = false;

    /* Set camera*/
    this.camera = cam();
    this.camera.set(camLoc, vec3(0), camUp);
    this.camera.setProj(projSize, projDist, farClip);
    this.camera.setSize(frameW, frameH);

    this.timer = new timer();
    
  }
  render(init, draw) {
    const anim = () => {
      this.gl.clearColor(0.30, 0.47, 0.80, 1);
  
      if (this.flag) {
        this.shd.apply(this);
        this.timer.response();
        render(this);
        draw();
      } else {
        if (this.shd.id != null) {
          this.shd.apply(this);
          this.shd.updateShaderData(this)
          init();
          this.prg = this.shd.id;
          this.flag = true;
          
        }
      }
      window.requestAnimationFrame(anim);
    }
    anim();
  }
}

function getGL(...args) {
  return new _getGL(...args);
}

window.addEventListener("load", () => {
  let m = mat4.matrTranslate(vec3(0));

  let canv1 = getGL("glCanvas1");
  let canv2 = getGL("glCanvas2");

  canv1.prim = cube(1, canv1);
  canv1.render( () => {
    canv1.tetr = tetr(1, canv1);
    // cameraControlsInit(canv1);
  }, () => {
    canv1.tetr.draw(mat4.matrRotateX(canv2.timer.localTime * 30).mul(mat4.matrRotateY(canv2.timer.localTime * 45)));
  })
  canv2.render(() => {
    canv2.cube = cube(1, canv2);
  }, () => {
    canv2.cube.draw(mat4.matrRotateX(canv2.timer.localTime * 30).mul(mat4.matrRotateY(canv2.timer.localTime * 45)));
    // cameraControlsInit(canv2);
  });
})

import { mtllog } from "./res/materials";
mtllog();