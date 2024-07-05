const API_URL = "https://dummyjson.com"


async function GetHomeProducts(limit = 10, skip = 0) {
    let productsRequest = await fetch(API_URL + `/products?limit=${limit}&skip=${skip}`);

    let products = await productsRequest.json();

    return products;
}



async function GetProductById(productId) {
    let productRequest = await fetch(API_URL + `/products/${productId}`);

    var product = await productRequest.json();

    return product;
}

