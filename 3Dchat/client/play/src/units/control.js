import { vec3, mat4 } from "../mth/mth_def";

export function control(...args) {
  return new _control(...args);
}

function R2D(R) {
  return R * 180.0 / Math.PI;
}
class _control {
  init(rnd) {
    rnd.lastResponse = -1;
  }

  response(rnd) {
    if (rnd.input.keysClick["KeyP"])
      rnd.timer.isPause = !rnd.timer.isPause;
    if (rnd.input.keysClick["Tab"]) {
      if (rnd.lastResponse < rnd.timer.globalTime - 1) {
        if (rnd.isOn) {
          $("#toggleButton").animate({"right": "5px"}, 500);
          $("#chat2D").animate({"right": "-400px"}, 500);
          rnd.isOn = !rnd.isOn;
        } else {
          $("#toggleButton").animate({"right": "410px"}, 500);
          $("#chat2D").animate({"right": "10px"}, 500);
          rnd.isOn = !rnd.isOn;
          let myInput = document.getElementById("myTextArea");
          setTimeout(() => {myInput.focus()}, 500);
        }
        rnd.lastResponse = rnd.timer.globalTime;
      }
    }
      
  }

  render() {}

  close() {}
}