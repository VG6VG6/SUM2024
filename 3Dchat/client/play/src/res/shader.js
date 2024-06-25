let shaderloaded = [];

class _shader {
  async _init(name, rnd) {
    this.name = name;
    this.id = null;
    this.shaders =
    [
       {
         id: null,
         type: rnd.gl.VERTEX_SHADER,
         name: "vert",
         src: "",
       },
       {
        id: null,
        type: rnd.gl.FRAGMENT_SHADER,
        name: "frag",
        src: "",
      }
    ];
    for (const s of this.shaders) {
      let response = await fetch(`bin/shaders/${name}/${s.name}.glsl`);
      let src = await response.text();
      if (typeof src == "string" && src != "")
        s.src = src;
    }
    // recompile shaders
    this.updateShadersSource(rnd);
  }                     
  updateShadersSource(rnd) { 
    this.shaders[0].id = null;
    this.shaders[1].id = null;
    this.id = null;
    if (this.shaders[0].src == "" || this.shaders[1].src == "")
      return;
    this.shaders.forEach(s => {
      s.id = rnd.gl.createShader(s.type);
      rnd.gl.shaderSource(s.id, s.src);
      rnd.gl.compileShader(s.id);
      if (!rnd.gl.getShaderParameter(s.id, rnd.gl.COMPILE_STATUS)) {
        let buf = rnd.gl.getShaderInfoLog(s.id);
        console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
      }                                            
    });             
    this.id = rnd.gl.createProgram();
    this.shaders.forEach(s => {
      if (s.id != null)
        rnd.gl.attachShader(this.id, s.id);
    });
    rnd.gl.linkProgram(this.id);
    if (!rnd.gl.getProgramParameter(this.id, rnd.gl.LINK_STATUS)) {
      let buf = rnd.gl.getProgramInfoLog(this.id);
      console.log(`Shader program ${this.name} link fail: ${buf}`);
    }                                            
    this.updateShaderData(rnd);    
  } 
    updateShaderData(rnd) {
      let gl = rnd.gl;
      // Shader attributes
      this.attrs = {};
      const countAttrs = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = gl.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getAttribLocation(this.id, info.name),
        };
      }
   
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = gl.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getUniformLocation(this.id, info.name),
        };
      }
   
      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = gl.getActiveUniformBlockName(this.id, i);
        const index = gl.getActiveUniformBlockName(this.id, i);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: gl.getActiveUniformBlockParameter(this.id, index, gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: gl.getActiveUniformBlockParameter(this.id, index, gl.UNIFORM_BLOCK_BINDING),
        };
      }
  }
  constructor(name, render) {
    this._init(name, render)
  }
  apply(rnd) {
    if (this.id != null)
      rnd.gl.useProgram(this.id);
  }
}
export function shader(name, render) {
  return new _shader(name, render);
}
 