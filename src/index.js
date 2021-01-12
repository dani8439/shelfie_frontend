const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load books
  getBooks()

  const createBookForm = document.querySelector("#create-book-form");

  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))
  const bookContainer = document.querySelector('#book-container')
  bookContainer.addEventListener('click', e => {
    const id = parseInt(e.target.dataset.id)
    const book = Book.findById(id);
    // console.log(book);
    document.querySelector('#update-book').innerHTML = book.renderUpdateForm();
  });

})

// Fetch is making a get request.
function getBooks() {
  fetch(endPoint)
  .then(response => response.json())
  .then(books => {
    books.data.forEach(book => {
      // render(book)
      const newBook = new Book(book.id, book.attributes);
      document.querySelector('#book-container').innerHTML += newBook.renderBookCard();

    })
  })
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

      console.log(book.data);
      const bookData = book.data;
      let newBook = new Book(bookData, bookData.attributes)

      document.querySelector('#book-container').innerHTML += newBook.renderBookCard();

    })
    // .catch(err => console.log(err))
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
