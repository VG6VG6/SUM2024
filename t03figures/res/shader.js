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
    // Shader attributes
    rnd.shd.posLoc = rnd.gl.getAttribLocation(rnd.shd.id, "InPosition");
    rnd.shd.posN = rnd.gl.getAttribLocation(rnd.shd.id, "InNormal");

    // Uniform data
    rnd.shd.timeLoc = rnd.gl.getUniformLocation(rnd.shd.id, "Time");
    rnd.shd.mouseLoc = rnd.gl.getUniformLocation(rnd.shd.id, "Mouse");
    rnd.shd.camDirLoc = rnd.gl.getUniformLocation(rnd.shd.id, "CamDir");
    rnd.shd.worldLoc = rnd.gl.getUniformLocation(rnd.shd.id, "World");
    rnd.shd.VPLoc = rnd.gl.getUniformLocation(rnd.shd.id, "VP");
  }
  constructor(name, render) {
    this._init(name, render)
  }
  apply(rnd) {
    if (rnd.shd.id != null)
      rnd.gl.useProgram(rnd.shd.id);
  }
}
export function shader(name, render) {
  return new _shader(name, render);
}
 