export const deliveryTime = [
    {
        id:"1",
        deliveryDays:1,
        priceCents:999,
    }
,
    {
        id:"2",
        deliveryDays:3,
        priceCents:499,
    },
    {
        id:"3",
        deliveryDays:7,
        priceCents:0,
    }
    
]


export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
deliveryTime.forEach((option)=>{
  if(option.id === deliveryOptionId){
    deliveryOption = option;
  }
})
return deliveryOption || deliveryTime[0];
}