// tour-images
const tourImages = document.querySelector(".tour-images");
if(tourImages){
    const swiper = new Swiper(".tour-images", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
}
// End tour-images

// alert-add-cart-susscess
const alertAddCartSusscess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-susscess]");
  if(elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
}
// End alert-add-cart-susscess

// Show product count for mini cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart){
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
showMiniCart();
// End show product count for mini cart

// Gio hang
const cart = localStorage.getItem("cart");
if(!cart){
  localStorage.setItem("cart", JSON.stringify([]));
}

const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart){
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    const quantity = parseInt(formAddToCart.quantity.value);

    if(tourId && quantity > 0){
      const cart = JSON.parse(localStorage.getItem("cart"));

      const existTour = cart.find(item => item.tourId == tourId);

      if(existTour){
        existTour.quantity = existTour.quantity + quantity;
      } else {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSusscess();

      showMiniCart();
    }

  })
}
// Het gio hang

// Delete product in cart
const deleteItemInCart = () => {
  const listButtonDelete = document.querySelectorAll("[btn-delete]");
  if(listButtonDelete.length > 0){
    listButtonDelete.forEach(button => {
      button.addEventListener("click", () => {
        const tourId = button.getAttribute("btn-delete");
        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter(item => item.tourId != tourId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload();
      })
    })
  }
}
// End delete product in cart

// Update quantity in cart
const updateQuantityItemInCart = () => {
  const listInputQuantity = document.querySelectorAll("input[name='quantity']");
  if(listInputQuantity.length > 0){
    listInputQuantity.forEach(input => {
      input.addEventListener("change", () => {
        const tourId = parseInt(input.getAttribute("item-id"));
        const quantity = parseInt(input.value);

        if(tourId && quantity > 0){
          const cart = JSON.parse(localStorage.getItem("cart"));
          const itemUpdate = cart.find(item => item.tourId == tourId);
          if(itemUpdate){
            itemUpdate.quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
          }
        }
      })
    })
  }
}
// End update quantity in cart

// Draw tour to cart
const tableCart = document.querySelector("[table-cart]");
if(tableCart){
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const htmlArray = data.tours.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>
            <img src="${item.image}" alt="${item.title}" width="80px" />
          </td>
          <td>
            <a href="/tours/detail/${item.slug}">${item.title}</a>
          </td>
          <td>
            ${item.price.toLocaleString()}đ
          </td>
          <td>
            <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
          </td>
          <td>
            ${item.total.toLocaleString()}đ
          </td>
          <td>
            <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
          </td>
        </tr>
      `);

      const tbody = tableCart.querySelector("tbody");
      tbody.innerHTML = htmlArray.join("");

      const totalPrice = document.querySelector("[total-price]");
      totalPrice.innerHTML = data.total.toLocaleString();

      deleteItemInCart();

      updateQuantityItemInCart();

    })
}
// End draw tour to cart

// Order tour
const formOrder = document.querySelector("[form-order]");
if(formOrder){
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart"));

    const dataFinal = {
      info: {
        fullName: formOrder.fullName.value,
        phone: formOrder.phone.value,
        note: formOrder.note.value
      },
      cart: cart
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataFinal)
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == 200){
        localStorage.setItem("cart", JSON.stringify([]));
        window.location.href = `/order/success/${data.orderCode}`;
      }
    })
  })
}
// End order tour