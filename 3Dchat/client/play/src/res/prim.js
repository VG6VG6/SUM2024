import { vec3, mat4, cam } from "../mth/mth_def";

let primsToLoad = []

class _vertex {
  pos = vec3();
  n = vec3();
  tex = vec3();
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
      pnts[i++] = elem.tex.x;
      pnts[i++] = elem.tex.y;
    }
 
    this.vertexArray = rnd.gl.createVertexArray();
    rnd.gl.bindVertexArray(this.vertexArray);
    this.vertexBufer = rnd.gl.createBuffer();
    rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, this.vertexBufer);

    this.primLoad = false;
    this.rnd = rnd;
    this.ind = index;
    this.points = pnts;
  }
  draw( w ) {
    if (w == undefined)
      w = mat4();

    let shd = this.rnd.shd;
    // load prim attribs
    if (!this.primLoad) {
      this.rnd.gl.bufferData(this.rnd.gl.ARRAY_BUFFER, new Float32Array(this.points), this.rnd.gl.STATIC_DRAW);

      if (shd.attrs["InPosition"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InPosition"].loc, 3, this.rnd.gl.FLOAT, false, 32, 0);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InPosition"].loc);
      }
      if (shd.attrs["InNormal"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InNormal"].loc, 3, this.rnd.gl.FLOAT, false, 32, 12);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InNormal"].loc);
      }
      if (shd.attrs["InTexCoord"].loc != -1) {
        this.rnd.gl.vertexAttribPointer(shd.attrs["InTexCoord"].loc, 3, this.rnd.gl.FLOAT, false, 32, 24);
        this.rnd.gl.enableVertexAttribArray(shd.attrs["InTexCoord"].loc);
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

    // update uniforms
    if (shd.uniforms["CamDir"].loc != -1)
      this.rnd.gl.uniform3f(shd.uniforms["CamDir"].loc, false, this.rnd.camera.Dir.x, this.rnd.camera.Dir.y, this.rnd.camera.Dir.z);
    if (shd.uniforms["CamLoc"])
      if (shd.uniforms["CamLoc"].loc != -1)
        this.rnd.gl.uniform3f(shd.uniforms["CamLoc"].loc, false, this.rnd.camera.Loc.x, this.rnd.camera.Loc.y, this.rnd.camera.Loc.z);
    if (shd.uniforms["World"].loc != -1)
      this.rnd.gl.uniformMatrix4fv(shd.uniforms["World"].loc, false, new Float32Array([].concat(...this.world.m)));
    if (shd.uniforms["VP"].loc != -1)
      this.rnd.gl.uniformMatrix4fv(shd.uniforms["VP"].loc, false, new Float32Array([].concat(...this.rnd.camera.MatrVP.m)));

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
        for (let i = 0; i < 8; i++)
          mtlUBO.push(this.mtl.isTex[i]);
        this.rnd.shd.ubo.update(new Float32Array(mtlUBO));
        this.mtl.apply(this.rnd);
    }
      
    
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
