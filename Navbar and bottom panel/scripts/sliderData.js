const appendData = (data,parent,cartFun) => {
    data.forEach((elem) => {
        let image = document.createElement("img");
        image.src = elem.Img_url;
        image.alt = "This product image is not loading right now"

        let img_div = document.createElement("div");
        img_div.className = "ga_img_div"

        let name = document.createElement("h4");
        name.textContent = elem.Name;
        name.id = "ga_name";

        let cart_button = document.createElement("button")
        cart_button.textContent = "ADD TO CART";
        cart_button.id = "ga_addToCart"
        cart_button.addEventListener("click", () => {
            cartFun(elem);
            alert(`Added > ${elem.Name} < to the Cart`);
        })

        img_div.addEventListener("mouseover", () => {
            image.src = elem.Img_url;
            image.style.opacity = "0.4";
            cart_button.style.display = "block"
            // image.style.width = "90%"
        })

        img_div.addEventListener("mouseout", () => {
            image.src = elem.Img_url;
            image.style.opacity = "1";
            cart_button.style.display = "none"
            // image.style.width = "100%"
        })

        img_div.append(image,cart_button);
        
        let rating = elem.Rating;

        let review_count = elem.Review;

        let review = document.createElement("h4");
        review.id = "ga_review";

        if(rating > 4.5) {
            review.innerHTML = `<span id="stars">⭐⭐⭐⭐⭐</span> ${review_count} reviews`
        }
        else if(rating > 3.5) {
            review.innerHTML = `<span id="stars">⭐⭐⭐⭐</span> ${review_count} reviews`
        }
        else if(rating > 2.5) {
            review.innerHTML = `<span id="stars">⭐⭐⭐</span> ${review_count} reviews`
        }
        else {
            review.innerHTML = `<span id="stars">⭐⭐</span> ${review_count} reviews`
        }

        let price = elem.Price;
        let cutoffPrice = elem.Price1;

        let pricePrint = document.createElement("h2");
        pricePrint.innerHTML = `<span id='ga_cutoff'>Rs. ${cutoffPrice}</span> Rs. ${price}`; 

        let h5 = document.createElement("h6");
        h5.textContent = `(Save Rs. ${cutoffPrice - price})`

        let div = document.createElement("div");
        div.style.marginLeft="10px";
        div.setAttribute("id","productsInnerDiv")
        let div2 = document.createElement("div");
        div2.className = "ga_text_div";

        div2.append(name,review,pricePrint,h5);

        let bottom_button = document.createElement("button");
        bottom_button.textContent = "ADD TO CART";

        bottom_button.addEventListener("click", () => {
            cartFun(elem);
            alert(`Added > ${elem.Name} < to the Cart`);
        })

        const displayButton = (x) => {
            if(x.matches) {
                bottom_button.style.display = "block"
            }
            else {
                bottom_button.style.display = "none";
            }
        }

        let medium = window.matchMedia("(max-width: 1025px)");
        displayButton(medium);
        medium.addListener(displayButton);

        div.append(img_div,div2,bottom_button);

        div2.addEventListener("click", () => {
            localStorage.setItem("BellVita_Product", JSON.stringify(elem));
            window.location.href = "./Products/productDetail.html";
        })

        parent.append(div);

    })
}
export{appendData}
// Img_url: "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Exfoliate-01_1024x1024.jpg?v=1626345623"
// Name: "Exfoliate Face and Body Scrub Grit, Skin Brightening, De-Tan Removal - 75gm"
// Price: "223"
// Price1: "300"
// Qty: 1
// Rating: "4.5"
// Review: "523"
// dis: "Bella Vita Organic's Eye