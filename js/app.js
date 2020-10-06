$(() => {
  // scrolled Navbar
  $(document).scroll(function () {
    const nav = $(".navbar");
    nav.toggleClass("navbar-dark", $(this).scrollTop() > nav.height());
  });

  // slide show
  $(".gallery-slideshow .slick").slick({ dots: true });

  $(".gallery-slideshow .slick").slickLightbox();
});
