import { prim, vertex } from "./prim";
import { vec3 } from "../mth/mth_vec3";
import { img, texture } from "../res/textures";
import { mtl } from "./materials";
import { mat4 } from "../mth/mth_mat4";

export function gltf(...args) {
  return new _gltf(...args);
}

class scene {
  
}

class _gltf {
  constructor(path, rnd) {
    this.isLoad = false;
    this.mesh = []
    this.scenes = []
    if (path && rnd)
      this.prim = this.gltfLoad(path, rnd);
    
  }
  async gltfLoad(path, rnd) {
    const file = await fetch(path + "/scene.gltf")
    const text = await file.text();
    const js = JSON.parse(text)
    let bin = [], colorSize;
    this.prims = [];
    
    // load all binary files
    for (let i = 0; i < js.buffers.length; i++) {
      let full_path = js.buffers[i].uri;
      if (full_path.slice(0, 5) != "data:")
        full_path  = path +  "/" + full_path;
      let buffer = await fetch(full_path)
      bin.push(await buffer.arrayBuffer());
    }
    console.log(js)
    // meshes
    for (let i = 0; i < js.meshes.length; i++) {
      let prims = []
      for (let pr = 0; pr < js.meshes[i].primitives.length; pr++) {
        let accessors = []
        accessors.push(js.accessors[js.meshes[i].primitives[pr].attributes.COLOR_0]);
        accessors.push(js.accessors[js.meshes[i].primitives[pr].attributes.POSITION]);
        accessors.push(js.accessors[js.meshes[i].primitives[pr].attributes.NORMAL]);
        accessors.push(js.accessors[js.meshes[i].primitives[pr].attributes.TEXCOORD_0]);
        accessors.push(js.accessors[js.meshes[i].primitives[pr].indices]);
        let material = js.materials[js.meshes[i].primitives[pr].material]
        let pnts = []
    
        let texId, image = [];
        let Nooftextures = 0;
        if (material) {
          if (material.pbrMetallicRoughness)
            if (material.pbrMetallicRoughness.baseColorTexture) {
              texId = material.pbrMetallicRoughness.baseColorTexture.index;
              image[Nooftextures] = img(`Tex${Nooftextures++}`, path + "/" + js.images[texId].uri);
            }
          if (material.normalTexture) {
            texId = material.normalTexture.index;
            image[Nooftextures] = img(`Tex${Nooftextures++}`, path + "/" + js.images[texId].uri);
          }
        }
          
        // index
        let view = js.bufferViews[accessors[4].bufferView]
        let ind, pos, normal, tex, color;
        if (accessors[4].byteOffset)
          ind = new Uint32Array(bin[view.buffer], view.byteOffset + accessors[4].byteOffset, accessors[4].count)
        else
          ind = new Uint32Array(bin[view.buffer], view.byteOffset, accessors[4].count)

          // color
        if (accessors[0]) {
          if (accessors[0].type == "VEC4")
            colorSize = 4;
          else
            colorSize = 3;
          view = js.bufferViews[accessors[0].bufferView];
            if (accessors[0].byteOffset)
              color = new Float32Array(bin[view.buffer], view.byteOffset + accessors[0].byteOffset, accessors[0].count * colorSize)
            else
              color = new Float32Array(bin[view.buffer], view.byteOffset, accessors[0].count * colorSize)
        }

        // possition
        view = js.bufferViews[accessors[1].bufferView];
        if (accessors[1].byteOffset)
          pos = new Float32Array(bin[view.buffer], view.byteOffset + accessors[1].byteOffset, accessors[1].count * 3)
        else
          pos = new Float32Array(bin[view.buffer], view.byteOffset, accessors[1].count * 3)

        // normal
        if (accessors[2]) {
          view = js.bufferViews[accessors[2].bufferView];
          if (accessors[2].byteOffset)
            normal = new Float32Array(bin[view.buffer], view.byteOffset + accessors[2].byteOffset, accessors[2].count * 3)
          else
            normal = new Float32Array(bin[view.buffer], view.byteOffset, accessors[2].count * 3)
        }
        // texture coords
        if (accessors[3]) {
          view = js.bufferViews[accessors[3].bufferView];
          if (accessors[3].byteOffset)
            tex = new Float32Array(bin[view.buffer], view.byteOffset + accessors[3].byteOffset, accessors[3].count * 2)
          else
            tex = new Float32Array(bin[view.buffer], view.byteOffset, accessors[3].count * 2)
        }

        // make vertexes
        for (let h = 0; h < accessors[1].count; h++) {
          pnts[h] = vertex()
            if (color)
              if (colorSize == 4)
                pnts[h].color = [color[h * 4], color[h * 4 + 1], color[h * 4 + 2], color[h * 4 + 3]];
              else
                pnts[h].color = [color[h * 4], color[h * 4 + 1], color[h * 4 + 2], 1];
            else
              pnts[h].color = [0, 0, 0, 0];
          pnts[h].pos = vec3(pos[h * 3], pos[h * 3 + 1], pos[h * 3 + 2])
          if (normal)
            pnts[h].n = vec3(normal[h * 3], normal[h * 3 + 1], normal[h * 3 + 2])
          else
            pnts[h].n = vec3(0);
          if (tex)
            pnts[h].tex = vec3(tex[h * 2], -tex[h * 2 + 1])
          else
            pnts[h].tex = vec3(0);
        }
        // create primitive
        prims.push(prim(pnts, ind, rnd, rnd.shd[0], true, js.meshes[i].primitives[0].mode));
        prims[prims.length - 1].mtl = mtl();
        for (let t = 0; t < Nooftextures; t++) 
          prims[prims.length - 1].mtl.textureAttach(texture(image[t], rnd.gl.TEXTURE_2D, rnd), t)
      }
      this.mesh[i] = prims;
    }

    // for (let sceneNum = 0; sceneNum < js.scenes.length; sceneNum++) {
    //   let nodesArr = js.scenes[sceneNum].nodes
    //   this.scenes[sceneNum] = new scene();
    //   this.nodesPare(js, this.scenes[sceneNum], nodesArr);
    // }
    return this.prims;
  }
  // nodesPare(js, scena, nodesArr) {
  //   let matr = mat4();

  //   if (js.nodes[nodesArr].matrix)
  //     matr = mat4(js.nodes[nodesArr].matrix)
  //   for (let nod = 0; nod < nodesArr.length; nod++) {
  //     if (js.nodes[nodesArr[nod]].children)
  //       for (let child = 0; child < js.nodes[nodesArr[nod]].children.length; child++)
  //         this.nodesPare(js, scena, js.nodes[nodesArr[nod]].children);
  //     else {
  //       for (let i = 0; i < nodesArr[nod].length; i++)
  //         this.mesh[nodesArr[nod]][i].trans.mul(matr);
  //       return this.mesh[nodesArr[nod]];
  //     }
  //     // js.nodes[nod]
  //   }
  // }

  draw(w) {
    if (this.mesh[0]) {
      for (let i = 0; i < this.mesh.length; i++)
        for (let j = 0; j < this.mesh[i].length; j++)
          this.mesh[i][j].draw(w)
    }
  }
}
