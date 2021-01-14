const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load books
  getBooks()

  const createBookForm = document.querySelector("#create-book-form");

  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))

  // listen for 'click' event on book container
  const bookContainer = document.querySelector('#book-container')
  bookContainer.addEventListener('click', e => {
    // do not need to parseInt as already a string
    const id = e.target.dataset.id;
    const book = Book.findById(id);
    // debugger
    // console.log(book);
    document.querySelector('#update-book').innerHTML = book.renderUpdateForm();
  });

  // listen for the submit event of the edit form and handle the data
  document.querySelector('#update-book').addEventListener('submit', e => updateFormHandler(e))

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
    const quoteInput2 = document.querySelector("#input-quote2").value
    const quoteInput3 = document.querySelector("#input-quote3").value


    postFetch(titleInput, authorInput, summaryInput, quoteInput, quoteInput2, quoteInput3)

  }

  // making post request to backend

  function postFetch(title, author, summary, quote, quote2, quote3){
    console.log(title, author, summary, quote, quote2, quote3)
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
          },
          {
            quote: quote2
          },
          {
            quote: quote3
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

  // Grab all the info from the updated Book
  function updateFormHandler(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const book = Book.findById(id);
    console.log(book);
    // debugger;
    // book is defined despite console saying it is not??
    const title = e.target.querySelector("#input-title").value;
    const author = e.target.querySelector("#input-author").value;
    const summary = e.target.querySelector("#input-summary").value;
    // const quotes = e.target.querySelector("#input-quote").value;
    patchBook(book, title, summary)
    // patchBook(book, title, summary, quote)
  }

  function patchBook(title, author, summary) {
    console.log(title, author, summary)
    fetch(`http://localhost:3000/api/v1/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: title,
        author: author,
        summary: summary,
        // quote_attributes: [
        //   {
        //     quote: quote
        //   }
        // ]
      })
    })
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook));

  }

  // function patchBook(title, author, summary, quote) {
  //   console.log(title, author, summary, quote)
  //   fetch(`http://localhost:3000/api/v1/books/${book.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type' : 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: title,
  //       author: author,
  //       summary: summary,
  //       quote_attributes: [
  //         {
  //           quote: quote
  //         }
  //       ]
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(updatedBook => console.log(updatedBook));
  // }


// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
