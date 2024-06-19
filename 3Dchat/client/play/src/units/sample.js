import { cube } from "../plat/cube"
import { mat4, vec3 } from "../mth/mth_def";
import { mtl } from "../res/materials";
import { img, texture } from "../res/textures";

export function sampleUnit(...args) {
  return new _sampleUnit(...args);
}


class _sampleUnit {
  init(rnd) {
    this.cube = cube(0.1, rnd);
    this.cube.primmitive.mtl = mtl.getFromLib("Bronze");
    let image = img("Cube", "bin/images/cube.png");
    this.cube.primmitive.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)
    this.cube2 = cube(0.2, rnd);
    this.cube2.primmitive.mtl = mtl.getFromLib("Gold");
  }

  response() {

  }

  render(rnd) {
    // this.cube.draw(mat4.matrRotateY(rnd.timer.localTime * 45));    
    this.cube.draw(mat4.matrRotateX(-90).mul(mat4.matrRotateY(45)));
    this.cube2.draw(mat4.matrRotateY(rnd.timer.localTime * 45 + 45).mul(mat4.matrTranslate(vec3(0, 0.2, 0))));
  }

  close() {

  }
}