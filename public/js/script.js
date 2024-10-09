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
        existTour.quantity += quantity;
      } else {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    }

  })
}
// Het gio hang