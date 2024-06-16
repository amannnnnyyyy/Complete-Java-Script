export function renderCheckoutHeader(count){
    console.log("header count", count>1);
    let html = `
    <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link number-of-items"
    href="amazon.html">${count>1?count+ ` Items`:count+ ` Item`} </a>)
  </div>`
    document.querySelector('.checkout-header-middle-section').innerHTML = html
}