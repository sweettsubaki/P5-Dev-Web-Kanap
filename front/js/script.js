fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        const prods = value;
        console.log(prods);
        for(let article of prods){

            let newA = document.createElement("a");
            newA.setAttribute("href",`product.html?id=${article._id}`);

            let newArticle = document.createElement("article");

            let newImg = document.createElement("img");
            newImg.setAttribute("src", article.imageUrl);
            newImg.setAttribute("alt", article.altTxt);
            newArticle.appendChild(newImg);

            let newH3 = document.createElement("h3");
            newH3.classList.add("productName");
            newH3.innerText = article.name;
            newArticle.appendChild(newH3);

            let newP = document.createElement("p");
            newP.classList.add("productDescription");
            newP.innerText = article.description;
            newArticle.appendChild(newP);

            newA.appendChild(newArticle);
            
            let ItemsList = document.getElementById("items");
            ItemsList.appendChild(newA);
        }

    });