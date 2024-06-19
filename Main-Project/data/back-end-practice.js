const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log("Response: ",xhr.response)
})
xhr.open('GET', 'https://supersimplebackend.dev/products/first')
xhr.send();