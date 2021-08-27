
let monthListCol = document.getElementById("month__list");
let yearListCol = document.getElementById("year__list");
let calendar = document.getElementById("calendar");
let buttonPreviousYear = document.getElementById("button__previous__year");
let buttonPreviousMonth = document.getElementById("button__previous__month");
let buttonNextYear = document.getElementById("button__next__year");
let buttonNextMonth = document.getElementById("button__next__month");
let inputBirthDay = document.getElementById("input__birthday")
let buttonSubmit = document.getElementById("button__submit");
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
     selectionMonth.addEventListener('change', function () {
          monthSelected = selectionMonth.options[selectionMonth.selectedIndex].value;
          yearSelected = selectionYear.options[selectionYear.selectedIndex].value;
          getDay(monthSelected, yearSelected)
     })
     //tạo select year
     let selectionYear = document.createElement("select");
     selectionYear.setAttribute("id", "select__year");
     selectionYear.setAttribute("class","calendar__dropdown");
     selectionYear.setAttribute("name", "select__year");
     selectionYear.addEventListener('change', function () {
          monthSelected = selectionMonth.options[selectionMonth.selectedIndex].value;
          yearSelected = selectionYear.options[selectionYear.selectedIndex].value;
          getDay(monthSelected,yearSelected)
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
function getDay(monthSelected, yearSelected) {
     let lengthTable = calendar.rows.length
     for(let index = 2 ; index < lengthTable ; index++){
          calendar.deleteRow(2);
     }
     let check = today.getMonth()+1 == monthSelected && today.getFullYear() == yearSelected ? true : false;
     let date = new Date(yearSelected, monthSelected - 1, 1);
     let dayInTime = monthSelected == 2 ? (28 + isLeap(yearSelected)) : 31 - (monthSelected - 1) % 7 % 2;
     let count = 1;
     for (let i = 1; i <= 6; i++) {
          let tr = document.createElement("tr");
          tr.setAttribute("class","calendar__content")
          // let row = calendar.insertRow(calendar.rows.length);
          if (i == 1 & count <= dayInTime) {
               for (let y = 0; y < date.getDay(); y++) {
                    let td = document.createElement("td");
                    tr.appendChild(td);
                    // let cell = row.insertCell(y)
                    // cell.innerHTML = "";
               }
               for (let j = date.getDay(); j <= 6; j++) {
                    if (count <= dayInTime) {
                         let td = document.createElement("td");
                         if(check && count == today.getDate()){
                              td.setAttribute("background-color","aqua");
                         }
                         td.addEventListener("click",function(){
                              dayInput = td.innerText;
                              inputBirthDay.value=dayInput + "/" + monthSelected + "/" + yearSelected;
                         })
                         td.innerHTML = count;
                         tr.appendChild(td);
                         // let cell = row.insertCell(j)
                         // cell.innerHTML = count;
                         count++;
                    }
               }
          }
          else if(count<= dayInTime){
               for (let j = 0; j <= 6; j++) {
                    if (count <= dayInTime) {
                         let td = document.createElement("td");
                         if(check && count == today.getDate()){
                              td.style.backgroundColor = "aqua";
                         }
                         td.addEventListener("click",function(){
                              dayInput = td.innerText;
                              inputBirthDay.value=monthSelected  + "/" +dayInput  + "/" + yearSelected;
                         })
                         td.innerHTML = count;
                         tr.appendChild(td);
                         // let cell = row.insertCell(j)
                         // cell.innerHTML = count;
                         count++;
                    }
               }
          }
          calendar.appendChild(tr);
     }
}
function applyEventForButton() {
     let yearSelection = document.getElementById("select__year");
     let monthSelection = document.getElementById("select__month");
     yearSelection.value = yearSelected;
     monthSelection.value = monthSelected;
     buttonPreviousYear.addEventListener('click', function(){
          if(yearSelection.selectedIndex != 0){
               yearSelection.selectedIndex -= 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               getDay(monthSelected,yearSelected);
          }
     })
     buttonPreviousMonth.addEventListener('click', function(){
          if(monthSelection.selectedIndex != 0){
               monthSelection.selectedIndex -= 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               getDay(monthSelected,yearSelected);
          }
     })
     buttonNextYear.addEventListener('click', function(){
          if(yearSelection.selectedIndex != yearSelection.options.length -1){
               yearSelection.selectedIndex += 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               getDay(monthSelected,yearSelected);
          }
     })
     buttonNextMonth.addEventListener('click', function(){
          if(monthSelection.selectedIndex != monthSelection.options.length -1){
               monthSelection.selectedIndex += 1;
               monthSelected = monthSelection.childNodes[monthSelection.selectedIndex].value;
               yearSelected = yearSelection.childNodes[yearSelection.selectedIndex].value;              
               getDay(monthSelected,yearSelected);
          }
     })
     buttonSubmit.addEventListener('click',function(){
          if(validateInput()){
               username = inputUsername.value;
               password = inputPassword.value;
               email = inputEmail.value;
               birthday = inputBirthDay.value;
               // addUser(username,password,email,birthday);
          }
     })
}
function applyEventForInputDate(){
     inputBirthDay.addEventListener("click",function(){
          calendar.style.display = "inline";
     })
     // inputBirthDay.addEventListener("focusout",function(){
     //      calendar.style.display = "none";
     // })
}
//validate các input
function validateInput(){
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     username = inputUsername.value;
     password = inputPassword.value;
     email = inputEmail.value;
     birthday = inputBirthDay.value;
     errorUsername.style.display = username == "" || username.length < 8 ? "inherit" : "none";
     errorPassword.style.display = password == "" || password.length < 8 ? "inherit" : "none";
     errorEmail.style.display = email == "" || email.length < 8 || !re.test(String(email).toLowerCase()) ? "inherit" : "none";
     let convertDate = new Date(birthday);
     errorBirthday.style.display = birthday == "" ||  today.getTime() - convertDate.getTime() < 0 ? "inherit" : "none";
     // console.log(today.getTime() - convertDate.getTime())
     if(errorUsername.style.display == "inherit" || errorPassword.style.display == "inherit" || errorEmail.style.display == "inherit" ||errorBirthday.style.display=="inherit"){
          console.log(false);
          return false;
     }
     else{
          console.log(true);
          return true;
     }
     // if(username == "" ||password == "" ||email == "" || birthDay.value == ""){
     //      console.log(false);        
     // }
     // else{
     //      if(username.length < 8 || password.length < 8 || email.length < 8){
     //           console.log(false);

     //      }
          
     // };

}



calendar.style.display = "none";
addMonthYearList();
getDay(monthSelected,yearSelected)
applyEventForButton();
applyEventForInputDate();