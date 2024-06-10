class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) (this.x = 0), this.x, (this.z = 0);
    else if (typeof x == "object")
      if (x.lenght == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
      else (this.x = x.x), (this.y = x.y), (this.z = x.z);
    else if (y == undefined && z == undefined)
      (this.x = x), (this.y = x), (this.z = x);
    else if (z == undefined) (this.x = x), (this.y = y), (this.z = 0);
    else (this.x = x), (this.y = y), (this.z = z);
  } // end of constructor function

  // dot product of two vector3 function.
  dot(v) {
    if (v == undefined) return this;
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  // add vectors function
  add(v) {
    if (v == undefined) return this;
    if (typeof v == "number") return vec3(this.x + v, this.y + v, this.z + v);
    return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  // subtracting vectors function
  sub(v) {
    if (v == undefined) return this;
    if (typeof v == "number") return vec3(this.x - v, this.y - v, this.z - v);
    return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  // multiplying vectors function
  mul(v) {
    if (v == undefined) return this;
    if (typeof v == "number") return vec3(this.x * v, this.y * v, this.z * v);
    return vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  }
  // dividing vectors function
  div(v) {
    if (v == undefined) return this;
    if (typeof v == "number") {
      if (v == 0) Error("div by zero");
      return vec3(this.x / v, this.y / v, this.z / v);
    }
    return vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  // counting length of vector3 function
  len() {
    let l = this.dot(this);

    if (l == 1 || l == 0) return l;
    return Math.sqrt(l);
  }

  // normalizing vector3 function.
  normalize() {
    let l = this.len();

    if (l == 1 || l == 0) return this;
    return this.div(l);
  }

  // cross product of two vectors function.
  cross(v) {
    if (v == undefined) return this;
    return vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
}

export function vec3(...args) {
  return new _vec3(...args);
}
