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

export const getExperienceTitle = (experience: number): string => {
	const experienceTitles = ['Beginner', 'Novice', 'Intermediate', 'Expert'];

	return experienceTitles[experience];
};
