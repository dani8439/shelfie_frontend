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
      const quotes = []
      book.attributes.quotes.forEach(quote_info => {
        quotes.push(quote_info.quote)
      })
      const bookMarkup = `
      <div data-id=${book.id}>
        <h2>${book.attributes.title}</h3>
        <h3>${book.attributes.author}</h3>
        <p><b>Summary:</b> ${book.attributes.summary}</p>
        <p><b>Memorable Quotes:</b> ${quotes.join('<p></p>')}</p>
        <button data-id=${book.id}>edit</button>
      </div>
      <br><br>`;

      document.querySelector('#book-container').innerHTML += bookMarkup

    })

  })


// data[4]["attributes"]["quotes"][0]["quote"]
// quote
// data[4]["attributes"]["quotes"][1]["quote"]
// quote

}

// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
