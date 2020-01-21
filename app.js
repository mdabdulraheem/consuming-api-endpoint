let searchTerm = document.querySelector("#searchTerm");
 
const searchForm = document.querySelector(".search form");

const gallery = document.querySelector(".gallery");
let pageNumber = 1;

const showing = document.querySelector(".showing p");
const pagination = document.querySelector(".pagination");
const modal = document.querySelector(".modal");
const modal_img = document.querySelector(".modal img");
const modal_span = document.querySelector(".modal span");
document.addEventListener('keyup', (e)=> {
    modal.style.width = '0';
});

modal_span.addEventListener('click', ()=> {
    modal.style.width = '0';
});


let imageGallery = (e) => {
    e.preventDefault();
    const endpoint = `https://api.unsplash.com/search/photos/?per_page=10&page=${pageNumber}&query=${searchTerm.value}&client_id=ad5f819146986dfc5f8e236ac592a21ff0e1c0a3eb9013b2a91e55a05f89d2ed`;

    fetch(endpoint)
    .then(res => res.json())
    .then( (data) => {
        console.log(data);
        //Checking if there are more pages or not
        if(data.total === 0 ) {
            showing.textContent = `No matches found for your search: '${searchTerm.value}'`;
            return;
        }

        if(pageNumber > data.total_pages) {
            alert("No more pages available");
            return;
        }
        
        gallery.textContent = " ";
        let value2 = ((10*pageNumber) <= data.total) ? (10*pageNumber) : data.total; 
        showing.textContent = `Showing ${10*(pageNumber-1)+1}-${value2} of total ${data.total} images for: '${searchTerm.value}'`;


        console.log(data);
        data.results.forEach((image) => {
            const img = document.createElement('img');
            img.addEventListener('click', ()=>{
                modal_img.src = '#';
                modal_img.src = image.urls['regular'];
                modal.style.width = '100%';
            });
            img.src = image.urls['small'];
            gallery.appendChild(img);
        });
    });

    
    pagination.style.display = "block";
}

searchForm.addEventListener('submit', (e)=> {
    pageNumber = 1;
    imageGallery(e);
});

// Next and previous page
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

prev.addEventListener('click', (e) => {
    if( pageNumber > 1 ) {
        pageNumber--;
        imageGallery(e);
    }
    else if ( pageNumber <=1 ) {
        alert("No previous page available")
    }
});

next.addEventListener('click', (e) => {
    if( pageNumber > 0 ) {
        pageNumber++;
        imageGallery(e);
    }
});