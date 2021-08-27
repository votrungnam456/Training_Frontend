function drawText(ctx, centerX, centerY, text, fontSize, center = 0, italic = 0, color= "black") {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.fillStyle = color;
  if (italic == 1)
    ctx.font = "italic " + fontSize + "px Arial";
  else
    ctx.font = fontSize + "px Arial";
  if (center == 1)
    ctx.textAlign = "center";
  else
    ctx.textAlign = "right";
  ctx.fillText(text, centerX, centerY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
function drawVerText(ctx, centerX, centerY, text, fontSize) {
  ctx.save();
  ctx.font = "italic " + fontSize + "px Arial";
  ctx.fillStyle = "#A7A7A7";
  ctx.translate(centerX, centerY);
  ctx.rotate(-0.5 * Math.PI);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}
function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
 ctx.strokeStyle = "#EBEAEA";
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
function drawRect(ctx, startX, startY, endX, endY, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, endX, endY);
  ctx.stroke();
}
function drawGraphCol(posX, posY, numY, numX, color, nameChart, nameProject, nameComment, yCount) {
  const colGraph = document.getElementById("col__chart");
  const ctx = colGraph.getContext("2d");
  const xcont = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  //vẽ text tên biểu đồ
  drawText(ctx, posX + numX * 50, posY - 50, nameChart, 20, 1);
  //vẽ text ngang của biểu đồ
  drawVerText(ctx, posX - 50, posY + numY * 50 / 1.5, nameComment, 20);
  //Vẽ text tên dự án
  drawText(ctx, posX + numX * 50, posY + numY * 50 + 60, nameProject, 20, 1, 1,"#A7A7A7");
  //Vẽ chú thích
  if (numX > 9) {
    if (numY <= 6) {
      drawRect(ctx, posX + numX * 30, posY + numY * 57 + 60, 80, 30, color);
      drawText(ctx, posX + numX * 30 + 230, posY + numY * 57 + 80, nameComment, 20, 1);
    }
    else {
      drawRect(ctx, posX + numX * 30, posY + numY * 57 + 20, 80, 30, color);
      drawText(ctx, posX + numX * 30 + 230, posY + numY * 57 + 40, nameComment, 20, 1);
    }
  }
  else {
    drawRect(ctx, posX + 50 + numX * 100, posY, 80, 30, color);
    drawText(ctx, posX + 80 + numX * 100 + 180, posY + 22, nameComment, 20, 1);
  }
  //Vẽ các đường giá trị ngang trong biểu đồ
  for (let i = 0; i <= numY; i++) {
    drawText(ctx, posX, posY + i * 50, numY - i, 15);
    drawLine(ctx, posX + 20, posY + i * 50, posX + 20 + numX * 100, posY + i * 50);
  }
  //Vẽ các cột giá trị của biểu đồ
  for (let i = 0; i < numX; i++) {
    drawText(ctx, posX + 50 + i * 100, posY + numY * 50 + 30, xcont[i], 15);
    if (yCount[i] == 0) {
      drawRect(ctx, posX + 20 + i * 100, posY + (numY - yCount[i]) * 50, 50, yCount[i] * 50 -10, color);
    }
    else {
      drawRect(ctx, posX + 20 + i * 100, posY + (numY - yCount[i]) * 50, 50, yCount[i] * 50, color);
    }
  }
}
//clear biểu đồ
function clearChart() {
  const colGraph = document.getElementById("col__chart");
  const ctx = colGraph.getContext("2d");
  ctx.clearRect(0, 0, colGraph.width, colGraph.height);
}

export { drawGraphCol, clearChart }