const FlexSlider = {
	// total no of items
	num_items: document.querySelectorAll(".slider-item").length,
	
	// position of current item in view
	current: 1,

	init: function() {
		// set CSS order of each item initially
		document.querySelectorAll(".slider-item").forEach(function(element, index) {
			element.style.order = index+1;
		});

        let autoScroll = setInterval(() => {
            this.gotoNext();
        }, 5000);

        const slider = document.querySelector("#slider-container");

        slider.addEventListener('mouseover', () => {
            clearInterval(autoScroll);
        });

        slider.addEventListener('mouseout', () => {
            autoScroll = setInterval(() => {
                this.gotoNext();
            }, 5000);
        });

		this.addEvents();
	},

	addEvents: function() {
		// after each item slides in, slider container fires transitionend event
		document.querySelector("#slider-container").addEventListener('transitionend', () => {
			this.changeOrder();
		});
	},

	changeOrder: function() {
		// change current position
		if(this.current == this.num_items)
			this.current = 1;
		else 
			this.current++;

		let order = 1;

		// change order from current position till last
		for(let i=this.current; i<=this.num_items; i++) {
			document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
			order++;
		}

		// change order from first position till current
		for(let i=1; i<this.current; i++) {
			document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
			order++;
		}

		// translate back to 0 from -100%
		// we don't need transitionend to fire for this translation, so remove transition CSS
		document.querySelector("#slider-container").classList.remove('slider-container-transition');
		document.querySelector("#slider-container").style.transform = 'translateX(0)';
	},

	gotoNext: function() {
		// translate from 0 to -100% 
		// we need transitionend to fire for this translation, so add transition CSS
		document.querySelector("#slider-container").classList.add('slider-container-transition');
		document.querySelector("#slider-container").style.transform = 'translateX(-100%)';
	},
};

FlexSlider.init();