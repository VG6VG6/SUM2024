import { vec3, mat4 } from "../mth/mth_def";
import { cam } from "../mth/mth_cam";

let rnd;

class _vertex {
  pos = vec3();
  n = vec3();
}

export function vertex(...args) {
  return new _vertex(...args);
}

class _prim {
  type;
  VA;
  Vbuf; 
  IBuf;
  NumOfElements;
  minBB = vec3();
  maxBB = vec3();
  trans = mat4();

  constructor(V, noofV, Ind, noofI, type) {
    this.VA = 0;
    this.Vbuf = 0;
    this.IBuf = 0;
    this.NumOfElements = 0;
    this.VA = 0;
    let pnts = [], i = 0;

    
    for (let elem of V) {
      pnts[i++] = elem.pos.x;
      pnts[i++] = elem.pos.y;
      pnts[i++] = elem.pos.z;
      pnts[i++] = elem.n.x;
      pnts[i++] = elem.n.y;
      pnts[i++] = elem.n.z;
    }
 
    const posLoc = rnd.gl.getAttribLocation(rnd.shd.id, "InPosition");
    const posN = rnd.gl.getAttribLocation(rnd.shd.id, "InNormal");

    this.vertexArray = rnd.gl.createVertexArray();
    rnd.gl.bindVertexArray(this.vertexArray);
    this.vertexBufer = rnd.gl.createBuffer();
    rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBufer);

    rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, new Float32Array(pnts), rnd.gl.STATIC_DRAW);
    if (posLoc != -1) {
      rnd.gl.vertexAttribPointer(posLoc, 3, rnd.gl.FLOAT, false, 24, 0);
      rnd.gl.enableVertexAttribArray(posLoc);
    }
    if (posN != -1) {
      rnd.gl.vertexAttribPointer(posN, 3, rnd.gl.FLOAT, false, 24, 12);
      rnd.gl.enableVertexAttribArray(posN);
    }
    this.indexArray = rnd.gl.createBuffer()
    rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);
    rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, 4 * noofI, rnd.gl.STATIC_DRAW);
    // rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, 0);
    this.NumOfElements = noofI;
    this.type = type;
  }
  draw( world ) {
    if (world == undefined)
      world = mat4();
    this.world = this.trans.mul(world);
    ///this.wnormal = this.world.inverse(transponse());
    this.wvp = this.world.mul(rnd.camera.MatrVP);

    // prg = prg;
    ///rnd.gl.useProgram(prg);

    rnd.gl.bindVertexArray(this.vertexArray);
    rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexArray);

    rnd.worldLoc = rnd.gl.getUniformLocation(rnd.shd.id, "WVP");
    if (rnd.worldLoc != -1)
      rnd.gl.uniformMatrix4fv(rnd.worldLoc, false, new Float32Array(this.wvp.m));

    ///rnd.gl.drawElements(this.type, this.NumOfElements, rnd.gl.UNSIGNED_INT, 0);
    rnd.gl.drawArrays(rnd.gl.TRIANGLE_STRIP, 0, this.NumOfElements);
    
    // glUseProgram(0);
  }
}

export function autoNormals(V, noofV, I, noofI) {
  let i;
 
  /* Set all vertex normals to zero */
  for (i = 0; i < noofV; i++)
    V[i].n = vec3(0);
 
  /* Eval normal for every facet */
  for (i = 0; i < noofI; i += 3) {
    let
      n0 = I[i], n1 = I[i + 1], n2 = I[i + 2];
    let
      p0 = V[n0].pos,
      p1 = V[n1].pos,
      p2 = V[n2].pos,
      N = (p1.sub(p0)).cross(p2.sub(p0)).normalize();
 
    V[n0].n = V[n0].n.add(N);
    V[n1].n = V[n1].n.add(N);
    V[n2].n = V[n2].n.add(N);
  }
 
  /* Normalize all vertex normals */
  for (i = 0; i < noofV; i++)
    V[i].n = V[i].n.normalize();
} // end of 'autoNormals' function

export function prim(...args) {
  return new _prim(...args);
}

export function initPrim1(render) {
  rnd = render;
  rnd.id = rnd.shd.id;
}