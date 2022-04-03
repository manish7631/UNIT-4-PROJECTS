import navbar from "./navbar.js"
    // console.log(navbar)

    let nav = document.querySelector("#bellavitanav");
    nav.innerHTML = navbar();

import {searchData} from "../Products/scripts/searchData.js"

let data = await searchData();
console.log(data);


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
        window.location.href = "./Navbar and bottom panel/cart.html";
        // console.log("Hello")
    })
    document.getElementById("cartIcon2").addEventListener("click", () => {
        window.location.href = "./Navbar and bottom panel/cart.html";
    })
    document.getElementById("go_to_signup").addEventListener("click", () => {
        window.location.href = "./login signup/signup.html"
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

    
    /////

    let thumbnail = document.getElementsByClassName("ga_thumbnail");
    // console.log(thumbnail)

    let leftButton = document.getElementById("slideleft");
    let rightButton = document.getElementById("slideRight");

    leftButton.addEventListener("click", () => {

        for (let i = 0; i < thumbnail.length; i++) {

            document.getElementById("ga_slider").scrollLeft -= 20;

        }
    })

    rightButton.addEventListener("click", () => {

        for (let i = 0; i < thumbnail.length; i++) {

            document.getElementById("ga_slider").scrollLeft += 20;

        }
    })

    // let thumbnail = document.getElementsByClassName("ga_thumbnail");
    // console.log(clip)
    for (var i = 0; i < thumbnail.length; i++) {
        thumbnail[i].addEventListener("mouseenter", function (e) {
            e.toElement.play()
        })
        thumbnail[i].addEventListener("mouseout", function (e) {
            e.srcElement.pause()
        })

    }

    // --------------------------------------------------------------------------------------BEST SELLER
    import {bestsellerList,newArrivalList, comboList} from "./bestseller.js";
    var result = await bestsellerList();
    // console.log(result)

    let parent1 = document.querySelector("#best_seller_slider");
    import { appendData } from "../Navbar and bottom panel/scripts/sliderData.js";

    let cartArr = JSON.parse(localStorage.getItem("BellaVitaCart")) || [];

    const cartFun = (data) => {
        cartArr.push(data);
        localStorage.setItem("BellaVitaCart", JSON.stringify(cartArr));
    
    
        // showing number of items present in the cart on the navbar;
    let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));
    
    document.getElementById("ga_cartItems1").innerText = carArrLength.length
    document.getElementById("ga_cartItems2").innerText = carArrLength.length
    }

    appendData(result, parent1,cartFun);
    // ---------------------------------------------------------------------------------
    var result2= newArrivalList();
    let parent2= document.querySelector("#new_arrival_slider");
    console.log(result2);
    appendData(result2, parent2,cartFun);

    // ------------------------------------------------------------------------------------

    var result3= comboList();
    let parent3= document.querySelector("#combolist_slider");
    appendData(result3, parent3,cartFun)

    //------------------------------------------------------------------------------

    import bottompanel from "./bottompanel.js";

    let thelastpanel = document.querySelector("#huz_bottom_panel");
    thelastpanel.innerHTML = bottompanel();





// -----------------------------------------------------------------------Search Function

document.querySelector(".query_icon").addEventListener("click", ()=>{
    let searchvalue= document.querySelector("#query");
    searchvalue.style.display="flex";
    searchvalue.addEventListener("keypress", function(event){
        if(event.key=="Enter")
        {

            if(searchvalue.value.length > 0) {
                localStorage.setItem("bellaSearch", searchvalue.value);
                window.location.href = ".//Products/search.html"
            }
            
            //console.log(searchvalue.value)
         }
     });
})

// showing number of items present in the cart on the navbar;
let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

document.getElementById("ga_cartItems1").innerText = carArrLength.length
document.getElementById("ga_cartItems2").innerText = carArrLength.length

