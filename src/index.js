const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const categoryList = [];

	const cartList = productsList.filter(product => ids.includes(product.id));
	
	const products = cartList.map(product => ({name: product.name, category: product.category}))
	
	const price = cartList.reduce((total, amount) => {
		return total + amount.regularPrice
	}, 0);

	cartList.forEach(product => {
		if(!categoryList.includes(product.category)) {
			categoryList.push(product.category)
		}
	});
	
	const promotion = promotions[categoryList.length -1];

	const totalDiscount = cartList.reduce((total, product) => {
		const discount = product.promotions.find(promo => promo.looks.includes(promotion));
		if(discount) {
			return total + discount.price;
		} else {
			return total + product.regularPrice;
		}
	}, 0);

	const discountValue = price - totalDiscount;

	return {
		products,
		promotion,
		totalPrice: totalDiscount.toFixed(2),
		discountValue: discountValue.toFixed(2),
		discount: `${(discountValue * 100/ price).toFixed(2)}%`
	}
}

module.exports = { getShoppingCart };
