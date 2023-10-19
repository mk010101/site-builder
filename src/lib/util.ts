export function throttle(callback: any, delay: number) {
	let wait = false;

	return (...args: any[]) => {
		if (wait) {
			return;
		}

		callback(...args);
		wait = true;
		setTimeout(() => {
			wait = false;
		}, delay);
	};
}
