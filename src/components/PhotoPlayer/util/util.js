const debounce = (func, wait) => {
	let timeout;
	return function (...args) {
		const context = this;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			func.apply(context, args);
		}, wait);
	};
};

const getWidth = () => {
	const isClient = typeof window === 'object';
	const width = isClient ? window.innerWidth : 0;
	return width;
};

const getHeight = () => {
	const isClient = typeof window === 'object';
	const height = isClient ? window.innerHeight : 0;
	return height;
};

const getSlidesOnCurrentIndex = (currentIndex, slides) => {
	const [firstSlide, secondSlide, ...restSlides] = [...slides];
	const lastSlide = restSlides[restSlides.length - 1];
	let currentSlides = [];

	if (currentIndex === slides.length - 1) {
		currentSlides = [slides[slides.length - 2], lastSlide, firstSlide];
	} else if (currentIndex === 0) {
		currentSlides = [lastSlide, firstSlide, secondSlide];
	} else {
		currentSlides = slides.slice(currentIndex - 1, currentIndex + 2);
	}
	return currentSlides;
};

export {
	debounce,
	getHeight,
	getSlidesOnCurrentIndex,
	getWidth
};
