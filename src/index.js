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
    console.log(book);
    // debugger;
    const title = e.target.querySelector("#input-title").value;
    const author = e.target.querySelector("#input-author").value;
    const summary = e.target.querySelector("#input-summary").value;

    // loop through values of "#input-quote[id]" grab them?
    // if (e.target.querySelector("#input-quote") != undefined) {
    //   quote = e.target.querySelector("input-quote").value;
    // }
    //  check to see if e.target.querySelector("#input-quote[id]").value != undefined
    // plop into an array to pull the info out?

    // var quotes = e.target.document.querySelectorAll('#input-quote').value
    // something something loop?
    // if e.target.querySelector("#input-quote3") != undefined

    // const quotes = e.target.querySelectorAll("#input-quote").value;
    // console.log(quotes)
    // const quote = e.target.querySelector("input-quote").value;
    // console.log(quote)
    // console.log("QUOTES")
    // let quotes = []
    // e.target.querySelectorAll("input-quote").forEach( quote => {
    //   let obj = {}
    //   quote.querySelectorAll("value").forEach( ele => obj[ele.quote] = ele.value || "");
    //   quotes.push(obj)
    // })
    // console.log(quotes)

    const quote1 = e.target.querySelector("#input-quote1").value;
    const quote2 = e.target.querySelector("#input-quote2").value;
    const quote3 = e.target.querySelector("#input-quote3").value;
    const quote4 = e.target.querySelector("#input-quote4").value;
    const quote5 = e.target.querySelector("#input-quote5").value;
    console.log(quote1, quote2, quote3, quote4, quote5)
    // patchBook(book, title, author, summary)
    // patchBook(book, title, author, summary, quotes)
    patchBook(book, title, author, summary, quote1, quote2, quote3, quote4, quote5)
  }


  function patchBook(book, title, author, summary, quote1, quote2, quote3, quote4, quote5) {
    console.log(title, author, summary, quote1, quote2, quote3, quote4, quote5)
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
        quote_attributes: [
          {
            quote: quote1
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
    .then(res => res.json())
    .then(updatedBook => console.log(updatedBook));

  }


// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
