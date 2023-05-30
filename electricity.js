function Electricity() {
	let unitsAvailable = 0;
	let advanceBalance = 0;
	let amountSpent = 0;
	let unitsBought = 0;
	let messageObject = {
		'message': '',
		'color': ''
	};
	let appliances = {
		'Stove': 10,
		'Kettle': 5,
		'TV': 3,
		'Fridge': 13
	};

	function topUpElectricity(amount) {
		if (amount === 'advance' && !advanceTaken()) {
			unitsAvailable += 21;
			unitsBought += 21;
			advanceBalance = 30;
		} else if (typeof Number(amount) === 'number' && Number(amount) > 0) {
			let amountValue = Number(amount);

			amountSpent += amountValue;
			if (amountValue > advanceBalance) {
				amountValue -= advanceBalance;
				advanceBalance = 0;
				unitsAvailable += (amountValue / 10) * 7;
				unitsBought += (amountValue / 10) * 7;
			} else {
				advanceBalance -= amountValue;
			}
		}
	}

	function getUnitsAvailable() {
		return unitsAvailable;
	}

	function useAppliance(appliance) {
		if (unitsAvailable >= appliances[appliance]) {
			unitsAvailable -= appliances[appliance];
			return true;
		}
		return false;
	}

	function advanceTaken() {
		if (advanceBalance > 0) {
			return true;
		} else {
			return false;
		}
	}

	function totalAmountSpent() {
		return amountSpent;
	}

	function totalUnitsBought() {
		return unitsBought;
	}

	function setValues(values) {
		unitsAvailable = values['unitsAvailable'];
		advanceBalance = values['advanceBalance'];
		amountSpent = values['amountSpent'];
		unitsBought = values['unitsBought'];
	}

	function getValues() {
		return {
			'unitsAvailable': unitsAvailable,
			'advanceBalance': advanceBalance,
			'amountSpent': amountSpent,
			'unitsBought': unitsBought
		}
	}

	function setMessage(message, color) {
		messageObject[message] = message;
		messageObject[color] = color;
	}

	function getMessage() {
		let displayMessage = messageObject;
		messageObject = {
			'message': '',
			'color': ''
		};
		return displayMessage;
	}

	return {
		advanceTaken,
		topUpElectricity,
		getUnitsAvailable,
		useAppliance,
		totalAmountSpent,
		totalUnitsBought,
		setValues,
		getValues,
		setMessage,
		getMessage
	}
}