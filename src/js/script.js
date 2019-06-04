"use strict"

let currentYear = new Date();
let inputYear;
let wrapper = document.body.querySelector(".wrapper");
let form = document.forms.inputYear;
let yearInput = form.elements.year;
let errorMessageDiv = document.getElementById('error');
let submitButtom = form.elements.submit;
currentYear = currentYear.getFullYear() + "";

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

		elem.classList.add("month");

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

	if(document.body.querySelector("#year-wrapper")) {
		document.body.querySelector("#year-wrapper").remove();
	}
	let yearWrapper = document.body.querySelector(".wrapper").insertBefore(document.createElement('div'), elem);
	yearWrapper.setAttribute('id', 'year-wrapper');
	yearWrapper.innerHTML = `${year}`;
	yearInput.setAttribute('placeholder', `${year}`);

	for(let i = 0; i < 12; i++) {
		let monthWrapper = elem.appendChild(document.createElement('div'));
		monthWrapper.setAttribute('id', months[i]);
		createMonth(months[i], year, numMonth);
		++numMonth;
	}
}

function onBlur () {
	if (isNaN(this.value)) {
		this.className = "error";
		errorMessageDiv.innerHTML = "Вы ввели не число. Исправьте, пожалуйста.";
	}
}

function onFocus() {
	if(this.className == "error") {
		this.className = "";
		error.innerHTML ="";
	}
};

function onSubmit(event) {
	let year = yearInput.value;
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