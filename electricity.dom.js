// INPUT ELEMENTS
const buy = document.querySelector('.topupNow');
const use = document.querySelector('.useNow');
// get radio elements after event listeners

// OUTPUT ELEMENTS
const unitsAvailable = document.querySelector('.unitsAvailable');
const totalUnits = document.querySelector('.totalUnits');
const totalAmount = document.querySelector('.totalAmount');
const advanceTaken = document.querySelector('.advanceTaken');

// Factory Function instance 
const electricity = Electricity();

function buyButtonClicked() {
	let topupAmount = document.querySelector('input[name="buyElectricity"]:checked');

	if (topupAmount) {
		electricity.topUpElectricity(topupAmount.value);
		updateDisplay();
	} else {
		console.log('no amount selected');
	}
}

function useButtonClicked() {
	let applianceUsed = document.querySelector('input[name="useElectricity"]:checked');

	if (applianceUsed) {
		electricity.useAppliance(applianceUsed.value);
		updateDisplay();
	} else {
		console.log('no appliance selected');
	}
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
}

// DOM events here
buy.addEventListener('click', buyButtonClicked);

use.addEventListener('click', useButtonClicked);