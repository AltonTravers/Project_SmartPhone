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