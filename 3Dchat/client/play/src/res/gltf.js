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
        let Nooftextures = 0, lenght;
        if (material) {
          if (material.pbrMetallicRoughness)
            if (material.pbrMetallicRoughness.baseColorTexture) {
              texId = material.pbrMetallicRoughness.baseColorTexture.index;
              if (js.images[texId])
                image[Nooftextures] = img(`Tex${Nooftextures++}`, path + "/" + js.images[texId].uri);
            }
          if (material.emissiveTexture) {
              texId = material.emissiveTexture.index;
              if (js.images[texId])
                image[Nooftextures] = img(`Tex${Nooftextures++}`, path + "/" + js.images[texId].uri);
          }
          if (material.extensions) {
            if (material.extensions.KHR_materials_pbrSpecularGlossiness) {
              texId = material.extensions.KHR_materials_pbrSpecularGlossiness.diffuseTexture.index;
              if (js.images[texId])
                image[Nooftextures] = img(`Tex${Nooftextures++}`, path + "/" + js.images[texId].uri);
            }
          }
          if (material.normalTexture) {
            texId = material.normalTexture.index;
            if (js.images[texId]) {
              image[Nooftextures++] = img(`Tex7`, path + "/" + js.images[texId].uri);
              image[Nooftextures - 1].isNorm = true;
            }
          }
        }
          
        // index
        let view = js.bufferViews[accessors[4].bufferView]
        let ind, pos, normal, tex, color;
        if (accessors[4].componentType == rnd.gl.UNSIGNED_SHORT) {
          if (accessors[4].byteOffset)
            ind = new Uint16Array(bin[view.buffer], view.byteOffset + accessors[4].byteOffset, accessors[4].count)
          else
            ind = new Uint16Array(bin[view.buffer], view.byteOffset, accessors[4].count)  
        } else if (accessors[4].componentType == rnd.gl.UNSIGNED_INT) {
          if (accessors[4].byteOffset)
            ind = new Uint32Array(bin[view.buffer], view.byteOffset + accessors[4].byteOffset, accessors[4].count)
          else
            ind = new Uint32Array(bin[view.buffer], view.byteOffset, accessors[4].count)
        }

          // color
        
          if (accessors[0]) {
            view = js.bufferViews[accessors[0].bufferView];
            if (view.byteStride) {
              lenght = view.byteStride / 4 * accessors[0].count - view.byteStride / 4;
            } else {
              if (accessors[0].type == "VEC4")
                colorSize = 4;
              else
                colorSize = 3;
              lenght = accessors[0].count * colorSize - colorSize;
            }
            if (accessors[0].componentType == rnd.gl.UNSIGNED_SHORT) {
              if (accessors[0].byteOffset)
                color = new Uint16Array(bin[view.buffer], view.byteOffset + accessors[0].byteOffset, lenght)
              else
                color = new Uint16Array(bin[view.buffer], view.byteOffset, lenght)  
            } else if (accessors[0].componentType == rnd.gl.FLOAT) {
              if (accessors[0].byteOffset)
                color = new Float32Array(bin[view.buffer], view.byteOffset + accessors[0].byteOffset, lenght)
              else
                color = new Float32Array(bin[view.buffer], view.byteOffset, lenght)
            }
          }

        // possition
        let posView = js.bufferViews[accessors[1].bufferView];
        if (posView.byteStride)
          lenght = accessors[1].count * posView.byteStride / 4;
        else
          lenght = accessors[1].count * 3;

        if (accessors[1].byteOffset)
          pos = new Float32Array(bin[posView.buffer], posView.byteOffset + accessors[1].byteOffset, lenght)
        else
          pos = new Float32Array(bin[posView.buffer], posView.byteOffset, lenght)
        
        // normal
        let normView
        if (accessors[2]) {
          normView = js.bufferViews[accessors[2].bufferView];
          if (normView.byteStride)
            lenght = accessors[2].count * normView.byteStride / 4 - normView.byteStride / 4
          else
            lenght = accessors[2].count * 3;
          if (accessors[2].byteOffset)
            normal = new Float32Array(bin[normView.buffer], normView.byteOffset + accessors[2].byteOffset, lenght)
          else
            normal = new Float32Array(bin[normView.buffer], normView.byteOffset, lenght)
        }

        // texture coords
        let texView
        if (accessors[3]) {
          texView = js.bufferViews[accessors[3].bufferView];
          if (texView.byteStride)
            length = accessors[3].count * texView.byteStride / 4 - texView.byteStride / 4;
          else
            length = accessors[3].count * 2

          if (accessors[3].byteOffset)
            tex = new Float32Array(bin[texView.buffer], texView.byteOffset + accessors[3].byteOffset, length)
          else
            tex = new Float32Array(bin[texView.buffer], texView.byteOffset, length)
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
          pnts[h].pos = vec3(pos[h * posView.byteStride / 4], pos[h * posView.byteStride / 4 + 1], pos[h * posView.byteStride / 4 + 2])
          if (normal)
            pnts[h].n = vec3(normal[h * normView.byteStride / 4], normal[h * normView.byteStride / 4 + 1], normal[h * normView.byteStride / 4 + 2])
          else
            pnts[h].n = vec3(0);
          if (tex)
            pnts[h].tex = vec3(tex[h * texView.byteStride / 4], -tex[h * texView.byteStride / 4 + 1])
          else
            pnts[h].tex = vec3(0);
        }
        // create primitive
        let c, n, t;
        if (accessors[0])
          c = accessors[0].componentType;
        if (accessors[2])
          n = accessors[2].componentType;
        if (accessors[3])
          t = accessors[3].componentType;
        prims.push(prim(pnts, ind, rnd, rnd.shd[0], true, js.meshes[i].primitives[0].mode, 
          c, accessors[1].componentType, n, t));
        prims[prims.length - 1].mtl = mtl.getFromLib("Gold");
        for (let t = 0; t < Nooftextures; t++)
          if (image[t].isNorm)
            prims[prims.length - 1].mtl.textureAttach(texture(image[t], rnd.gl.TEXTURE_2D, rnd), 7)
          else
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
