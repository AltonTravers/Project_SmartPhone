const orderContent = document.querySelector('.order-content')
const product = JSON.parse(localStorage.getItem('productKey'))
const productKey = Object.keys(product)
const productValue = Object.values(product)

function loadOrderDetails () {
    let totalPrice = 0 
    for(let i = 0; i < productKey.length; i++) {
        ;
        totalPrice += productValue[i].price * productValue[i].inCart;
    } 
    orderContent.innerHTML = `
        <div class="order-content-head flex">
            <div><h3>Product</h3></div>
            <div><h3>Subtotal</h3></div>
        </div>
        <div class="order-content-body">
            
        </div>
        <div class="order-content-foot flex">
            <div><h3>Total</h3></div>
            <div><h3>$${totalPrice.toFixed(2)}</h3></div>
        </div>
        `
    if(JSON.parse(localStorage.getItem('IncartNoKey')) > 0){
        const orderContentBody = document.querySelector('.order-content-body')
 
        for(let i =0; i < productKey.length; i++) {
            orderContentBody.innerHTML += `
                <div class="order-product flex">
                    <div>${productValue[i].name} x ${(productValue[i].inCart)}</div>
                    <div>$${(productValue[i].price * productValue[i].inCart).toFixed(2)}</div>
                </div>
                `
        }


    }
    
}
loadOrderDetails()