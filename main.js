const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;
const accessKey = 'ySTB-ycarp_R4w_6vat3wgYRl0VZcqnpJ3QPsPpPnpI';

async function searchImages() {
    keyword = searchInput.value;
    const url = 
    `https://api.unsplash.com/search/photos?page=${page}
    &query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // Prevent searchs stack together
    if(page === 1){
        searchResults.innerHTML = '';
    }

    // To show images
    const results = data.results;
    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener('submit' , (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});