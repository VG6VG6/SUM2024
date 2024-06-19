import { vertex } from "../res/prim";
import { prim } from "../res/prim";
import { vec3 } from "../mth/mth_def";

class _cube {
  constructor(size, rnd) {
    this.vert = [];
    let V = [];
    this.ind = [];

    let l = size / 2;

    let p01 = vec3(-l, -l, -l),
    p02 = vec3(-l, -l, l),
    p03 = vec3(l, -l, l),
    p04 = vec3(l, -l, -l),

    p11 = vec3(-l, l, -l),
    p12 = vec3(-l, l, l),
    p13 = vec3(l, l, l),
    p14 = vec3(l, l, -l);

    let i;
    
    for (i = 0; i < 48; i++) {
      V[i] = vertex();
    }
    i = 0;
    V[i++].pos = p02;
    V[i++].pos = p01;
    V[i++].pos = p03;

    V[i++].pos = p03;
    V[i++].pos = p01;
    V[i++].pos = p04;

    V[i++].pos = p01;
    V[i++].pos = p12;
    V[i++].pos = p11;

    V[i++].pos = p01;
    V[i++].pos = p02;
    V[i++].pos = p12;

    V[i++].pos = p03;
    V[i++].pos = p13;
    V[i++].pos = p12;

    V[i++].pos = p03;
    V[i++].pos = p12;
    V[i++].pos = p02;

    V[i++].pos = p03;
    V[i++].pos = p04;
    V[i++].pos = p13;

    V[i++].pos = p04;
    V[i++].pos = p14;
    V[i++].pos = p13;

    V[i++].pos = p01;
    V[i++].pos = p11;
    V[i++].pos = p14;

    V[i++].pos = p01;
    V[i++].pos = p14;
    V[i++].pos = p04;

    /* Top */
    V[i++].pos = p11;
    V[i++].pos = p12;
    V[i++].pos = p13;

    V[i++].pos = p11;
    V[i++].pos = p13;
    V[i++].pos = p14;

    for (let k = 0; k < i; k++)
      this.ind[k] = k;
    
    this.primmitive = prim(V, this.ind, rnd)
  }

  draw(matr) {
    this.primmitive.draw(matr);
  }
}

export function cube(...args) {
  return new _cube(...args);
}