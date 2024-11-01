const getCategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;

};

const displayCategories = async () => {

    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getCategories();
        const result = data.map((category) => {
            return `
         <div class="category">
         <h2>${category}</h2>
         <a href='categoryDetails.html?category=${category}'>Details</a>
        </div>`;
        }).join(' ');
        document.querySelector(".Categories .row").innerHTML = result;

    }
    catch (error) {
        document.querySelector(".Categories .row").innerHTML = "<p>error loading categories</p>";
    }
    finally {
        loader.classList.remove("active");
    }


}

const getProducts = async (page = 1) => {
    const skip = (page - 1) * 30;
    const { data } = await axios(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return data;

}

const displayProduct = async (page) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try {
        const data = await getProducts(page);
        const pageNumber = Math.ceil(data.total / 30);
        const result = data.products.map((product) => {
            return `
<div class="product">
<h3>${product.title}</h3>
<img src="${product.thumbnail}" alt="${product.description}" class='imges'/>
</div>`

        }).join('');
        document.querySelector(".product .row").innerHTML = result;
        let paginationLink = ``;
        if (page == 1) {
            paginationLink += `<li class="page-item"><button  class="page-link" disabled >&laquo;</button></li>`;
        }
        else {
            paginationLink += `<li class="page-item"><button onclick= displayProduct('${page - 1}') class="page-link" >&laquo;</button></li>`;
        }

        for (let i = 1; i <= pageNumber; i++) {

            paginationLink += `<li class="page-item ${i == page ? 'active' : ''}"><button onclick= displayProduct('${i}') class="page-link" >${i}</button></li>`;
        }
        if (page == pageNumber) {
            paginationLink += `<li class="page-item"><button disabled class="page-link" >&raquo;</button></li>`;
        }
        else {
            paginationLink += `<li class="page-item"><button onclick= displayProduct('${parseInt(page) + 1}') class="page-link" >&raquo;</button></li>`;
        }

        document.querySelector(".pagination-container .pagination").innerHTML = paginationLink;

        modal();

    }
    catch (error) {
        document.querySelector(".product .row").innerHTML = "<p>erro loading products</p>"

    }
    finally {
        loader.classList.remove("active");
    }

}


displayCategories();
displayProduct();

window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".Categories");

    if (window.scrollY > categories.offsetTop) {
        document.querySelector(".header").classList.add("navbarScroll");
    }
    else {
        document.querySelector(".header").classList.remove("navbarScroll");
    }


}
const countdown = () => {


    const countDownDate = new Date("2025-03-01T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.querySelector("#days").textContent = days;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.querySelector("#hours").textContent = hours;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.querySelector("#minutes").textContent = minutes;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector("#seconds").textContent = seconds;
}

setInterval(() => {
    countdown();
}, 1000
)
function modal() {
    const myModal = document.querySelector(".myModal");
    const leftBTN = document.querySelector(".leftBTN");
    const closeBTN = document.querySelector(".closeBTN");
    const rightBTN = document.querySelector(".rightBTN");
    const imges = Array.from(document.querySelectorAll(".imges"));
    let currentIndex=0;

    imges.forEach(function (img) {

        img.addEventListener("click", function (e) {
            myModal.classList.remove('d-none');
           
           myModal.querySelector("img").setAttribute("src",e.target.src);
const currentImg = e.target;
 currentIndex = imges.indexOf(currentImg);


        })


    })

  //close button
  closeBTN.addEventListener("click",function(){
    myModal.classList.add('d-none');
  })

  //right button
  rightBTN.addEventListener("click",function(){
    currentIndex++;
    if(currentIndex>= imges.length){
        currentIndex=0;
    }
    const src = imges[currentIndex].src;
    myModal.querySelector("img").setAttribute("src",src);


  })
  // left button
  leftBTN.addEventListener("click",function(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex=imges.length-1;
    }
    const src = imges[currentIndex].src;
    myModal.querySelector("img").setAttribute("src",src);


  })

  document.addEventListener("keydown",function(e){
if (e.code=='ArrowRight'){
    currentIndex++;
    if(currentIndex>= imges.length){
        currentIndex=0;
    }
    const src = imges[currentIndex].src;
    myModal.querySelector("img").setAttribute("src",src);
}
 else if(e.code=='ArrowLeft'){
        currentIndex--;
        if(currentIndex< 0 ){
            currentIndex=imges.length-1;
        }
        const src = imges[currentIndex].src;
        myModal.querySelector("img").setAttribute("src",src);}

        else if(e.code=='Escape'){
            myModal.classList.add('d-none');
        }
        
    
  })}
