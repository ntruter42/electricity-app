function Electricity() {
	let unitsAvailable = 0;
	let advanceOwing = 0;
	let appliances = {
		'Stove': 10,
		'Kettle': 5,
		'TV': 3,
		'Fridge': 13
	};

	function topUpElectricity(amount) {
		if (amount === 'advance' && !advanceTaken()) {
			unitsAvailable += 21;
		} else if (amount > 0) {
			unitsAvailable += (amount / 10) * 7;
		}
	}

	function getUnitsAvailable() {
		return unitsAvailable;
	}

	/*
	* return true and subtract from units available if there is enough units to use the appliance
	* other wise return false and do nothing.
	*/

	function useAppliance(appliance) {
		if (unitsAvailable >= appliances[appliance]) {
			unitsAvailable -= appliances[appliance];
			return true;
		}
		return false;
	}

	function advanceTaken() {
		if (advanceOwing > 0) {
			return true;
		} else {
			advanceOwing = 30;
			return false;
		}
	}

	function totalAmountSpent() {
	}

	function totalUnitsBought() {
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