import { pushToCart,cart,loadFromStorage } from "../../data/cart.js";

describe("test suite: pushToCart",()=>{
    it("should push new product to cart",()=>{
        spyOn(localStorage,'setItem')

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        loadFromStorage()
        pushToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',"name",[],1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
    it("should push existing product to cart",()=>{
        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productName:'name',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        })
        loadFromStorage()   
        pushToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',"name",[{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                productName:'name',
                quantity:1,
                deliveryOptionId:'1'
            }
        ],1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });
})