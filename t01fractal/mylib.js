let gl, canvas;

export function initGL() {
  canvas = document.getElementById("MyGL");
  gl = canvas.getContext("webgl2")

  gl.clearColor(0, 0, 0, 1);

  // Shader creation
  let vs_txt = 
  `#version 300 es
  precision highp float;
  uniform float Time;
  out vec2 DrawPos;

  void main( void )
  {
    gl_Possition = vec4(0, 0, 0, 1);
    gl_Possition.x += 0.1 * sin(Time);
    DrawPos = InPosition.xy;
  }
  `;
  let fs_txt = 
  `#version 300 es
  precision highp float;
  out vec4 OutColor;

  in vec2 DrawPos;
  uniform float Time;

  void main( void )
  {
    OutColor = vec4(1, sin(Time), 0, 1);
  }
  `;
  let
    vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
    gl.attachShader(prg, vs);
    gl.attachShader(prg, fs);
    gl.LinkProgram(prg);
    if(!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      let buf = gl.getProgramInfoLog(prg);
      console.log('Shader program link error: ' + buf);
    }

  // Vertex buffer creation
      const size = 0.8;
      const vertexes = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
      const posLoc = gl.getAttribLocation(prg, "InPosition");
      let vertexArray = gl.gl.createVertexArray();
      gl.bindVertexArray(vertexArray);
      let vertexBufer = gl.createBuffer();
      bl.bindBuffer(gl.ARRAY_BUFFER, vertexBufer);
      bl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
      if (posLoc != -1) {
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(0);
      }
  // Uniform data

  gl.useProgram(prg);
}

// Load and compile shader function
function loadShader(shaderType, shaderSourse) {
  const shader = gl.createShader(shaderType);

  gl.shaderSourse(shader, shaderSourse);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log('Shader compile error: ' + buf);
  }
} /* End of 'loadShader' function */

let x = 0;

// Main render frame function.
export function render() {
  console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  if (timeLoc != -1) {
    const date = 
    gl.uniform1f(timeLoc, t);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} /* End of 'render' finction */

console.log("Done.");
