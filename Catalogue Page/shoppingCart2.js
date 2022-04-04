//need a function that is going to check if there are items in the server
//if there are no items, need to initialise the values of the items in the server
//or else we can assume that there are items
//need a var where we are going to store the drinks(beverages)
//we use JSON stringify because we are going to turn the objects in the array to strings in the server
let menuItems = [];
function pageLoad() {
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    sessionStorage.getItem("menuItems");
  }
}

//first we want to add items in the cartList.
//so for that we are going to need a button that adds items to the cartList
//But before that we need a function that creates the items(objects) that are going to be in the list
//Below is the function constructor that is going to create some drinks
function drinkCreator(drink) {
  this.drink = drink;
}

//now we are going to create a function that adds the drink to the cartList and stores the object in the array
//when the button is clicked, it adds the drink to the cartList
//since we are creating objects, we need to use parse so it can return to us an object, so that later we can use JSON stringify to turn array of objects back in as a string in teh server
let total = 0;
let drinks = "Drink";
let drinkPrice = 79; //this variable represents all prices of the drinks
function addDrink() {
  menuItems = JSON.parse(sessionStorage.getItem("menuItems"));

  let newDrink = new drinkCreator(drinks);

  //when the object is created, so is its price, added to the server and alert the price
  total += drinkPrice;
  sessionStorage.setItem("total", total);
  alert(total);

  menuItems.push(newDrink);
  //want to ouput added element in the array
  sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
}

//FOOD FUNCTION & CREATOR
let food = "Food";
let foodPrice = 349; //this variable represents all prices of the food
function addFood() {
  menuItems = JSON.parse(sessionStorage.getItem("menuItems"));

  let newFood = new drinkCreator(food);

  //when the object is created, so is its price, added to the server and alert the price
  total += foodPrice;
  sessionStorage.setItem("total", total);
  alert(total);

  menuItems.push(newFood);
  //want to ouput added element in the array
  sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
}



//DESSERT FUNCTION & CREATOR
let dessert = "Dessert";
let dessertPrice = 199; //this variable represents all prices of the drinks
function addDessert() {
  menuItems = JSON.parse(sessionStorage.getItem("menuItems"));

  let newDessert = new drinkCreator(dessert);

  //when the object is created, so is its price, added to the server and alert the price
  total += dessertPrice;
  sessionStorage.setItem("total", total);
  alert(total);

  menuItems.push(newDessert);
  //want to ouput added element in the array
  sessionStorage.setItem("menuItems", JSON.stringify(menuItems));
}

//we now create a function that is going to retrieve the total price from the server and display it in the input box
//must include vat, which is 15%(0.15)
//select the input and its value
//value is the value in the server
function totalReveal() {
  let priceDisplay = document.getElementById("totalPrice");
  let vat = 0.15 * sessionStorage.getItem("total");
  priceDisplay.value = parseInt(sessionStorage.getItem("total")) + vat;
}
totalReveal();

//displaying all the items that are added in the list
menuItems = JSON.parse(sessionStorage.getItem("menuItems"));
//for each item we create a list element and add item to the list
for (let x = 0; x < menuItems.length; x++) {
  console.log(menuItems[x].drink);
  let select = document.getElementById("cartItems");
  let option = document.createElement("option");
  option.innerHTML = menuItems[x].drink;
  select.appendChild(option);
}


//when the delivery option is chosen, a certain discount is applied
//if delivery option is more than 100KM, 25 dollars/rands off
//if delivery option is less than 100KM, 15 dollars/rands off
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("totalPrice");
let deliveryOption = document.getElementById("delivery-options")
function Discount(){
    deliveryOption.onchange = function(){
        if(deliveryOption.value === "more_than"){
            discount.value = totalPrice.value - 25;
        }
        else{
            discount.value = totalPrice.value - 15;
        }
    }
    
    
}
Discount();


//create a confirm box that lets user confirm their order and alert that the order was successful
//when button is clicked, the confirmation is run
//if the user confirms their order(clicks okay), they get notified that they have purchased the item and get a generated number
//or else its alerted that their order was cancelled
function confirmOrder(){
    let confirmation = confirm("confirm your purchase");
    //going to generate a random number between 1 and 1000
    let randomRefNum = Math.floor((Math.random() * 1000) + 1);

    if(confirmation === true){
      alert("Thank you for your purchase. Your item(s) will be delivered to you soon.")
      alert("Reference Number:" + randomRefNum);
}
else{
    alert("your order was cancelled")
}
}

//below we will use jquery to show/hide the discount coupon based on the collection type the user selected
//if the user wants to collect their own item, no discount is given and discount is therefore hidden
//if the user wants their item deliverd, then the discount is shown, with the discount price
let collection = document.getElementById("collection");
let coupon = discount;
coupon.style.display = "none";

let discountLabel = document.getElementById("discountLabel");
discountLabel.style.display = "none";

$(document).ready(function(){
    $("#collection").change(function(){
        if(collection.value === "deliver"){
            $("#discount").show();
            $("#discountLabel").show();
        }
        else if(collection.value === "collect"){
        $("#discount").hide();
        $("#discountLabel").hide();
        }
    })
})
