import {vec3} from "./mth_vec3";
import {mat4} from "./mth_mat4";
import {cam, cameraControlsInit} from "./mth_cam"; 
export {mat4, cam, vec3, cameraControlsInit}; 

// Degree to Radian and back macro functions
export function D2R(D) {
  return D * Math.PI / 180.0;
}
export function R2D(R) {
  return R * 180.0 / Math.PI;
}