let url = "https://bella-vita-clone-backend.herokuapp.com/searchData";

async function searchData() {
    try{
        let res = await fetch(url);
        let data = await res.json();

        console.log(data)
        return data;
    }
    catch(err) {
        console.error(err)
    }
}

export {searchData};