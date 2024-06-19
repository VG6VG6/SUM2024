class _buffer {
  constructor(type, size, rnd) {
    this.gl = rnd.gl;
    this.type = type;    // Buffer type (gl.***_BUFFER)
    this.size = size;    // Buffer size in bytes
    this.id = null;
    if (size == 0 || type == undefined)
      return;
    this.id = this.gl.createBuffer();
    this.gl.bindBuffer(type, this.id);
    this.gl.bufferData(type, size, this.gl.STATIC_DRAW);
  }
  update(data) {
    this.gl.bindBuffer(this.type, this.id)
    this.gl.bufferSubData(this.type, 0, data)
  }
}
export function buffer(...args) {
  return new _buffer(...args);
} // End of 'buffer' function
 
  
class _ubo_buffer extends _buffer {
  constructor(name, size, bindPoint, rnd) {
    super(rnd.gl.UNIFORM_BUFFER, size, rnd);
    this.gl = rnd.gl;
    this.name = name;
    this.bindPoint = bindPoint; // Buffer GPU binding point
  }
  apply (shd) {
    if (shd == undefined || shd.id == undefined || shd.uniformBlocks[this.name] == undefined)
      return;
    this.gl.uniformBlockBinding(shd.id, shd.uniformBlocks[this.name].index, this.bindPoint);
    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
  }
}
export function ubo_buffer(...args) {
  return new _ubo_buffer(...args);
} // End of 'ubo_buffer' function
 
class _vertex_buffer {
  constructor(vArray) {
    const n = vArray.length;
    super(gl.ELEMENT_ARRAY_BUFFER, n * 4);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.id);
    gl.bufferSubData(this.type, 0, new Uint32Array(vArray), 0);
  }

}

export function vertex_buffer(...args) {
  return new _vertex_buffer(...args);
} // End of 'vertex_buffer' function
        
class _index_buffer extends _buffer {
  constructor(iArray) {
    const n = iArray.length;
    super(gl.ELEMENT_ARRAY_BUFFER, n * 4);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.id);
    gl.bufferSubData(this.type, 0, new Uint32Array(iArray), 0);
  }
}
export function index_buffer(...args) {
  return new _index_buffer(...args);
} // End of 'ubo_buffer' function