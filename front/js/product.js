//-------Get ID from the API---------
let params = (new URL(document.location)).searchParams;
let productId = params.get("id");
console.log(productId);

/*let productFound = {
};*/

//get the elements from the HTML
let colorSelection = document.getElementById("colors");
let quantitySelection = document.getElementById("quantity");
let addToCartButton = document.getElementById("addToCart");

function getProduct(url, id){
    fetch(url+id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then((value) => {
        if (value){
            displayKanap(value);
        }
        addToCartButton.addEventListener("click", (event)=>{
            addToCart(value);
        });
    })
};

//----------------Add To Cart-------------------
function displayKanap(canape){
    let img = document.createElement("img");
    img.setAttribute("src", canape.imageUrl);
    img.setAttribute("alt", canape.altTxt);    
    document.querySelector(".item__img").appendChild(img);


    let divPriceH1 = document.getElementById("title");
    divPriceH1.innerHTML = canape.name;

    let divPricePSpan = document.getElementById("price");
    divPricePSpan.innerHTML = canape.price;

    let divPDesc = document.getElementById('description');
    divPDesc.innerHTML = canape.description;

    let divSettCoSelOption = document.createElement("option");
    colorSelection.appendChild(divSettCoSelOption);
        divSettCoSelOption.setAttribute("value", canape.colors);
        divSettCoSelOption.innerHTML = "--SVP, choisissez une couleur --";
        canape.colors.forEach(color => {
            let divSettCoSelOption = document.createElement("option");
            colorSelection.appendChild(divSettCoSelOption);
            divSettCoSelOption.setAttribute("value", color);
            divSettCoSelOption.innerText = color;
        });
};
        
    //Initializing local storage
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));
    
//----------------Add To Cart-------------------
//Listen to cart (adding 2 conditions : more than 0 products and less than 100
function addToCart(canape) {
    
        //getting the color
        let choosenColor = colorSelection.value;
    
        //getting the quantity
        let quantityChoice = quantitySelection.value;

    //Which data are we adding to the cart ?
    let clickToAdd = {
        prodPic: canape.imageUrl,
        prodAlt: canape.altTxt,
        prodName: canape.name,
        prodId: productId,
        prodColor: choosenColor,
        prodQuantity: Number(quantityChoice),
        prodPrice: canape.price
    };
    console.log(clickToAdd);

    //Let's add a Confirmation popup 
    const confirmationPopup =() =>{
        if(window.confirm(`Votre commande de ${clickToAdd.prodQuantity} ${canape.name}(s) ${clickToAdd.prodColor} est ajoutée au panier. 
        Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //listening to the cart with the condition that it needs to be btw 0 & 100
        if (quantitySelection.value > 0 && quantitySelection.value <=100 && quantitySelection.value != 0){  
        //IF There's 1+ article in the cart
        //if (localStorageProduct) {
            const resultFind = localStorageProduct.find(
            (el) => el.productId == productId && el.prodColor == choosenColor);
            //IF the ordered product is already in the cart
            console.log(resultFind);
            if (resultFind) {
                let newQuantity = parseInt(clickToAdd.prodQuantity) + parseInt(resultFind.prodQuantity);
                resultFind.prodQuantity = newQuantity;
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.table(localStorageProduct);
                confirmationPopup();
            //IF the ordered product isn't in the cart 
            } else {
                localStorageProduct.push(clickToAdd);
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.table(localStorageProduct);
                confirmationPopup();
            }
        //if the cart is empty
        /*} else {
            localStorageProduct =[];
            localStorageProduct.push(clickToAdd);
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            console.table(localStorageProduct);
            confirmationPopup();
        }*/
    }
    
};


getProduct("http://localhost:3000/api/products/", productId);
console.log(localStorageProduct);
