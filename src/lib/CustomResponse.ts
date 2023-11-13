export const customResponse = (status: number, message: string, data?: object[]) => {
	return {
		status: status,
		message: message,
		data: data
	};
};
