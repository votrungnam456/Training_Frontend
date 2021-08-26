import {drawGraphCol, clearChart} from "./draw.js"
/* khai báo các biến */
let color = "aqua";
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
function renderValueAndCollumn(){
  let sel = document.getElementsByClassName("controller__input__col")[0];
  let value ="";
  maxX = $('input[name="maxx"]').val();
  for(let i = 1; i <= 12; i++){
    value+= `<div class="controller__input__col__item">
              <label for="">Cột ${i}:</label>
              <input name="colnum" type="number" min="0" max="12" value="${yCount[i-1]}">
            </div>`;
    sel.innerHTML = value;
  }
}
/* Update giá trị các cột */
function updateValueCollumn(){
  maxX =  $('input[name="maxx"]').val();
  for(let i = 0; i < 12; i++){
    let va = parseInt(document.getElementsByName("colnum")[i].value);
    if(va > maxY){
      $('input[name="maxy"]').val() = va;
      maxY = va;
      clearChart();
      drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
    }
    yCount[i] = parseInt(document.getElementsByName("colnum")[i].value);
  }
}
/* Jquery*/
$(document).ready(function(){
  $('input[name="colnum"]').change(function () { 
    updateValueCollumn();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  
  $('input[name="name__chart"]').keyup(function () { 
    // nameChart = document.getElementsByName("name__chart")[0].value;
    nameChart = $('input[name="name__chart"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  
  $('input[name="name__project"]').keyup(function () { 
    nameProject = $('input[name="name__project"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  
  $('input[name="name__comment"]').keyup(function () { 
    nameComment =  $('input[name="name__comment"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  $('input[name="maxy"]').change(function () { 
    maxY = $('input[name="maxy"]').val();
    let check = false;
    console.log(maxY)
    yCount.forEach(index => {
      if(index >maxY){
        check=true;
      }
    });
    if(!check){
      clearChart();
      drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
    }
  });
  $('input[name="maxx"]').change(function () { 
    maxX = $('input[name="maxx"]').val();
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  
  $(".controller__color__item").click(function () { 
    color = $(this).css( "background-color" );
    clearChart();
    drawGraphCol(xPosition, yPosition, maxY, maxX, color, nameChart, nameProject, nameComment,yCount);
  });
  
  $("#dropdown__icon").click(function () { 
    let display = $(".controller__input__col").css("display"); 
    if(display == "none")
      $(".controller__input__col").css("display", "block");
    else
      $(".controller__input__col").css("display", "none");
  });
})


