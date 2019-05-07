"use strict"

let currentYear = new Date();
currentYear = currentYear.getFullYear() + "";

console.log(typeof currentYear);

function createMonth(id, year, month) {
	let elem = document.getElementById(id);
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

		if(numberOfFirstDay == 0) {
			numberOfFirstDay = 7;
		}
		
		while (date.getMonth() === month) {
			arrOfDays.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
	}

	//create of the month
	function creatOfTheMonth(elem, month, monthName, amountWeeks, amountOfDays) {
		let monthObj = document.createElement('table');

		monthObj = elem.appendChild(monthObj);
		monthObj.innerHTML = `<caption>${monthName[month]}</caption><thead><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr></thead>`;

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

	monthObj = creatOfTheMonth(elem, month, monthName, amountWeeks, amountOfDays);
	pseudoArrayOfCells = monthObj.querySelectorAll('#calendar table > tr td');

	for(let i = numberOfFirstDay - 1, j = 0; j < amountOfDays.length; i++, j++) {
		pseudoArrayOfCells[i].innerHTML = amountOfDays[j].getDate();
	}

	return monthObj;
}

function createYear(id, year = currentYear) {
	let elem = document.getElementById(id);
	let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
	let numMonth = 0;

	elem.innerHTML = ""; //clear the entire contents of the calendar

	let yearWrapper = elem.appendChild(document.createElement('div'));
	yearWrapper.setAttribute('id', 'year-wrapper');
	yearWrapper.innerHTML = `${year}`;

	for(let i = 0; i < 12; i++) {
		let monthWrapper = elem.appendChild(document.createElement('div'));
		monthWrapper.setAttribute('id', months[i]);
		createMonth(months[i], year, numMonth);
		++numMonth;
	}
}

createYear('calendar', currentYear);