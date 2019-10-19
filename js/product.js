
class Product extends Helper {
	products = document.getElementById('products');
	allProducts;
	relavenceRes;
	lth = document.getElementById('low-t-high');
	htl = document.getElementById('high-t-low');
	rel = document.getElementById('rel');
	resultHeading = document.getElementById('result-heading');

	constructor() {
		super();
		this.lth.addEventListener('click', () => {
			this.allProducts.sort((a,b) => {
				if (a.price.final_price < b.price.final_price)
				    return -1;
				 return 0;
			});
			this.createProducts(this.allProducts);
		});
		this.htl.addEventListener('click', () => {
			this.allProducts.sort((a,b) => {
				if (a.price.final_price > b.price.final_price)
				    return -1;
				 return 0;
			});
			this.createProducts(this.allProducts);
		});
		this.rel.addEventListener('click', () => {
			console.log(this.relavenceRes);
			this.createProducts(this.relavenceRes);
		});
	}

	fetchProduct() {
		fetch('https://api.myjson.com/bins/16jqpu')
			.then(res => res.json())
			.then(res => {
				this.allProducts = JSON.parse(JSON.stringify(res.products));
				this.relavenceRes = JSON.parse(JSON.stringify(res.products));
				this.createProducts(res.products);
				this.resultHeading.innerText = `Showing ${ res.products.length } results for "Shoes"`;
			}).catch(err => {
				console.log(err);
			});
	}

	createProducts(products) {
		let productDomArr = products.map(prod => {
			return `
			<div class="product col-lg-3 col-md-6">
				<div class="img-wrapper">
					<img src="${prod.image}" />
				</div>
				<p class="product-title">
					${prod.title}
				</p>
				${this.addRating(prod.rating)}
				<p class="price">
					<span class="offer-price">Rs. ${prod.price.final_price}</span>
					<span class="strike">Rs. ${ prod.price.mrp || prod.price.final_price }</span>
					<span class="off">${prod.discount}%</span> off
				</p>
			</div>
			`
		});
		this.products.innerHTML = productDomArr.join('');
	}

	addRating(rating) {
		let color;
		if (rating > 2 && rating < 3) {
			color = '#ff9f00';
		} else if (rating < 2) {
			color = '#ff6161';
		} else {
			color = '#26a541';
		}
		return `<p class="rating" style="background: ${color}">${rating}</p>`;
	}

	filterColor(colors) {
		if (colors.length === 0) {
			this.createProducts(this.relavenceRes);
		this.resultHeading.innerText = `Showing ${ this.relavenceRes.length } results for "Shoes"`;
			return;
		}
		let filteredProducts = this.allProducts.filter(product => colors.indexOf(product.colour.title) > -1);
		this.createProducts(filteredProducts);
		this.resultHeading.innerText = `Showing ${ filteredProducts.length } results for "Shoes"`;
	}
}
let product = new Product();