function Electricity() {
	let unitsAvailable = 0;
	let advanceBalance = 0;
	let amountSpent = 0;
	let unitsBought = 0;
	let appliances = {
		'Stove': 10,
		'Kettle': 5,
		'TV': 3,
		'Fridge': 13
	};

	function topUpElectricity(amount) {
		if (amount === 'advance' && !advanceTaken()) {
			unitsAvailable += 21;
			advanceBalance = 30;
		} else if (typeof amount === 'number') {
			amountSpent += amount;
			if (amount > advanceBalance) {
				amount -= advanceBalance;
				advanceBalance = 0;
				unitsAvailable += (amount / 10) * 7;
				unitsBought += (amount / 10) * 7;
			} else {
				advanceBalance -= amount;
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

	return {
		advanceTaken,
		topUpElectricity,
		getUnitsAvailable,
		useAppliance,
		totalAmountSpent,
		totalUnitsBought
	}
}