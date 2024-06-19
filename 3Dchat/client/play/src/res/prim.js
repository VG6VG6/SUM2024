import { vec3, mat4, cam } from "../mth/mth_def";

let primsToLoad = []

class _vertex {
  pos = vec3();
  n = vec3();
}

export function vertex(...args) {
  return new _vertex(...args);
}

class _prim {
  type;
  trans = mat4();

  constructor(V, index, rnd) {
    this.numOfElements = 0;
    let pnts = [], i = 0;

    autoNormals(V, index);

    for (let elem of V) {
      pnts[i++] = elem.pos.x;
      pnts[i++] = elem.pos.y;
      pnts[i++] = elem.pos.z;
      pnts[i++] = elem.n.x;
      pnts[i++] = elem.n.y;
      pnts[i++] = elem.n.z;
    }
 
    this.vertexArray = rnd.gl.createVertexArray();
    rnd.gl.bindVertexArray(this.vertexArray);
    this.vertexBufer = rnd.gl.createBuffer();
    rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBufer);

    if (rnd.shd.id == null) {
      this.primLoad = false;
      this.rnd = rnd;
      this.ind = index;
      this.points = pnts;
    } else {
      rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, new Float32Array(pnts), rnd.gl.STATIC_DRAW);

      if (rnd.shd.posLoc != -1) {
        rnd.gl.vertexAttribPointer(rnd.shd.posLoc, 3, rnd.gl.FLOAT, false, 24, 0);
        rnd.gl.enableVertexAttribArray(rnd.shd.posLoc);
      }
      if (rnd.shd.posN != -1) {
        rnd.gl.vertexAttribPointer(rnd.shd.posN, 3, rnd.gl.FLOAT, false, 24, 12);
        rnd.gl.enableVertexAttribArray(rnd.shd.posN);
      }
      this.indexArray = rnd.gl.createBuffer()
      rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
      rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(index), rnd.gl.STATIC_DRAW);
      
      this.numOfElements = index.length;
      this.rnd = rnd;
      this.primLoad = true;
    }
  }
  draw( w ) {
    if (w == undefined)
      w = mat4();

    if (!this.primLoad) {
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(this.points), this.rnd.gl.STATIC_DRAW);

      if (this.rnd.shd.posLoc != -1) {
        this.rnd.gl.vertexAttribPointer(this.rnd.shd.posLoc, 3, this.rnd.gl.FLOAT, false, 24, 0);
        this.rnd.gl.enableVertexAttribArray(this.rnd.shd.posLoc);
      }
      if (this.rnd.shd.posN != -1) {
        this.rnd.gl.vertexAttribPointer(this.rnd.shd.posN, 3, this.rnd.gl.FLOAT, false, 24, 12);
        this.rnd.gl.enableVertexAttribArray(this.rnd.shd.posN);
      }
      this.indexArray = this.rnd.gl.createBuffer()
      this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
      this.rnd.gl.bufferData(this.rnd.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.ind), this.rnd.gl.STATIC_DRAW);
      
      this.numOfElements = this.ind.length;
      this.primLoad = true;
    }

    this.world = this.trans.mul(w);

    this.rnd.gl.bindVertexArray(this.vertexArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ARRAY_BUFFER, this.vertexBufer);

    if (this.rnd.shd.camDirLoc != -1)
      this.rnd.gl.uniform3f(this.rnd.shd.camDirLoc, false, this.rnd.camera.Dir.x, this.rnd.camera.Dir.y, this.rnd.camera.Dir.z);
    if (this.rnd.shd.worldLoc != -1)
      this.rnd.gl.uniformMatrix4fv(this.rnd.shd.worldLoc, false, new Float32Array([].concat(...this.world.m)));
    if (this.rnd.shd.VPLoc != -1)
      this.rnd.gl.uniformMatrix4fv(this.rnd.shd.VPLoc, false, new Float32Array([].concat(...this.rnd.camera.MatrVP.m)));

    
    if (this.numOfElements > 0)
      this.rnd.gl.drawElements(this.rnd.gl.TRIANGLES, this.numOfElements, this.rnd.gl.UNSIGNED_INT, 0);
    else
      this.rnd.gl.drawArrays(this.rnd.gl.TRIANGLES, 0, this.numOfElements);
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

export function prim(...args) {
  return new _prim(...args);
}
