

   function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');
// //////////////////////////////////////////////////////////////////////////////
const API_URL='/api/products';

const productlist=document.getElementById('product-list');
const addProductForm= document.getElementById('add-product-form');

//
async function fetchProducts() {
    const response= await fetch(API_URL)
    
    if(response.ok){
        const products=await response.json()
        productlist.innerHTML=products.map(products=>`
                <tr>
                <td>${products.id}</td>
                <td>${products.name}</td>
                <td>${products.price}</td>

                  <td>
                <button class='btn btn-sm btn-info'>view</button>
                <button class='btn btn-sm btn-warning'>Edit</button>
                 <button class='btn btn-sm btn-danger'>Delete</button>
                </td>
                </tr>
              
            `)
    }else{
        console.error("Failed to fetch error")
    }
    
}

fetchProducts()

addProductForm.addEventListener('submit',async(event)=>{
    event.preventDefault()
    const id=document.getElementById('product-id').value;
    const name=document.getElementById('name').value;
    const price=document.getElementById('price').value;

    const method='POST'
    const url=API_URL

    const response=await fetch(url, {
        method:method,
        headers:{
             "Content-Type": "application/json",// Telling server you're sending JSON
             'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({name,price})
    })
    if(response.ok){
        await fetchProducts(); //freload the product list automattically
        addProductForm.reset()
    }
    else{
        const errorData=await response.json()
        console.log(errorData)
    }

})