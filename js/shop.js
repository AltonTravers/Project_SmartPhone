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
  $(".nav-cart-icon, #nav-cart").hover(
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
});
let products = [
  {
    name: "Charocal Black",
    tag: "charocalblack",
    price: 42.0,
    inCart: 0,
    img: "./images/blackproduct-2.jpg",
  },
  {
    name: "Golden Sunset",
    tag: "goldensunset",
    price: 25.5,
    inCart: 0,
    img: "./images/goldproduct-1.jpg",
  },
  {
    name: "Light Pink",
    tag: "lightpink",
    price: 25.5,
    inCart: 0,
    img: "./images/pinkproduct-1.jpg",
  },
  {
    name: "Mint Green",
    tag: "mintgreen",
    price: 25.5,
    inCart: 0,
    img: "./images/greenproduct-1.jpg",
  },
];

const addToClass = document.querySelectorAll(".add-to-class");
for (let i = 0; i < addToClass.length; i++) {
  addToClass[i].addEventListener("click", (e) => {
    addItemTocart(products[i]);
    addIncartNo();
    // updateNavCart();
    e.preventDefault();
  });
}

function addItemTocart(product) {
  if (!localStorage.getItem("productKey")) {
    let productsIncart;
    product.inCart = 1;
    productsIncart = { [product.tag]: product };
    localStorage.setItem("productKey", JSON.stringify(productsIncart));
  } else {
    let productsIncart;
    productsIncart = JSON.parse(localStorage.getItem("productKey"));
    if (productsIncart[product.tag] !== undefined) {
      productsIncart[product.tag].inCart += 1;
    } else {
      product.inCart = 1;
      productsIncart = { ...productsIncart, [product.tag]: product };
    }
    localStorage.setItem("productKey", JSON.stringify(productsIncart));
  }
}

function addIncartNo() {
  let IncartNo;
  if (!localStorage.getItem("IncartNoKey")) {
    IncartNo = 1;
    localStorage.setItem("IncartNoKey", JSON.stringify(IncartNo));
  } else {
    IncartNo = JSON.parse(localStorage.getItem("IncartNoKey")) + 1;
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
      <div class="right">
        <span><i class="far fa-check-circle"></i> Check Out</span>
      </div>
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
loadIncartNo();
