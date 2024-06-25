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
    this.cube2 = cube(0.2, rnd);
    this.cube2.pr.mtl = mtl.getFromLib("Gold");
    let image = img("Cube1", "bin/images/logo.png");
    this.cube2.pr.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)
    this.cube = cube(0.1, rnd);
    this.cube.pr.mtl = mtl.getFromLib("Bronze");
    image = img("Cube0", "bin/images/cube.png");
    // this.cube.pr.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)

    let V = []
    V.push(vertex([0, 0, 0, 0], vec3(-10, 0, -10), vec3(0, 1, 0), vec3(1, 0)))
    V.push(vertex([0, 0, 0, 0], vec3(-10, 0, 10), vec3(0, 1, 0), vec3(0, 1)))
    V.push(vertex([0, 0, 0, 0], vec3(10, 0, 10), vec3(0, 1, 0), vec3(1, 1)))

    V.push(vertex([0, 0, 0, 0], vec3(-10, 0, -10), vec3(0, 1, 0), vec3(1, 0)))
    V.push(vertex([0, 0, 0, 0], vec3(10, 0, 10), vec3(0, 1, 0), vec3(1, 1)))
    V.push(vertex([0, 0, 0, 0], vec3(10, 0, -10), vec3(0, 1, 0), vec3(0, 0)))
    this.graund = prim(V, [0, 1, 2, 3, 4, 5], rnd, rnd.shd[0])
    this.graund.mtl = mtl.getFromLib();
    image = img("graund", "bin/images/graund.jpg");
    this.graund.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)

    // this.elephant = prim.loadOBJ("bin/models/obj/elephant.obj", rnd, rnd.shd[0])
  }

  response() {

  }

  render(rnd) {
    this.cube.draw(mat4.matrRotateY(rnd.timer.localTime * 45).mul(mat4.matrTranslate(vec3(0, 0.5, 0))));    
    this.cube2.draw(mat4.matrRotateY(rnd.timer.localTime * 45 + 45).mul(mat4.matrTranslate(vec3(0, 0.2, 0))));
    this.graund.draw(mat4.matrTranslate(vec3(0, -0.1, 0)));
    // this.elephant.draw();
  }

  close() {

  }
}