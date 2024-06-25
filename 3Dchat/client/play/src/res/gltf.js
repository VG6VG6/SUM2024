import { prim, vertex } from "./prim";
import { vec3 } from "../mth/mth_vec3";
import { img, texture } from "../res/textures";
import { mtl } from "./materials";

export function gltf(...args) {
  return new _gltf(...args);
}

class _gltf {
  constructor(path, rnd) {
    this.isLoad = false;
    if (path && rnd)
      this.prim = this.gltfLoad(path, rnd);
    
  }
  async gltfLoad(path, rnd) {
    const file = await fetch(path + "/scene.gltf")
    const text = await file.text();
    const js = JSON.parse(text)
    let bin = [];
    this.prims = [];
    
    // load all binary files
    for (let i = 0; i < js.buffers.length; i++) {
      let buffer = await fetch(path + "/" + js.buffers[i].uri)
      bin.push(await buffer.arrayBuffer());
    }
    console.log(js)
    // meshes
    for (let i = 0; i < js.meshes.length; i++) {
      let accessors = []
      accessors.push(js.accessors[js.meshes[i].primitives[0].attributes.COLOR_0]);
      accessors.push(js.accessors[js.meshes[i].primitives[0].attributes.POSITION]);
      accessors.push(js.accessors[js.meshes[i].primitives[0].attributes.NORMAL]);
      accessors.push(js.accessors[js.meshes[i].primitives[0].attributes.TEXCOORD_0]);
      accessors.push(js.accessors[js.meshes[i].primitives[0].indices]);
      let material = js.materials[js.meshes[i].primitives[0].material]
      let pnts = []
  
      let texId, image;
      if (material.pbrMetallicRoughness.baseColorTexture) {
        texId = material.pbrMetallicRoughness.baseColorTexture.index;
        image = img(`Tex${i}`, path + "/" + js.images[texId].uri);
      }
        

      let view = js.bufferViews[accessors[4].bufferView]
      let ind, pos, normal, tex, color;
      if (accessors[4].byteOffset)
        ind = new Uint32Array(bin[view.buffer], view.byteOffset + accessors[4].byteOffset, accessors[4].count)
      else
        ind = new Uint32Array(bin[view.buffer], view.byteOffset, accessors[4].count)

      if (accessors[0]) {
        view = js.bufferViews[accessors[0].bufferView];
          if (accessors[0].byteOffset)
            color = new Float32Array(bin[view.buffer], view.byteOffset + accessors[0].byteOffset, accessors[0].count * 4)
          else
            color = new Float32Array(bin[view.buffer], view.byteOffset, accessors[0].count * 4)
      }
      view = js.bufferViews[accessors[1].bufferView];
      if (accessors[1].byteOffset)
        pos = new Float32Array(bin[view.buffer], view.byteOffset + (accessors[1].byteOffset), accessors[1].count * 3)
      else
        pos = new Float32Array(bin[view.buffer], view.byteOffset, accessors[1].count * 3)

      view = js.bufferViews[accessors[2].bufferView];
      if (accessors[2].byteOffset)
        normal = new Float32Array(bin[view.buffer], view.byteOffset + accessors[2].byteOffset, accessors[2].count * 3)
      else
        normal = new Float32Array(bin[view.buffer], view.byteOffset, accessors[2].count * 3)
      
      view = js.bufferViews[accessors[3].bufferView];
      if (accessors[3].byteOffset)
        tex = new Float32Array(bin[view.buffer], view.byteOffset + accessors[3].byteOffset, accessors[3].count * 2)
      else
        tex = new Float32Array(bin[view.buffer], view.byteOffset, accessors[3].count * 2)

      for (let h = 0; h < accessors[1].count; h++) {
        pnts[h] = vertex()
        if (color)
          pnts[h].color = [color[h * 4], color[h * 4 + 1], color[h * 4 + 2], color[h * 4 + 3]];
        else
          pnts[h].color = [0, 0, 0, 0];
        pnts[h].pos = vec3(pos[h * 3], pos[h * 3 + 1], pos[h * 3 + 2])
        pnts[h].n = vec3(normal[h * 3], normal[h * 3 + 1], normal[h * 3 + 2])
        pnts[h].tex = vec3(tex[h * 2], tex[h * 2 + 1])
      }
      this.prims.push(prim(pnts, ind, rnd, rnd.shd[0], true, js.meshes[i].primitives[0].mode));
      this.prims[this.prims.length - 1].mtl = mtl();
      if (material.pbrMetallicRoughness.baseColorTexture)
        this.prims[this.prims.length - 1].mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)
    }
    return this.prims;
  }
}
