let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");

let allCategory = [];
let allProducts = []; 

let displayProduct = async (allCheckCategory = []) => {

    productDiv.innerHTML = "";

    if(allProducts.length === 0){
        let product = await fetch("https://fakestoreapi.com/products");
        allProducts = await product.json();
    }

    allProducts.forEach(element => {

        if(!allCategory.includes(element.category)){
            categoryListDiv.innerHTML += `
                <label class="cursor-pointer block">
                    <input type="checkbox" onclick="categoryFilter()" value="${element.category}">
                    ${element.category}
                </label>
            `;
            allCategory.push(element.category);
        }

      
        if(allCheckCategory.length === 0 || allCheckCategory.includes(element.category)){
            productDiv.innerHTML += `
                <div class="productItems shadow-md p-6 rounded-xl border border-gray-300 flex justify-center flex-col">
                    <img class="h-64" src=${element.image} alt="">
                    <div class="pt-2">
                        <h4 class="text-center mt-5 font-medium text-gray-500">
                            ${element.category.charAt(0).toUpperCase() + element.category.slice(1)}
                        </h4>
                        <p class="text-center mt-2 font-bold text-xl ">
                            ${element.price} | ⭐${element.rating.rate}
                        </p>
                        <h1 class="text-center text-md font-medium text-gray-900 mt-2">
                            ${element.title}
                        </h1>
                    </div>
                </div>
            `;
        }

    });
}

displayProduct();

let categoryFilter = () => {

    let checkInput = document.querySelectorAll("input[type='checkbox']");
    let checkData = [];

    checkInput.forEach((e) => {
        if(e.checked){
            checkData.push(e.value);
        }
    });

    displayProduct(checkData);
}