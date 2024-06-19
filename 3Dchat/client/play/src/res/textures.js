class _img {
  constructor(name, href) {
    this.name = name;
    this.img = new Image();
    this.img.src = href;
  }
}
export function img(...args) {
  return new _img(...args);
}
class _texture {
  constructor(nameURL, textureType, rnd) {
    this.name = nameURL.name;
    this.type = textureType;
    this.id = rnd.gl.createTexture();
    this.gl = rnd.gl;
    this.gl.bindTexture(this.type, this.id);
    if (nameURL.img) {
      this.gl.texImage2D(this.type, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA,
                      this.gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
      nameURL.img.onload = () => {
        this.gl.bindTexture(this.type, this.id);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.texImage2D(this.type, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
                      nameURL.img);
        this.gl.generateMipmap(this.type);
        this.gl.texParameteri(this.type, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.texParameteri(this.type, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.texParameteri(this.type, this.gl.TEXTURE_MIN_FILTER,
                              this.gl.LINEAR_MIPMAP_LINEAR);
        this.gl.texParameteri(this.type, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      }
    }
  }
  apply(rnd, i) {
    // Tell WebGL we want to affect texture unit 0
    rnd.gl.activeTexture(rnd.gl.TEXTURE0 + i);
    // Bind the texture to texture unit i
    rnd.gl.bindTexture(this.type, this.id);
  }
}
 
export function texture(...args) {
  return new _texture(...args);
}