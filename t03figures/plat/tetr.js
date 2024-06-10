import { matrRotateY, matrTranslate } from "../mth/mth_mat4";
import { vertex } from "../res/prim";
import { prim } from "../res/prim";
import { vec3 } from "../mth/mth_def";

class _tetr {
  constructor(size, rnd) {
    let sqr2 = Math.sqrt(2), i;
    let sqr3 = Math.sqrt(3);

    this.vert = [];
    let V = [];
    this.ind = [];

    for (i = 0; i < 4; i++) {
      this.vert[i] = vertex();
      this.vert[i].pos = vec3();
      this.vert[i].n = vec3();
    }

    let p0 = vec3(0);
    let p1 = vec3(-size / 2, 0, sqr3 / 2 * size);
    let p2 = vec3(size / 2, 0, sqr3 / 2 * size);
    let p3 = vec3(0, sqr3 * sqr2 * size / 3, sqr3 / 3 * size);

    for (i = 0; i < 12; i++) {
      V[i] = vertex();
    }

    V[0].pos = p0;
    V[1].pos = p1;
    V[2].pos = p2;

    V[3].pos = p3;
    V[4].pos = p1;
    V[5].pos = p2;

    V[6].pos = p3;
    V[7].pos = p0;
    V[8].pos = p1;
    
    V[9].pos = p3;
    V[10].pos = p2;
    V[11].pos = p0;


    for (i = 0; i < V.length; i++)
      this.ind[i] = i;
  
    this.primmitive = prim(V, this.ind, rnd);
    this.primmitive.trans = matrTranslate(vec3(0, -sqr3 * sqr2 * size / 6, -sqr2 / 3 * size))
  }

  draw(matr) {
    this.primmitive.draw(matr);
  }
}

export function tetr(...args) {
  return new _tetr(...args);
}