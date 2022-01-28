    //Initializing local storage
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));


const anEmptyCart = document.getElementById("cart__items");

// Si le panier est vide
function getCart(){
    if (localStorageProduct == null || localStorageProduct == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        anEmptyCart.innerHTML = emptyCart;
    } else {
    for (let finalProduct in localStorageProduct){
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.classList.add("cart__item");
        productArticle.setAttribute('data-id', localStorageProduct[finalProduct].prodId);
    
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.classList.add("cart__item__img");
            
                let productImg = document.createElement("img");
                productDivImg.appendChild(productImg);
                productImg.src = localStorageProduct[finalProduct].prodPic;
                productImg.alt = localStorageProduct[finalProduct].prodAlt;
            
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.classList.add("cart__item__content");
        
                let productItemContentTitlePrice = document.createElement("div");
                productItemContent.appendChild(productItemContentTitlePrice);
                productItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
                
                    let productTitle = document.createElement("h2");
                    productItemContentTitlePrice.appendChild(productTitle);
                    productTitle.innerHTML = localStorageProduct[finalProduct].prodName;
                
                    let productColor = document.createElement("p");
                    productTitle.appendChild(productColor);
                    productColor.innerHTML = localStorageProduct[finalProduct].prodColor;
                    productColor.style.fontSize = "20px";
                
                    let productPrice = document.createElement("p");
                    productItemContentTitlePrice.appendChild(productPrice);
                    productPrice.innerHTML = localStorageProduct[finalProduct].prodPrice + " €";
        
                let productItemContentSettings = document.createElement("div");
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.classList.add("cart__item__content__settings");
            
                    let productItemContentSettingsQuantity = document.createElement("div");
                    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                    productItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                    
                        let productQte = document.createElement("p");
                        productItemContentSettingsQuantity.appendChild(productQte);
                        productQte.innerHTML = "Qté : ";
                    
                        let productQuantity = document.createElement("input");
                        productItemContentSettingsQuantity.appendChild(productQuantity);
                        productQuantity.value = localStorageProduct[finalProduct].prodQuantity;
                        productQuantity.classList.add("itemQuantity");
                        productQuantity.setAttribute("type", "number");
                        productQuantity.setAttribute("min", "1");
                        productQuantity.setAttribute("max", "100");
                        productQuantity.setAttribute("name", "itemQuantity");
            
                let productItemContentSettingsDelete = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsDelete);
                productItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            
                    let productSupprimer = document.createElement("p");
                    productItemContentSettingsDelete.appendChild(productSupprimer);
                    productSupprimer.classList.add("deleteItem");
                    productSupprimer.innerHTML = "Supprimer";
        }
    }
}
getCart();

//--------Function to total the prices
function calculateTotalPrice(){

    //retrieve how many products are added to the cart
    let itemQuantities = document.getElementsByClassName('itemQuantity');
    let quanLength = itemQuantities.length,
    quantityProducts = 0;

    for (let i = 0; i < quanLength; ++i) {
        totalQuantity += itemQuantities[i].valueAsNumber;
    }

    let totalProductQuantity = document.getElementById('totalQuantity');
    totalProductQuantity.innerHTML = totalQuantity;
    console.log(totalQuantity);

    //retrieving the resulting price
    totalPrice = 0;

    for (let i = 0; i < quanLength; ++i) {
        totalPrice += (itemQuantities[i].valueAsNumber * localStorageProduct[i].prodPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
calculateTotalPrice();


//Modifying how many products are in the cart
function modifyQuantity() {
    let itemQuantitiesModification = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < itemQuantitiesModification.length; k++){
        itemQuantitiesModification[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantitiesModification = localStorageProduct[k].prodQuantity;
            let modifiedQuantityValue = itemQuantitiesModification[k].valueAsNumber;
            
            const resultFind = localStorageProduct.find((el) => el.modifiedQuantityValue !== quantitiesModification);

            resultFind.prodQuantity = modifiedQuantityValue;
            localStorageProduct[k].prodQuantity = resultFind.prodQuantity;

            localStorage.setItem("product", JSON.stringify(localStorageProduct));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQuantity();


//Deleting an item
function deleteProduct() {
    let deleteItemButton = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < deleteItemButton.length; j++){
        deleteItemButton[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Select which item to delete 
            let deleteId = localStorageProduct[j].prodId;
            let deleteColor = localStorageProduct[j].prodColor;

            localStorageProduct = localStorageProduct.filter( el => el.prodId !== deleteId || el.prodColor !== deleteColor );
            
            localStorage.setItem("product", JSON.stringify(localStorageProduct));

            //confirms delete + refresh page
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

console.table(localStorageProduct);