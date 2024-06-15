let canvas, canvas2, canvas3;
let ctx, ctx2, ctx3;
function getImageURL(file) {
  return URL.createObjectURL(file);
}

async function changeImageToWB(file) {

   canvas2 = document.getElementById("myCanvas2");
   ctx2 = canvas2.getContext('2d');

  let img = document.createElement('img');
  let url = getImageURL(file);

  const response = await fetch(url);
  const blob = await response.blob();

  await new Promise( resolve => {
    img.onload = () => { 
      ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);  
      resolve();

      let myImage = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
      for (let y = 0; y < canvas2.height; y++)
        for (let x = 0; x < canvas2.width; x++) {
            let pos = (y * canvas2.width + x) * 4;
            let bw = 255 * ((myImage.data[pos] + myImage.data[pos + 1] + myImage.data[pos + 2]) / 3 > 126);
            myImage.data[pos] = bw;
            myImage.data[pos + 1] = bw;
            myImage.data[pos + 2] = bw;
        }
      ctx2.putImageData(myImage, 0, 0);
      oneDimensionalSDF()
    }
    img.src = URL.createObjectURL(blob);
  })
}

async function drawImage(file) {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
  let img = document.createElement('img');
  let url = getImageURL(file);

  const response = await fetch(url);
  const blob = await response.blob();

  await new Promise( resolve => {
    img.onload = () => { 
      // canvas.width = img.naturalWidth;
      // canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  
      resolve();
    }
    img.src = URL.createObjectURL(blob);
  })
}


window.addEventListener("load", () => {
  const selectedFile = document.getElementById("imgInput");
  selectedFile.addEventListener("change", async () => {
    const file = selectedFile.files[0];
    drawImage(file).then(changeImageToWB(file));

  })
})


function oneDimensionalSDF() {
  canvas3 = document.getElementById("myCanvas3")
  ctx3 = canvas3.getContext('2d');

  let canvas4 = document.getElementById("myCanvas4")
  let ctx4 = canvas4.getContext('2d');

  let canv2Img = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  ctx3.putImageData(canv2Img, 0, 0);
  let canv3Img = ctx3.getImageData(0, 0, canvas3.width, canvas3.height);

  // (x - x`) ^ 2 + l(x`)
  // first step
  for (let y = 0; y < canvas3.height; y++) {
    let V = [], Z = [], x, s, i;
    for (x = 0; x < canvas3.width; x++){
        let pos = (y * canvas3.width + x) * 4;
        if (canv3Img.data[pos] == 255)
          continue;
        V.push(x);
    }
    for (i = 0; i < V.length - 1; i++) {
      s = (V[i] * V[i]  - V[i + 1] * V[i + 1]) / 2 / (V[i] - V[i + 1])
      if (Z.length > 0 && s < Z[Z.length]) {
        for (x = i; x < V.length - 1; x++)
          V[x] = V[x + 1]
        continue;
      }
      Z.push(s);
    }
    i = 0;
    if (Z.length == 0)
      continue;
    for (x = 0; x < canvas3.width; x++){
      while (x >= Z[i] && i < Z.length)
        i++;
      let pos = (y * canvas3.width + x) * 4;
      let color = (V[i] - x) * (V[i] - x);
      canv3Img.data[pos] = color;
      canv3Img.data[pos + 1] = color;
      canv3Img.data[pos + 2] = color;
    }
  }
  ctx3.putImageData(canv3Img, 0, 0);

  // second step
  for (let x = 0; x < canvas3.width; x++){
    let V = [], Z = [], y, s, i;
    for (y = 0; y < canvas3.height; y++){
        let pos = (y * canvas3.width + x) * 4;
        if (canv3Img.data[pos] == 255)
          continue;
        V.push(y);
    }
    for (i = 0; i < V.length - 1; i++) {
      s = (V[i] * V[i]  - V[i + 1] * V[i + 1]) / 2 / (V[i] - V[i + 1])
      if (Z.length > 0 && s < Z[Z.length]) {
        for (y = i; y < V.length - 1; y++)
          V[y] = V[y + 1]
        continue;
      }
      Z.push(s);
    }
    i = 0;
    if (Z.length == 0)
      continue;
    for (y = 0; y < canvas3.height; y++){
      while (y >= Z[i] && i < Z.length)
        i++;
      let pos = (y * canvas3.width + x) * 4;
      let color = (V[i] - y) * (V[i] - y);
      canv3Img.data[pos] = color;
      canv3Img.data[pos + 1] = color;
      canv3Img.data[pos + 2] = color;
    }
  }

  // for (let y = 0; y < canvas3.height; y++)
  //   for (let x = 0; x < canvas3.width; x++) {
  //     let pos = (y * canvas3.width + x) * 4;
  //     if (canv3Img.data[pos] != 0 && canv3Img.data[pos] != 255) {
  //       canv3Img.data[pos] = 255;
  //       canv3Img.data[pos + 1] = 0;
  //       canv3Img.data[pos + 2] = 0;
  //     }
  //   }

  ctx4.putImageData(canv3Img, 0, 0);
}