
"use strict";

const products =[
	{
		"id": "ABC1234",
		"category": "sweets",
		"title": "A premium Sweets",
		"price": "200",
		"image": "Sweets/sweets-1.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC1321fa",
		"category": "sweets",
		"title": "A Ghee made sweet",
		"price": "250",
		"image": "Sweets/sweets-2.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC123fasdf211",
		"category": "sweets",
		"title": "Gnesha suger sweet",
		"price": "500",
		"image": "Sweets/sweets-3.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC12345rdf",
		"category": "cakes",
		"title": "A premium Cake",
		"price": "600",
		"image": "Cakes/cake-1.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC1234dfasdfasdf",
		"category": "doughnuts",
		"title": "Safe made doughnut",
		"price": "600",
		"image": "Doughnut/doughnut-2.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC12fasdfasd34",
		"category": "doughnuts",
		"title": "Unique doughnut",
		"price": "600",
		"image": "Doughnut/doughnut-3.jpeg",
		"currency": "$"
	},
	{
		"id": "ABCfadsfe23r41234",
		"category": "cakes",
		"title": "Yummy Cake",
		"price": "123",
		"image": "Cakes/cake-2.jpeg",
		"currency": "$"
	},
	{
		"id": "ABCfadsfe23fasdfr41234",
		"category": "cakes",
		"title": "A premium Sweet Cake",
		"price": "600",
		"image": "Cakes/cake-3.jpeg",
		"currency": "$"
	},
	{
		"id": "ABC3211320da1234",
		"category": "cupcakes",
		"title": "A premium cupcakes",
		"price": "150",
		"image": "Cupcakes/cupcake-1.jpeg",
		"currency": "$"
	},
	{
		"id": "ABCfasdfasdf1234",
		"category": "cupcakes",
		"title": "A self made cupcakes",
		"price": "150",
		"image": "Cupcakes/cupcake-2.jpeg",
		"currency": "$"
	},
	{
		"id": "ABCfasdfasdf1234",
		"category": "cupcakes",
		"title": "A self made unique cupcakes",
		"price": "1500",
		"image": "Cupcakes/cupcake-3.jpeg",
		"currency": "$"
	},
	{
		"id": "ABCfasdfasdf1234",
		"category": "sweets",
		"title": "A self made unique Sweets",
		"price": "1500",
		"image": "Sweets/sweets-3.jpeg",
		"currency": "$"
	}
]

const inCart = []

function setNewImage() {
	(document.getElementById('img-change').src = './images/Cakes/cake-3.jpeg'),
		'./images/Cupcakes/cupcake-3.jpeg';
}

function setOldImage() {
	document.getElementById('img-change').src = './images/Sweets/sweets-1.jpeg';
}

// generate product block
function getProductBlock(rest) {
	return `
		<div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets" data-item="sweets">
				<div class="card ">
				<div class="img-container">
				<img  src="http://localhost:63342/Bakery-Store/images/${rest.image}" class="card-img-top store-img"
			alt="sweets-1">
				<button class="store-item-icon" onclick="addToCart(this)" data-value="${rest.id}" type="button">
				<i class="fa fa-shopping-cart" aria-hidden="true"></i>
		
				</button>
				</div>
				<div class="card-body">
				<div class="card-text d-flex justify-content-between text-capitalize">
				<h5 id="store-item-name">${rest.title}</h5>
			<h5 class="store-item-value">${rest.currency} <strong id="store-item-price"
		class="font-weight-bold">${rest.price}</strong></h5>
			</div>
			</div>
			</div>
			<!-- end of card-->
	</div>
	`
}

const addToCart = (event) => {
	const id= event.getAttribute('data-value')
	console.log('id is:', id)
	const getObj = products.find(p => p.id === id)
	const alreadyInCart = inCart.find(d => d.id === id);

	if(getObj && !alreadyInCart){
		getObj.quantity = 1
		inCart.push(getObj)
		alert('Added to cart')

	}else{
		const confirm= window.confirm('Product is already in cart, Would you like to updated the quantity ?')
		console.log('is confirmed:', confirm)
		if(confirm) {
			inCart.map((v) => {
				v.quantity = v.quantity + 1
				return v
			})
			alert('Added to cart')
		}
	}

	updateCart()
}

const initProducts = () => {
	const container = document.getElementById('store-items')

	products.forEach((product) => {
		container.innerHTML += getProductBlock(product)
	})
}
function loadScripts() {
initProducts()
	updateCart()
}

function handleProductFilter(event, val) {
	const value = event ? event.getAttribute('data-filter') : val;
	const store = document.getElementById('store-items');
	store.innerHTML = ""
	const filteredProducts = value === 'all' ? products : products.filter((product) => product.category.includes(value) || product.title.includes(value));

	filteredProducts.forEach((product) => {
		store.innerHTML += getProductBlock(product)
	})
}

// search products
function searchByString(event) {
	const value = event.value
	handleProductFilter(null, value)

}

const updateCart = () => {
	const container = document.getElementById('cart-info')
	let calculate = 0;

	inCart.forEach((c) => {
		calculate += Number(c.price) * Number(c.quantity)
	})
	const innerValue = ` <span class="cart-info__icon mr-lg-3"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            </span>
                            <p class="mb-0 text-capitalize"><span>${inCart.length} </span> items - $<span
                                    class="item-total">${calculate}</span></p>`

	container.innerHTML = innerValue
}
