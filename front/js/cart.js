//Initializing local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));
console.table(localStorageProduct);
const anEmptyCart = document.getElementById("cart__items");

// Si le panier est vide
function getCart(){
    if (localStorageProduct === null || localStorageProduct == 0) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        anEmptyCart.innerHTML = emptyCart;
    } else {
    for (let finalProduct in localStorageProduct){
        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.classList.add("cart__item");
        productArticle.setAttribute('data-id', localStorageProduct[finalProduct].prodId);
    
            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.classList.add("cart__item__img");
            
                // Insertion de l'image
                let productImg = document.createElement("img");
                productDivImg.appendChild(productImg);
                productImg.src = localStorageProduct[product].prodPic;
                productImg.alt = localStorageProduct[product].prodAlt;
            
            // Insertion de l'élément "div"
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.classList.add("cart__item__content");
        
                // Insertion de l'élément "div"
                let productItemContentTitlePrice = document.createElement("div");
                productItemContent.appendChild(productItemContentTitlePrice);
                productItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
                
                    // Insertion du titre h2
                    let productTitle = document.createElement("h2");
                    productItemContentTitlePrice.appendChild(productTitle);
                    productTitle.innerHTML = localStorageProduct[product].prodName;
                
                    // Insertion de la couleur
                    let productColor = document.createElement("p");
                    productTitle.appendChild(productColor);
                    productColor.innerHTML = localStorageProduct[product].prodColor;
                    productColor.style.fontSize = "20px";
                
                    // Insertion du prix
                    let productPrice = document.createElement("p");
                    productItemContentTitlePrice.appendChild(productPrice);
                    productPrice.innerHTML = localStorageProduct[product].prodPrice + " €";
        
                // Insertion de l'élément "div"
                let productItemContentSettings = document.createElement("div");
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.classList.add("cart__item__content__settings");
            
                    // Insertion de l'élément "div"
                    let productItemContentSettingsQuantity = document.createElement("div");
                    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                    productItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                    
                        // Insertion de "Qté : "
                        let productQte = document.createElement("p");
                        productItemContentSettingsQuantity.appendChild(productQte);
                        productQte.innerHTML = "Qté : ";
                    
                        // Insertion de la quantité
                        let productQuantity = document.createElement("input");
                        productItemContentSettingsQuantity.appendChild(productQuantity);
                        productQuantity.value = localStorageProduct[product].prodQuantity;
                        productQuantity.classList.add("itemQuantity");
                        productQuantity.setAttribute("type", "number");
                        productQuantity.setAttribute("min", "1");
                        productQuantity.setAttribute("max", "100");
                        productQuantity.setAttribute("name", "itemQuantity");
            
                // Insertion de l'élément "div"
                let productItemContentSettingsDelete = document.createElement("div");
                productItemContentSettings.appendChild(productItemContentSettingsDelete);
                productItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            
                    // Insertion de "p" supprimer
                    let productSupprimer = document.createElement("p");
                    productItemContentSettingsDelete.appendChild(productSupprimer);
                    productSupprimer.classList.add("deleteItem");
                    productSupprimer.innerHTML = "Supprimer";
    }
    }}
    getCart();