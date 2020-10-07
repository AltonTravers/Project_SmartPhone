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
});

const navIncart = document.querySelector(".in-cart");

document.addEventListener("click", (e) => console.log(e.target));

function loadIncartNo() {
  let IncartNo;
  if (!localStorage.getItem("IncartNoKey")) {
    IncartNo = 0;
  } else {
    IncartNo = JSON.parse(localStorage.getItem("IncartNoKey"));
  }
  navIncart.innerHTML = IncartNo;
}
loadIncartNo();
