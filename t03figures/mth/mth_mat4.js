class _mat4 {
  constructor (m = null) {
    if (m == null || m == undefined) {
      this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    } else if (typeof m == 'object' && m.length == 4) {
      this.m = m;
    } else {
    this.m = m.m;
    }
  }
  
  // translating matrix by vector function.
  translate(v) {
    if (typeof(v) == 'number')
      this.m = mat4([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [v.x, v.y, v.z, 1]]);
  }

  // multyplying two matrixes function.
  mul (m) {
    let r = mat4();

    r.m[0][0] = this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] +
    this.m[0][3] * m.m[3][0];
    r.m[0][1] = this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] +
      this.m[0][3] * m.m[3][1];
    r.m[0][2] = this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] +
      this.m[0][3] * m.m[3][2];
    r.m[0][3] = this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] +
      this.m[0][3] * m.m[3][3];


    r.m[1][0] = this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] +
      this.m[1][3] * m.m[3][0];
    r.m[1][1] = this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] +
      this.m[1][3] * m.m[3][1];
    r.m[1][2] = this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] +
      this.m[1][3] * m.m[3][2];
    r.m[1][3] = this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] +
      this.m[1][3] * m.m[3][3];


    r.m[2][0] = this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] +
      this.m[2][3] * m.m[3][0];
    r.m[2][1] = this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] +
      this.m[2][3] * m.m[3][1];
    r.m[2][2] = this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] +
      this.m[2][3] * m.m[3][2];
    r.m[2][3] = this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] +
      this.m[2][3] * m.m[3][3];


    r.m[3][0] = this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] +
      this.m[3][3] * m.m[3][0];
    r.m[3][1] = this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] +
      this.m[3][3] * m.m[3][1];
    r.m[3][2] = this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] +
      this.m[3][3] * m.m[3][2];
    r.m[3][3] = this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] +
      this.m[3][3] * m.m[3][3];

    //this.m = r.m;
    return r;
  }

  // Counting matrix(4*4) determination function.
  determ() {
    return +this.m[0][0] * matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
        this.m[2][1], this.m[2][2], this.m[2][3],
        this.m[3][1], this.m[3][2], this.m[3][3]) +
      -this.m[0][1] * matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
        this.m[2][0], this.m[2][2], this.m[2][3],
        this.m[3][0], this.m[3][2], this.m[3][3]) +
      +this.m[0][2] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
        this.m[2][0], this.m[2][1], this.m[2][3],
        this.m[3][0], this.m[3][1], this.m[3][3]) +
      -this.m[0][3] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
        this.m[2][0], this.m[2][1], this.m[2][2],
        this.m[3][0], this.m[3][1], this.m[3][2]);
  }

  inverse() {
    r = mat4();
    let det = this.determ();

    if(det == 0)
      return mat4();

    /* build adjoint matrix */
    r.A[0][0] =
    +matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                  this.m[2][1], this.m[2][2], this.m[2][3],
                  this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.A[1][0] =
      -matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[2][0], this.m[2][2], this.m[2][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.A[2][0] =
      +matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[2][0], this.m[2][1], this.m[2][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.A[3][0] =
      -matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[2][0], this.m[2][1], this.m[2][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;

    r.A[0][1] =
      -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[2][1], this.m[2][2], this.m[2][3],
                    this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.A[1][1] =
      +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[2][0], this.m[2][2], this.m[2][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.A[2][1] =
      -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[2][0], this.m[2][1], this.m[2][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.A[3][1] =
      +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[2][0], this.m[2][1], this.m[2][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;


    r.A[0][2] =
      +matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[1][1], this.m[1][2], this.m[1][3],
                    this.m[3][1], this.m[3][2], this.m[3][3]) / det;

    r.A[1][2] =
      -matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[3][0], this.m[3][2], this.m[3][3]) / det;

    r.A[2][2] =
      +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[3][0], this.m[3][1], this.m[3][3]) / det;

    r.A[3][2] =
      -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[3][0], this.m[3][1], this.m[3][2]) / det;


    r.A[0][3] =
      -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                    this.m[1][1], this.m[1][2], this.m[1][3],
                    this.m[2][1], this.m[2][2], this.m[2][3]) / det;

    r.A[1][3] =
      +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                    this.m[1][0], this.m[1][2], this.m[1][3],
                    this.m[2][0], this.m[2][2], this.m[2][3]) / det;

    r.A[2][3] =
      -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                    this.m[1][0], this.m[1][1], this.m[1][3],
                    this.m[2][0], this.m[2][1], this.m[2][3]) / det;

    r.A[3][3] =
      +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                    this.m[1][0], this.m[1][1], this.m[1][2],
                    this.m[2][0], this.m[2][1], this.m[2][2]) / det;

    return r;
  }
  // making transposition of matrix function.
  transponse() {
    return mat4(this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0],
      this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1],
      this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2],
      this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]);
  }

}

// counting matrix(3*3) determination function.
export function matrDeterm3x3( A11, A12, A13,
                        A21, A22, A23,
                        A31, A32, A33 ) {
    return A11 * A22 * A33 + A12 * A23 * A31 + A13 * A21 * A32 -
         A11 * A23 * A32 - A12 * A21 * A33 - A13 * A22 * A31;
}

// making rotation matrix by arbitrary vector function.
export function matrRotate( AngleInDegree, v ) {
  let a = D2R(AngleInDegree), s = Math.sin(a), c = Math.cos(a);

  return mat4([[c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0],
  [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
  [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0],
  [0, 0, 0, 1]]);
}

// making rotation matrix by X function.
export function matrRotateX( AngleInDegree ) {
  let a = D2R(AngleInDegree), si = Math.sin(a), co = Math.cos(a);

  return mat4([[1, 0, 0, 0],
              [0, co, si, 0],
              [0, -si, co, 0],
              [0, 0, 0, 1]]);
}

// making rotation matrix by Y function.
export function matrRotateY( AngleInDegree ) {
  let a = D2R(AngleInDegree), si = Math.sin(a), co = Math.cos(a);

  return mat4([[co, 0, -si, 0],
              [0, 1, 0, 0],
              [si, 0, co, 0],
              [0, 0, 0, 1]]);
}

// making rotation matrix by Z function.
export function matrRotateZ( AngleInDegree ) {
  let a = D2R(AngleInDegree), si = Math.sin(a), co = Math.cos(a);

  return mat4([[co, si, 0, 0],
              [-si, co, 0, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 1]]);
}

// scaling function.
export function scale( v ) {
  return mat4([[v.x, 0, 0, 0], [0, v.y, 0, 0,], [0, 0, v.z, 0,], [0, 0, 0, 1]]);
}

//matrix ortho setup function.
export function matrOrtho( L, R, B, T, N, F ) {
  return mat4([[2 / (R - L), 0, 0, 0],
              [0, 2 / (T - B), 0, 0],
              [0, 0, -2 / (F - N), 0],
              [-(R + L) / (R - L), -(T + B) / (T - B), -(F + N) / (F - N), 1]]);
}

// matrix frustum setup function.
export function matrFrustum( L, R, B, T, N, F ) {
  return mat4([[(2 * N) / (R - L), 0, 0, 0],
  [0, (2 * N) / (T - B), 0, 0],
  [(R + L) / (R - L), (T + B) / (T - B), (-((F + N) / (F - N))), (-1)],
  [0, 0, (-((2 * N * F) / (F - N))), 0]]);
}

export function matView( Loc, At, Up1 ) {
  let 
    Dir = At.sub(Loc).normalize(),
    Right = Dir.cross(Up1).normalize(),
    Up = Right.cross(Dir).normalize();

  let m = mat4([
      [Right.x, Up.x, -Dir.x, 0],
      [Right.y, Up.y, -Dir.y, 0], 
      [Right.z, Up.z, -Dir.z, 0],
      [-Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1]]);

  return m;
}

export function mat4(...args) {
  return new _mat4(...args);
}