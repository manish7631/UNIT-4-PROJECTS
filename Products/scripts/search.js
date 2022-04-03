import allProducts  from "./productsData";
import { appendData, sortProducts } from "./productScripts.js";


let cartArr = JSON.parse(localStorage.getItem("BellaVitaCart")) || [];


// Appending navbar and footer to the page by importing it from components
import navbar from "../../components/navbar.js"
import bottomPanel from "../../components/bottompanel.js"
document.getElementById("ga_navbar").innerHTML = navbar();
document.getElementById("ga_footer").innerHTML = bottomPanel();

//files path
document.getElementById("bestSeller").addEventListener("click", () => {
    window.location.href = "./bestseller.html"
})
document.getElementById("bestSeller2").addEventListener("click", () => {
    window.location.href = "./bestseller.html"
})
document.getElementById("allProducts").addEventListener("click", () => {
    window.location.href = "./allProducts.html"
})
document.getElementById("allProducts2").addEventListener("click", () => {
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
}

let user = JSON.parse(localStorage.getItem("userName"));

let userName = user.firstName + " " + user.lastName;

document.getElementById("ga_title").innerText = userName;
//////

let appendTo = document.getElementById("ga_products");
let products = await allProducts();


// Search functionality by taking search input from local storage then will iterate through the products data and if the name matches with the search input that item will be pushed to data array and we will show the items present in the data array which will be the search result.
let searchInput = localStorage.getItem("bellaSearch");
let data = [];

products.forEach((elem) => {
    let name = elem.Name.split(" ");
    
    for(let i = 0; i < name.length; i++) {
        if(name[i] == searchInput) {
            data.push(elem);
            break;
        }
    }
})

if(data.length === 0) {
    appendTo.innerHTML = "<h2>Sorry! No results found with your searched text, please try with another text!!!!</h2>";
}

// console.log(data);
document.getElementById("ga_searchDirectory").innerText = searchInput;

// adding items to the cart
const cartFun = (data) => {
    cartArr.push(data);
    localStorage.setItem("BellaVitaCart", JSON.stringify(cartArr));


    // showing number of items present in the cart on the navbar;
    let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

    document.getElementById("ga_cartItems1").innerText = carArrLength.length
    document.getElementById("ga_cartItems2").innerText = carArrLength.length
}

appendData(data,appendTo,cartFun);

const sortFun = () => {
    sortProducts(data,appendData,appendTo);
}

document.getElementById("ga_sort_select").addEventListener("change", sortFun);

let sidebar = document.getElementById("ga_sidebar");

const mediumMedia = (x) => {
    if(x.matches) {
        sidebar.innerHTML = "";
        console.log("hello");
        sidebar.width = "0px";
    }
}

let medium = window.matchMedia("(max-width: 1025px)");
// mediumMedia(medium);
medium.addListener(mediumMedia);



//Filter by Product Category
let skin = document.getElementById("ga_skin").addEventListener("click", () => {
    var new_data = [];

    data.map((elem) => {

        if(elem.Category == "skin") {
            appendTo.innerHTML = "";
            new_data.push(elem);
        }
    })

    appendData(new_data,appendTo,cartFun);
    // console.log(new_data)
})

let body = document.getElementById("ga_body").addEventListener("click", () => {
    var new_data = [];

    data.map((elem) => {

        if(elem.Category == "body") {
            appendTo.innerHTML = "";
            new_data.push(elem);
        }
    })

    appendData(new_data,appendTo,cartFun);
    // console.log(new_data)
})


let hair = document.getElementById("ga_hair").addEventListener("click", () => {
    var new_data = [];

    data.map((elem) => {

        if(elem.Category == "hair") {
            appendTo.innerHTML = "";
            new_data.push(elem);
        }
    })

    appendData(new_data,appendTo,cartFun);
    // console.log(new_data)
})


let face = document.getElementById("ga_face").addEventListener("click", () => {
    var new_data = [];

    data.map((elem) => {

        if(elem.Category == "face") {
            appendTo.innerHTML = "";
            new_data.push(elem);
        }
    })

    appendData(new_data,appendTo,cartFun);
    // console.log(new_data)
    
})

   // -----------------------------------------------------------------------Search Function

   document.querySelector(".query_icon").addEventListener("click", ()=>{
    let searchvalue= document.querySelector("#query");
    searchvalue.style.display="flex";
    searchvalue.addEventListener("keypress", function(event){
        if(event.key=="Enter")
        {

            if(searchvalue.value.length > 0) {
                localStorage.setItem("bellaSearch", searchvalue.value);
                window.location.href = "search.html"
            }
            
            //console.log(searchvalue.value)
         }
     });
})


// showing number of items present in the cart on the navbar;
let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

document.getElementById("ga_cartItems1").innerText = carArrLength.length
document.getElementById("ga_cartItems2").innerText = carArrLength.length