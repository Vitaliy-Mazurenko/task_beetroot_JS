console.log("Script.js");
const cartCont = document.querySelector('.red-info');
const cartPrice = document.querySelector('#price');
const add = document.querySelector('.product-box__btn');
const itemBox = document.querySelectorAll('.product-box__item'); // блок каждого товара

function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on' + type, function () { handler.call(elem); });
  }
  return false;
}
for (var i = 0; i < itemBox.length; i++) {
  addEvent(itemBox[i].querySelector('.product-box__btn'), 'click', addToCart);
}

function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o) {
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}

function addToCart(e) {
  e.preventDefault();
  let cartData = getCartData() || [],
    parentBox = this.parentNode, // родительский элемент кнопки Добавить в корзину;
    itemQty = parentBox.querySelector('input'), // количество товара
    itemPrice = parseFloat(parentBox.querySelector('.price_item').innerHTML); // стоимость товара

  let temp = {};
  temp.price = itemPrice;
  temp.qty = itemQty.value || 1;
  let i = cartData.length;
  cartData[i] = temp;
  setCartData();
  let sum = 0;
  let itemsQty = 0;
  if (!setCartData(cartData)) {
    this.disabled = false;
    cartCont.innerHTML = 'Товар добавлен в корзину.';
    setTimeout(function () {
      for (let i = 0; i < cartData.length; i++) {
        itemsQty += +cartData[i].qty;
      }
      cartCont.innerHTML = itemsQty;
    }, 1000);
    for (let i = 0; i < cartData.length; i++) {
      sum += +cartData[i].price * cartData[i].qty;
    }
    cartPrice.innerHTML = sum;
  }

}
