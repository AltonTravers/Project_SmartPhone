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
  loadIncartNo();
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
}
