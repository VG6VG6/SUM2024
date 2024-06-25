import { sampleUnit } from "./sample";
import { control } from "./control"; 
import { playerUnit } from "./player";
import { GLTFUnit } from "./GLTF";

let units = [], unitCounts = 0;
// units.push(sampleUnit()), unitCounts++;
units.push(control()), unitCounts++;
//units.push(playerUnit()), unitCounts++;
units.push(GLTFUnit()), unitCounts++;



class _unit {  
  init(...args) {
    for (let elem of units)
      elem.init(...args)
  }

  response(...args) {
    for (let elem of units)
      elem.response(...args)
  }

  render(...args) {
    for (let elem of units)
      elem.render(...args)
  }

  close(...args) {
    for (let elem of units)
      elem.close(...args)
  }
}

export function unit(...args) {
  return new _unit(...args)
}