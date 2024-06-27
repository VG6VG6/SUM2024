import {mat4} from "./mth/mth_def"
import { timer } from "./res/timer";
import { shader } from "./res/shader";
import { unit } from "./units/unitsList";
import { mtl } from "./res/materials";
import { input } from "./input";

class _rend {
  prims = []
  matrs = []

  constructor(canvas, cam) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl2");
  
    this.gl.enable(this.gl.DEPTH_TEST)
    if (this.gl == null) {
      alert("WebGL2 not supported");
      return null;
    }
    this.shd = [];
    this.shd[0] = shader("def", this);

    this.gl.clearColor(0.3, 0.47, 0.8, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.flag = false;

    this.input = new input(this);

    /* Set camera*/
    this.camera = cam;
    this.timer = new timer();
    this.isCameraMode = true;

    mtl.loadLib(this);
  }
  resize(W, H) {
    this.camera.setSize(W, H);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  draw() {
    const anim = () => {
      this.gl.clearColor(0.30, 0.47, 0.80, 1);

      if (this.flag) {
        this.timer.response();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        if (this.isCameraMode)
          this.input.responseCamera(this)
        unit().response(this);
        unit().render(this);
      } else if (this.shd[0].id != null) {
          this.shd[0].apply(this);
          this.shd[0].updateShaderData(this);
          this.flag = true;
          mtl.init(this);
          this.shd[0].ubo.apply(this.shd);
        }
      window.requestAnimationFrame(anim);
    }
    anim();
  }
}

export function render(...args) {
  return new _rend(...args);
}