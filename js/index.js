import { drawGraphCol, clearChart } from "./draw.js"
/* khai báo các biến */
let color = "#3366CC";
let nameChart = $('input[name="name__chart"]').val();
let nameProject = $('input[name="name__project"]').val();
let nameComment = $('input[name="name__comment"]').val();
let maxY = $('input[name="maxy"]').val();
let maxX = $('input[name="maxx"]').val();
let xPosition = 150, yPosition = 150;
let yCount = [2, 0, 3, 4, 4];

/* khởi tạo biểu đồ ban đầu */
renderValueAndCollumn();
drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);

/* Render ra giá trị các cột */
function renderValueAndCollumn() {
  let sel = document.getElementsByClassName("controller__input__col")[0];
  let value = "";
  maxX = $('input[name="maxx"]').val();
  for (let i = 1; i <= 12; i++) {
    value += `<div class="controller__input__col__item">
              <label for="">Cột ${i}:</label>
              <input name="colnum" type="number" min="0" max="12" value="${yCount[i - 1]}">
            </div>`;
    sel.innerHTML = value;
  }
}
/* Update giá trị các cột */
function updateValueCollumn() {
  maxX = $('input[name="maxx"]').val();
  let maxIndexCurrent, maxHeightCurrent = 0;
  //Kiêm tra và áp dụng sự thay đổi giá trị của cột => thay đổi chiều cao và chiều ngang của biểu đồ
  for (let i = 0; i < 12; i++) {
    let val = parseInt(document.getElementsByName("colnum")[i].value);
    if (!isNaN(val)) {
      maxIndexCurrent = i;
      if (maxHeightCurrent < val) {
        maxHeightCurrent = val;
      }
    }
    yCount[i] = parseInt(document.getElementsByName("colnum")[i].value);
  }
  //Lấy giá trị lớn nhất của cột gán vào text input và xác định lai độ cao/chiều ngang của biểu đồ
  $('input[name="maxy"]').val(maxHeightCurrent);
  maxY = maxHeightCurrent;
  $('input[name="maxx"]').val(maxIndexCurrent + 1);
  maxX = maxIndexCurrent + 1;
  //Vẽ lại biểu đồ
  clearChart();
  drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
}
//Kiểm tra y của input với giá trị lớn nhất trong biểu đồ
function checkChangeOfYInput() {
  let check = false;
  yCount.forEach(index => {
    if (index > maxY) {
      check = true;
    }
  });
  return check;
}
/* Jquery*/
$(document).ready(function () {
  //Event thay đổi giá trị của các cột
  $('input[name="colnum"]').change(function () {
    updateValueCollumn();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi tên biểu đồ
  $('input[name="name__chart"]').keyup(function () {
    // nameChart = document.getElementsByName("name__chart")[0].value;
    nameChart = $('input[name="name__chart"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi tên dữ án
  $('input[name="name__project"]').keyup(function () {
    nameProject = $('input[name="name__project"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi tên ngang
  $('input[name="name__comment"]').keyup(function () {
    nameComment = $('input[name="name__comment"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi chiều cao của biểu đồ
  $('input[name="maxy"]').change(function () {
    maxY = $('input[name="maxy"]').val();
    // let check = false;
    // yCount.forEach(index => {
    //   if(index >maxY){
    //     check=true;
    //   }
    // });
    if (!checkChangeOfYInput()) {
      clearChart();
      drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
    }
  });
  //Event thay đổi chiều ngang của biểu đồ
  $('input[name="maxx"]').change(function () {
    maxX = $('input[name="maxx"]').val();
    let maxValue = 0;
    yCount.forEach(value => {
      if (!isNaN(value) && value > maxValue) {
        maxValue = value;
      }
    });
    $('input[name="maxy"]').val(maxValue);
    maxY = maxValue;
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi màu biểu đồ
  $(".controller__color__item").click(function () {
    color = $(this).css("background-color");
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment, yCount);
  });
  //Event thay đổi xuất hiện cột để thay đổi giá trị
  $("#dropdown__icon").click(function () {
    let display = $(".controller__input__col").css("display");
    if (display == "none")
      $(".controller__input__col").css("display", "block");
    else
      $(".controller__input__col").css("display", "none");
  });
  //Event toggle thanh controller
  $("#button__hide__show__controller").click(function () {
    $("#controller").toggle();
  })
})


