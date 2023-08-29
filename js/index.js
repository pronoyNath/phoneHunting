// load products api or data 
const loadPhone = async (searchText=13,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    console.log("me",res);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhone(phones,isShowAll);
}


// all codes to display products 
let displayPhone = (phones,isShowAll) => {

    let phoneContainer = document.getElementById('phone-container');
    let showAllPhones = document.getElementById('btn-showall');

    if(phones.length>12 && !isShowAll){
        showAllPhones.classList.remove('hidden');
    }
    else{
        showAllPhones.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    // clear previous search results 
    phoneContainer.textContent = '';
    
    phones.forEach(phone => {
        
        let phoneCard = document.createElement('div');
        phoneCard.classList = (`card w-3/4 mx-auto md:w-96 bg-orange-300 shadow-xl `);
        phoneCard.innerHTML = `
        <figure class="px-5 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi porro vel voluptates quam ab suscipit labore possimus doloribus sint blanditiis.</p>
        <div class="card-actions">
        <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
        
    });
    
    loadingHandler(false);
}

// search field function 
function handleSearch(isShowAll){
    let searchId = document.getElementById('search-field');
    let searchText = searchId.value;
    loadPhone(searchText,isShowAll);

    loadingHandler(true);
}

// this is not a professional way but interesting (explore js)
function showAllHandler(){
    handleSearch(true);
}


// very interesting thing
function loadingHandler(isLoading){
    let loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden');

        // just for removing product when loading (there could be easy way but I did this)
        let showAllPhones = document.getElementById('btn-showall');
        let phoneContainer = document.getElementById('phone-container');
        phoneContainer.innerText = '';
        showAllPhones.classList.add('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}


loadPhone();