const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const products = [],
	categoryList = [],
	promoPrice = [];
	let price = 0,
	discountPrice = 0,
	normalPrice = 0;

	productsList.forEach(product=> {
		for(let id of ids) {
			if(id === product.id) {
				products.push({ name: product.name, category: product.category});
				price += product.regularPrice;
				
				if(!categoryList.includes(product.category)) {
					categoryList.push(product.category)
				};
				
				let promoValue = {
					promotions: product.promotions,
					regularPrice: product.regularPrice
				};

				promoPrice.push(promoValue);
			}
		}
	});
	
	const promotion = promotions[categoryList.length -1];

	for (promo of promoPrice) {
		for(discount of promo.promotions) {
			if(discount.looks.includes(promotion)) {
				discountPrice += discount.price;
				normalPrice += promo.regularPrice;
			}
		}
	}

	let totalDiscount = normalPrice - discountPrice;

	return {
		products,
		promotion,
		totalPrice: (price - totalDiscount).toFixed(2),
		discountValue: totalDiscount.toFixed(2),
		discount: `${(totalDiscount * 100/ price).toFixed(2)}%`,
	}
}

module.exports = { getShoppingCart };
