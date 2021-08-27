
let monthListCol = document.getElementById("month__list");
let yearListCol = document.getElementById("year__list");
let calendar = document.getElementById("calendar");
let buttonPreviousYear = document.getElementById("button__previous__year");
let buttonPreviousMonth = document.getElementById("button__previous__month");
let buttonNextYear = document.getElementById("button__next__year");
let buttonNextMonth = document.getElementById("button__next__month");
let inputBirthDay = document.getElementById("input__birthday")
let buttonSubmit = document.getElementById("button__submit");
let buttonRefesh = document.getElementById("button__refresh");
let inputUsername = document.getElementById("input__username");
let inputPassword = document.getElementById("input__password");
let inputEmail = document.getElementById("input__email");
let errorUsername = document.getElementById("error__username");
let errorPassword = document.getElementById("error__password");
let errorEmail = document.getElementById("error__email");
let errorBirthday = document.getElementById("error__birthday");
let username,password, email,birthday, dayInput;
let months = [
     {
          name: "Tháng 1",
          value: 1
     },
     {
          name: "Tháng 2",
          value: 2
     },
     {
          name: "Tháng 3",
          value: 3
     },
     {
          name: "Tháng 4",
          value: 4
     },
     {
          name: "Tháng 5",
          value: 5
     },
     {
          name: "Tháng 6",
          value: 6
     },
     {
          name: "Tháng 7",
          value: 7
     },
     {
          name: "Tháng 8",
          value: 8
     },
     {
          name: "Tháng 9",
          value: 9
     },
     {
          name: "Tháng 10",
          value: 10
     },
     {
          name: "Tháng 11",
          value: 11
     },
     {
          name: "Tháng 12",
          value: 11
     },

]
let today = new Date();
let monthSelected = today.getMonth()+1, yearSelected = today.getFullYear();

//Thêm combobox tháng và năm vào table
function addMonthYearList() {
     //tạo select month
     let selectionMonth = document.createElement("select");
     selectionMonth.setAttribute("id", "select__month");
     selectionMonth.setAttribute("class","calendar__dropdown");
     selectionMonth.setAttribute("name", "select__month");
     //add event vào select month
     selectionMonth.addEventListener('change', function () {
          monthSelected = selectionMonth.options[selectionMonth.selectedIndex].value;
          yearSelected = selectionYear.options[selectionYear.selectedIndex].value;
          genderCalendar(monthSelected, yearSelected)
     })
     //tạo select year
     let selectionYear = document.createElement("select");
     selectionYear.setAttribute("id", "select__year");
     selectionYear.setAttribute("class","calendar__dropdown");
     selectionYear.setAttribute("name", "select__year");
     //add event vào select year
     selectionYear.addEventListener('change', function () {
          monthSelected = selectionMonth.options[selectionMonth.selectedIndex].value;
          yearSelected = selectionYear.options[selectionYear.selectedIndex].value;
          genderCalendar(monthSelected,yearSelected)
     })
     //add option vào select
     //add month
     months.forEach(month => {
          let newMonth = document.createElement("option");
          newMonth.text = month.name;
          newMonth.setAttribute("value", month.value);
          selectionMonth.appendChild(newMonth);
     });
     //add year
     for (let i = 2000; i <= 2050; i++) {
          let newYear = document.createElement("option");
          newYear.text = i;
          newYear.setAttribute("value", i);
          selectionYear.appendChild(newYear);
     }
     //add select vào table
     monthListCol.appendChild(selectionMonth);
     yearListCol.appendChild(selectionYear);
}
//Kiểm tra năm nhuận
function isLeap(year) {
     if ((year % 4) || ((year % 100 === 0) && (year % 400))) return 0;
     else return 1;
}
// lấy ngày được click trên lịch
function genderCalendar(monthSelected, yearSelected) {
     let lengthTable = calendar.rows.length
     //clear lịch khi có sự thay đổi
     for(let index = 2 ; index < lengthTable ; index++){
          calendar.deleteRow(2);
     }
     //Biến kiểm tra tháng và năm được chọn có phải tháng và năm của hiện tại trên hệ thống
     let check = today.getMonth()+1 == monthSelected && today.getFullYear() == yearSelected ? true : false;
     let date = new Date(yearSelected, monthSelected - 1, 1);
     //lấy ngày trong tháng của năm được chọn
     let dayInTime = monthSelected == 2 ? (28 + isLeap(yearSelected)) : 31 - (monthSelected - 1) % 7 % 2;
     let count = 1;
     //Lăp 6 lần tương ứng với số dòng tối đa mà 1 lịch có thể có
     for (let i = 1; i <= 6; i++) {
          //Tạo thẻ thr
          let tr = document.createElement("tr");
          tr.setAttribute("class","calendar__content")
          //Chạy dòng đàu tiên trên lịch
          if (i == 1 & count <= dayInTime) {
               // tạo ra các lỗ trống trên lịch ở dòng đầu
               //date.getDay() là vị trí thứ bắt đầu của ngày 1 trong tháng
               for (let y = 0; y < date.getDay(); y++) {
                    let td = document.createElement("td");
                    tr.appendChild(td);
               }
               //Lắp các ngày ở dòng đầu vào
               for (let j = date.getDay(); j <= 6; j++) {
                    if (count <= dayInTime) {
                         let td = document.createElement("td");
                         if(check && count == today.getDate()){
                              td.setAttribute("background-color","aqua");
                         }
                         //Thêm event click tại các ngày
                         td.addEventListener("click",function(){
                              dayInput = td.innerText;
                              inputBirthDay.value=dayInput + "/" + monthSelected + "/" + yearSelected;
                         })
                         td.innerHTML = count;
                         tr.appendChild(td);
                         count++;
                    }
               }
          }
          //Chạy các dòng 2->6
          //Kiểm tra số render ra so với số ngày trong tháng
          else if(count<= dayInTime){
               //Lắp các ngày trong tháng vào
               for (let j = 0; j <= 6; j++) {
                    if (count <= dayInTime) {
                         let td = document.createElement("td");
                         if(check && count == today.getDate()){
                              td.style.backgroundColor = "aqua";
                         }
                         //Thêm event click tại các ngày
                         td.addEventListener("click",function(){
                              dayInput = td.innerText;
                              inputBirthDay.value=monthSelected  + "/" +dayInput  + "/" + yearSelected;
                         })
                         td.innerHTML = count;
                         tr.appendChild(td);
                         count++;
                    }
               }
          }
          //Thêm dòng đã được thêm ngày vào lịch
          calendar.appendChild(tr);
     }
}
//thêm các event vào button
function applyEventForButton() {
     //Khởi tạo các biến cần thiết
     let yearSelection = document.getElementById("select__year");
     let monthSelection = document.getElementById("select__month");
     yearSelection.value = yearSelected;
     monthSelection.value = monthSelected;
     //thêm event cho nút lùi một năm
     buttonPreviousYear.addEventListener('click', function(){
          //Kiểm tra năm trên dropdown có đạt min chưa
          if(yearSelection.selectedIndex != 0){
               //chưa thì giảm 1 năm
               yearSelection.selectedIndex -= 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
     })
     //thêm event cho nút lùi một tháng
     buttonPreviousMonth.addEventListener('click', function(){
          //Kiểm tra tháng trên dropdown có đạt min chưa
          if(monthSelection.selectedIndex != 0){
               //chưa min thì trừ đi một tháng
               monthSelection.selectedIndex -= 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
          else{
               //min rồi thì chuyển thành max và trừ một năm
               monthSelection.selectedIndex = 11;
               yearSelection.selectedIndex -= 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
     })
     //thêm event tăng một năm
     buttonNextYear.addEventListener('click', function(){
           //Kiểm tra năm trên dropdown có đạt max chưa
          if(yearSelection.selectedIndex != yearSelection.options.length -1){
               //Tăng một năm
               yearSelection.selectedIndex += 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
     })
     //thêm event tăng một tháng
     buttonNextMonth.addEventListener('click', function(){
          //Kiểm tra tháng trên dropdown có đạt max chưa
          if(monthSelection.selectedIndex != monthSelection.options.length -1){
               //chưa thì tăng 1 tháng
               monthSelection.selectedIndex += 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
          else{
               //rồi thì giảm thành tháng 1 và tăng 1 năm
               monthSelection.selectedIndex = 0;
               yearSelection.selectedIndex += 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               genderCalendar(monthSelected,yearSelected);
          }
     })
     //Event submit dữ liệu
     buttonSubmit.addEventListener('click',function(){
          //tiến hành validate các input
          if(validateInput()){
               username = inputUsername.value;
               password = inputPassword.value;
               email = inputEmail.value;
               birthday = inputBirthDay.value;
               // addUser(username,password,email,birthday);
          }
     })
     // buttonRefesh.addEventListener('click',function(){
     // //   inputUsername
     // })
}
//thêm event vào input
function applyEventForInputDate(){
     //event click vào input để xuất hiện lịch
     inputBirthDay.addEventListener("click",function(){
          calendar.style.display = "inline";
     })
     inputUsername.addEventListener("keypress",function(e){
          e = e || window.event;  
          var bad = /[^\sa-z\d]/i,  
               key = String.fromCharCode(e.keyCode || e.which);  
          if (e.which !== 0 && e.charCode !== 0 && bad.test(key)) {  
               e.returnValue = false;  
               if (e.preventDefault) {  
                    e.preventDefault();  
               }  
          }  
     })
     inputPassword.addEventListener("keypress",function(e){
          e = e || window.event;  
          var bad = /[^\sa-z\d]/i,  
               key = String.fromCharCode(e.keyCode || e.which);  
          if (e.which !== 0 && e.charCode !== 0 && bad.test(key)) {  
               e.returnValue = false;  
               if (e.preventDefault) {  
                    e.preventDefault();  
               }  
          }  
     })
}
//validate các input
function validateInput(){
     //mẫu validate của email
     const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     const notSpeacialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
     const notSpeacialCharForEmail = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
     username = inputUsername.value;
     password = inputPassword.value;
     email = inputEmail.value;
     birthday = inputBirthDay.value;
     //validate username
     errorUsername.style.display = username.length < 8 || notSpeacialChar.test(String(username).toLowerCase()) ? "inherit" : "none";
     //validate password
     errorPassword.style.display = password.length < 8 || notSpeacialChar.test(String(password).toLowerCase()) ? "inherit" : "none";
     //validate email
     errorEmail.style.display = email.length < 8 || !validateEmail.test(String(email).toLowerCase())|| notSpeacialCharForEmail.test(String(password).toLowerCase()) ? "inherit" : "none";
     //validate birhtday
     let convertDate = new Date(birthday);
     errorBirthday.style.display = birthday == "" ||  today.getTime() - convertDate.getTime() < 0 ? "inherit" : "none";
     if(errorUsername.style.display == "inherit" || errorPassword.style.display == "inherit" || errorEmail.style.display == "inherit" ||errorBirthday.style.display=="inherit"){
          console.log(false);
          return false;
     }
     else{
          console.log(true);
          return true;
     }
}



calendar.style.display = "none";
addMonthYearList();
genderCalendar(monthSelected,yearSelected)
applyEventForButton();
applyEventForInputDate();