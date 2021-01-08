const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load books
  getBooks()

  const createBookForm = document.querySelector("#create-book-form");

  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))


})

// Fetch is making a get request.
function getBooks() {
  fetch(endPoint)
  .then(response => response.json())
  .then(books => {
    books.data.forEach(book => {
      render(book)

    })
  })
}

function render(book) {
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
    <button data-id=${book.id} id="edit-button">edit</button>
  </div>
  <br><br>`;

  document.querySelector('#book-container').innerHTML += bookMarkup

}


// grabbing all the values of my inputs
  function createFormHandler(e){
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const authorInput = document.querySelector("#input-author").value
    const summaryInput = document.querySelector("#input-summary").value
    const quoteInput = document.querySelector("#input-quote").value


    postFetch(titleInput, authorInput, summaryInput, quoteInput)

  }

  // making post request to backend

  function postFetch(title, author, summary, quote){
    console.log(title, author, summary, quote)
     fetch(endPoint, {
      // POST request
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title,
        author: author,
        summary: summary,
        quotes_attributes: [
          {
            quote: quote,
          }
        ]
      })
    })
    .then(response => response.json())
    .then(book => {

      // console.log(book.data);
      // console.log(book.data.attributes.title);
      // console.log(book.data.attributes.quotes);
      // data should now be an object, not an array
      const bookData = book.data // throws an error with attributes.
      // throws a typeerror.
      render(bookData)

    })
  }

  // Update
  function updateFetch() {
    document.getElementById("edit-button").click();
  }

  // function updateFetch(title, author, summary, quote) {
  //   console.log(title, author, summary, quote)
  //   fetch("http://localhost:3000/api/v1/books/`book.id`/edit", {
  //     method: 'PUT',
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify({
  //       title: title,
  //       author: author,
  //       summary: summary,
  //       quotes_attributes: [
  //         {
  //           quote: quote
  //         }
  //       ]
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(book => {
  //     console.log(book)
  //   })
  // }



// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
