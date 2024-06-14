
// Main render frame function.
export function render(rend) {
  rend.gl.clear(rend.gl.COLOR_BUFFER_BIT);

  // const date = new Date();
  // window.t =
  //   date.getMinutes() * 60 +
  //   date.getSeconds() +
  //   date.getMilliseconds() / 1000;
  

  // if (rend.shd.timeLoc != -1) {
  //     rend.gl.uniform1f(rend.shd.timeLoc, window.t);
  // }
  // if (rend.shd.mouseLoc != -1) {
  //   rend.gl.uniform3f(rend.shd.mouseLoc, mousePosX, mousePosY, MouseZ);
  // }
  if (rend.shd.camDirLoc != -1)
    rend.gl.uniform3f(rend.shd.camDirLoc, false, rend.camera.Dir.x, rend.camera.Dir.y, rend.camera.z);

  //tetrahedron.draw(matrRotateY(t * 75).mul(matrRotateX(t * 30)));
  //cub.draw(matrRotateY(t * 75).mul(matrRotateX(t * 30)));
  
} /* End of 'render' finction */

