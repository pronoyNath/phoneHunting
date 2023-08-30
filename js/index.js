// target elements 
const phoneContainer = document.getElementById('phone-container');
const showAllPhones = document.getElementById('btn-showall');


// load products api or data 
const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhone(phones, isShowAll);
}


// all codes to display products 
let displayPhone = (phones, isShowAll) => {
    // const phoneContainer = document.getElementById('phone-container');
    // const showAllPhones = document.getElementById('btn-showall');

    if (phones.length > 12 && !isShowAll) {
        showAllPhones.classList.remove('hidden');
    }
    else {
        showAllPhones.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
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
        <button onclick="showDetailHandler('${phone.slug}')" class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);

    });

    // if no product match search text 
    if (phones.length === 0) {
        const err = document.createElement('h3');
        err.classList = "mx-auto text-2xl text-white pl-3";
        err.innerHTML = "No product available. Search again....";
        phoneContainer.appendChild(err);
    }
    loadingHandler(false);
}


// show details of phone 
async function showDetailHandler(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    show_details_modal.showModal() //calling modal (daisyUI style)

    showDetailsModal(phoneDetails);
    // console.log(data.data);

}

function showDetailsModal(phoneDetails) {
    console.log(phoneDetails);
    const detailsModalContainer = document.getElementById('detail-modal-container');
    
    detailsModalContainer.innerHTML = `
    <div class="bg-gray-400 px-3 py-5 rounded">
    <img src="${phoneDetails.image}" alt="" class="mx-auto">
    </div>
    
    <h3 class="font-bold text-lg pt-5">${phoneDetails.name}</h3>
    <p class="py-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni pariatur architecto excepturi dignissimos perspiciatis nam iusto quas sit molestias vitae.</p>
    <p class="pt-4"><span class="font-bold">Storage: </span>${phoneDetails?.mainFeatures?.storage}</p>
    <p class="pt-4"><span class="font-bold">Display-Size: </span>${phoneDetails?.mainFeatures?.displaySize}</p>
    <p class="pt-4"><span class="font-bold">ChipSet: </span>${phoneDetails?.mainFeatures?.chipSet}</p>
    <p class="pt-4"><span class="font-bold">Memory: </span>${phoneDetails?.mainFeatures?.memory}</p>
    <p class="pt-4"><span class="font-bold">Release Date: </span>${phoneDetails?.releaseDate}</p>

    <div method="dialog" class="modal-backdrop pt-4">
    <button class="btn btn-primary">Close</button>
    </div>
    `
}

// search field function 
function handleSearch(isShowAll) {
    const searchId = document.getElementById('search-field');
    let searchText = searchId.value;
    loadPhone(searchText, isShowAll);

    loadingHandler(true);
}

// this is not a professional way but interesting (just for explore js)
function showAllHandler() {
    handleSearch(true);
}


// very interesting thing
function loadingHandler(isLoading) {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden');

        // just for removing product when loading (there could be easy way but I did this)
        phoneContainer.innerText = '';
        showAllPhones.classList.add('hidden');
    }
    else {
        loading.classList.add('hidden');
    }
}


loadPhone();