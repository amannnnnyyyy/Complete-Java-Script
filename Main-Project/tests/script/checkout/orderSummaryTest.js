import { renderOrderSummary } from "../../../script/checkout/orderSummary.js"
import {loadFromStorage,cart } from "../../../data/cart.js"
import { loadProducts } from "../../../data/products.js"
describe("test suite: renderOrderSummary",()=>{
    let productId1
    let productId2 
    let container =  document.querySelector('.cart-item-container')

    // beforeAll((done)=>{
    //     loadProducts(()=>{
    //         done();
    //     });
    // })

    //using fetch
    beforeAll((done)=>{
        loadProducts().then(()=>{
            done();
        });
    })


    beforeEach(()=>{
        productId1 =`e43638ce-6aa0-4b85-b27f-e1d07eb678c6`
        productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`
        container?container.innerHTML = `<div class="cart-item-container"></div>`:null
        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:productId1,
                productName:'Product 1',
                quantity:2,
                deliveryOptionId:'2'
            },
            {
                productId:`15b6fc6f-327a-4ec4-896f-486349e85a3d`,
                productName:'Product 1',
                quantity:1,
                deliveryOptionId:'1'
            }]
            );
        })
        loadFromStorage()  
        renderOrderSummary()
    })

    afterEach(()=>{
    })
    afterAll(()=>{
        document.querySelector('.everythingHTML').innerHTML = ``
    })


    it("should render orderSummary and display cart",()=>{
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(4)
        expect(document.querySelector(`.quantity-display-${productId1}`).innerHTML).toContain('2')
        expect(document.querySelector(`.js-quantity-${productId1}`).innerHTML).toContain('Quantity:')
    })

    it("should delete a product",()=>{
            expect(document.querySelector(`.js-delete-${productId1}`).click())
            expect(document.querySelectorAll('.cart-item-container').length).toEqual(3)
            expect(document.querySelectorAll('.cart-item-container').length).not.toEqual(4)

            expect(cart.length).toEqual(1)

            expect(cart[0].productId).toEqual(productId2)

    })
})