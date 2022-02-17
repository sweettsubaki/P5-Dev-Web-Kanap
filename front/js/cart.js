//Initializing local storage
let localStorageProduct = JSON.parse(localStorage.getItem("product"));
console.table(localStorageProduct);


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
    let quanLength = itemQuantities.length;
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

//////////////////////////////////// FORM ///////////////////////////////////////////

//using Regex to create the form
function getForm() {
    // Add Regex
    let form = document.querySelector(".cart__order__form");

    //Creating expressions
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Listening to first name modification
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Listening to last name modification
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Listening to address modification
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Listening to city name modification
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Listening to email modification
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validating First name
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validating last name
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validating adress
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validating city name
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }

    //validating email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();

//Sending the client's info to local storage
function postForm(){
    const btnOrdering = document.getElementById("order");

    //Listening to the cart
    btnOrdering.addEventListener("click", (event)=>{
    
        //Gathering Form data
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //create an array within Local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].prodId);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
    }
};
postForm();