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
    this.model.gltfLoad("bin/models/gltf/sea_keep_lonely_watcher", rnd);
  }

  response() {

  }

  render(rnd) {
    if (this.model.prims) {
      for (let i = 0; i < this.model.prims.length; i++)
        // if (i == 4)
          this.model.prims[i].draw(mat4.matrRotateX(-90).mul(mat4.scale(vec3(0.015))))
    }
      
  }

  close() {

  }
}