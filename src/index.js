const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  getBooks()
})

// Fetch is making a get request.
function getBooks() {
  fetch(endPoint)
  .then(response => response.json())
  .then(books => {
    books.data.forEach(book => {
      const bookMarkup = `
      <div data-id=${book.id}>
        <h2>${book.attributes.title}</h3>
        <h3>${book.attributes.author}</h3>
        <p>${book.attributes.summary}</p>
        <p>${book.attributes.quotes.quote}</p>
        <button data-id=${book.id}>edit</button>
      </div>
      <br><br>`;

      document.querySelector('#book-container').innerHTML += bookMarkup

    })

  })
}
