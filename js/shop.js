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
}

loadIncartNo();
