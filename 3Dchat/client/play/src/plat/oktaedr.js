import { vec3, mat4 } from "../mth/mth_def";
import { vertex } from "../res/prim";
import { prim } from "../res/prim";

class _octaedr {
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

    let p01 = vec3(-size, -size, -size),
      p02 = vec3(-size, -size, size),
      p03 = vec3(size, -size, size),
      p04 = vec3(size, -size, -size),

      p11 = vec3(-size, size, -size),
      p12 = vec3(-size, size, size),
      p13 = vec3(size, size, size),
      p14 = vec3(size, size, -size);
      
    let P1 = p02.add(p01).add(p03).add(p04).div(4);
    let P2 = p01.add(p12).add(p11).add(p02).div(4)
    let P3 = p03.add(p13).add(p12).add(p02).div(4)
    let P4 = p03.add(p04).add(p13).add(p14).div(4)
    let P5 = p01.add(p11).add(p14).add(p04).div(4)
    let P6 = p11.add(p12).add(p13).add(p14).div(4)

    for (i = 0; i < 24; i++) {
      V[i] = vertex();
    }
    i = 0;

    V[i++].pos = (P1);
    V[i++].pos = (P2);
    V[i++].pos = (P3);

    V[i++].pos = (P1);
    V[i++].pos = (P3);
    V[i++].pos = (P4);

    V[i++].pos = (P1);
    V[i++].pos = (P4);
    V[i++].pos = (P5);

    V[i++].pos = (P1);
    V[i++].pos = (P2);
    V[i++].pos = (P4);

    V[i++].pos = (P6);
    V[i++].pos = (P2);
    V[i++].pos = (P3);

    V[i++].pos = (P6);
    V[i++].pos = (P3);
    V[i++].pos = (P4);

    V[i++].pos = (P6);
    V[i++].pos = (P4);
    V[i++].pos = (P5);

    V[i++].pos = (P6);
    V[i++].pos = (P2);
    V[i++].pos = (P4);


    
    this.ind = [0, 1 , 2 ,
                3, 4 , 5 ,
                6, 7 , 8 ,
                9, 11, 8,
                12, 13, 14,
                15, 16, 17, 
                18, 19, 20, 
                23, 22, 21];
  
    this.primmitive = prim(V, this.ind, rnd);
    this.primmitive.trans = mat4.matrTranslate(vec3(0, -sqr3 * sqr2 * size / 6, -sqr2 / 3 * size))
  }

  draw(matr) {
    this.primmitive.draw(matr);
  }
}

export function octaedr(...args) {
  return new _octaedr(...args);
}