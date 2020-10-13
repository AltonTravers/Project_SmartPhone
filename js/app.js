$(() => {
  // scrolled Navbar
  $(document).scroll(function () {
    const nav = $(".navbar");
    const shopNav = $(".shop-navbar");
    nav.toggleClass("navbar-dark", $(this).scrollTop() > nav.height() / 2);
    shopNav.toggleClass("navbar-dark", $(this).scrollTop() > shopNav.height());
  });

  // slide show
  $(".gallery-slideshow1 .slick1").slick({ dots: true });

  $(".gallery-slideshow1 .slick1").slickLightbox();

  $(".gallery-slideshow2 .slick2").slick({ dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true });

  $(".gallery-slideshow2 .slick2").slickLightbox();

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
const navIncart = document.querySelector(".in-cart");

document.addEventListener("click", (e) => console.log(e.target));

function updateNavCart() {
  const tp = JSON.parse(localStorage.getItem("totalPriceKey"));

  if (JSON.parse(localStorage.getItem("IncartNoKey")) > 0) {
    const navCart = document.querySelector("#nav-cart");

    navCart.innerHTML = `

<div class="nav-shopping-cart show-or-hide">
  <div class="flex nav-cart">
    <div class='nav-cart-item'>
      
      
    </div>

    <div class="nav-cart-total">
      <p>Total: $${tp}</p>
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
  }
}

function deleteNavIncartItem() {
  const deleteItem = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteItem.length; i++) {
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
      delete product[target];

      localStorage.setItem("IncartNoKey", JSON.stringify(incartNo));
      localStorage.setItem("productKey", JSON.stringify(product));
      localStorage.setItem("totalPriceKey", JSON.stringify(totalPrice));

      location.reload();
    });
  }
}

function loadIncartNo() {
  let IncartNo;
  if (!localStorage.getItem("IncartNoKey")) {
    IncartNo = 0;
  } else {
    IncartNo = JSON.parse(localStorage.getItem("IncartNoKey"));
  }
  navIncart.innerHTML = IncartNo;

  updateNavCart(IncartNo);
}
loadIncartNo();
deleteNavIncartItem();
// document.addEventListener("click", (e) => updateNavCart());
