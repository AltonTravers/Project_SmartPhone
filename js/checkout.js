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

  $(".gallery-slideshow2 .slick2").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

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

const orderContent = document.querySelector(".order-content");
const product = JSON.parse(localStorage.getItem("productKey"));
const productKey = Object.keys(product);
const productValue = Object.values(product);

function loadOrderDetails() {
  let totalPrice = 0;
  for (let i = 0; i < productKey.length; i++) {
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
        `;
  if (JSON.parse(localStorage.getItem("IncartNoKey")) > 0) {
    const orderContentBody = document.querySelector(".order-content-body");

    for (let i = 0; i < productKey.length; i++) {
      orderContentBody.innerHTML += `
                <div class="order-product flex">
                    <div>${productValue[i].name} x ${
        productValue[i].inCart
      }</div>
                    <div>$${(
                      productValue[i].price * productValue[i].inCart
                    ).toFixed(2)}</div>
                </div>
                `;
    }
  }
}
loadOrderDetails();

const form = document.querySelector("#form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const streetAddress1 = document.querySelector("#streetAddress1");
const streetAddress2 = document.querySelector("#streetAddress2");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");

form.addEventListener("submit", (e) => {
  checkInvalid(e);
});
function checkInvalid(e) {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const streetAddress1Value = streetAddress1.value.trim();
  const phoneValue = phone.value.trim();
  const emailValue = email.value.trim();
  const warning = document.querySelector(".warning");

  let warningBox = ``;
  warning.innerHTML = ``;

  firstName.previousElementSibling.style.color = "unset";
  lastName.previousElementSibling.style.color = "unset";
  streetAddress1.previousElementSibling.style.color = "unset";
  phone.previousElementSibling.style.color = "unset";
  email.previousElementSibling.style.color = "unset";
  if (firstNameValue === "") {
    warningBox += `<p>Billing First name is a required field.</p>`;
    firstName.previousElementSibling.style.color = "#AA0000";
    e.preventDefault();
  } else if (/^[a-zA-Z]+$/.test(firstNameValue) === false) {
    warningBox += `<p>Invalid Billing First name.</p>`;
    e.preventDefault();
  } else {
    firstName.previousElementSibling.style.color = "#11d833";
  }
  if (lastNameValue === "") {
    warningBox += `<p>Billing Last name is a required field.</p>`;
    lastName.previousElementSibling.style.color = "#AA0000";
    e.preventDefault();
  } else if (/^[a-zA-Z]+$/.test(lastNameValue) === false) {
    warningBox += `<p>Invalid Billing Last name.</p>`;
    e.preventDefault();
  } else {
    lastName.previousElementSibling.style.color = "#11d833";
  }
  if (streetAddress1Value === "") {
    warningBox += `<p>Billing Street address is a required field.</p>`;
    streetAddress1.previousElementSibling.style.color = "#AA0000";
    e.preventDefault();
  } else {
    streetAddress1.previousElementSibling.style.color = "#11d833";
  }
  if (phoneValue === "") {
    warningBox += `<p>Billing Phone is a required field.</p>`;
    phone.previousElementSibling.style.color = "#AA0000";
    e.preventDefault();
  } else if (/^\d{8}$/.test(phoneValue) === false) {
    warningBox += `<p>Invalid Billing Phone.</p>`;
    e.preventDefault();
  } else {
    phone.previousElementSibling.style.color = "#11d833";
  }
  if (emailValue === "") {
    warningBox += `<p>Billing Email address is a required field.</p>`;
    email.previousElementSibling.style.color = "#AA0000";
    e.preventDefault();
  } else if (
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      emailValue
    ) === false
  ) {
    warningBox += `<p>Invalid Billing Email address.</p>`;
    e.preventDefault();
  } else {
    email.previousElementSibling.style.color = "#11d833";
  }

  if (warningBox !== ``) {
    warning.innerHTML = `
      <div class="invalid flex">
        <i class="fas fa-exclamation"></i>
        <div class="invalid-item">
          ${warningBox}
        </div>
      </div>
      `;
    window.scrollTo(0, 0);
  } else {
    if (
      confirm(
        "Thanks for visiting my website! Do you want to leave this page?"
      ) === true
    ) {
      setTimeout(() => {
        window.location.assign("https://www.youtube.com/");
      }, 1000);
      console.log("true");
    } else {
      console.log("false");
    }
  }

  e.preventDefault();
}
