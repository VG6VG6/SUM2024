import { gltf } from "../res/gltf"
import { mat4, vec3 } from "../mth/mth_def";
import { mtl } from "../res/materials";
import { img, texture } from "../res/textures";
import { vertex, prim } from "../res/prim"

export function GLTFUnit(...args) {
  return new _GLTFUnit(...args);
}

class _GLTFUnit {
  init(rnd) {
    // this.model = gltf("bin/models/gltf/sea_keep_lonely_watcher", rnd)
    this.model = gltf()
    this.model2 = gltf()
    this.model3 = gltf()
    this.model4 = gltf()
    this.model5 = gltf()
    this.model6 = gltf()
    this.model.gltfLoad("bin/models/gltf/sea_keep_lonely_watcher", rnd);
    // this.model2.gltfLoad("bin/models/gltf/building_brutalist_tricorner", rnd);
    // this.model3.gltfLoad("bin/models/gltf/mira_up", rnd);
    // this.model4.gltfLoad("bin/models/gltf/rigged_lynx_model", rnd);
    // this.model5.gltfLoad("bin/models/gltf/fisherman", rnd);
    this.model5.gltfLoad("bin/models/gltf/a", rnd);
    // this.model6.gltfLoad("bin/models/gltf/cyberpunk_car", rnd);
  }

  response() {

  }

  render(rnd) {
    if (this.model.mesh[0]) {
      for (let i = 0; i < this.model.mesh.length; i++)
        for (let j = 0; j < this.model.mesh[i].length; j++)
          this.model.mesh[i][j].draw(mat4.matrRotateX(-90).mul(mat4.scale(vec3(0.015))).mul(mat4.matrTranslate(vec3(0, 3.2, (i - 2) * 8))))
    }
    // this.model3.draw(mat4.matrRotateX(-90).mul(mat4.scale(vec3(0.0015))))
    // this.model4.draw(mat4.matrRotateX(-90).mul(mat4.scale(vec3(0.05)).mul(mat4.matrTranslate(vec3(0, 0, 1)))))
    this.model5.draw(mat4.scale(vec3(0.07)).mul(mat4.matrTranslate(vec3(0, 0, -1))))
    // this.model6.draw(mat4.matrTranslate(vec3(-200, 0, 0)).mul(mat4.scale(vec3(0.005))));
    // if (this.model2.mesh[0]) {
    //   for (let i = 0; i < this.model2.mesh.length; i++)
    //     for (let j = 0; j < this.model2.mesh[i].length; j++)
    //       this.model2.mesh[i][j].draw(mat4.matrRotateX(90).mul(mat4.scale(vec3(0.015))).mul(mat4.matrTranslate(vec3(1, 0, (i - 2) * 1))))
    // }
  }

  close() {

  }
}