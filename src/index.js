const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load books
  getBooks()

  const createBookForm = document.querySelector("#create-book-form");

  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))

  // listen for 'click' event on book container
  // const editButton = document.querySelector("#edit-button")
  const bookContainer = document.querySelector('#book-container')
  bookContainer.addEventListener('click', e => {
  // editButton.addEventListener('click', e => {
    // do not need to parseInt as already a string
    const id = e.target.dataset.id;
    const book = Book.findById(id);
    // debugger
    // console.log(book);
    document.querySelector('#update-book').innerHTML = book.renderUpdateForm();
    document.querySelector('#new-quote').innerHTML = book.renderNewQuote();
  });

  // listen for the submit event of the edit form and handle the data
  document.querySelector('#update-book').addEventListener('submit', e => updateFormHandler(e))
  document.querySelector('#new-quote').addEventListener('submit', e => newQuoteHandler(e))

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
    const quoteInput1 = document.querySelector("#input-quote1").value
    const quoteInput2 = document.querySelector("#input-quote2").value
    const quoteInput3 = document.querySelector("#input-quote3").value
    const quoteInput4 = document.querySelector("#input-quote4").value
    const quoteInput5 = document.querySelector("#input-quote5").value


    postFetch(titleInput, authorInput, summaryInput, quoteInput1, quoteInput2, quoteInput3, quoteInput4, quoteInput5)

  }

  // making post request to backend

  function postFetch(title, author, summary, quote1, quote2, quote3, quote4, quote5){
    console.log(title, author, summary, quote1, quote2, quote3, quote4, quote5)
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
            quote: quote1,
          },
          {
            quote: quote2
          },
          {
            quote: quote3
          },
          {
            quote: quote4
          },
          {
            quote: quote5
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
    // debugger;
    const title = e.target.querySelector("#input-title").value;
    const author = e.target.querySelector("#input-author").value;
    const summary = e.target.querySelector("#input-summary").value;


    const quote_count = e.target.querySelector("#quote_count").value;
    // goes in the loop as grabbing five.
    // const quote_id = e.target.querySelector("#quote.id").value;
    const new_quotes = [];
    // // for (let i=1 to count)
    for (let i=1; i <= quote_count; i++) {
      // hash of data for the attributes.
      const quote_id = e.target.querySelector("#input-quote"+i).dataset.quoteid;
      const quote_value = e.target.querySelector("#input-quote"+i).value;
      const quote = {
        id: quote_id,
        quote: quote_value
      }
      new_quotes.push(quote)
    }
    console.log(new_quotes)

    patchBook(book, title, author, summary, new_quotes)
    // patchBook(book, title, author, input_quotes)
  }




  function patchBook(book, title, author, summary, new_quotes) {
    console.log(title, author, summary, new_quotes)
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
        quotes_attributes: new_quotes

      })
    })
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook));

  }


  function newQuoteHandler(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const book = Book.findById(id);

    const new_quote = e.target.querySelector("#input-quote").value;

    postQuote(book, new_quote)

  }


  function postQuote(book, new_quote) {
    console.log(new_quote)
    fetch(`http://localhost:3000/api/v1/books/${book.id}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        quote: new_quote

      })
    })
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook))
    // hacky to force reload the page with new quote.
    .then(location.reload());

  }




// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
