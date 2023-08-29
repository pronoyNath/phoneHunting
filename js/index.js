const loadPhone = async (searchText=13) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data.data.length);
    const phones = data.data;
    displayPhone(phones);
}

let displayPhone = phones => {
    // console.log(phone);
    let phoneContainer = document.getElementById('phone-container');
    let showAllPhones = document.getElementById('btn-showall');

    if(phones.length>12){
        showAllPhones.classList.remove('hidden');
    }
    else{
        showAllPhones.classList.add('hidden');
    }
    phones = phones.slice(0,12)
    // clear previous search results 
    phoneContainer.textContent = '';
    
    phones.forEach(phone => {
        
        console.log(phones.length);
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

function handleSearch(){
    let searchId = document.getElementById('search-field');
    let searchText = searchId.value;
    loadPhone(searchText);

    showAllHandler(true);
    loadingHandler(true);
}

function showAllHandler(isShowAll){
    
}

function loadingHandler(isLoading){
    let loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}


loadPhone();