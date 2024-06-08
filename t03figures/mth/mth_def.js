import {vec3} from "./mth_vec3";
export {vec3}; 
import {mat4, matrDeterm3x3, matrRotate, matrRotateX, matrRotateY, matrRotateZ, scale, matrOrtho, matrFrustum, matView} from "./mth_mat4";
export {mat4, matrDeterm3x3, matrRotate, matrRotateX, matrRotateY, matrRotateZ, scale, matrOrtho, matrFrustum, matView}; 
import {cam} from "./mth_cam"; 
export {cam};

// Degree to Radian and back macro functions
export function D2R(D) {
  return D * Math.PI / 180.0;
}
export function R2D(R) {
  return R * 180.0 / Math.PI;
}