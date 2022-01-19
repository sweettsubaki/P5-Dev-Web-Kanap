//-------Get ID from the API---------
let params = (new URL(document.location)).searchParams;
let productId = params.get("id");
console.log(productId);

let productFound = {
    iproductd: productId
};


function getProduct(url, id){
    fetch(url+id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then((value) => {
        console.log(value);
        displayKanap(value);
        addToCart();
        productFound = value;
    })
};


//----------Display dynamic couch card----------
function displayKanap(canape){

    //Article
    let newArticle = document.createElement("article");
    

    //DIV 4 IMG
    let divImg = document.createElement("div");
    divImg.classList.add("item__img");
    newArticle.appendChild(divImg);

        //IMG
        let img = document.createElement("img");
        img.setAttribute("src", canape.imageUrl);
        img.setAttribute("alt", canape.altText);
        divImg.appendChild(img);


    //DIV 4 Content
    let divContent = document.createElement("div");
    newArticle.appendChild(divContent);
    divContent.classList.add("item__content");

        //DIV 4 Price
        let divPrice = document.createElement("div");
        divContent.appendChild(divPrice);
        divPrice.classList.add("item__content__titlePrice");

            //h1 4 Product name
            let divPriceH1 = document.createElement("h1");
            divPrice.appendChild(divPriceH1);
            divPrice.id = "title";
            divPriceH1.innerText = canape.name;

            //span 4 price
            let divPricePSpan = document.createElement("span");
            divPrice.appendChild(divPricePSpan);
            divPricePSpan.id = "price";
            divPricePSpan.innerText = canape.price;


            //p for price span
            let divPriceP = document.createElement("p");
            divPrice.appendChild(divPriceP);
            divPriceP.innerHTML = "Prix :<span id='price'>"+ divPricePSpan.innerText +"</span> €";


        //DIV 4 Description
        let divDescription = document.createElement("div");
        divContent.appendChild(divDescription);
        divDescription.classList.add("item__content__description");

            //p 4 Description Title
            let divDescPTitle = document.createElement("p");
            divDescription.appendChild(divDescPTitle);
            divDescPTitle.classList.add("item__content__description__title");

            //p 4 Description
            let divDescP = document.createElement("p");
            divDescription.appendChild(divDescP);
            divDescP.id = "description";
            divDescP.innerText = canape.description;


        //DIV 4 Item Settings
        let divSetting = document.createElement("div");
        divContent.appendChild(divSetting);
        divSetting.classList.add("item__content__settings");

            //DIV 4 Item Color Settings            
            let divSettColor = document.createElement("div");
            divSetting.appendChild(divSettColor);
            divSettColor.classList.add("item__content__settings__color");

                //Div 4 Selection label
                let divSettCoLabel = document.createElement("label");
                divSettColor.appendChild(divSettCoLabel);
                divSettCoLabel.setAttribute("for","color-select");
                divSettCoLabel.innerText = "Choisir une couleur :";


                //DIV 4 Color selection
                let divSettCoSelect = document.createElement("select");
                divSettColor.appendChild(divSettCoSelect);
                divSettCoSelect.id = "colors";
                divSettCoSelect.setAttribute("name","color-select");

                    //DIV 4 Color Options
                    let divSettCoSelOption = document.createElement("option");
                    divSettCoSelect.appendChild(divSettCoSelOption);
                    divSettCoSelOption.setAttribute("value", canape.colors);
                    divSettCoSelOption.innerHTML = "--SVP, choisissez une couleur --";
                    /*for (let color of canape.colors){
                    let divSettCoSelOption = document.createElement("option");
                    divSettCoSelect.appendChild(divSettCoSelOption);
                    divSettCoSelOption.setAttribute("value", canape.colors);
                    divSettCoSelOption.innerHTML = canape.colors;
                    }*/
                canape.colors.forEach(color => {
                    let divSettCoSelOption = document.createElement("option");
                    divSettCoSelect.appendChild(divSettCoSelOption);
                    divSettCoSelOption.setAttribute("value", color);
                    divSettCoSelOption.innerHTML = color;
                    });

            //DIV Item Quantity Settings
            let divSettQuantity = document.createElement("div"); 
            divSetting.appendChild(divSettQuantity);
            divSettQuantity.classList.add("item__content__settings__quantity");

                //Label 4 quantity
                let divSettQuanLabel = document.createElement("label");
                divSettQuantity.appendChild(divSettQuanLabel);
                divSettQuanLabel.setAttribute("for","itemQuantity");
                divSettQuanLabel.innerText = "Nombre d'article(s) (1-100) :";

                //Input 4 quantity
                let divSettQuanInput = document.createElement("input");
                divSettQuantity.appendChild(divSettQuanInput);
                divSettQuanInput.setAttribute("type","number");
                divSettQuanInput.setAttribute("name", "itemQuantity");
                divSettQuanInput.setAttribute("min","1");
                divSettQuanInput.setAttribute("max", "100");
                divSettQuanInput.setAttribute("value", "0"),
                divSettQuanInput.setAttribute("id", "quantity");


        //DIV 4 ADD Button
        let divAdd = document.createElement("div");
        divContent.appendChild(divAdd);
        divAdd.classList.add("item__content__addButton");

            //Add Button
            let divAddButton = document.createElement("button");
            divAdd.appendChild(divAddButton);
            divAddButton.id = "addToCart";
            divAddButton.innerText = "Ajouter au panier";

    let newSection = document.querySelector('.item');
    newSection.appendChild(newArticle);
};




//----------------Add To Cart-------------------



//console.log(addToCartButton);


    //Which data are we adding to the cart ?
    let clickToAdd = {
        prodPic: displayKanap.imageUrl,
        prodAlt: displayKanap.altText,
        prodName: displayKanap.name,
        prodId: productId,
        //prodColor: colorSelection,
        //prodQuantity: quantitySelection,
        prodPrice: displayKanap.price
    };
    //console.log(clickToAdd);

    //Initializing local storage
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));


//Listen to cart (adding 2 conditions : more than 0 products and less than 100
function addToCart() {
    //Variable created for Color selection
   // let chosenColor = colorSelection.addToCart;
                    
//Variable created to gather the number of products in the cart
   // let quantityChoice = quantitySelection.addToCart;
//Bringing variables from displayKanap to use elsewhere
let colorSelection = document.getElementById("colors");
let quantitySelection = document.getElementById("quantity");
let addToCartButton = document.getElementById("addToCart");

    console.log(colorSelection.value);
    productFound.selectedColor = colorSelection.value;
    console.log(productFound);
        if (quantitySelection.value >= 0 && quantitySelection.value <=100){
            productFound.selectedQuantity = quantitySelection.value;
            console.log(productFound);

        }
        //Importation into local storage
        //if the cart has 1+ article
    /*if (localStorageProduct.length == 0) {
        const results = localStorageProduct.find((el) => el.ProdId === idProduct && el.prodColor === colorSelection);
        //if the ordered product is already in the cart
        if (results) {
            let newQuantity = parseInt(clickToAdd.prodQuantity) + parseInt(results.prodQuantity);
            results.prodQuantity = newQuantity;
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            console.table(localStorageProduct);
        // confirmationPopUp();
        //If the ordered product isn't in the cart 
        } else {
        localStorageProduct.push(clickToAdd);
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            console.table(localStorageProduct);
            //confirmationPopUp();
        //if the cart is empty
        }
    } else {
        localStorageProduct =[];
        localStorageProduct.push(clickToAdd);
        localStorage.setItem("product", JSON.stringify(localStorageProduct));
        console.table(localStorageProduct);
        // confirmationPopUp();
    }*/
};


//const addedToCart = document.getElementById("addToCart")
/*
addToCartButton.addEventListener("click", ()=>{
    });
    /*
console.log(localStorage);
*/
//----------------Added To Cart-----------------


getProduct("http://localhost:3000/api/products/", productId);
console.log(productFound);
