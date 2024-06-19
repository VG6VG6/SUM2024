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