const FlexSlider = {
	// total no of items
	num_items: document.querySelectorAll(".manga-card").length,

	// position of current item in view
	current: 1,

	direction: "forward",

	init: function () {
		// set CSS order of each item initially
		let autoScroll;

		document.addEventListener('DOMContentLoaded', (event) => {
			// Start the auto scroll
			autoScroll = setInterval(() => {
				this.gotoNext();
			}, 6000); // Change this to the desired scroll interval in milliseconds

			// Get the manga scroll container
			const mangaScroll = document.querySelector('.manga-scroll');

			let touchStartX = 0;
			let touchEndX = 0;
		
			// Detect the start of a touch
			mangaScroll.addEventListener('touchstart', (event) => {
			  touchStartX = event.changedTouches[0].screenX;
			});
		
			// Detect the end of a touch
			mangaScroll.addEventListener('touchend', (event) => {
			  touchEndX = event.changedTouches[0].screenX;
		
			  // Determine the direction of the swipe
			  if (touchEndX < touchStartX) {
				// Swipe left, go to next
				this.gotoNext();
			  } else if (touchEndX > touchStartX) {
				// Swipe right, go to previous
				this.gotoPrev();
			  }
			});

			// Stop the auto scroll when the user hovers over the container
			mangaScroll.addEventListener('mouseover', () => {
				clearInterval(autoScroll);
			});

			// Restart the auto scroll when the user stops hovering over the container
			mangaScroll.addEventListener('mouseout', () => {
				autoScroll = setInterval(() => {
					this.gotoNext();
				}, 6000); // Change this to the desired scroll interval in milliseconds
			});

			mangaScroll.addEventListener('touchstart', (event) => {
				clearInterval(autoScroll);
			});
		});

		document.querySelectorAll(".manga-card").forEach(function (element, index) {
			element.style.order = index + 1;
		});

		this.addEvents();
	},

	addEvents: function () {
		// click on move item button
		document.getElementById('scroll-back').addEventListener('click', () => {
			this.gotoPrev();
		});

		document.getElementById('scroll-forward').addEventListener('click', () => {
			this.gotoNext();
		});

		// after each item slides in, slider container fires transitionend event
		document.querySelector(".manga-scroll").addEventListener('transitionend', () => {
			// Check the direction and call the appropriate function
			if (this.direction === 'forward') {
				this.changeOrder();
			} else if (this.direction === 'backward') {
				this.changeOrderBackwards();
			}
		})
	},
	changeOrder: function () {
		// change current position
		if (this.current == this.num_items) {
			this.current = 1;
		} else {
			this.current++;
		}

		let order = 1;

		// change order from current position till last
		for (let i = this.current; i <= this.num_items; i++) {
			document.querySelector(".manga-card[data-position='" + i + "']").style.order = order;
			order++;
		}

		// change order from first position till current
		for (let i = 1; i < this.current; i++) {
			document.querySelector(".manga-card[data-position='" + i + "']").style.order = order;
			order++;
		}

		// translate back to 0 from -100%
		// we don't need transitionend to fire for this translation, so remove transition CSS
		document.querySelector(".manga-scroll").classList.remove('manga-scroll-transition');
		document.querySelector(".manga-scroll").style.transform = 'translateX(0)';
	},

	gotoNext: function () {
		// translate from 0 to -100% 
		// we need transitionend to fire for this translation, so add transition CSS
		this.direction = 'forward';
		document.querySelector(".manga-scroll").classList.add('manga-scroll-transition');
		document.querySelector(".manga-scroll").style.transform = 'translateX(-100%)';
	},

	changeOrderBackwards: function () {
		// change current position
		if (this.current == 1) {
			this.current = this.num_items;
		} else {
			this.current--;
		}

		let order = 1;

		// change order from current position till first
		for (let i = this.current; i >= 1; i--) {
			document.querySelector(".manga-card[data-position='" + i + "']").style.order = order;
			order++;
		}

		// change order from last position till current
		for (let i = this.num_items; i > this.current; i--) {
			document.querySelector(".manga-card[data-position='" + i + "']").style.order = order;
			order++;
		}

		// translate back to 0 from 100%
		// we don't need transitionend to fire for this translation, so remove transition CSS
		document.querySelector(".manga-scroll").classList.remove('manga-scroll-transition');
		document.querySelector(".manga-scroll").style.transform = 'translateX(0)';
	},

	gotoPrev: function () {
		// translate from 0 to 100% 
		// we need transitionend to fire for this translation, so add transition CSS
		this.direction = 'backward';
		document.querySelector(".manga-scroll").classList.add('manga-scroll-transition');
		document.querySelector(".manga-scroll").style.transform = 'translateX(100%)';
	},

};

FlexSlider.init();