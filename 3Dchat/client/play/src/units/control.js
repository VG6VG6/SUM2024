import { vec3, mat4 } from "../mth/mth_def";

export function control(...args) {
  return new _control(...args);
}

function R2D(R) {
  return R * 180.0 / Math.PI;
}
class _control {
  init() {}

  response(rnd) {
    let Dist, cosT, sinT, plen, cosP, sinP, Azimuth, Elevator;

    /* Changing camera position */
    if (rnd.isMove) {
      Dist = rnd.camera.At.sub(rnd.camera.Loc).len(),
      cosT = (rnd.camera.Loc.y - rnd.camera.At.y) / Dist,
      sinT = Math.sqrt(1 - cosT * cosT),
      plen = Dist * sinT,
      cosP = (rnd.camera.Loc.z - rnd.camera.At.z) / plen,
      sinP = (rnd.camera.Loc.x - rnd.camera.At.x) / plen,
      Azimuth = R2D(Math.atan2(sinP, cosP)),
      Elevator = R2D(Math.atan2(sinT, cosT));

      // Azimuth += 3 * -0.5 * rnd.Mdx;

      Elevator += 2 * -0.5 * rnd.Mdy

      if (Elevator < 0.08)
        Elevator = 0.08;
      if (Elevator > 178.90)
        Elevator = 178.90;

      Dist += 0.001 * rnd.Mdz;

      if (Dist < 0.1)
        Dist = 0.1;

      rnd.camera.set(vec3(0, Dist, 0).transform(
                                          mat4.matrRotateX(Elevator).mul(
                                          mat4.matrRotateY(Azimuth).mul(
                                          mat4.matrTranslate(rnd.camera.At)))),
              rnd.camera.At,
              vec3(0, 1, 0));
    }
    if (rnd.input.keysClick["KeyP"])
      rnd.timer.isPause = !rnd.timer.isPause;
    if (rnd.input.keysClick["Tab"] && rnd.IsOn) {
      let myInput = document.getElementById("myTextArea");
      myInput.focus();
    }
      
  }

  render() {}

  close() {}
}