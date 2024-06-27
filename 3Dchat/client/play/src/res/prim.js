import { vec3, mat4, cam } from "../mth/mth_def";
import { mtl } from "./materials";

let primsToLoad = []

class _vertex {
  constructor(v1, v2, v3, v4) {
    this.color = v1;
    this.pos = vec3(v2);
    this.n = vec3(v3);
    this.tex = vec3(v4);
  }
}

export function vertex(...args) {
  return new _vertex(...args);
}

class _prim {
  constructor(V, index, rnd, shd, isNotAutoNorm, drawMode) {
    this.numOfElements = 0;
    let pnts = [], i = 0;
    this.trans = mat4();  
    if (drawMode)
      this.type = drawMode;
    else
      this.type = rnd.gl.TRIANGLES;

    this.minMaxBB(V);
    if (!isNotAutoNorm)
      autoNormals(V, index);

    for (let elem of V) {
      pnts[i++] = elem.color[0];
      pnts[i++] = elem.color[1];
      pnts[i++] = elem.color[2];
      pnts[i++] = elem.color[3];
      pnts[i++] = elem.pos.x;
      pnts[i++] = elem.pos.y;
      pnts[i++] = elem.pos.z;
      pnts[i++] = elem.n.x;
      pnts[i++] = elem.n.y;
      pnts[i++] = elem.n.z;
      pnts[i++] = elem.tex.x;
      pnts[i++] = elem.tex.y;
    }
 
    this.vertexArray = rnd.gl.createVertexArray();
    this.vertexBufer = rnd.gl.createBuffer();

    this.indexArray = rnd.gl.createBuffer()
    this.primLoad = false;
    this.rnd = rnd;
    this.ind = index;
    this.points = pnts;
    this.shd = shd;
    this.mtl = mtl()
  }

  minMaxBB(V) {
    this.minBB = vec3(V[0].pos);
    this.maxBB = vec3(V[0].pos);

    for (let i = 1; i < V.length; i++)
    {
      let V1 = V[i].pos;

      if (this.minBB.x > V1.x)
        this.minBB.x = V1.x;
      if (this.maxBB.x < V1.x)
        this.maxBB.x = V1.x;

      if (this.minBB.y > V1.y)
        this.minBB.y = V1.y;
      if (this.maxBB.y < V1.y)
        this.maxBB.y = V1.y;

      if (this.minBB.z > V1.z)
        this.minBB.z = V1.z;
      if (this.maxBB.z < V1.z)
        this.maxBB.z = V1.z;
    }
  } 

  static async loadOBJ(dir, rnd, shd) {
    let vts = [], inds = [];
  
    let file = await fetch(dir);
    let text = await file.text();
    let lines = text.split("\n");
  
    for (let line of lines) {
        if (line[0] == "v") {
            let p = line.split(" ");
            clearEmpty(p);
  
            let v = vec3(parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3]));
  
            vts.push(vertex(v));
        }
        if (line[0] == "f") {
            let block = line.split(" ");
            
            inds.push(parseInt(block[1].split("/")[0]) - 1);
            inds.push(parseInt(block[2].split("/")[0]) - 1);
            inds.push(parseInt(block[3].split("/")[0]) - 1);
        }
    }
  
    autoNormals(vts, inds);
  
    return new _prim(vts, inds, rnd, shd);
  }

  draw( w ) {
    if (w == undefined)
      w = mat4();

    let shd = this.shd;

    // load prim attribs
    if (!this.primLoad) {
      this.rnd.gl.bindVertexArray(this.vertexArray);
      this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertexBufer);
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(this.points), this.rnd.gl.STATIC_DRAW);

      if (shd.attrs["InColor"] && shd.attrs["InColor"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InColor"].loc, 4, this.rnd.gl.FLOAT, false, 48, 0);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InColor"].loc);
      }
      if (shd.attrs["InPosition"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InPosition"].loc, 3, this.rnd.gl.FLOAT, false, 48, 16);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InPosition"].loc);
      }
      if (shd.attrs["InNormal"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InNormal"].loc, 3, this.rnd.gl.FLOAT, false, 48, 28);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InNormal"].loc);
      }
      if (shd.attrs["InTexCoord"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InTexCoord"].loc, 2, this.rnd.gl.FLOAT, false, 48, 40);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InTexCoord"].loc);
      }
      this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
      this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.ind), this.rnd.gl.STATIC_DRAW);
      
      this.numOfElements = this.ind.length;
      this.primLoad = true;
    }

    // update material
    if (this.mtl) {
      let mtlUBO = []
        mtlUBO.push(this.mtl.ka.x)
        mtlUBO.push(this.mtl.ka.y)
        mtlUBO.push(this.mtl.ka.z)
        mtlUBO.push(0)
        mtlUBO.push(this.mtl.kd.x)
        mtlUBO.push(this.mtl.kd.y)
        mtlUBO.push(this.mtl.kd.z)
        mtlUBO.push(0)
        mtlUBO.push(this.mtl.ks.x)
        mtlUBO.push(this.mtl.ks.y)
        mtlUBO.push(this.mtl.ks.z)
        mtlUBO.push(this.mtl.ph)
        for (let i = 0; i < 8; i++) {
          mtlUBO.push(this.mtl.isTex[i]);
          if (this.mtl.isTex[i]) {
            this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + i);
            this.rnd.gl.bindTexture(this.mtl.tex[i].type, this.mtl.tex[i].id);
          }

        }
        shd.ubo.update(new Float32Array(mtlUBO));
        this.mtl.apply(this.rnd, this.shd);
    }
    
    this.world = this.trans.mul(w);
    this.shd;

    this.rnd.gl.bindVertexArray(this.vertexArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertexBufer);

    // update uniforms
    if (shd.uniforms["CamDir"])
      if (shd.uniforms["CamDir"].loc != -1)
        this.rnd.gl.uniform3f(shd.uniforms["CamDir"].loc, false, this.rnd.camera.Dir.x, this.rnd.camera.Dir.y, this.rnd.camera.Dir.z);
    if (shd.uniforms["CamLoc"])
      if (shd.uniforms["CamLoc"].loc != -1)
        this.rnd.gl.uniform3f(shd.uniforms["CamLoc"].loc, false, this.rnd.camera.Loc.x, this.rnd.camera.Loc.y, this.rnd.camera.Loc.z);
    if (shd.uniforms["World"])
      if (shd.uniforms["World"].loc != -1)
        this.rnd.gl.uniformMatrix4fv(shd.uniforms["World"].loc, false, new Float32Array([].concat(...this.world.m)));
    if (shd.uniforms["VP"])
      if (shd.uniforms["VP"].loc != -1)
        this.rnd.gl.uniformMatrix4fv(shd.uniforms["VP"].loc, false, new Float32Array([].concat(...this.rnd.camera.MatrVP.m)));
    for (let i = 0; i < 8; i++) {
      if (shd.uniforms[`Tex${i}`])
        if (shd.uniforms[`Tex${i}`].loc != -1)
          this.rnd.gl.uniform1i(shd.uniforms[`Tex${i}`].loc, i);
    }
      
    
    if (this.numOfElements > 0)
      this.rnd.gl.drawElements(this.type, this.numOfElements, this.rnd.gl.UNSIGNED_INT, 0);
    else
      this.rnd.gl.drawArrays(this.type, 0, this.numOfElements);
  }
}

export function autoNormals(vertexes, index) {
  let i;
 
  /* Set all vertex normals to zero */
  for (i = 0; i < vertexes.length; i++)
    vertexes[i].n = vec3(0);
 
  /* Eval normal for every facet */
  for (i = 0; i < index.length; i += 3) {
    let
      n0 = index[i], n1 = index[i + 1], n2 = index[i + 2];
    let
      p0 = vertexes[n0].pos,
      p1 = vertexes[n1].pos,
      p2 = vertexes[n2].pos,
      N = p1.sub(p0).cross(p2.sub(p0)).normalize();
 
    vertexes[n0].n = vertexes[n0].n.add(N);
    vertexes[n1].n = vertexes[n1].n.add(N);
    vertexes[n2].n = vertexes[n2].n.add(N);
  }
 
  /* Normalize all vertex normals */
  for (i = 0; i < vertexes.length; i++)
    vertexes[i].n = vertexes[i].n.normalize();
} // end of 'autoNormals' function

function clearEmpty(arr) {
  for (let i = 0; i < arr.length; i++)
      if (arr[i] == "") {
          arr.splice(i, 1);
          i--;
      }
}

export function prim(...args) {
  return new _prim(...args);
}

// prim.loadOBJ() = (...args) => {
//   return _prim.loadOBJ(...args);
// }
