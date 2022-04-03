
let url = "https://bella-vita-clone-backend.herokuapp.com/allProducts";

async function allProducts () {
    try{
        let res = await fetch(url);
        let data = await res.json();

        return data;
    }
    catch(err) {
        console.error(err)
    }
}

export {allProducts};