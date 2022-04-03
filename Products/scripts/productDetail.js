// Appending navbar and footer to the page by importing it from components
import navbar from "../../components/navbar.js"
import bottomPanel from "../../components/bottompanel.js"
document.getElementById("ga_navbar").innerHTML = navbar();
document.getElementById("ga_footer").innerHTML = bottomPanel();
document.getElementById("allProducts").addEventListener("click", () => {
  window.location.href= '../Products/allProducts.html';
})

//files path
document.getElementById("bestSeller").addEventListener("click", () => {
  window.location.href = "./bestseller.html"
})
document.getElementById("allProducts").addEventListener("click", () => {
  window.location.href = "./allProducts.html"
})
document.getElementById("cartIcon").addEventListener("click", () => {
  window.location.href = "../../Navbar and bottom panel/cart.html";
})
document.getElementById("cartIcon2").addEventListener("click", () => {
  window.location.href = "../../Navbar and bottom panel/cart.html";
})



let token = localStorage.getItem("loginToken");
if(!token) {
    document.getElementById("user1").addEventListener("click", () => {
        window.location.href = "./login signup/login.html"
    })
    document.getElementById("user2").addEventListener("click", () => {
        window.location.href = "./login signup/login.html"
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

//////

let data = JSON.parse(localStorage.getItem("BellVita_Product"));
console.log(data)

document.querySelector("title").innerText = data.Name;

//Photos of the product
let mainImage = document.getElementById("featured");
// console.log(mainImage.src)
mainImage.src = data.Img_url;
let mainImageSlider = document.getElementById("sliderImage");
mainImageSlider.src = data.Img_url;

document.getElementById("ga_direSpan").textContent = data.Name;

//bottom part customer reviews variables
let userRate = document.getElementById("userRating");
let userReview = document.getElementById("reviewCount");
let userStars = document.getElementById("userStars");

const appendText = (data) => {

    let name = document.createElement("h2");
    name.textContent = data.Name;
    name.className = "ga_title";

    let rating = data.Rating;
    userRate.innerHTML = `${rating}<sup style="font-size:large; color:black">/5</sup>`

    let review_count = data.Review;
    userReview.innerText = `From ${review_count} reviews`

    let review = document.createElement("h4");
    review.id = "ga_review";

    if(rating > 4.5) {
        review.innerHTML = `<span id="stars">⭐⭐⭐⭐⭐</span>${rating} (${review_count} reviews)`
        userStars.innerHTML = `<span id="stars">⭐⭐⭐⭐⭐</span>`
    }
    else if(rating > 3.5) {
        review.innerHTML = `<span id="stars">⭐⭐⭐⭐</span>${rating} (${review_count} reviews)`
        userStars.innerHTML = `<span id="stars">⭐⭐⭐⭐</span>`
    }
    else if(rating > 2.5) {
        review.innerHTML = `<span id="stars">⭐⭐⭐</span>${rating} (${review_count} reviews)`
        userStars.innerHTML = `<span id="stars">⭐⭐⭐</span>`
    }
    else {
        review.innerHTML = `<span id="stars">⭐⭐</span>${rating} (${review_count} reviews)`
        userStars.innerHTML = `<span id="stars">⭐⭐</span>`
    }

    let price = data.Price;
    let cutoffPrice = data.Price1;

    let pricePrint = document.createElement("h2");
    pricePrint.id = "ga_price"
    pricePrint.innerHTML = `<span id='ga_cutoff'>Rs. ${cutoffPrice}</span> Rs. ${price}`; 

    let h5 = document.createElement("h5");
    h5.id = "ga_h5"
    h5.textContent = `(Save Rs. ${cutoffPrice - price})`;

    let h52 = document.createElement("h5");
    h52.id = "ga_h51"
    h52.innerHTML = "or 4 interest-free payments of <span class='ga_h6_span'>Rs. 62.25</span> with <span class='ga_h6_span'>SEZZLE</span>"

    document.getElementById("ga_details").append(name,review,pricePrint,h5,h52);
}

appendText(data);

// Quantity increase and decrease
let value = 1;
let quantity = document.getElementById("ga_quantity");

let add = document.getElementById("ga_add");
add.addEventListener("click", () => {
    value++;
    if(value <= 10) {
        quantity.textContent = value;
    }
    else {
        value = 10;
        quantity.textContent = value;
    }
    data.Qty = value;
    // console.log(data);
})

let minus = document.getElementById("ga_minus");
minus.addEventListener("click", () => {
    value--;
    if(value >= 1) {
        quantity.textContent = value;
    }
    else {
        value = 1;
        quantity.textContent = value;
    }
    data.Qty = value;
    // console.log(data);
})

//Information of the products such as Description, Ingredients, benefits and How to use

let description = document.getElementById("ga_description");
description.style.borderBottom = "2px solid red"

let ingredients = document.getElementById("ga_ingre");

let benefits = document.getElementById("ga_benefits");

let howToUse = document.getElementById("ga_howToUse");

let showInfo = document.getElementById("ga_showInfo");

description.addEventListener("click", () => {
    description.style.borderBottom = "2px solid red"
    ingredients.style.borderBottom = "none"
    benefits.style.borderBottom = "none"
    howToUse.style.borderBottom = "none"

    showInfo.innerHTML = "";
    showInfo.innerHTML = `
    <h5 id="ga_infoTitle">DESCRIPTION</h5>
    
    <p id="p">The Bella Vita Organic C-Glow Face Pack is a blend of natural & Ayurvedic ingredients that brightens, nourishes & hydrates your skin and gives your face a natural glow from within. Power packed with the goodness of Vitamin C, Orange Peel, Turmeric & Saffron, this face pack addresses multiple concerns all at once. Vitamin C & Orange peel are rich in antioxidants that contain bleaching agents and improve the skin tone by reducing dark spots and pigmentation. Kaolin Clay is a natural exfoliator and deep cleans your pores and absorbs excess oil from your skin. The Butter Blend of Mango, Shea & Cocoa nourish & hydrate your skin from deep within and leave it feeling suppler and brighter.</p>
    
    <p id="p">Formulated with the goodness of pink clay, walnut, rose essential oil, aloe vera, and more, Glowey is perfect for that bright, clean and glowing skin. The carefully sourced natural and ayurvedic ingredients soothe the skin, gently exfoliate it, balance its pH level, reduce early signs of aging, smoothen it, revive and rejuvenate it over time. It is the best cleanser for the face as walnut grits gently scrub the skin while pink clay mildly exfoliates, improving the skin's complexion, giving you glowing, bright, and smooth skin. Being a mild exfoliate, Glowey is a well-suited face scrub for dry skin and gently removes all the dead skin cells from the skin. As a mask, it also works as a great face pack for women when you don't want to sit for long hours at a salon. Just a simple application of this on your face & neck for 10-15 minutes will give you a salon-like glow at home. </p>
    `
})

ingredients.addEventListener("click", () => {
    description.style.borderBottom = "none"
    ingredients.style.borderBottom = "2px solid red"
    benefits.style.borderBottom = "none"
    howToUse.style.borderBottom = "none" 

    showInfo.innerHTML = "";

    showInfo.innerHTML = `
    <h5>INGREDIENTS</h5>
    
    <p id="p">Walnut: Tiny grits of walnut shells exfoliate the skin gently. Walnut brightens skin & provides a subtle shine. Smoothens the skin's texture & reduces wrinkles.</p>
    <p id="p">Pink Clay: Rich in minerals, pink clay helps restore moisture in the skin, remove impurities, and lightly exfoliates the complexion.</p>
    <p id="p">Rose Extract: Reduces redness, inflammation, acne & scars. Provides a subtle glow & adds moisture & hydrates skin</p>
    <p>Cocoa Butter: Fatty acids in cocoa butter moisturize skin deeply. It improves the skin's elasticity & makes it tighter and younger-looking.    </p>
    <p id="p">Full Ingredients : Aqua, aloe vera leaf juice, cold pressed sunflower oil, cold pressed almond oil, cold pressed coconut oil, shea butter, cocoa butter, mango butter, pink clay, bentonite, walnut shell grit, rose essential oil, allantoin, xanthan gum, glycerol monostearate, caprylic triglyceride, decyl glucoside, sodium benzoate, potassium sorbate.

    </p>
    `
})

benefits.addEventListener("click", () => {
    description.style.borderBottom = "none"
    ingredients.style.borderBottom = "none"
    benefits.style.borderBottom = "2px solid red"
    howToUse.style.borderBottom = "none"

    showInfo.innerHTML = "";

    showInfo.innerHTML = `
    <h5>BENEFITS</h5>
    
    <p id="p">Brightens, nourishes & hydrates skin.</p>
    <p id="p">Made with natural ingredients</p>
    <p id="p">Power packed with Vitamin C, Orange Peel, Saffron & Turmeric.</p>
    <p id="p">Improves overall skin tone by reducing dark spots & pigmentation.</p>
    <p id="p">Rich in antioxidants.</p>
    <p id="p">Contains Kaolin Clay which is a natural exfoliator and absorbs excess oil & impurities.
    </p>
    <p id="p">Butter blend of Mango, Shea & Cocoa deeply nourish & hydrate skin.</p>
    `
})

howToUse.addEventListener("click", () => {
    description.style.borderBottom = "none"
    ingredients.style.borderBottom = "none"
    benefits.style.borderBottom = "none"
    howToUse.style.borderBottom = "2px solid red"

    showInfo.innerHTML = "";

    showInfo.innerHTML = `
    <h5>HOW TO USE</h5>

    <p id="p"><span style="font-weight:bold">Step 1:</span> On freshly cleansed skin, evenly apply a generous layer of the C-Glow Face Pack.</p>

    <p id="p"><span style="font-weight:bold">Step 2:</span> Make sure to cover your face and neck, avoiding the eyes.</p>

    <p id="p"><span style="font-weight:bold">Step 3:</span> Let it dry for 10-15 minutes, rinse with lukewarm water.</p>

    <p id="p"><span style="font-weight:bold">Step 4:</span> Pat dry and finish with C-Glow Face Serum and C-Glow Face Cream..</p>

    <p id="p"><span style="font-weight:bold">Step 5:</span> For best results, use 4-5 times a week</p>
    `
})

// Related Products slider below the information
import { appendData } from "./productScripts.js";

let relatedProducts = [
    {
        Category: "face",
        Name: "Glowner Rose Water Face Toner & Mist - Natural Toner Spray for Glowing Skin for All Skin Type - 200 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Glowner-01_1024x1024.jpg?v=1632557600",
        Price1: "499",
        Price: "399",
        Rating: "4.5",
        Review: "201",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "face",
        Name: "Micellar Water - Best Natural Makeup Remover and Cleanser - 225 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/MicellarWater-01_1024x1024.jpg?v=1632824206",
        Price1: "399",
        Price: "349",
        Rating: "4",
        Review: "78",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "face",
        Name: "21 Again Anti Ageing & Skin Glow Face Serum - 35 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/21Again-01_1024x1024.jpg?v=1634638149",
        Price1: "312",
        Price: "299",
        Rating: "5",
        Review: "666",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "Exfoliate Face and Body Scrub Grit, Skin Brightening, De-Tan Removal - 75gm",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Exfoliate-01_1024x1024.jpg?v=1626345623",
        Price1: "499",
        Price: "399",
        Rating: "5",
        Review: "198",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "SkinSolve Multi Benefit Face Cream & Body Butter For Dry Skin, Stretch Marks, Tattoo Balm, Rash Relief, Make up Base - 85 g",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/SkinSolve-01_1024x1024.jpg?v=1632306325",
        Price1: "298",
        Price: "233",
        Rating: "5",
        Review: "102",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
  
      {
        Category: "body",
        Name: "Super Oud Unisex Perfume For Men & Women - 100ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/OUD02_1024x1024.jpg?v=1626682093g",
        Price1: "199",
        Price: "146",
        Rating: "4",
        Review: "356",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "Salute Strong Woody Perfume For Men, 100 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Salute-01_1024x1024.jpg?v=1632485142",
        Price1: "499",
        Price: "258",
        Rating: "4",
        Review: "367",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "Belly Drops Ayurvedic Navel Oil For Menstrual Pain, Period Pain Relief Oil - 15 Ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Bellydropsmenstrualpainrelief-01_1024x1024.jpg?v=1632815174",
        Price1: "599",
        Price: "154",
        Rating: "5",
        Review: "366",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "Gold Woman EDP - Luxury Perfume For Women With Long Lasting Fresh & Fruity Fragrance - 100 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/Gold_1_1024x1024.jpg?v=1632213971",
        Price1: "301",
        Price: "198",
        Rating: "4",
        Review: "25",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
      {
        Category: "body",
        Name: "Celeb Shine Body Shimmer Gloss Lotion For All Skin Types, Gold Shade, 50 ml",
        Img_url:
          "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/CelebshineGold-01_1024x1024.jpg?v=1631698378",
        Price1: "425",
        Price: "401",
        Rating: "5",
        Review: "332",
        dis: "Bella Vita Organic's Eyelift Under Eye Cream Gel makes for a great companion for reducing dark circles, dullness and puffy eyes. It is curated with natural cucumber extract, tulsi, jojoba oil, almond oil & pure aloe-vera gel, meant for everyday...",
        Qty: 1,
      },
]

let parent = document.getElementById("ga_divs");
appendData(relatedProducts,parent)

let thumbnail = document.getElementsByClassName("ga_sliderDivs");

let leftButton = document.getElementById("leftArrow");
let rightButton = document.getElementById("rightArrow");

leftButton.addEventListener("click", () => {

    for(let i = 0; i < thumbnail.length; i++) {

      console.log(thumbnail[i].width)
        document.getElementById("ga_divs").scrollLeft -= 90;
    
    }
})

rightButton.addEventListener("click", () => {

    for(let i = 0; i < thumbnail.length; i++) {

        document.getElementById("ga_divs").scrollLeft += 90;
    
    }
})


//Afer Add to Cart button clickin product will be added to the cart;
let cartArr = JSON.parse(localStorage.getItem("BellaVitaCart")) || [];

document.getElementById("ga_addCart").addEventListener("click", () => {
  cartFun(data);
  alert(`${data.Name} Added to the Cart > Quantity: ${data.Qty}`);
})

const cartFun = (data) => {
  cartArr.push(data);
  localStorage.setItem("BellaVitaCart", JSON.stringify(cartArr));

  
  // showing number of items present in the cart on the navbar;
let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

document.getElementById("ga_cartItems1").innerText = carArrLength.length
document.getElementById("ga_cartItems2").innerText = carArrLength.length
}


// -----------------------------------------------------------------------Search Function

document.querySelector(".query_icon").addEventListener("click", ()=>{
  let searchvalue= document.querySelector("#query");
  searchvalue.style.display="flex";
  searchvalue.addEventListener("keypress", function(event){
      if(event.key=="Enter")
      {

          if(searchvalue.value.length > 0) {
              localStorage.setItem("bellaSearch", searchvalue.value);
              window.location.href = "./search.html"
          }
          
          //console.log(searchvalue.value)
       }
   });
})


// showing number of items present in the cart on the navbar;
let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

document.getElementById("ga_cartItems1").innerText = carArrLength.length
document.getElementById("ga_cartItems2").innerText = carArrLength.length