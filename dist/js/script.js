"use strict";

var currentYear = new Date();
var inputYear;
var wrapper = document.body.querySelector(".wrapper");
var form = document.forms.inputYear;
var yearInput = form.elements.year;
var errorMessageDiv = document.getElementById('error');
var submitButtom = form.elements.submit;
currentYear = currentYear.getFullYear() + "";

function createMonth(id, year, month) {
  var elem = document.getElementById(id);
  var date = new Date(year, month);
  var numberOfFirstDay = 0;
  var amountOfDays = [];
  var amountWeeks = 0;
  var monthObj = null;
  var pseudoArrayOfCells = [];
  var monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']; // getting all days of the week into an array

  function getDaysInMonth(year, month, arrOfDays) {
    var date = new Date(year, month, 1);
    numberOfFirstDay = date.getDay();

    if (numberOfFirstDay == 0) {
      numberOfFirstDay = 7;
    }

    while (date.getMonth() === month) {
      arrOfDays.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  } //create of the month


  function creatOfTheMonth(elem, month, monthName, amountWeeks, amountOfDays) {
    var monthObj = document.createElement('table');
    monthObj = elem.appendChild(monthObj);
    monthObj.innerHTML = "<caption>".concat(monthName[month], "</caption><thead><tr><th>\u041F\u043D</th><th>\u0412\u0442</th><th>\u0421\u0440</th><th>\u0427\u0442</th><th>\u041F\u0442</th><th>\u0421\u0431</th><th>\u0412\u0441</th></tr></thead>");

    for (var j = 0; j < amountWeeks; j++) {
      var TR = monthObj.appendChild(document.createElement('tr'));

      for (var k = 0; k < 7; k++) {
        var TD = TR.appendChild(document.createElement('td'));
      }
    }

    elem.classList.add("month");
    return monthObj;
  }

  getDaysInMonth(year, month, amountOfDays); //calculate how many weeks it takes a month

  if (amountOfDays.length + numberOfFirstDay - 1 > 35) {
    amountWeeks = 6;
  } else {
    amountWeeks = 5;
  }

  monthObj = creatOfTheMonth(elem, month, monthName, amountWeeks, amountOfDays);
  pseudoArrayOfCells = monthObj.querySelectorAll('#calendar table > tr td');

  for (var i = numberOfFirstDay - 1, j = 0; j < amountOfDays.length; i++, j++) {
    pseudoArrayOfCells[i].innerHTML = amountOfDays[j].getDate();
  }

  return monthObj;
}

function createYear(id) {
  var year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentYear;
  var elem = document.getElementById(id);
  var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  var numMonth = 0;
  elem.innerHTML = ""; //clear the entire contents of the calendar

  if (document.body.querySelector("#year-wrapper")) {
    document.body.querySelector("#year-wrapper").remove();
  }

  var yearWrapper = document.body.querySelector(".wrapper").insertBefore(document.createElement('div'), elem);
  yearWrapper.setAttribute('id', 'year-wrapper');
  yearWrapper.innerHTML = "".concat(year);
  yearInput.setAttribute('placeholder', "".concat(year));

  for (var i = 0; i < 12; i++) {
    var monthWrapper = elem.appendChild(document.createElement('div'));
    monthWrapper.setAttribute('id', months[i]);
    createMonth(months[i], year, numMonth);
    ++numMonth;
  }
}

function onBlur() {
  if (isNaN(this.value)) {
    this.className = "error";
    errorMessageDiv.innerHTML = "Вы ввели не число. Исправьте, пожалуйста.";
  }
}

function onFocus() {
  if (this.className == "error") {
    this.className = "";
    error.innerHTML = "";
  }
}

;

function onSubmit(event) {
  var year = yearInput.value;
  createYear('calendar', +year);
}

function noSubmit(event) {
  event.preventDefault();
}

yearInput.addEventListener("blur", onBlur);
yearInput.addEventListener("focus", onFocus);
submitButtom.addEventListener("click", onSubmit);
form.addEventListener("submit", noSubmit);
createYear('calendar');