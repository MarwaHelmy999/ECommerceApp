let emptyCart = document.querySelector(".empty")
let favsection = document.querySelector(".fav-section")
let AddFavourite = document.querySelector(".swiper-wrapper")
let favourite = JSON.parse(localStorage.getItem("favourite"))

document.addEventListener("DOMContentLoaded", function () {
    let LogOutBtn = document.querySelector("#logout");
    LogOutBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        localStorage.clear(); 
        setTimeout(() => {
            window.location = "login.html"; 
        }, 1500);
    });
});

let cartProducts = localStorage.getItem("ChoosenProducts")
let allProducts = document.querySelector(".AllProducts")
let items = JSON.parse(cartProducts)

function drawCartProducts(items){
    CalcTotalPrice()
    let y = items.map((item)=> {
        return `
        <div class="col-12 col-md-6 card-margin" >
            <div class="card mb-3 me-md-3 " style="max-width: 540px; ">
              <div class="row g-0 ">
                <div class="col-md-4">
                  <img src="${item.Image}" class="img-fluid rounded-start h-100 p-2" alt="...">
                </div>
                <div class="col-md-8 ">
                  <div class="card-body ">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-title">Price: ${item.Price} $</h5>
                    <h5 class="card-title">Category: ${item.Category}</h5>
                    <span class="d-flex">
                      <button type="button" onClick="AddToCart(${item.id})" class="quantity-right-plus btn rounded">
                        <i class="fas fa-plus" style="color: green;font-size: 10px;"></i>
                      </button>
                      <span class="pt-2" style="color: #025048;">${item.quantity}</span>
                      <button type="button" onClick="RemoveFromCart(${item.id})" class="quantity-left-minus btn rounded">
                        <i class="fas fa-minus" style="color: red; font-size: 10px;"></i>
                      </button>
                    </span>
                      <button href="#" class="Removbtn btn btn-primary" id="RemovBtn-${item.id}" onClick="RemovallItemQuantity(${item.id})" >Remove From Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    })
    .join("")
    allProducts.innerHTML = y;
}

drawCartProducts(items)

function EmptyCart(){
  if(items.length === 0){
    allProducts.style.display = "none"
    emptyCart.style.display = "block"
  }
}


function CalcTotalPrice(){
  let totalPrice = items.reduce((total , item) =>{
    return total + item.Price * item.quantity;
  } , 0)
  document.querySelector(".price").textContent = `Total Price: ${totalPrice}$`
  console.log(totalPrice)
  return totalPrice;
} 

function AddToCart(id){
  let existingItem = items.find((item) => item.id === id)

  if(existingItem){
      existingItem.quantity += 1;
  } 
  localStorage.setItem("ChoosenProducts" , JSON.stringify(items))
  drawCartProducts(items)
  EmptyCart();
  CalcTotalPrice()

}
function RemoveFromCart(id){
  let itemIndex = items.findIndex((item) => item.id === id)
  if(itemIndex !== -1){
      if(items[itemIndex].quantity > 1){
        items[itemIndex].quantity -= 1;
      }
      else{
        items.splice(itemIndex, 1);
      }
      localStorage.setItem("ChoosenProducts", JSON.stringify(items))
      drawCartProducts(items);
      EmptyCart();
      CalcTotalPrice()
  }
}

function RemovallItemQuantity(id){
  let itemIndex = items.findIndex((item) => item.id === id)
  for(let i = items[itemIndex].quantity; i > 1; i--){
    items[itemIndex].quantity -= 1;
  }
  items.splice(itemIndex , 1)
  localStorage.setItem("ChoosenProducts" , JSON.stringify(items))
  drawCartProducts(items);
  EmptyCart();
  CalcTotalPrice()
}

function drawFavourite(favourite){
  if(favourite.length==0){
    favsection.style.display = "none"
  }
  else{
    favsection.style.display = "block"
    let y = favourite.map((item)=> {
      return `
      <div class="card swiper-slide productItem card-hover" style="width: 18rem; margin-right: 20px;">
            <img src="${item.Image}" class="card-img-top p-3 " style= "width: 100%; height: 250px;  "  alt="...">
            <div class="card-body  >
                  <h5 class="card-title" style="font-weight: bold; font-size: 18px;">${item.title}</h5>
                  <h6 class="card-title" style="font-weight: bold; font-size: 18px;">Category: ${item.Category}</h6>
                <div class="FavoIcon">
                  <i class="fas fa-heart fav remofav" id="RemFav-${item.id}" onClick="RemFav(${item.id})"></i>
                </div>
            </div>
        </div>
      `
    })
    .join("")
    AddFavourite.innerHTML = y;
  } 
}
drawFavourite(favourite)

function RemFav(id){
  let itemIndex = favourite.findIndex((item) => item.id === id);
  favourite.splice(itemIndex , 1)
  localStorage.setItem("favourite" , JSON.stringify(favourite))
  drawFavourite(favourite)

}
