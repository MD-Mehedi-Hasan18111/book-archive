const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    // clear all when load new data
    document.getElementById('warning').innerHTML = '';
    document.getElementById('items').innerHTML = '';

    // validation for input field text
    const inputText = document.getElementById('input').value;
    if (inputText.length > 0) {
        document.getElementById('spinner').classList.remove('d-none');
        getBookData(inputText);
    }
    else {
        warningMessage("bg-danger", "No Input! Please input a book name.");
    }
    document.getElementById('input').value = '';
})
// fetch data function for multiple time fetch.
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
// get book data from api by calling fetchData function.
const getBookData = (inputValue) => {
    fetchData(`https://openlibrary.org/search.json?q=${inputValue}`).then(data => {
        // validation for fetching data is have or not
        document.getElementById('spinner').classList.add('d-none');
        if (data.docs.length === 0) {
            warningMessage("bg-warning", "Search book not Found!");
        }
        else {
            const parentDiv = document.getElementById('items');
            // total search results 
            document.getElementById('warning').innerHTML = `
                <h2 class="text-primary">Search results found ${data.numFound}</h2>
            `
            data.docs.forEach(book => {
                console.log(book);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100" style="box-shadow:0 10px 20px gray;">
                    <img height="300px" width="100px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Cover Image">
                    <div class="card-body border-primary">
                        <h4 class="card-title text-primary">${book.title}</h4>
                        <p>Author: <span class="fw-bold text-dark">${book.author_name ? book.author_name[0] : `empty!`}</span></p>
                        <p>Publisher: <span class="fw-bold text-dark">${book.publisher ? book.publisher[0] : `empty!`}</span></p>
                        <p>Published Year: <span class="fw-bold text-dark">${book.first_publish_year ? book.first_publish_year : `empty!`}</span></p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary"><i class="fas fa-cart-plus"></i>&nbsp;Add to Cart</button>
                    </div>
              </div>
                `
                parentDiv.appendChild(div);
            })
        }
    })
}
// warning message function.
const warningMessage = (bgColor, message) => {
    document.getElementById('warning').innerHTML = `
        <div class="${bgColor} text-center text-white p-4">
            <h3>${message}</h3>
        </div>
    `
}