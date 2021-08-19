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
for (let i = 0; i < itemBox.length; i++) {
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


let btn = document.querySelector('.btn-check'), // Главная кнопка
  modal = document.querySelector('.modal'), // Модальное окно
  closeBtn = document.querySelector('.closeBtn'); // Кнопка, закрывающая модальное окно

// Открытие модального окна
btn.addEventListener('click', function () {
  modal.style.display = 'flex';
})

// Закрытие модального окна при клике на серую область
window.addEventListener('click', function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

function validate_form() {
  let contact_name = document.contact_form.name.value;
  let contact_email = document.contact_form.email.value;
  if (contact_name === '' || contact_name === ' ') {
    alert("Please enter a valid 'name'.");
  } else if (contact_email === '' || contact_email === ' ') {
    alert('Please enter email');
  } else {
    localStorage.clear();
    modal.style.display = "none";
    alert('Благодарим за покупки');
  }
  return false;
}

// фильтрация товаров
let items = document.querySelectorAll('.product-box__item');

function val() {
  d = document.getElementById('select_id').value;
  console.log(d);
  switch (d) {
    case '1':
      items.forEach(item => {
        if (item.classList.contains('breakfast')) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    case '2':
      items.forEach(item => {
        if (item.classList.contains('entree')) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    case '3':
      items.forEach(item => {
        if (item.classList.contains('garnish')) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    default:
      items.forEach(item => {
        item.style.display = 'block'
      })
  }
}

function valPrice() {
  c = document.getElementById('price-select').value;
  console.log(c);
  switch (c) {
    case '30':
      items.forEach(item => {
        if (item.getAttribute('data-id') < 30) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    case '50':
      items.forEach(item => {
        if (item.getAttribute('data-id') < 50) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    case '100':
      items.forEach(item => {
        if (item.getAttribute('data-id') < 100) {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
      break
    default:
      items.forEach(item => {
        item.style.display = 'block'
      })
  }
}

