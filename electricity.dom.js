// INPUT ELEMENTS
const buy = document.querySelector('.topupNow');
const use = document.querySelector('.useNow');
const reset = document.querySelector('.resetNow');
// get radio elements after event listeners

// OUTPUT ELEMENTS
const unitsAvailable = document.querySelector('.unitsAvailable');
const totalUnits = document.querySelector('.totalUnits');
const totalAmount = document.querySelector('.totalAmount');
const advanceCheck = document.querySelector('.advanceTakenCheck');
const advanceUncheck = document.querySelector('.advanceTakenUncheck');
const advanceBalance = document.querySelector('.advanceBalance');

// FUNCTIONALITY
const electricity = Electricity();
if (localStorage.getItem('electricityValues')) {
	electricity.setValues(JSON.parse(localStorage.getItem('electricityValues')));
} else {
	updateLocalStorage();
}
updateDisplay();
let messageTimeout;

function buyButtonClicked() {
	let topupAmount = document.querySelector('input[name="buyElectricity"]:checked');

	if (topupAmount) {
		electricity.topUpElectricity(topupAmount.value);
		updateLocalStorage();
		updateDisplay();
	} else {
		electricity.setMessage('Select an amount', 'red', 'topup-section');
	}
	displayMessage();
}

function useButtonClicked() {
	let applianceUsed = document.querySelector('input[name="useElectricity"]:checked');

	if (applianceUsed) {
		electricity.useAppliance(applianceUsed.value);
		updateLocalStorage();
		updateDisplay();
	} else {
		electricity.setMessage('Select an appliance', 'red', 'use-section');
	}
	displayMessage();
}

function resetButtonClicked() {
	const zeroedValues = {
		'unitsAvailable': 0,
		'advanceBalance': 0,
		'amountSpent': 0,
		'unitsBought': 0
	}

	if (JSON.stringify(electricity.getValues()) === JSON.stringify(zeroedValues)) {
		electricity.setMessage('Values already reset', 'red', 'display-section');
	} else {
		electricity.setValues(zeroedValues);
		updateLocalStorage();
		updateDisplay();
		electricity.setMessage('Values reset', 'green', 'display-section');
	}
	displayMessage();
}

function updateDisplay() {
	unitsAvailable.innerHTML = electricity.getUnitsAvailable();
	totalUnits.innerHTML = electricity.totalUnitsBought().toFixed(2);
	totalAmount.innerHTML = electricity.totalAmountSpent().toFixed(2);

	if (electricity.advanceTaken()) {
		advanceCheck.classList.remove('hidden');
		advanceUncheck.classList.add('hidden');
	} else {
		advanceCheck.classList.add('hidden');
		advanceUncheck.classList.remove('hidden');
	}

	if (electricity.advanceTaken()) {
		advanceBalance.parentNode.parentNode.classList.remove('hidden');
		advanceBalance.innerHTML = electricity.getAdvanceBalance().toFixed(2);
	} else {
		advanceBalance.parentNode.parentNode.classList.add('hidden');
	}
}

function updateLocalStorage() {
	localStorage.setItem('electricityValues', JSON.stringify(electricity.getValues()));
}

function displayMessage() {
	let message = electricity.getMessage();

	const hiddenBoxes = document.querySelectorAll('.message-box');

	if (message) {
		clearTimeout(messageTimeout);

		const section = '.' + message.section;
		const sectionElement = document.querySelector(section);
		const messageContent = sectionElement.querySelector('.message');
		const messageBox = sectionElement.querySelector('.message-box');

		for (let box of hiddenBoxes) {
			if (box != messageBox) {

				setTimeout(function () {
					box.classList.add('hidden');
				}, 1500);
			}
		}

		messageContent.innerHTML = message.message;
		messageBox.classList.remove('hidden', 'green', 'red', 'white');
		messageBox.classList.add(message.color);

		messageTimeout = setTimeout(function () {
			messageBox.classList.add('hidden');
		}, 3000);
	}
}

// DOM events here
buy.addEventListener('click', buyButtonClicked);

use.addEventListener('click', useButtonClicked);

reset.addEventListener('click', resetButtonClicked);