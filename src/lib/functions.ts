export const getSQLTimestamp = () => {
	const now = new Date();

	// Get date components
	const year = now.getFullYear();
	const month = ('0' + (now.getMonth() + 1)).slice(-2); // Months are zero-based
	const day = ('0' + now.getDate()).slice(-2);

	// Get time components
	const hours = ('0' + now.getHours()).slice(-2);
	const minutes = ('0' + now.getMinutes()).slice(-2);
	const seconds = ('0' + now.getSeconds()).slice(-2);
	const milliseconds = ('00' + now.getMilliseconds()).slice(-3);

	// Combine date and time components
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

	return formattedDateTime;
};

/**
 * Returns the time since the given epoch time in the largest unit of time that is greater than 0.
 * @param epochTime The time since the epoch in milliseconds.
 * @returns {unit, count} An object containing the unit of time and the count of that unit of time.
 */
export const getTimeSinceEpoch = (epochTime: number): { unit: string; count: number } => {
	const millisecondsPerSecond = 1000;
	const secondsPerMinute = 60;
	const minutesPerHour = 60;
	const hoursPerDay = 24;
	const daysPerMonth = 30; // Approximate value for a month
	const monthsPerYear = 12;

	const currentTime = new Date().getTime();
	const timeDifference = currentTime - epochTime;

	const seconds = Math.floor(timeDifference / millisecondsPerSecond);
	const minutes = Math.floor(seconds / secondsPerMinute);
	const hours = Math.floor(minutes / minutesPerHour);
	const days = Math.floor(hours / hoursPerDay);
	const months = Math.floor(days / daysPerMonth);
	const years = Math.floor(months / monthsPerYear);

	if (years > 0) {
		return { unit: 'year', count: years };
	} else if (months > 0) {
		return { unit: 'month', count: months };
	} else if (days > 0) {
		return { unit: 'day', count: days };
	} else if (hours > 0) {
		return { unit: 'hour', count: hours };
	} else if (minutes > 0) {
		return { unit: 'minute', count: minutes };
	} else {
		return { unit: 'second', count: seconds };
	}
};

/**
 * Returns a string representation of the given epoch time.
 * @param epochTime The epoch time to format.
 * @returns A string representation of the given epoch time.
 */
export const getExperienceTitle = (experience) => {
	const titles = ['Beginner', 'Novice', 'Intermediate', 'Expert'];
	const colours = ['#22c55e', '#84CC16', '#EA580C', '#EF4444'];

	return { title: titles[experience], colour: colours[experience] };
};

/**
 * Returns a string representation of the given epoch timestamp.
 * @param epochTimestamp The epoch timestamp to format.
 * @returns A string representation of the given epoch timestamp.
 */
export const getDateString = (epochTimestamp: number) => {
	const date = new Date(epochTimestamp);

	// Extract individual components (year, month, day)
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();

	// Add the ordinal suffix to the day
	const addOrdinalSuffix = (day: number) => {
		if (day >= 11 && day <= 13) {
			return day + 'th';
		}
		switch (day % 10) {
			case 1:
				return day + 'st';
			case 2:
				return day + 'nd';
			case 3:
				return day + 'rd';
			default:
				return day + 'th';
		}
	};
	const dayWithSuffix = addOrdinalSuffix(day);

	// Format the date as a string
	const formattedDate = `${dayWithSuffix} ${month} ${year}`;

	return formattedDate;
};

/**
 * Returns the boss with the soonest death date.
 * @param deathRecords An array of death records.
 * @returns The boss object with the soonest death date.
 */
export const getBossWithSoonestDeath = (bosses) => {
	if (!bosses || bosses.length === 0) {
		return null; // Handle case where array is empty or undefined
	}

	// Initialize with the first boss
	let bossWithLargestDeathDate = bosses[0];

	// Iterate through the array to find the boss with the largest death date
	for (let i = 1; i < bosses.length; i++) {
		if (bosses[i].deathDate > bossWithLargestDeathDate.deathDate) {
			bossWithLargestDeathDate = bosses[i];
		}
	}

	// Return the boss object with the largest death date found
	return bossWithLargestDeathDate;
};

/**
 * Returns data for the boss kill text and colour.
 * @param bossId The ID of the boss.
 * @returns An object containing the boss kill text and colour.
 */
export const getKillButtonInfo = (bossId: number) => {
	// Demon's Souls
	if (bossId <= 16) {
		return { killText: 'Demon Vanquished', killColour: '#FFFFFF' };
	}
	// Dark Souls
	if (bossId <= 41) {
		return { killText: 'Victory Achieved', killColour: '#f0a91b' };
	}
	// Dark Souls 2
	if (bossId <= 83) {
		const soulBearers = [46, 61, 53, 57];
		if (soulBearers.includes(bossId)) {
			return { killText: 'Great Soul Embraced', killColour: '#f0a91b' };
		}
		return { killText: 'Victory Achieved', killColour: '#f0a91b' };
	}
	// Dark Souls 3
	if (bossId <= 107) {
		const lordsOfCinder = [88, 90, 93, 98, 101];
		if (lordsOfCinder.includes(bossId)) {
			return { killText: 'Lord of Cinder Fallen', killColour: '#F05E1B' };
		}
		return { killText: 'Heir of Fire Destroyed', killColour: '#f0a91b' };
	}
	// Bloodborne
	if (bossId <= 129) {
		const nightmares = [121, 123, 129];
		if (nightmares.includes(bossId)) {
			return { killText: 'Nightmare Slain', killColour: '#A5372C' };
		}
		return { killText: 'Prey Slaughtered', killColour: '#81A389' };
	}
	// Sekiro
	if (bossId <= 146) {
		// Immortalilty Severed
		const immortalBosses = [139, 143, 146];
		if (immortalBosses.includes(bossId)) {
			return { killText: 'Immortality Severed', killColour: '#FFFFFF' };
		}
		// Divine Dragon
		if (bossId == 140) {
			return { killText: 'Gracious Gift of Tears', killColour: '#F8CFD2' };
		}
		return { killText: 'Shinobi Execution', killColour: '#FFFFFF' };
	}
	// Elden Ring
	if (bossId <= 177) {
		const legends = [150, 174, 173, 160, 157, 176, 168, 172];
		const demigods = [148, 153, 165, 162, 166, 170];
		// Radagon/Elden Beast
		if (bossId == 177) {
			return { killText: 'God Slain', killColour: '#F6CD39' };
		}
		if (legends.includes(bossId)) {
			return { killText: 'Legend Felled', killColour: '#F6CD39' };
		}
		if (demigods.includes(bossId)) {
			return { killText: 'Demigod Felled', killColour: '#F6CD39' };
		}
		return { killText: 'Great Enemy Felled', killColour: '#F6CD39' };
	} else return { killText: 'Boss Killed', killColour: '#FFFFFF' };
};

/**
 * Returns a truncated version of the given string.
 * @param str The string to truncate.
 * @returns The truncated string.
 */
export const truncateString = (str, maxlength = 20) => {
	return str.length > maxlength ? `${str.slice(0, maxlength)}...` : str;
};
/**
 * Returns the colour of the stat based on the average stat.
 * @param stat The stat to compare.
 * @param averageStat The average stat to compare against.
 * @returns The colour of the stat.
 */
export const getStatColour = (stat: number, averageStat: number) => {
	if (stat === averageStat) return '#e7e5e4';
	if (stat > averageStat) return '#ef4444';
	if (stat < averageStat) return '#22c55e';
};
