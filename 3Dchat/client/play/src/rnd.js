import {mat4} from "./mth/mth_def"
import { timer } from "./res/timer";
import { shader } from "./res/shader";
import { unit } from "./units/unitsList";
import { mtl } from "./res/materials";

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
    this.shd = shader("def", this);

    this.gl.clearColor(0.3, 0.47, 0.8, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.flag = false;

    /* Set camera*/
    this.camera = cam;
    this.timer = new timer();

    mtl.loadLib(this);
  }
  resize(cam) {
    this.camera = cam;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  draw() {
    const anim = () => {
      this.gl.clearColor(0.30, 0.47, 0.80, 1);

      if (this.flag) {
        this.shd.apply(this);
        this.timer.response();
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.inputUpdate();
        unit().response(this);
        unit().render(this);
      } else if (this.shd.id != null) {
          this.shd.apply(this);
          this.shd.updateShaderData(this);
          this.flag = true;
          mtl.init(this);
          this.shd.ubo.apply(this.shd)
        }
      window.requestAnimationFrame(anim);
    }
    anim();
  }
  inputInit() {
    if (!this.hammer)
      this.hammer = new Hammer(this.canvas);

    /* Move camera to a fixed location */
    window.addEventListener("keydown", (event) => {
      if (event.code == "f" && event.shiftKey)
        rnd.cam.set(vec3(5), vec3(0), vec3(0, 1, 0));
      });
      
    /* Pause */
    window.addEventListener("keydown", (event) => {
      if (event.code == "p" && event.shiftKey)
        rnd.timer.isPause = !rnd.timer.isPause;
    })
    this.isMove = true;
    this.Mdz = 0;
    this.Mdy = 0;
    this.Mdx = 0;
    this.My = 0;
    this.Mx = 0;
    this.Mz = 0;
    this.hammer.on("pan", e => {
      this.Mtype = "pan";
      this.Mdz = e.deltaX;
      this.Mz += e.deltaX;
      this.Mdy = e.deltaY;
      this.My += e.deltaY;

      this.isMove = true;
    })
    this.canvas.addEventListener("mousewheel", (e) => {
      this.Mdz = e.wheelDelta;
      this.Mz += e.wheelDelta;
      this.isMove = true;
      e.preventDefault();
    })
  }
  inputUpdate() {
    if (this.oldMx == this.Mx)
      this.Mdx = 0;
    if (this.oldMy == this.My)
      this.Mdy = 0;
    if (this.oldMz == this.Mz)
      this.Mdz = 0;

    this.oldMx = this.Mx
    this.oldMy = this.My
    this.oldMz = this.Mz
  }
}

export function render(...args) {
  return new _rend(...args);
}