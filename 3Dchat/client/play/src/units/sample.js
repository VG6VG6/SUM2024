import { cube } from "../plat/cube"
import { mat4, vec3 } from "../mth/mth_def";
import { mtl } from "../res/materials";
import { img, texture } from "../res/textures";
import { vertex, prim } from "../res/prim"

export function sampleUnit(...args) {
  return new _sampleUnit(...args);
}


class _sampleUnit {
  init(rnd) {

    let V = []
    V.push(vertex([0, 0, 0, 1], vec3(-10, 0, -10), vec3(0, 1, 0), vec3(0, 1)))
    V.push(vertex([0, 0, 0, 1], vec3(-10, 0, 10), vec3(0, 1, 0), vec3(0, 0)))
    V.push(vertex([0, 0, 0, 1], vec3(10, 0, 10), vec3(0, 1, 0), vec3(1, 0)))

    V.push(vertex([0, 0, 0, 1], vec3(-10, 0, -10), vec3(0, 1, 0), vec3(0, 1)))
    V.push(vertex([0, 0, 0, 1], vec3(10, 0, 10), vec3(0, 1, 0), vec3(1, 0)))
    V.push(vertex([0, 0, 0, 1], vec3(10, 0, -10), vec3(0, 1, 0), vec3(1, 1)))
    this.graund = prim(V, [0, 1, 2, 3, 4, 5], rnd, rnd.shd[0])
    this.graund.mtl = mtl.getFromLib();
    // image = img("graund", "bin/images/wood.jfif");
    let image = img("graund", "bin/images/graund.jpg");
    this.graund.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)

  }

  response() {

  }

  render(rnd) {
    for (let i = -5; i < 5; i++)
      for (let j = -5; j < 5; j++)
        this.graund.draw(mat4.matrTranslate(vec3(i * 20, 0, j * 20)));
      
  }

  close() {

  }
}