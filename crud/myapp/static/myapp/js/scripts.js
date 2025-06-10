

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


    ////////////////////////////////////////////////////
 function showFormErrors(error){
    const nameErrEl = document.getElementById('name-error');
    const priceErrEl = document.getElementById('price-error');

    if (nameErrEl) nameErrEl.textContent = '';
    if (priceErrEl) priceErrEl.textContent = '';

    if (error.name && nameErrEl){
        nameErrEl.textContent = Array.isArray(error.name) ? error.name[0] : error.name;
    }
    if (error.price && priceErrEl){
        priceErrEl.textContent = Array.isArray(error.price) ? error.price[0] : error.price;
    }
 }
// //////////////////////////////////////////////////////////////////////////////
const API_URL='/api/products';

const productlist=document.getElementById('product-list');
const addProductForm= document.getElementById('add-product-form');
////////////////////////////////////////////////////////////////////////////////////////////
function handleEdit(event) {
    const id = event.target.dataset.id;
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;

    document.getElementById('product-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
 document.getElementById('title').textContent= "Edit Product";

  document.getElementById('productAction').textContent= "Edit";
    console.log("Editing:", id, name, price);
}

///////////////////////////////////////////////////////////////////////////////////////////////
// addButtonsEventListener()
 console.log("first")
function addButtonsEventListener(){
   
    const editButtons=document.querySelectorAll('.edit-btn')
        editButtons.forEach(button=>{
           
            button.addEventListener('click',handleEdit);
        })



         const deleteButtons=document.querySelectorAll('.delete-btn')
         deleteButtons.forEach(button=>{
           
            button.addEventListener('click',handleDelete);
        })

}
/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////
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
                <button class='btn btn-sm btn-warning edit-btn' data-id="${products.id}"  data-name="${products.name}" data-price="${products.price}">Edit</button>
               <button class='btn btn-sm btn-danger delete-btn' data-id="${products.id}">Delete</button>


                </td>
                </tr>
              
            `)
              addButtonsEventListener();
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

    const method=id?'PUT':'POST'
    const url=id?`${API_URL}/${id}/`:API_URL

    const response=await fetch(url, {
        method:method,
        headers:{
             "Content-Type": "application/json",// Telling server you're sending JSON
             'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({name,price})
    })
    if(response.ok){
       await fetchProducts();
        addProductForm.reset();
        document.getElementById('product-id').value = '';
        document.getElementById('productAction').textContent = 'Add';
        document.getElementById('title').textContent = 'Add Product';
    }
    else{
        const errorData=await response.json()
        showFormErrors(errorData)
        console.log(errorData)
    }

})

////////////////////////////////
async function handleDelete(event){
    const id =event.target.dataset.id
    const response=await fetch(`${API_URL}/${id}/`,{
        method:'DELETE',
        headers:{
            'X-CSRFToken': csrftoken,
        },
 
 
    })

  if(response.ok){
       await fetchProducts();
        addProductForm.reset();}
         else{
      alert("faild to delete data ")
    }


}