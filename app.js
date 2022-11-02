// Toggle Spinner
const toggleSpinner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Search Phone 
const searchPhone = () => {
    const searchValue = document.getElementById('search-field').value;
    if (searchValue == '' || !searchValue) {
        alert('No result Found!!!');
    }
    document.getElementById('search-field').value = '';

    loadPhone(searchValue);
    // Display Spinner 
    toggleSpinner('block');
}
// Load Data 
const loadPhone = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoe(data.data))
}

//Show Display Phone 
const displayPhoe = (phones) => {
    const displayPhone = document.getElementById('phone-container');
    displayPhone.textContent = '';

    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('divStyle');
        div.innerHTML = ` 
            <h2 class="phone-heading">${phone.phone_name}</h2>
            <img src="${phone.image}" alt="image" />
            <div class="p-flex">                
                <p>Brand: ${phone.brand}</p>
                <a href="#" onclick="loadDetails('${phone.slug}')">Full spacification</a>
            </div>
        `
        displayPhone.classList.add('grid');
        displayPhone.appendChild(div);
    });

    // Hide Toggle Spinner
    toggleSpinner('none');


}
// Load Show Details 
const loadDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

    const phoneDetailsContainer = document.getElementById('phoneDetails');
    phoneDetailsContainer.style.display = 'block';
}

// Display Details UI 
const displayDetails = (phoneDetails) => {
    const phoneDetailsContainer = document.getElementById('phoneDetails');
    // console.log(phoneDetails)
    phoneDetailsContainer.textContent = '';
    const div = document.createElement('div');
    const { chipSet, displaySize, memory, storage } = phoneDetails.mainFeatures;
    div.innerHTML = `
        <h3>Name: ${phoneDetails.name}</h3>
        <img src="${phoneDetails.image}" alt="image"/>
        <p><strong>Display Size</strong>: ${displaySize}</p>
        <p><strong>Memory:</strong> ${memory}</p>
        <p><strong>Storage:</strong> ${storage}</p>
        <p><strong>ChipSet:</strong> ${chipSet}</p>
        <p><strong>Release Date:</strong> ${phoneDetails.releaseDate}</p>
        <p><strong>Brand:</strong> ${phoneDetails.brand}</p>    
    `
    phoneDetailsContainer.appendChild(div);
}

loadPhone('iPhone');