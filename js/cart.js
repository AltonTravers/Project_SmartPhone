$(() => {
  // scrolled Navbar
  $(document).scroll(function () {
    const nav = $(".navbar");
    const shopNav = $(".shop-navbar");
    nav.toggleClass("navbar-dark", $(this).scrollTop() > nav.height());
    shopNav.toggleClass("navbar-dark", $(this).scrollTop() > shopNav.height());
  });

  // slide show
  $(".gallery-slideshow .slick").slick({ dots: true });

  $(".gallery-slideshow .slick").slickLightbox();

  $(".review-slick").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

  hoverTimeout = setTimeout(function () {
    $(".nav-shopping-cart").addClass("show-or-hide");
  }, 1000);
  $(".nav-cart-icon, .nav-shopping-cart").hover(
    function () {
      clearTimeout(hoverTimeout);
      $(".nav-shopping-cart").removeClass("show-or-hide");
    },
    function () {
      hoverTimeout = setTimeout(function () {
        $(".nav-shopping-cart").addClass("show-or-hide");
      }, 1000);
    }
  );
  $(".fa-bars").click(function () {
    $(".hamburger-menu-ul").toggleClass("closed");
  });
});

document.addEventListener("click", (e) => {
  console.log(e.target);
});

const cartContainer = document.querySelector(".cart-container");

function loadCartContent() {
  if (
    !localStorage.getItem("productKey") ||
    localStorage.getItem("productKey") == "{}"
  ) {
    cartContainer.innerHTML = `
        <div class="empty flex">
        <div class="left">
          <i class="far fa-compass "></i>
        </div>
        <div class="right">
            <h3>CART IS EMPTY</h3>
            <p>Looks like there is no items in your cart.</p>
        </div>
    </div>
    <div class="empty-word">
      <h2>
          Your cart is 
      </h2>
      <h1>CURRENTLY</h1>
      <h1>EMPTY</h1>
    </div>
        `;
  } else {
    let inCartItem = JSON.parse(localStorage.getItem("productKey"));
    console.log(inCartItem);
    const itemKeys = Object.keys(inCartItem);
    const itemValues = Object.values(inCartItem);
    console.log(itemValues);

    cartContainer.innerHTML = `
        <div class="cart-content flex">
            <div class="cart-header">
                <div class="cart-grid">
                    <div></div>
                    <div></div>
                    <div><p>Product</p></div>
                    <div>
                        Price
                    </div>
                    <div>
                    Quantity
                    </div>
                    <div>
                    Subtotal
                    </div>
                </div>
            </div>
            <div class="cart-body">
            </div>
        </div>
  
        `;
    for (let i = 0; i < itemKeys.length; i++) {
      const cartBody = document.querySelector(".cart-body");
      cartBody.innerHTML += `
 
              <div class="cart-grid">
                  <div class="remove-item">
                      <i class="fas fa-times"></i>
                  </div>
                  <div class="cart-product-img"><img src="${
                    itemValues[i].img
                  }" alt=""></div>
                  <div>${itemValues[i].name}</div>
                  <div>$<span class='item-price'>${itemValues[i].price.toFixed(
                    2
                  )}</span></div>
                  <div class="no-of-product">
                      <span class="add-item-no"><i class="fas fa-arrow-up"></i></span>
                      <span class="item-no">${itemValues[i].inCart}</span>
                      <span class="deduct-item-no"
                        ><i class="fas fa-arrow-down"></i
                      ></span>
                    </div>
                  <div>$<span class='sub-total'>${(
                    itemValues[i].price * itemValues[i].inCart
                  ).toFixed(2)}</span></div>
              </div>
        </div>
    </div>

        `;
      const phoneCart = document.querySelector('.phone-cart');
      phoneCart.innerHTML += `
      <div class="card-phone">
      <div class="remove-item">
        <i class="fas fa-times"></i>
      </div>
      <div class="flex phone-cart-product">
        <h3>Product:</h3>
        <h3>${itemValues[i].name}</h3>
      </div>
      <div class="flex phone-cart-price">
        <h3>Price:</h3>
        <h3>$${itemValues[i].price.toFixed(
          2
        )}</h3>
      </div>
      <div class="flex phone-cart-quantity">
        <h3>Quantity:</h3>
        <div class="no-of-product">
          <span class="add-item-no"><i class="fas fa-arrow-up"></i></span>
          <span class="item-no">${itemValues[i].inCart}</span>
          <span class="deduct-item-no"
            ><i class="fas fa-arrow-down"></i
          ></span>
        </div>
      </div>
    </div>

      `
    }
    let totalPrice = 0;
    for (let i = 0; i < itemKeys.length; i++) {
      totalPrice += itemValues[i].price * itemValues[i].inCart;
    }
    console.log(totalPrice);
    cartContainer.innerHTML += `
    <div class="cart-total flex">
    <div class="left"></div>
    <div class="right">
        <h2>Cart Total</h2>
        <div class="grid-2">
            <div>Total</div>
            <div>$<span class='total-price'>${totalPrice.toFixed(2)}</div>
            </span></div>
        <div class="check-out">
            <a href="#" class="btn">PROCEED TO CHECKOUT</a>
        </div>
    </div>
</div> 
    `;
  }
}

loadCartContent();
loadIncartNo();

let addItemQuantity = document.querySelectorAll(".add-item-no");
let deductItemQuantity = document.querySelectorAll(".deduct-item-no");
let itemQuantity = document.querySelectorAll(".item-no");
let subtotal = document.querySelectorAll(".sub-total");
let itemPrice = document.querySelectorAll(".item-price");
let deleteItem = document.querySelectorAll(".fa-times");

for (let i = 0; i < addItemQuantity.length; i++) {
  disableAddDeduct(i);
  addItemQuantity[i].addEventListener("click", (e) => {
    addQuantity(i);
    updateSubtotal(i);
    updateTotal();
    disableAddDeduct(i);
    loadIncartNo();
  });
}

for (let i = 0; i < deductItemQuantity.length; i++) {
  disableAddDeduct(i);
  deductItemQuantity[i].addEventListener("click", (e) => {
    deductQuantity(i);
    updateSubtotal(i);
    updateTotal();
    disableAddDeduct(i);
    loadIncartNo();
  });
}

for (let i = 0; i < deleteItem.length; i++) {
  deleteItem[i].addEventListener("click", (e) => {
    console.log(i);
    deleteItemIncart(i);
    location.reload();
    loadCartContent();

    loadIncartNo();
  });
}

// deleteItem.forEach(self, (i) => {
//   self.addEventListener("click", (e) => {
//     console.log(i);
//     deleteItemIncart(i);
//     loadCartContent();
//     loadIncartNo();
//   });
// });

function addQuantity(i) {
  let inCartItem = JSON.parse(localStorage.getItem("productKey"));
  let inCartTotal = JSON.parse(localStorage.getItem("IncartNoKey"));
  let itemValues = Object.values(inCartItem);
  if (itemValues[i].inCart < 10) {
    itemValues[i].inCart += 1;
    itemQuantity[i].innerHTML = itemValues[i].inCart;
    localStorage.setItem("productKey", JSON.stringify(inCartItem));
    inCartTotal += 1;
    localStorage.setItem("IncartNoKey", JSON.stringify(inCartTotal));
  } else if (itemValues[i].inCart == 10) {
    addItemQuantity[i].style.background = "#d9d9d9";
  }
}

function deductQuantity(i) {
  let inCartItem = JSON.parse(localStorage.getItem("productKey"));
  let inCartTotal = JSON.parse(localStorage.getItem("IncartNoKey"));
  let itemValues = Object.values(inCartItem);
  if (itemValues[i].inCart > 0) {
    itemValues[i].inCart -= 1;
    itemQuantity[i].innerHTML = itemValues[i].inCart;
    localStorage.setItem("productKey", JSON.stringify(inCartItem));
    inCartTotal -= 1;
    localStorage.setItem("IncartNoKey", JSON.stringify(inCartTotal));
  } else if (itemValues[i].inCart == 0) {
    deductItemQuantity[i].style.background = "#d9d9d9";
  }
}

function updateSubtotal(i) {
  subtotal[i].innerHTML = (
    parseFloat(itemPrice[i].innerHTML) * parseFloat(itemQuantity[i].innerHTML)
  ).toFixed(2);
}

function updateTotal() {
  let inCartItem = JSON.parse(localStorage.getItem("productKey"));
  const itemKeys = Object.keys(inCartItem);
  const itemValues = Object.values(inCartItem);
  let totalPrice = 0;
  for (let i = 0; i < itemKeys.length; i++) {
    totalPrice += itemValues[i].price * itemValues[i].inCart;
  }
  document.querySelector(".total-price").innerHTML = totalPrice.toFixed(2);
}
function disableAddDeduct(i) {
  let numberOfItem = parseInt(itemQuantity[i].innerHTML);
  if (numberOfItem === 0) {
    deductItemQuantity[i].style.background = "#d9d9d9";
  } else if (numberOfItem === 10) {
    addItemQuantity[i].style.background = "#d9d9d9";
    console.log("running");
  } else {
    addItemQuantity[i].style.background = "#f2f2f2";
    deductItemQuantity[i].style.background = "#f2f2f2";
  }
}

function deleteItemIncart(i) {
  let inCartItem = JSON.parse(localStorage.getItem("productKey"));
  let itemKeys = Object.keys(inCartItem);
  let productName = itemKeys[i];
  let quantityDeleted = inCartItem[productName].inCart;
  let incartNo = JSON.parse(localStorage.getItem("IncartNoKey"));
  incartNo -= quantityDeleted;

  delete inCartItem[productName];
  console.log(quantityDeleted);
  localStorage.setItem("productKey", JSON.stringify(inCartItem));
  localStorage.setItem("IncartNoKey", JSON.stringify(incartNo));
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
}
