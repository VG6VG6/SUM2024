let canvas,
  gl,
  timeLoc,
  mouseLoc,
  colorLoc,
  color = [255, 0, 0],
  mousePosX = 0,
  MouseZ = 0,
  mousePosY = 0;

export function shaderInit() {
  if (window.canvas == undefined || window.gl == undefined) {
    canvas = document.getElementById("MyGL");
    gl = canvas.getContext("webgl2");
  } else {
    canvas = window.canvas;
    gl = window.gl;
  }

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;

  uniform float Time;
  uniform vec3 Mouse;

  out vec2 DrawPos;

  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    // gl_Position.x += 0.1 * sin(Time);
    DrawPos = InPosition.xy + Mouse.xy / 400.0;
  }
  `;
  let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;

  in vec2 DrawPos;
  uniform float Time;
  uniform vec3 Mouse;
  uniform vec3 Color;

  vec2 CmplMulCmpl( vec2 Z1, vec2 Z2 )
  {
    return vec2(Z1.x * Z2.x - Z1.y * Z2.y, Z1.x * Z2.y + Z1.y * Z2.x);
  }

  float julia( vec2 Z )
  {
    float n = 1.0;

    while (n < 255.0 && length(Z) < 4.0)
    {
      Z = CmplMulCmpl(Z, Z) + vec2(sin(Time / 2.0) / 1.5, sin(Time / 2.0) / 1.3);
      n += 1.0;
    }
    return n;
  }

  void main( void )
  {
    float n;
    vec2 Z;
  
    Z = DrawPos;
    n = julia(Z);
    OutColor = vec4(n + Color.r, n + Color.g, n + (80.0 + Color.b), 1);
    ///OutColor = vec4(Color, 1);
  }
  `;
  let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link error: " + buf);
  }

  // Vertex buffer creation
  const size = 0.99;
  const vertexes = [
    -size,
    size,
    0,
    -size,
    -size,
    0,
    size,
    size,
    0,
    size,
    -size,
    0,
  ];
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBufer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }
  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");
  mouseLoc = gl.getUniformLocation(prg, "Mouse");
  colorLoc = gl.getUniformLocation(prg, "Color");
  gl.useProgram(prg);
}

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log("Shader compile fail: " + buf);
  }
  return shader;
} // End of 'loadShader' function

let x = 0,
  OldMouseX,
  OldMouseY;

let IsMouseDown = false;

// Main render frame function.
export function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    gl.uniform1f(timeLoc, t);
  }
  if (mouseLoc != -1) {
    canvas.addEventListener("mousedown", (event) => {
      OldMouseX = event.clientX;
      OldMouseY = event.clientY;
      IsMouseDown = true;
    });
    canvas.addEventListener("mousemove", (event) => {
      fractalMove(event);
    });
    canvas.addEventListener("mouseup", () => {
      IsMouseDown = false;
    });
    canvas.addEventListener("mouseout", () => {
      IsMouseDown = false;
    });
    canvas.addEventListener("mousewheel", (event) => {
      MouseZ += event.wheelDelta / 40000;
    });

    gl.uniform3f(mouseLoc, mousePosX, mousePosY, MouseZ);
    gl.uniform3f(colorLoc, color[0], color[1], color[2]);
  }

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} /* End of 'render' finction */

function fractalMove(event) {
  let X = event.clientX,
    Y = event.clientY;

  if (IsMouseDown) {
    mousePosX -= X - OldMouseX;
    mousePosY += Y - OldMouseY;
    (OldMouseY = Y), (OldMouseX = X);
  }
}

export function colorUpdate( value ) {
  color[0] = 100 + Number('0x' + col.value.slice(1,3));
  color[1] = 100 + Number('0x' + col.value.slice(3,5));
  color[2] = 100 + Number('0x' + col.value.slice(5,8));
  console.log(typeof color[2], color[2])
}

console.log("Done.");
