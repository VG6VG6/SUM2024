import { cube } from "../plat/cube"
import { mat4, vec3 } from "../mth/mth_def";
import { mtl } from "../res/materials";
import { img, texture } from "../res/textures";
import { input } from "../input";

export function playerUnit(...args) {
  return new _playerUnit(...args);
}
let socket = new WebSocket("ws://localhost:8000");

class _playerUnit {
  init(rnd) {
    this.playerName = rnd.playerName;
    this.rnd = rnd;

    this.charecter = "cube"
    this.charecters = [];
    let cub = cube(0.1, rnd)
    cub.pr.mtl = mtl.getFromLib("Gold");
    let texCub = cube(0.2, rnd);
    texCub.pr.mtl = mtl();
    let image = img("face", "bin/images/face.jpg")
    texCub.pr.mtl.textureAttach(texture(image, rnd.gl.TEXTURE_2D, rnd), 0)
    this.charecters["cube"] = cub;
    this.charecters["texCube"] = texCub;

    this.position = vec3();
    this.playerPos = vec3();
    this.bodyRotate = mat4();
    this.speed = 0;
    this.head = 0;
    this.isChange = false;
    this.g = 2
    this.H = 0.5
    initializeCommunication(this);
    this.rnd.canvas.addEventListener("click", () => {
      this.rnd.canvas.requestPointerLock();
    })

    this.otherPlayer = [];
  }

  response() {
    if (this.rnd.input.keys["Space"] && !this.isJump) {
      this.isJumpUp = true;
      this.stratJump = this.rnd.timer.localTime;
      this.isJump = true;
      this.isChange = true;

    }
    

    this.head = (this.rnd.canvas.width - this.rnd.input.mX) / 15;
    // this.head -= this.rnd.input.mDx / 10
    this.speed = this.rnd.timer.localDeltaTime * (this.rnd.input.keys["KeyW"] - this.rnd.input.keys["KeyS"]) * 60 + (this.rnd.input.shiftKey && this.rnd.input.keys["KeyW"] * 60 * this.rnd.timer.localDeltaTime);
    this.speed2 = this.rnd.timer.localDeltaTime * (this.rnd.input.keys["KeyA"] - this.rnd.input.keys["KeyD"]) * 30;
    this.oldTime = this.rnd.timer.localTime;

    this.V = vec3(0, 0, -1).transform(mat4.matrRotateY(this.head));
    this.V2 = vec3(0, 0, -1).transform(mat4.matrRotateY(this.head + 90));
    this.position = this.position.add(this.V.mul(this.rnd.timer.localDeltaTime * this.speed).add(this.V2.mul(this.rnd.timer.localDeltaTime * this.speed2)));
    this.bodyRotate = mat4.matrRotateY(this.head)
    this.isChange = true;
    
    if (this.isJump) {
      this.dt = this.rnd.timer.localTime - this.stratJump + 0.01;
      this.position.y = 1.5 * this.dt - this.g * this.dt * this.dt / 2;
      if (this.dt > 0.5)
        this.isJumping = true;
      if (this.isJumping && this.position.y < 0.005)
        this.isJump = false, this.isJumping = false, this.position.y = 0;
    }

      //this.position.y = 0.2 * (this.rnd.timer.localTime - this.stratJump) - this.g * (this.rnd.timer.localTime - this.stratJump) * (this.rnd.timer.localTime - this.stratJump) / 2;
      //this.position.y = this.g * (this.rnd.timer.localTime - this.stratJump) * (this.rnd.timer.localTime - this.stratJump) / 2;  

      
    if (this.isChange)
      socket.send(JSON.stringify({type: "player move", 
              name: this.rnd.playerName, pos: this.position, 
              matr: this.bodyRotate, charecter: this.charecter}))
    this.isChange = false;
    this.camPosInterest = this.position;

    // this.CamLoc = this.playerPos.add(vec3(2, 0.5, 0)).transform(this.bodyRotate);
    // this.rnd.camera.set(this.CamLoc, this.playerPos, vec3(0, 1, 0));

    
    this.POI = this.position.add(vec3(0, 1, 3).transform(mat4.matrRotateY(this.head))),
    this.camLoc = this.rnd.camera.loc.add(this.POI.sub(this.rnd.camera.loc).mul(this.rnd.timer.localDeltaTime * 2));
    this.rnd.camera.set(this.camLoc, this.position, vec3(0, 1, 0));
  }

  render(rnd) {
    this.charecters[this.charecter].draw(this.bodyRotate.mul(mat4.matrTranslate(this.playerPos)));
    for (let elem in this.otherPlayer) {
      if (this.charecters[this.otherPlayer[elem].charecter])
        this.charecters[this.otherPlayer[elem].charecter].draw(this.otherPlayer[elem].matr.mul(mat4.matrTranslate(this.otherPlayer[elem].pos)))
      else
        this.player.draw(this.otherPlayer[elem].matr.mul(mat4.matrTranslate(this.otherPlayer[elem].pos)));

    }
  }

  close() {

  }
}

function initializeCommunication(unit) {
  socket.onopen = (e) => {
    socket.send("Hello from player unit");
  }
  socket.onmessage = (e) => {
    try {
      let js = JSON.parse(e.data.toString());
        if (js.type == "player move") {
          if (js.name == unit.playerName) {
            unit.playerPos = vec3(js.pos);
            unit.bodyRotate = mat4(js.matr);
            unit.charecter = js.charecter;
          } else {
              unit.otherPlayer[js.name] = {
                pos: vec3(js.pos),
                matr: mat4(js.matr),
                charecter: "texCube",
              };
          }
        }
    } catch {}
  }
}