const addItemNo = document.querySelector(".add-item-no");
const deductItemNo = document.querySelector(".deduct-item-no");
const itemNo = document.querySelector(".item-no");
const addTocartBtn = document.querySelector(".add-to-cart");

document.addEventListener("click", (e) => {
  console.log(e.target);
  //   e.preventDefault();
});

addItemNo.addEventListener("click", (e) => {
  let numberOfItem = parseInt(itemNo.innerHTML);
  if (numberOfItem < 10) {
    numberOfItem += 1;
  }
  itemNo.innerHTML = numberOfItem;
  disableAddDeduct();
});

deductItemNo.addEventListener("click", (e) => {
  let numberOfItem = parseInt(itemNo.innerHTML);
  if (numberOfItem > 0) {
    numberOfItem -= 1;
  }
  itemNo.innerHTML = numberOfItem;
  disableAddDeduct();
});

addTocartBtn.addEventListener("click", (e) => {
  let product = [
    {
      name: "Charocal Black",
      tag: "charocalblack",
      price: 42,
      inCart: 0,
      img: "./images/blackproduct-2.jpg",
    },
  ];
  product.inCart = parseInt(itemNo.innerHTML);
  console.log(product.inCart);
  addItemTocart(product[0]);
  addIncartNo();
  e.preventDefault();
});

function disableAddDeduct() {
  let numberOfItem = parseInt(itemNo.innerHTML);
  if (numberOfItem === 0) {
    deductItemNo.style.background = "#d9d9d9";
  } else if (numberOfItem === 10) {
    addItemNo.style.background = "#d9d9d9";
  } else {
    addItemNo.style.background = "#f2f2f2";
    deductItemNo.style.background = "#f2f2f2";
  }
}

function addItemTocart(product) {
  if (!localStorage.getItem("productKey")) {
    let productsIncart;

    product.inCart = parseInt(itemNo.innerHTML);
    productsIncart = { [product.tag]: product };
    productsIncart[product.tag].inCart = parseInt(itemNo.innerHTML);
    localStorage.setItem("productKey", JSON.stringify(productsIncart));
  } else {
    let productsIncart;
    productsIncart = JSON.parse(localStorage.getItem("productKey"));
    if (productsIncart[product.tag] !== undefined) {
      productsIncart[product.tag].inCart += parseInt(itemNo.innerHTML);
    } else {
      product.inCart = 1;
      productsIncart = { ...productsIncart, [product.tag]: product };
    }
    console.log("runing");
    localStorage.setItem("productKey", JSON.stringify(productsIncart));
  }
}

function addIncartNo() {
  let IncartNo;
  if (!localStorage.getItem("IncartNoKey")) {
    IncartNo = parseInt(itemNo.innerHTML);
    localStorage.setItem("IncartNoKey", JSON.stringify(IncartNo));
  } else {
    IncartNo =
      JSON.parse(localStorage.getItem("IncartNoKey")) +
      parseInt(itemNo.innerHTML);
    localStorage.setItem("IncartNoKey", JSON.stringify(IncartNo));
  }
  loadIncartNo();
}

function loadIncartNo() {
  const navIncart = document.querySelector(".in-cart");

  let IncartNo;
  if (!localStorage.getItem("IncartNoKey")) {
    IncartNo = 0;
  } else {
    IncartNo = JSON.parse(localStorage.getItem("IncartNoKey"));
  }
  navIncart.innerHTML = IncartNo;
  updateNavCart(IncartNo);
  deleteNavIncartItem();
}

function updateNavCart(IncartNo) {
  console.log("running");

  let tp = JSON.parse(localStorage.getItem("totalPriceKey"));

  if (JSON.parse(localStorage.getItem("IncartNoKey")) > 0) {
    const navCart = document.querySelector("#nav-cart");

    navCart.innerHTML = `

<div class="nav-shopping-cart show-or-hide">
  <div class="flex nav-cart">
    <div class='nav-cart-item'>
      
      
    </div>

    <div class="nav-cart-total">
      <p id='total'>Total: $${tp}</p>
    </div>
    <div class="flex nav-cart-bottom">
      <a href="cart.html" class="left">
        <span><i class="fas fa-eye"></i> View Cart</span>
      </a>
  
        <a href="checkout.html" class="right">
          <span><i class="far fa-check-circle"></i> Check Out</span>
        </a>

    </div>
  </div>
</div>
  `;

    const productItem = JSON.parse(localStorage.getItem("productKey"));
    console.log(productItem);
    const itemKey = Object.keys(productItem);
    const itemValue = Object.values(productItem);
    const navCartItem = document.querySelector(".nav-cart-item");
    let totalPrice = 0;
    for (let i = 0; i < itemKey.length; i++) {
      console.log(itemValue);
      navCartItem.innerHTML += `
    <div class="flex nav-incart">
    <div class="img">
      <img src="${itemValue[i].img}" alt="" />
    </div>

    <div class="description">
      <h3>${itemValue[i].name}</h3>
      <p>
        ${itemValue[i].inCart} <i class="fas fa-times"></i>
        <span class="color">$${itemValue[i].price}</span>
      </p>
    </div>
    <i class="fas fa-times delete"></i>
  </div>
    `;

      totalPrice +=
        parseFloat(itemValue[i].inCart) * parseFloat(itemValue[i].price);
      console.log(totalPrice);
      localStorage.setItem("totalPriceKey", JSON.stringify(totalPrice));
    }
    document.querySelector("#total").innerHTML = `
    Total: $${totalPrice}
    `;
  }
}
function deleteNavIncartItem() {
  let deleteItem = document.querySelectorAll(".delete");
  console.log(deleteItem);
  for (let i = 0; i < deleteItem.length; i++) {
    console.log("running");
    deleteItem[i].addEventListener("click", (e) => {
      console.log(i);
      let product = JSON.parse(localStorage.getItem("productKey"));
      let productKey = Object.keys(product);
      let productValue = Object.values(product);
      let target = productKey[i];
      let incartNo = JSON.parse(localStorage.getItem("IncartNoKey"));
      let totalPrice = JSON.parse(localStorage.getItem("totalPriceKey"));

      totalPrice = totalPrice - productValue[i].inCart * productValue[i].price;
      e.target.parentElement.remove();

      console.log(incartNo);
      console.log(productValue[i]);
      incartNo = incartNo - productValue[i].inCart;
      console.log(incartNo);
      console.log(product[target]);
      delete product[target];

      localStorage.setItem("IncartNoKey", JSON.stringify(incartNo));
      localStorage.setItem("productKey", JSON.stringify(product));
      localStorage.setItem("totalPriceKey", JSON.stringify(totalPrice));

      location.reload();
    });
  }
}
