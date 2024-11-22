let userInfo = document.querySelector(".user_info")
let username = document.querySelector("#username")
let links= document.querySelector(".links")
let SearchInput = document.querySelector("#SearchInput")
let searchType = document.querySelector(".searchType")
let searchedItems = document.querySelector(".searchedItems")
let viewProducts = document.querySelector(".viewProduct")
let favourite = localStorage.getItem("favourite") ? JSON.parse(localStorage.getItem("favourite")) : [];
let productsInCart = document.querySelector(".carts_products")
let badge = document.querySelector(".badge")
let AddedItem = localStorage.getItem("ChoosenProducts")? JSON.parse(localStorage.getItem("ChoosenProducts")): []


if(localStorage.getItem("username")){
    links.remove()
    userInfo.style.display = "flex"
    username.innerHTML = ("Welcome , " + (localStorage.getItem("username") + "❤️"))
}

let LogOutBtn = document.querySelector("#logout")
LogOutBtn.addEventListener("click", function(){
    localStorage.clear()
    setTimeout(()=>{
        window.location = "login.html"
    }, 1500)
})

let allProducts = document.querySelector(".products")
let products = [
    {
        Image: "imgs/laptopbag3.jpg",
        title :  "Backpack" ,
        Price: 300,
        Category: "Laptop Accessories",
        id: 1
    },
    {
        Image: "imgs/bag1.jpeg",
        title :  "Black bag" ,
        Price: 50,
        Category: "Laptop Accessories",
        id: 2
    },
    {
        Image: "imgs/laptop_bag2.jpg",
        title :  "Pink bag" ,
        Price: 30,
        Category: "Laptop Accessories",
        id: 3
    },
    {
        Image: "imgs/watch3.jpg",
        title :  "Apple watch" ,
        Price: 450,
        Category: "Smart watch",
        id: 4
    },
    {
        Image: "imgs/watch1.jpg",
        title :  "Samsung watch" ,
        Price: 250,
        Category: "Smart watch",
        id: 5
    },
    {
        Image: "imgs/watch2.webp",
        title :  "Huawei watch" ,
        Price: 150,
        Category: "Smart watch",
        id: 6
    },
    {
        Image: "imgs/cap2.jpg",
        title :  "Baseball cap" ,
        Price: 50,
        Category: "Original Cap",
        id: 7
    },
    {
        Image: "imgs/cap1.jpg",
        title :  "Sports cap" ,
        Price: 50,
        Category: "Original Cap",
        id: 8
    }
]

function drawProducts(SearchedProducts){
    let y = SearchedProducts.map((item)=> {
        return `
        <div class="card card-hover" style="width: 18rem; margin-right: 20px;">
            <img src="${item.Image}" class="card-img-top p-2 " style= "width: 250px; height: 250px;  "  alt="...">
            <div class="card-body " >
                <h5 class="card-title" style="font-weight: bold; font-size: 18px;">${item.title}</h5>
                <h5 class="card-title" style="font-weight: bold; font-size: 18px;">Price: ${item.Price} $</h5>
                <h6 class="card-title" style="font-weight: bold; font-size: 18px;">Category: ${item.Category}</h6>
                <div class="card-buttons">
                <button href="#" class="btn Addbtn btn btn-primary" id="AddBtn-${item.id}" onClick="AddToCart(${item.id})">Add To Cart</button>
                <button href="#" class="Removbtn btn btn-primary" id="RemovBtn-${item.id}" onClick="RemovallItemQuantity(${item.id})" style="display:none;">Remove From Cart</button>
                <i class="fas fa-heart fav addfav" id="addFav-${item.id}" onClick="AddFav(${item.id})"></i>
                <i class="fas fa-heart fav remofav" id="removeFav-${item.id}" onClick="RemovFav(${item.id})"></i>
                </div>
            </div>
        </div>
        `
    })
    .join("");
    searchedItems.innerHTML = y;
    SearchedProducts.forEach((item) => {
        const isInCart = AddedItem.some(cartItem => cartItem.id === item.id);
        ToggleCardButton(item.id, isInCart);
    });
}
// load all products initially
drawProducts(products)


if (AddedItem){
    AddedItem.map( item => {
        productsInCart.innerHTML +=  `
        <ul class="list-group item_row mt-2" >
            <li class="list-group-item d-flex justify-content-between align-items-center rounded" style="margin-bottom: 10px; background-color: #eee;">
                <span class="fw-bold ProductName" style="color: #025048;" >${item.title}</span>
                <span class="d-flex">
                <span class="pt-2" style="color: #025048;">${item.quantity}</span>
                <button type="button" onClick="AddToCart(${item.id})" class="quantity-right-plus btn  rounded">
                    <i class="fas fa-plus" style="color: green;font-size: 10px;"></i>
                </button>
                <button type="button" onClick="RemoveFromCart(${item.id})" class="quantity-left-minus btn  rounded">
                    <i class="fas fa-minus" style="color: red; font-size: 10px;" ></i>
                </button>
                </span>
            </li>
        </ul>
        `
    })
    badge.style.display = "block";
    badge.innerHTML = badge.innerHTML = AddedItem.reduce((total, item) => total + item.quantity, 0);
}

// if(viewProducts.innerHTML === "View all products"){
//     viewProducts.addEventListener("onclick" , function(){
//         window.location = "cart.html"
//     })
// }
function UpdateCartLink(){
    if (AddedItem.length === 0){
        badge.innerHTML = "0"
        viewProducts.innerHTML = "Cart Is Empty"
        viewProducts.onclick = (e) => e.preventDefault();
    }
    else{
        viewProducts.innerHTML = "View all products"
        viewProducts.onclick = () => {
            window.location = "cart.html"; // Redirect to cart.html
        };
    }
}
// initial state of cart
UpdateCartLink();

function AddToCart (id){
    if (localStorage.getItem("username")){

        let choosenItem = products.find((item) => item.id === id)
        let existingItem = AddedItem.find((item) => item.id === id)
        if(existingItem){
            existingItem.quantity += 1;
        } 
        else{
            choosenItem.quantity = 1;
            AddedItem=[...AddedItem , choosenItem]
        }
        UpdateCartLink();
        localStorage.setItem("ChoosenProducts" , JSON.stringify(AddedItem))
        drawCartProduct();
        ToggleCardButton(id , true)
        badge.style.display = "block";
        badge.innerHTML = AddedItem.reduce((total, item) => total + item.quantity, 0); // Total quantity in cart

    }
    else{
        window.location = "login.html"
    }
}

function drawCartProduct(){
    productsInCart.innerHTML = "";
    AddedItem.forEach((item) => {
        productsInCart.innerHTML +=  `
        <ul class="list-group item_row mt-2" >
            <li class="list-group-item d-flex justify-content-between align-items-center rounded" style="margin-bottom: 10px; background-color: #eee;">
                <span class="fw-bold ProductName" style="color: #025048;" >${item.title}</span>
                <span class="d-flex">
                <span class="pt-2"style="color: #025048;">${item.quantity}</span>
                <button type="button" onClick="AddToCart(${item.id})" class="quantity-right-plus btn  rounded">
                    <i class="fas fa-plus" style="color: green;font-size: 10px;"></i>
                </button>
                <button type="button" onClick="RemoveFromCart(${item.id})" class="quantity-left-minus btn  rounded">
                    <i class="fas fa-minus" style="color: red; font-size: 10px;" ></i>
                </button>
                </span>
            </li>
        </ul>
        `
    });
}
///////////filter Products//////////
function filterProducts(){
    let searchWord = SearchInput.value.toLowerCase();
    let searchBy = searchType.value; // name or category
    let filteredProducts = products.filter((item)=> {
        if (searchBy === "name"){
            return item.title.toLowerCase().includes(searchWord)
        }
        else if (searchBy === "category"){
            return item.Category.toLowerCase().includes(searchWord)
        }
        console.log(filteredProducts)
    });
    drawProducts(filteredProducts)
}
SearchInput.addEventListener("input", filterProducts);
searchType.addEventListener("change" ,filterProducts );
//////////////////////////////////////////////////////////////

function RemoveFromCart(id){
    let itemIndex = AddedItem.findIndex((item) => item.id === id)
    if(itemIndex !== -1){
        if(AddedItem[itemIndex].quantity > 1){
            AddedItem[itemIndex].quantity -= 1;
        }
        else{
            AddedItem.splice(itemIndex, 1);
        }
        localStorage.setItem("ChoosenProducts", JSON.stringify(AddedItem))
        drawCartProduct();
        // UpdateCartLink();
        badge.innerHTML = AddedItem.reduce((total, item) => total + item.quantity, 0); // Total quantity in cart

        if (AddedItem.length === 0){
            badge.innerHTML = "0"
            viewProducts.innerHTML = "Cart Is Empty"
            ToggleCardButton(id , false)
            viewProducts.onclick = (e) => e.preventDefault();
        }
        else{
            viewProducts.innerHTML = "View all products"
            viewProducts.onclick = () => {
                window.location = "cart.html"; // Redirect to cart.html
            };
        }
    }
}
function RemovallItemQuantity(id){
    let itemIndex = AddedItem.findIndex((item) => item.id === id)
    for(let i = AddedItem[itemIndex].quantity; i > 1; i--){
        AddedItem[itemIndex].quantity -= 1;
    }
    AddedItem.splice(itemIndex , 1)
    ToggleCardButton(id , false)
    localStorage.setItem("ChoosenProducts" , JSON.stringify(AddedItem))
    drawCartProduct();
    badge.innerHTML = AddedItem.reduce((total, item) => total + item.quantity, 0); // Total quantity in cart
    if (AddedItem.length === 0){
        badge.innerHTML = "0"
        viewProducts.innerHTML = "Cart Is Empty"
        viewProducts.onclick = (e) => e.preventDefault();
    }
    else{
        viewProducts.innerHTML = "View all products"
        viewProducts.onclick = () => {
            window.location = "cart.html"; // Redirect to cart.html
        };
    }
}

function ToggleCardButton(id , isAdded){
    let AddBtn = document.querySelector(`#AddBtn-${id}`)
    let RemovBtn = document.querySelector(`#RemovBtn-${id}`)
    if (isAdded){
        RemovBtn.style.display= "block"
        AddBtn.style.display= "none"
    }
    else{
        RemovBtn.style.display= "none"
        AddBtn.style.display= "block"
    }

}
function toggleFavIcon(id , IsFavourite){
    let addFavIcon = document.querySelector(`#addFav-${id}`)
    let removFavIcon = document.querySelector(`#removeFav-${id}`)
    if(IsFavourite){
        addFavIcon.style.display= "none"
        removFavIcon.style.display = "block"
    }
    else{
        addFavIcon.style.display= "block";
        removFavIcon.style.display = "none";
    }
}

function AddFav(id){
    if (localStorage.getItem("username")){
        let favItem = products.find((item) => item.id === id);
        favourite.push(favItem);
        toggleFavIcon(id , true)
        localStorage.setItem("favourite" , JSON.stringify(favourite))
        console.log(favourite)
    }
    else{
        window.location = "login.html"
    }

}

function RemovFav(id){
    if (localStorage.getItem("username")){
        let favIndex = favourite.findIndex((item) => item.id === id);
        favourite.splice(favIndex , 1);
        toggleFavIcon(id , false)
        localStorage.setItem("favourite" , JSON.stringify(favourite))
        console.log(favourite)
    }
    else{
        window.location = "login.html"
    }
}
// Function to restore favorite products on page load
function restoreFavoriteProducts() {
    if (favourite.length > 0) {
        favourite.forEach((item) => {
            toggleFavIcon(item.id, true); // Update UI to show the product as a favorite
        });
    }
}

// Call the function after the DOM is loaded
document.addEventListener("DOMContentLoaded", restoreFavoriteProducts);