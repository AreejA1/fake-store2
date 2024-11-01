const getProducts = async () => {
    const params = new URLSearchParams(window.location.search).get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${params}`);
    return data;
}

const displayProduct = async () => {
    const data = await getProducts();
    const result = data.products.map((product) => {
        return `
        <div class="product">
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}" alt="product.description"/>
        </div>`

    }).join('');
    document.querySelector(".products .row").innerHTML = result;
}
displayProduct();