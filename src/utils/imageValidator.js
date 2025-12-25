export async function validateImage(file, rules) {
  const result = {
    blur: false,
    face: true,
    sizeOk: true,
    dimensionOk: true,
    backgroundOk: true,
    warnings: [],
  };

  // ---------- SIZE CHECK ----------
  const sizeKB = file.size / 1024;
  if (rules?.minKB && sizeKB < rules.minKB) {
    result.sizeOk = false;
    result.warnings.push("File size too small");
  }
  if (rules?.maxKB && sizeKB > rules.maxKB) {
    result.sizeOk = false;
    result.warnings.push("File size too large");
  }

  // ---------- IMAGE LOAD ----------
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((res) => (img.onload = res));

  // ---------- DIMENSION CHECK ----------
  if (rules?.width && rules?.height) {
    if (img.width !== rules.width || img.height !== rules.height) {
      result.dimensionOk = false;
      result.warnings.push("Incorrect dimensions");
    }
  }

  // ---------- CANVAS ANALYSIS ----------
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // ---------- BLUR DETECTION ----------
  let sharpness = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    sharpness += Math.abs(pixels[i] - pixels[i + 4] || 0);
  }
  if (sharpness / pixels.length < 5) {
    result.blur = true;
    result.warnings.push("Image looks blurry");
  }

  // ---------- BACKGROUND CHECK ----------
  let whiteCount = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > 240 && pixels[i + 1] > 240 && pixels[i + 2] > 240) {
      whiteCount++;
    }
  }
  if (whiteCount / (pixels.length / 4) < 0.6) {
    result.backgroundOk = false;
    result.warnings.push("Background is not white");
  }

  return result;
}
