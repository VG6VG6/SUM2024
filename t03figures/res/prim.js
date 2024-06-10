import { vec3, mat4 } from "../mth/mth_def";
import { cam } from "../mth/mth_cam";

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
    rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, new Float32Array([].concat(...index)), rnd.gl.STATIC_DRAW);
    // rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, 0);
    this.numOfElements = index.length;
    this.rnd = rnd;
  }
  draw( w ) {
    if (w == undefined)
      w = mat4();
    this.world = this.trans.mul(w);

    this.rnd.gl.bindVertexArray(this.vertexArray);
    this.rnd.gl.bindBuffer(this.rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
    
    if (this.rnd.shd.worldLoc != -1)
      this.rnd.gl.uniformMatrix4fv(this.rnd.shd.worldLoc, false, new Float32Array([].concat(...this.world.m)));
    if (this.rnd.shd.VPLoc != -1)
      this.rnd.gl.uniformMatrix4fv(this.rnd.shd.VPLoc, false, new Float32Array([].concat(...this.rnd.camera.MatrVP.m)));

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

export function initPrim1(render) {
  rnd = render;
  rnd.id = rnd.shd.id;
  
}