// let getImage = JSON.parse(localStorage.getItem("BellVita_Product"));

// let image = document.getElementsByClassName("image");

// image.src = getImage.Img_url;
// console.log(image)


let thumbnail = document.getElementsByClassName("ga_thumbnail");

let activeImage = document.getElementsByClassName("ga_active_img");

let leftButton = document.getElementById("slideleft");
let rightButton = document.getElementById("slideRight");

for(let i = 0; i < thumbnail.length; i++) {

    thumbnail[i].addEventListener("click", () => {

        console.log(thumbnail[i].width)

        if(activeImage.length > 0) {
            activeImage[0].classList.remove("ga_active_img");
        }

        thumbnail[i].classList.add("ga_active_img");
        document.getElementById("featured").src = thumbnail[i].src;
    })

}


leftButton.addEventListener("click", () => {

    for(let i = 0; i < thumbnail.length; i++) {

        document.getElementById("ga_slider").scrollLeft -= (thumbnail[i].width)/thumbnail.length;
    
    }
})

rightButton.addEventListener("click", () => {

    for(let i = 0; i < thumbnail.length; i++) {

        document.getElementById("ga_slider").scrollLeft += (thumbnail[i].width)/thumbnail.length;
    
    }
})