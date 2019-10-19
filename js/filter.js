class Filter extends Product {
	filters = document.getElementById('filters');
	filterLoading = document.querySelector('#filter .loader');
	colorFilters = [];
	
	constructor() {
		super();
		this.fetchProduct();
		this.fetchFilters();
	}

	fetchFilters() {
		this.addClass(this.filterLoading, 'active');
		fetch('https://api.myjson.com/bins/rnwle')
			.then(res => res.json())
			.then(res => {
				this.removeClass(this.filterLoading, 'active');
				this.createFilter(res.filters);				
			}).catch(err => {
				this.removeClass(this.filterLoading, 'active');
				this.filters.innerHTML = '<h4>Loading failed</h4>';
			});
	}

	createFilter(filters) {
		let final = filters.map(filter => {
			let filterHTML = [`<div class="filter-section clearfix" id="${filter.type}"><p class="title">${filter.type}</p><div class="filters">`];
			switch (filter.type) {
				case 'PRICE':
					filterHTML.push(this.createPriceFilter(filter.values));
					break;
				case 'BRAND':
					filterHTML.push(this.createBrandFilter());
					break;
				case 'COLOUR':
					filterHTML.push(this.createColorFilter(filter.values));
					break;
			}
			filterHTML.push(`</div></div>`);
			return filterHTML.join('');
		});
		this.filters.innerHTML = final.join('');
		this.addEvents();
	}

	createBrandFilter() {
		return `<input type="text" placeholder="Search Brand" class="search" id="brand-search" />`;
	}

	createColorFilter(values) {
		return values.map((value, i) => {
			return `<label class="checkbox-container"><span class="color-panel" style="background: ${value.color}"></span> ${value.title}
					  	<input type="checkbox" class="check-color" value="${value.title}"/>
					  	<span class="checkmark"></span>
					</label>`
		}).join('');
	}

	createPriceFilter(values) {
		let li = values.map(val => `<option value="${val.key}">${val.displayValue}</option>`).join('');
		return `<div class="filters row">
					<select class="col-lg-5" id="min-rate-filter">
						${li}
					</select>
					<p class="to col-lg-2">to</p>
					<select class="col-lg-5" id="max-rate-filter">
						${li}
					</select>
				</div>`;
	}

	addEvents() {
		document.getElementById('brand-search').addEventListener('keyup', (e) => {
			this.search(e.target.value);
		});
		for (let checkbox of document.getElementsByClassName('check-color')) {
			checkbox.addEventListener('click', (e) => {
				this.colorChange(e.target.checked, e.target.value);
			});
		}
		document.getElementById('min-rate-filter').addEventListener('change', (e) => {
			this.minRangeChange(e.target.value);
		});
		document.getElementById('max-rate-filter').addEventListener('change', (e) => {
			this.maxRangeChange(e.target.value);
		});
	}

	search(val) {
		console.log(val);
	}

	colorChange(checked, val) {
		const idx = this.colorFilters.indexOf(val);
		if (checked && idx === -1) {
			this.colorFilters.push(val);
		} else {
			this.colorFilters.splice(idx, 1);
		}
		this.filterColor(this.colorFilters);
	}

	minRangeChange(val) {

	}
	maxRangeChange(val) {

	}
}


let filter = new Filter();