import { cube } from "../plat/cube"
import { mat4, vec3 } from "../mth/mth_def";

export function sampleUnit(...args) {
  return new _sampleUnit(...args);
}


class _sampleUnit {
  init(rnd) {
    this.cube = cube(0.1, rnd);
    this.cube2 = cube(0.2, rnd);
  }

  response() {

  }

  render(rnd) {
    this.cube.draw(mat4.matrRotateY(rnd.timer.localTime * 45));
    this.cube2.draw(mat4.matrRotateY(rnd.timer.localTime * 45 + 45).mul(mat4.matrTranslate(vec3(0, 0.2, 0))));
  }

  close() {

  }
}