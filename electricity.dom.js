// INPUT ELEMENTS
const buy = document.querySelector('.topupNow');
const use = document.querySelector('.useNow');
const reset = document.querySelector('.resetNow');
// get radio elements after event listeners

// OUTPUT ELEMENTS
const unitsAvailable = document.querySelector('.unitsAvailable');
const totalUnits = document.querySelector('.totalUnits');
const totalAmount = document.querySelector('.totalAmount');
const advanceTaken = document.querySelector('.advanceTaken');
const advanceBalance = document.querySelector('.advanceBalance');

// Factory Function instance 
const electricity = Electricity();
if (localStorage.getItem('electricityValues')) {
	electricity.setValues(JSON.parse(localStorage.getItem('electricityValues')));
	updateDisplay();
} else {
	updateLocalStorage();
}

function buyButtonClicked() {
	let topupAmount = document.querySelector('input[name="buyElectricity"]:checked');

	if (topupAmount) {
		electricity.topUpElectricity(topupAmount.value);
		updateLocalStorage();
		updateDisplay();
	} else {
		console.log('no amount selected');
	}
}

function useButtonClicked() {
	let applianceUsed = document.querySelector('input[name="useElectricity"]:checked');

	if (applianceUsed) {
		electricity.useAppliance(applianceUsed.value);
		updateLocalStorage();
		updateDisplay();
	} else {
		console.log('no appliance selected');
	}
}

function resetButtonClicked() {
	const zeroedValues = {
		'unitsAvailable': 0,
		'advanceBalance': 0,
		'amountSpent': 0,
		'unitsBought': 0
	}

	electricity.setValues(zeroedValues);
	updateLocalStorage();
	updateDisplay();
}

function updateDisplay() {
	unitsAvailable.innerHTML = electricity.getUnitsAvailable();
	totalUnits.innerHTML = electricity.totalUnitsBought().toFixed(2);
	totalAmount.innerHTML = electricity.totalAmountSpent().toFixed(2);

	if (electricity.advanceTaken()) {
		advanceTaken.classList.remove('hidden');
	} else {
		advanceTaken.classList.add('hidden');
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
}

// DOM events here
buy.addEventListener('click', buyButtonClicked);

use.addEventListener('click', useButtonClicked);

reset.addEventListener('click', resetButtonClicked);