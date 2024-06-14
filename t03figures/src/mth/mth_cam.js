import {vec3} from './mth_vec3'
import {mat4} from './mth_mat4'

class _cam {  
  Loc = vec3();     /* Camera location */
  At = vec3();      /* Camera look-at point */
  Dir = vec3();     /* Camera direction */
  Right = vec3();   /* Camera right direction */
  Up = vec3();      /* Camera up direction */

  matrView = mat4();   /* View matrix */
  MatrProj = mat4();   /* Projection matrix */
  MatrVP = mat4();     /* Stored (View * Proj) matrix */

  FrameW = 0; /* Frame size (in pixels) */
  FrameH = 0; /* Frame size (in pixels) */

  Wp = 0; 
  Hp = 0;          /* Project plane size */
  ProjSize = 0;    /* Project plane fit square */
  ProjDist = 0;    /* Distance to project plane from viewer (near) */
  ProjFarClip = 0; /* Distance to project for clip plane (far) */

  set(Loc, At, Up) {
    this.matrView = mat4.matrView(Loc, At, Up);
  
    this.Right = vec3(this.matrView.m[0][0],
      this.matrView.m[1][0],
      this.matrView.m[2][0]);
    this.Up = vec3(this.matrView.m[0][1],
      this.matrView.m[1][1],
      this.matrView.m[2][1]);
    this.Dir = vec3(-this.matrView.m[0][2],
        -this.matrView.m[1][2],
        -this.matrView.m[2][2]);
    this.Loc = Loc;
    this.At = At;

    this.MatrVP = this.matrView.mul(this.MatrProj);
    return this;
  }

  // setting camera frame size function.
  setProj(ProjSize, ProjDist, ProjFarClip) {
    let rx, ry;

    this.ProjDist = ProjDist;
    this.ProjFarClip = ProjFarClip;
    rx = ry = this.ProjSize = ProjSize;
  
    /* Correct aspect ratio */
    if (this.FrameW >= this.FrameH)
      rx *= this.FrameW / this.FrameH;
    else
      ry *= this.FrameH / this.FrameW;
  
    this.Wp = rx;
    this.Hp = ry;
    this.MatrProj = mat4.matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.ProjDist, this.ProjFarClip);
    this.MatrVP = this.matrView.mul(this.MatrProj);
  }
  // setting projection data function.
  setSize( FrameW, FrameH )
  {
    this.FrameW = FrameW;
    this.FrameH = FrameH;
    this.setProj(this.ProjSize, this.ProjDist, this.ProjFarClip);
  }
}

export function cam(...args) {
  return new _cam(...args);
}


function R2D(R) {
  return R * 180.0 / Math.PI;
}

export function cameraControlsInit(rnd) {
  if (!rnd.hammer)
    rnd.hammer = new Hammer(rnd.canvas);

  let OldX, OldY;

  rnd.hammer.on("pan", e => {
    if (OldX == undefined) {
      OldX = e.center.x;
      OldY = e.center.y;  
      console.log(e);
      return;
    }
    let 
      dx = e.velocityX, dy = e.velocityY,
      Dist = rnd.camera.At.sub(rnd.camera.Loc).len(),
      cosT = (rnd.camera.Loc.y - rnd.camera.At.y) / Dist,
      sinT = Math.sqrt(1 - cosT * cosT),
      plen = Dist * sinT,
      cosP = (rnd.camera.Loc.z - rnd.camera.At.z) / plen,
      sinP = (rnd.camera.Loc.x - rnd.camera.At.x) / plen,
      Azimuth = R2D(Math.atan2(sinP, cosP)),
      Elevator = R2D(Math.atan2(sinT, cosT));
    Azimuth += 3 * -0.5 * dx;

    Elevator += 2 * -0.5 * dy;

    if (Elevator < 0.08)
      Elevator = 0.08;
    if (Elevator > 178.90)
      Elevator = 178.90;

    // Dist += 0.001 * (e.scale - 1);

    if (Dist < 0.1)
      Dist = 0.1;

    rnd.camera.set(vec3(0, Dist, 0).transform(
      mat4.matrRotateX(Elevator).mul(
      mat4.matrRotateY(Azimuth).mul(
      mat4.matrTranslate(rnd.camera.At)))),
      rnd.camera.At,
    vec3(0, 1, 0));
    // rnd.camera.set(vec3(0, Dist, 0).transform(
    //   mat4.matrRotateX(Elevator).mul(
    //   mat4.matrRotateY(Azimuth))),
    //   rnd.camera.At,
    // vec3(0, 1, 0));
    if (e.isFinal) {
      OldX = undefined;
      OldY = undefined;
      console.log(1);
    } else {
      OldX = e.center.x;
      OldY = e.center.y;
    }
  });
}