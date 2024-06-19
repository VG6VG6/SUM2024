class _model {
  constructor (prims, trans) {
    this.prims = prims;
    for (let elem of this.prims)
      elem.trans = elem.trans.mul(trans);
  }
  draw(matr) {
    for (let elem of this.prims)
      elem.draw(matr);
  }
}

