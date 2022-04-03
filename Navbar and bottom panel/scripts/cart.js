import navbar from "../../components/navbar.js"
import bottomPanel from "../../components/bottompanel.js"

let nav = document.querySelector("#bellavitanav");
    nav.innerHTML = navbar();
    
    document.getElementById("allProducts").addEventListener("click", () => {
        window.location.href= '../Products/allProducts.html';
    })
    document.getElementById("bestSeller").addEventListener("click", () => {
        window.location.href= '../Products/bestseller.html';
    })
    document.getElementById("byCombos").addEventListener("click", () => {
        window.location.href = "../Products/combos.html"
    })

let token = localStorage.getItem("loginToken");
let cartArray=JSON.parse(localStorage.getItem("BellaVitaCart"))||[];

    

if(!token) {
    document.getElementById("go_to_checkout").textContent = "LOGIN TO CHECKOUT";

    document.getElementById("go_to_checkout").addEventListener("click", () => {
        window.location.href = "../login signup/login.html"
    })
}
else {
    document.getElementById("go_to_checkout").addEventListener("click", () => {

        if(cartArray.length == 0) {
            alert("It looks like your cart is Empty. To proceed please add items to the cart.") 
        }
        else {
            window.location.href = "../login signup/checkout.html";
        }
    });

    document.getElementById("go_to_checkout").textContent = "PROCEED TO CHECKOUT";

}
    


    
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


    // ----------------------------------------------------------------------------Cart calculations
    console.log(cartArray);

    let nos= cartArray.length;
    var subtotal = cartArray.reduce(function (ac, el) {
        return ac + Number(el.Price*el.Qty);//Price
    }, 0);
    console.log(+(subtotal))
    document.querySelector("#cartValue").textContent=`Rs.${subtotal}`

    let parent = document.querySelector("#product_content");
    parent.style.height = "100%"

    const appendCartarray = (cartArray, parent) => {
        parent.innerHTML=""
        cartArray.map((el, index) => {
           console.log(el.Qty, el.Price)
            let div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between"
            div.style.height = "180px"
            div.style.padding = "10px"

            let div1 = document.createElement("div");
            div1.style.width = "30%"
            div1.style.height = "100%"
            let image = document.createElement("img");
            image.style.height = "100%"
            image.src = el.Img_url;
            div1.append(image);

            let div2 = document.createElement("div");
            div2.style.width = "70%"
            div2.style.height = "100%"

            let name = document.createElement("p");
            name.textContent = el.Name;
            name.style.fontSize = "13px"

            let price = document.createElement("p");
            price.textContent = `Rs. ${el.Price*el.Qty}`;

            let quanDiv= document.createElement("div");
            quanDiv.style.display="flex";
            quanDiv.style.width="100px"
            quanDiv.style.marginTop="10px"
            // quanDiv.justifyContent="space-between";

            let inc= document.createElement("button");
            inc.textContent="+";
            inc.setAttribute("class","the_inc_dec_button")
            let inputval= document.createElement("div");
            inputval.textContent=el.Qty;
            inputval.style.width="50px"
            inputval.style.textAlign="center"
            inputval.style.border="0.1px solid gray"
            let dec= document.createElement("button");
            dec.textContent="-"; 
            dec.setAttribute("class","the_inc_dec_button")

            //-------------------------------------------quantity inc/dec

            inc.addEventListener("click",()=>{
                addFunction(el)
            })

            dec.addEventListener("click", ()=>{
               decFunction(el)
            })

            
            quanDiv.append(dec, inputval, inc);

         
            var remove = document.createElement("button");
            remove.textContent = "X Remove ";
            remove.setAttribute("id", "huz_remove_button")
            
            remove.addEventListener("click", ()=>{
                removeFunction(index);
            });
//Qty: 1
            div2.append(name, price,quanDiv, remove);

            div.append(div1, div2);

            parent.append(div)
        })
    }
    appendCartarray(cartArray, parent);

    function removeFunction(index) {
        console.log(index)
        cartArray.splice(index, 1);
        localStorage.setItem("BellaVitaCart", JSON.stringify(cartArray));
        appendCartarray(cartArray, parent);
        console.log(cartArray);
        let nos= cartArray.length;
        var subtotal = cartArray.reduce(function (ac, el) {
        return ac + Number(el.Price*el.Qty);//Price
         }, 0);
         console.log(+(subtotal))
    document.querySelector("#cartValue").textContent=`Rs.${subtotal}`

        // showing number of items present in the cart on the navbar;
        let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

        document.getElementById("ga_cartItems1").innerText = carArrLength.length
        document.getElementById("ga_cartItems2").innerText = carArrLength.length;

        }

    function addFunction(el){
        el.Qty++;
        appendCartarray(cartArray, parent)
                
        // inputval.textContent=el.Qty
        // price.textContent=el.Price*el.Qty
        var subtotal = cartArray.reduce(function (ac, el) {
            return ac + Number(el.Price*el.Qty);//Price
             }, 0);
             console.log(+(subtotal))
        document.querySelector("#cartValue").textContent=`Rs.${subtotal}` 
    }

    function decFunction(el){
        el.Qty--;
        if(el.Qty==0)
        {
            el.Qty=1  
        }
        else
        {
            appendCartarray(cartArray, parent)
            // inputval.textContent=el.Qty;
            // price.textContent=el.Price*el.Qty
            var subtotal = cartArray.reduce(function (ac, el) {
                return ac + Number(el.Price*el.Qty);//Price
                 }, 0);
                 console.log(+(subtotal))
            document.querySelector("#cartValue").textContent=`Rs.${subtotal}`
        }
    }




    import {bestsellerList} from "../../components/bestseller.js";
    var result = await bestsellerList();
    // console.log(result)

    let parent1 = document.querySelector("#best_seller_slider");
    import { appendData } from "./sliderData.js";


    // let cartArr = JSON.parse(localStorage.getItem("BellaVitaCart")) || [];

    const cartFun = (data) => {
        cartArray.push(data);
        localStorage.setItem("BellaVitaCart", JSON.stringify(cartArray));

        location.reload();
    }

    appendData(result, parent1,cartFun);

    let thelastpanel = document.querySelector("#huz_bottom_panel");
    thelastpanel.innerHTML = bottomPanel();


    // -----------------------------------------------------------------------Search Function

document.querySelector(".query_icon").addEventListener("click", ()=>{
    let searchvalue= document.querySelector("#query");
    searchvalue.style.display="flex";
    searchvalue.addEventListener("keypress", function(event){
        if(event.key=="Enter")
        {

            if(searchvalue.value.length > 0) {
                localStorage.setItem("bellaSearch", searchvalue.value);
                window.location.href = "../Products/search.html"
            }
            
            //console.log(searchvalue.value)
         }
     });
})


// showing number of items present in the cart on the navbar;
let carArrLength = JSON.parse(localStorage.getItem("BellaVitaCart"));

document.getElementById("ga_cartItems1").innerText = carArrLength.length
document.getElementById("ga_cartItems2").innerText = carArrLength.length;