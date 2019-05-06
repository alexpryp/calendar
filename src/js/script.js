"use strict"

function createMonth(id, year, month) {
	month = month - 1;
	let elem = document.getElementById(id)
	let date = new Date(year, month);
	let numberOfFirstDay = 0;
	let amountOfDays = [];
	let amountWeeks = 0;
	let monthObj = null;
	let pseudoArrayOfCells = [];
	let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

	// getting all days of the week into an array
	function getDaysInMonth(year, month, arrOfDays) {
		let date = new Date(year, month, 1);
		numberOfFirstDay = date.getDay();

		while (date.getMonth() === month) {
			arrOfDays.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
	}

	//create of the month
	function creatOfTheMonth(amountWeeks, amountOfDays) {
		let monthObj = document.createElement('table');

		monthObj = elem.appendChild(monthObj);
		monthObj.innerHTML = "<thead><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr></thead>";

		for (let j = 0; j < amountWeeks; j++) {
			let TR = monthObj.appendChild(document.createElement('tr'));
			for (let k = 0; k < 7; k++) {
				let TD = TR.appendChild(document.createElement('td'));
			}
		}

		return monthObj;
	}

	getDaysInMonth(year, month, amountOfDays);

	//calculate how many weeks it takes a month
	if ((amountOfDays.length + numberOfFirstDay - 1) > 35) {
		amountWeeks = 6;
	} else {
		amountWeeks = 5;
	}

	monthObj = creatOfTheMonth(amountWeeks, amountOfDays);
	pseudoArrayOfCells = monthObj.querySelectorAll('#calendar table > tr td');

	for(let i = numberOfFirstDay - 1, j = 0; j < amountOfDays.length; i++, j++) {
		pseudoArrayOfCells[i].innerHTML = amountOfDays[j].getDate();
	}
}

createMonth('calendar', 2011, 2);