import { vertex } from "../res/prim";
import { prim } from "../res/prim";
import { vec3 } from "../mth/mth_def";
import { mtl } from "../res/materials";
import { img, texture } from "../res/textures";

class _cube {
  constructor(size, rnd) {
    this.vert = [];
    let V = [];
    let ind = [];

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
      V[i].color = [0, 0, 0, 0];
      V[i].tex = vec3(0);
    }
    i = 0;
    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p02;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p01;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p03;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p03;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p01;
    V[i].tex = vec3(0, 1, 0);
    V[i++].pos = p04;

    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p01;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p12;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p11;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p01;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p02;
    V[i++].pos = p12;

    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p03;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p13;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p12;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p03;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p12;
    V[i].tex = vec3(0, 1, 0);
    V[i++].pos = p02;

    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p03;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p04;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p13;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p04;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p14;
    V[i].tex = vec3(0, 1, 0);
    V[i++].pos = p13;

    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p01;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p11;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p14;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p01;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p14;
    V[i].tex = vec3(0, 1, 0);
    V[i++].pos = p04;

    /* Top */
    V[i].tex = vec3(1, 0, 0);
    V[i++].pos = p11;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p12;
    V[i].tex = vec3(0, 0, 0);
    V[i++].pos = p13;

    V[i].tex = vec3(0, 0, 0);    
    V[i++].pos = p11;
    V[i].tex = vec3(1, 1, 0);
    V[i++].pos = p13;
    V[i].tex = vec3(0, 1, 0);
    V[i++].pos = p14;

    for (let k = 0; k < i; k++)
      ind[k] = k;
    
    this.pr = prim(V, ind, rnd, rnd.shd[0])
    // this.primmitive.mtl.
  }

  draw(matr) {
    this.pr.draw(matr);
  }
}

export function cube(...args) {
  return new _cube(...args);
}