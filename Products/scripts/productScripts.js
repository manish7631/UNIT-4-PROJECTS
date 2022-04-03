
//This function is made to show the Products to that related page.
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
            image.style.width = "90%"
        })

        img_div.addEventListener("mouseout", () => {
            image.src = elem.Img_url;
            image.style.opacity = "1";
            cart_button.style.display = "none"
            image.style.width = "100%"
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
        let div2 = document.createElement("div");
        div2.className = "ga_text_div";
        div2.addEventListener("click", () => {
            // localStorage.setItem("BellVita_Product", JSON.stringify(elem));
            window.location.href = "productDetail.html";
        })

        div2.append(name,review,pricePrint,h5);

        let bottom_button = document.createElement("button");
        bottom_button.textContent = "ADD TO CART";

        const displayButton = (x) => {
            if(x.matches) {
                bottom_button.style.display = "block"
            }
            else {
                bottom_button.style.display = "none";
            }
        }
        bottom_button.addEventListener("click", () => {
            cartFun(elem);
            alert(`Added > ${elem.Name} < to the Cart`);
        })

        let medium = window.matchMedia("(max-width: 1025px)");
        displayButton(medium);
        medium.addListener(displayButton);

        div.append(img_div,div2,bottom_button);
        div.className = "ga_sliderDivs";

        div.addEventListener("click", () => {
            localStorage.setItem("BellVita_Product", JSON.stringify(elem));
        })

        parent.append(div);

    })
}

//Sort function made in this export page so I can use this function in all of my pages without creating it again in every page.
const sortProducts = (data,append,parent) => {
    let selected = document.getElementById("ga_sort_select").value;

    if(selected == "LowToHigh") {
        data.sort((a,b) => {
            return Number(a.Price) - Number(b.Price);
        })
    }
    if(selected == "HighToLow") {
        data.sort((a,b) => {
            return Number(b.Price) - Number(a.Price);
        })
    }
    if(selected === "A-Z") {
        data.sort((a,b) => {
            if(a.Name > b.Name) {
                return 1;
            }
            if(a.Name < b.Name) {
                return -1;
            }
            return 0;
        })
    }
    if(selected === "Z-A") {
        data.sort((a,b) => {
            if(a.Name < b.Name) {
                return 1;
            }
            if(a.Name > b.Name) {
                return -1;
            }
            return 0;
        })
    }

    parent.innerHTML = "";
    append(data,parent);
}

export {appendData, sortProducts}