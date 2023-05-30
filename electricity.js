function Electricity() {
	let unitsAvailable = 0;
	let advanceBalance = 0;
	let amountSpent = 0;
	let unitsBought = 0;
	let messageObject = {
		'message': '',
		'color': '',
		'section': ''
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
			setMessage('Advance granted', 'green', 'topup-section');
		} else if (amount === 'advance' && advanceTaken()) {
			setMessage('Advance already used', 'red', 'topup-section');
		} else if (typeof Number(amount) === 'number' && Number(amount) > 0) {
			let amountValue = Number(amount);

			amountSpent += amountValue;
			if (amountValue > advanceBalance) {
				amountValue -= advanceBalance;
				advanceBalance = 0;
				unitsAvailable += (amountValue / 10) * 7;
				unitsBought += (amountValue / 10) * 7;
				setMessage('Units topped up', 'green', 'topup-section');
			} else {
				advanceBalance -= amountValue;
				setMessage('Advance partially paid', 'green', 'topup-section');
				if (!advanceTaken()) {
					setMessage('Advance fully paid', 'green', 'topup-section');
				}
			}
		}
	}

	function getUnitsAvailable() {
		return unitsAvailable;
	}

	function getAdvanceBalance() {
		return advanceBalance;
	}

	function useAppliance(appliance) {
		if (unitsAvailable >= appliances[appliance]) {
			unitsAvailable -= appliances[appliance];
			setMessage(appliance + ' used ' + appliances[appliance] + ' units', 'green', 'use-section');
			return true;
		} else {
			setMessage('Not enough units', 'red', 'use-section');
			return false;
		}
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

	function setMessage(message, color, section) {
		messageObject.message = message;
		messageObject.color = color;
		messageObject.section = section;
	}

	function getMessage() {
		let retrievedMessage = messageObject;
		messageObject = {
			'message': '',
			'color': '',
			'section': ''
		};
		return retrievedMessage;
	}

	return {
		advanceTaken,
		topUpElectricity,
		getUnitsAvailable,
		getAdvanceBalance,
		useAppliance,
		totalAmountSpent,
		totalUnitsBought,
		setValues,
		getValues,
		setMessage,
		getMessage
	}
}