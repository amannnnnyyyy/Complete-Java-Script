
const product_name = document.querySelector('.product-name');
const product_image = document.querySelector('.product-image');
const product_rating_image = document.querySelector('.product-rating-stars');
const product_price = document.querySelector('.product-price');
const product_rating_count = document.querySelector('.product-rating-count');
const products_grid = document.querySelector('.products-grid') 
const products = [{
    name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
    image:'images/products/athletic-cotton-socks-6-pairs.jpg',
    ratingImg:'images/ratings/rating-45.png',
    rating:87,
    price:10.90,
    quantity:10,
},
{
    name:'Intermediate Size Basketball',
    image:'images/products/intermediate-composite-basketball.jpg',
    ratingImg:'images/ratings/rating-40.png',
    rating:127,
    price:20.95,
    quantity:10,
},
{
    name:'Adults Plain Cotton T-Shirt - 2 Pack',
    image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    ratingImg:'images/ratings/rating-45.png',
    rating:56,
    price:7.99,
    quantity:10,
}];


products.map((product)=>{
    products_grid.innerHTML += `
    <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.ratingImg}">
                <div class="product-rating-count link-primary">
                ${product.rating}
                </div>
            </div>

            <div class="product-price">
                $${product.price}
            </div>

            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary">
                Add to Cart
            </button>
        </div>
    `
})
