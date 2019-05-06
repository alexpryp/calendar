"use strict";

function createMonth(id, year, month) {
  month = month - 1;
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

    while (date.getMonth() === month) {
      arrOfDays.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  } //create of the month


  function creatOfTheMonth(amountWeeks, amountOfDays) {
    var monthObj = document.createElement('table');
    monthObj = elem.appendChild(monthObj);
    monthObj.innerHTML = "<thead><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr></thead>";

    for (var j = 0; j < amountWeeks; j++) {
      var TR = monthObj.appendChild(document.createElement('tr'));

      for (var k = 0; k < 7; k++) {
        var TD = TR.appendChild(document.createElement('td'));
      }
    }

    return monthObj;
  }

  getDaysInMonth(year, month, amountOfDays); //calculate how many weeks it takes a month

  if (amountOfDays.length + numberOfFirstDay - 1 > 35) {
    amountWeeks = 6;
  } else {
    amountWeeks = 5;
  }

  monthObj = creatOfTheMonth(amountWeeks, amountOfDays);
  pseudoArrayOfCells = monthObj.querySelectorAll('#calendar table > tr td');

  for (var i = numberOfFirstDay - 1, j = 0; j < amountOfDays.length; i++, j++) {
    pseudoArrayOfCells[i].innerHTML = amountOfDays[j].getDate();
  }
}

createMonth('calendar', 2011, 2);