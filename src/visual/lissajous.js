export function initCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const spacing = 20;
  const rightBorder = canvas.width - spacing;
  const bottomBorder = canvas.height - spacing;
  // set background
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(20, 20);
  ctx.bezierCurveTo(120,-100,200,250,250,50);
  ctx.bezierCurveTo(240,-100,400,250,500,50);
  ctx.stroke();
}