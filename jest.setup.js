require('@testing-library/jest-dom')

if (typeof window !== 'undefined' && !window.ResizeObserver) {
	class ResizeObserver {
		constructor(cb) { this.cb = cb }
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.ResizeObserver = ResizeObserver
}
