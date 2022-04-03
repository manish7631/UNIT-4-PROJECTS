import navbar from "../../components/navbar.js"
import bottomPanel from "../../components/bottompanel.js"
document.getElementById("ga_navbar").innerHTML = navbar();
document.getElementById("ga_footer").innerHTML = bottomPanel();



    //files path and their directory
    document.getElementById("allProducts").addEventListener("click", () => {
        window.location.href= '../Products/allProducts.html';
    })
    document.getElementById("bestSeller").addEventListener("click", () => {
        window.location.href= '../Products/bestseller.html';
    })
    document.getElementById("byCombos").addEventListener("click", () => {
        window.location.href = "../Products/combos.html"
    })
    document.getElementById("cartIcon").addEventListener("click", () => {
        window.location.href = "../Navbar and bottom panel/cart.html";
        // console.log("Hello")
    })
    document.getElementById("cartIcon2").addEventListener("click", () => {
        window.location.href = "../Navbar and bottom panel/cart.html";
    })
    

    let token = localStorage.getItem("loginToken");
if(!token) {
    document.getElementById("user1").addEventListener("click", () => {
        window.location.href = "../../login signup/login.html"
    })
    document.getElementById("user2").addEventListener("click", () => {
        window.location.href = "../../login signup/login.html"
    })
}
else {
    let logout = document.getElementById("logout_btn");
    logout.addEventListener("click", () => {
        localStorage.removeItem("loginToken");
        location.reload();
    });

    document.getElementById("user2").addEventListener("mouseover", () => {
        document.getElementById("logout").style.display = "flex";
    })

    document.getElementById("logout").addEventListener("mouseover", () => {
        document.getElementById("logout").style.display = "flex";
    })

    document.getElementById("user2").addEventListener("mouseout", () => {
        document.getElementById("logout").style.display = "none";
    })

    document.getElementById("logout").addEventListener("mouseout", () => {
        document.getElementById("logout").style.display = "none";
    });

    let user = JSON.parse(localStorage.getItem("userName"));

    let userName = user.firstName + " " + user.lastName;

    document.getElementById("ga_title").innerText = userName;
}

    

// var url = "http://localhost:5000/combos"
// var url = "https://bella-vita-clone-backend.herokuapp.com/combos"


var url = "https://bella-vita-clone-backend.herokuapp.com/combos"


let cartArr = JSON.parse(localStorage.getItem("BellaVitaCart")) || [];

async function getting()
{
    try{

        var user = await fetch(url)

    var data = await user.json()

    // console.log(data)
    display(data)

    }
    catch(err)
    {
        console.log(err)
    }
    
}

getting()


function display(arr)
{
    var box = document.querySelector("#ga_products")
    arr.map(function(elem)
    {
        
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

        box.append(div)

    })

}


const cartFun = (data) => {
    cartArr.push(data);
    localStorage.setItem("BellaVitaCart", JSON.stringify(cartArr))
}
