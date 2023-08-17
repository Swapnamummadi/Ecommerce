// 'https://fakestoreapi.com/products/1'
// function sameple(){
//     const response=fetch('https://fakestoreapi.com/products/1')
//     .then(out=>out.json())
//     .then(json=>console.log(json))
//     console.log(response)
// }sameple()

// function for fetching the data from api
async function fetchdata(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("response is not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching the data " + error.message);
  }
}

async function Display() {
  try {
    const mobiles = fetchdata(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    const Laptops = fetchdata(
      "https://fakestoreapi.com/products/category/women's clothing"
      
    );
    const Televison = fetchdata(
      "https://fakestoreapi.com/products/category/electronics"
    );

    const [data1, data2, data3] = await Promise.all([
      mobiles,
      Laptops,
      Televison,
    ]);

    //Limit each category to 18 items
    // const mobilesDataLimited = data1.slice(0, 18);
    const mobilesDataLimited = data1.slice(0, 18);

    const LaptopsDataLimited = data2.slice(0, 18);
    // const LaptopsDataLimited = data2

    const TelivisonDataLimited = data3.slice(0, 18);

    //access the elemnts where you want to display the elements
    const product1 = document.getElementById("mobile_data");
    const product2 = document.getElementById("Laptop_data");
    const product3 = document.getElementById("Televison_data");

    const MobileDiv = CreateproductList(mobilesDataLimited);
    const LaptopsDiv = CreateproductList(LaptopsDataLimited);
    const TelevisonDiv = CreateproductList(TelivisonDataLimited);

    product1.appendChild(MobileDiv);
    product2.appendChild(LaptopsDiv);
    product3.appendChild(TelevisonDiv);
  } catch (error) {
    const Errdisplay = document.getElementById("errorDisplay");
    Errdisplay.textContent = "Error:" + error.message;
    console.error(error);
  }

  function CreateproductList(products) {
    const divele = document.createElement("div");
    divele.className='list-of-products';
    products.map((items) => {
      const CardDiv = document.createElement("div");
      CardDiv.className = "card";
      CardDiv.innerHTML = `<img src=${items.image} alt=${items.title} width='200' height='200'/>
        <h3>${items.title}</h3>
        <p> $${items.price}</p>
        <button class="add-to-cart btn">addtocart</button>`;

        const addToCartButton=CardDiv.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click',()=>handleAddToCart(items));

      divele.appendChild(CardDiv);
    });
    return divele;
  }
}
Display();
// var cartCount=0
function handleAddToCart(item){
    
    addToCart(item);
    console.log('Add to cart', item);
    
}

const cartItems=[];
const totalCartItems=[];

function addToCart(product){
    const existingItem= cartItems.find(item=>item.id===product.id);
    totalCartItems.push({...product})
    if(existingItem){
        existingItem.quantity++;
        // updateCartTotal()
    }else{
        cartItems.push({...product,quantity:1});
    }
    updateCart();
}

function updateCart(){
    const cartList=document.getElementById('cartList')
    cartList.innerHTML='';
    

    cartItems.forEach(item=>{
        displayCartItem(item);
    });
    updateCartTotal();
}

function displayCartItem(product){
    const cartList=document.getElementById('cartList');
    const cartItem=document.createElement('div')
    cartItem.className='card';
    cartItem.innerHTML=`<img src=${product.image} alt=${product.title} width='200' height='200'//>
    <div class="content">
    <h3>${product.title}</h3>
    <p> Quantity:${product.quantity}</p>
    <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
    <button class="remove-button btn">Remove button</button>
    </div>`
    const removeButton=cartItem.querySelector('.remove-button');
    removeButton.addEventListener('click',()=>handleRemoveFromCart(product))
    cartList.appendChild(cartItem)
}

function handleRemoveFromCart(item){
    // const index=totalCartItems.findIndex(cartItem=>cartItem.id===item.id);
    // if(quantity!=1){
    //   quantity-1
    //   totalCartItems.splice(index,1)
    //     updateCart();
    // }
    // else

    removeFromCart(item);
    console.log('Add to cart', item);


    //  if(index !== -1){
    //   cartItems.splice(index,1)
    //   updateCart();
    // }
}

function removeFromCart(product){
  const selectedItem= cartItems.find(item=>item.id===product.id);
  // const index=cartItems.findIndex(cartItem=>cartItem.id===item.id);

  totalCartItems.pop({...product})
  if(selectedItem.quantity>1){
      selectedItem.quantity--; 
  }
  // if(totalCartItems.length==0){
  //   cartItems.splice(index,1)

  // }
  else{
      // totalCartItems.pop({...product});
      cartItems.splice(cartItems.indexOf(selectedItem),1)
  }
  // if(index !== -1){
  //   cartItems.splice(index,1)
  //   updateCart();
  // }
  updateCart();
}

function updateCartTotal(){
    const totalElement= document.getElementById('total')
    const total=totalCartItems.reduce((sum,item)=> sum+item.price,0);
    totalElement.textContent=`Total : $${total.toFixed(2)}`;
    console.log(cartItems.length)
    const cartCount=document.getElementById('no-of-items')
    cartCount.textContent=`Total Cart Items : ${totalCartItems.length}`
    const iconCart=document.getElementById('no-of-items-cart')
    iconCart.textContent=` ${totalCartItems.length}`
    // if(totalCartItems.length>0){
    //   iconCart.className='hover';
    // }
}




let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Show the current slide and set the corresponding dot as active
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  // Change slide every 3 seconds (3000 milliseconds)
  setTimeout(showSlides, 3000);
}

//menu
var cate=document.querySelector(".category")
var ele=document.querySelector(".cat1")
ele.onclick = function () {
  ele.classList.toggle("active");
  const dropdownContent = cate.querySelector("ul");
  dropdownContent.style.display = ele.classList.contains("active")?"grid" :"none";
};

//search
// function search() {
//   // Get the input value from the search bar
//   const searchTerm = document.querySelector('.search-input').value.toLowerCase();

//   // Get the list of results and results container
//   const resultsList = document.getElementById('results-list');
//   const searchResults = document.getElementsByClassName('search-result');

//   // Clear previous search results
//   while (resultsList.firstChild) {
//     resultsList.removeChild(resultsList.firstChild);
//   }

//   // Perform search and display results
//   if (searchTerm.trim() !== '') {
//     // Replace this array with your actual data source (e.g., an array of search results)
//     const dataArray = [
      
      
//     ];

//     let foundResults = false;

//     dataArray.forEach((result) => {
//       if (result.toLowerCase().includes(searchTerm)) {
//         const li = document.createElement('li');
//         li.className = 'search-result';
//         li.textContent = result;
//         resultsList.appendChild(li);
//         foundResults = true;
//       }
//     });

//     if (!foundResults) {
//       const li = document.createElement('li');
//       li.textContent = 'No results found.';
//       resultsList.appendChild(li);
//     }
//   }
// }

function navigateToItem() {
  const searchTerm = document.querySelector('.search-input').value.toLowerCase();
  const sections = document.querySelectorAll('.category div h1');
  const section1 = document.querySelectorAll('.card div h3');

  let foundResults = false;

  sections.forEach((section) => {
    if (section.textContent.toLowerCase().includes(searchTerm) ) {
      // Scroll to the section using smooth behavior
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      foundResults=true;
    }
  })
  section1.forEach((section) => {
    if (section.textContent.toLowerCase().includes(searchTerm) ) {
      // Scroll to the section using smooth behavior
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      foundResults=true;
    }
  })
  if ( !foundResults) {
       alert('not found')
  };
}
