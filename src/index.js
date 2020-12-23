const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  getBooks()

  const createBookForm = document.querySelector("#create-book-form")

  const updateBookForm = document.querySelector(" #book-container > div:nth-child(1) > button")



  //*[@id="book-container"]/div[1]/button


  // creating event listener on submit event in browser
  createBookForm.addEventListener("submit", (e) =>
  createFormHandler(e))

  // creating event listener on edit event in browser

  updateBookForm.addEventListener("edit", (e) =>
  function(){ alert("Edit World!")})

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
        <button data-id=${book.id} class="edit-button">edit</button>
      </div>
      <br><br>`;

      document.querySelector('#book-container').innerHTML += bookMarkup

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

    // how to do quotes associated inside of here?
    // const quoteInput = document.querySelector()
    // postFetch(titleInput, authorInput, summaryInput)
    postFetch(titleInput, authorInput, summaryInput, quoteInput)

  }

  // making post request to backend
  // function postFetch(title, author, summary){
  //   console.log(title, author, summary)
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
        quote_attributes: [
          {
            quote: quote
          }
        ]
        // quotes here somehow?
      })
    })
    .then(response => response.json())
    .then(book => {
      console.log(book);
      console.log(book.title);
      // data should now be an object, not an array
      // const bookData = book.data
      const quotes = []
      // console.log(bookData)
      book.quotes.forEach(quote_info => {
        quotes.push(quote_info.quote)
      })
      // render JSON response
      // removed book.attributes -- messing things up with quotes?
      const bookMarkup = `
      <div data-id=${book.id}>
        <h2>${book.title}</h3>
        <h3>${book.author}</h3>
        <p><b>Summary:</b> ${book.summary}</p>
        <p><b>Memorable Quotes:</b> ${quotes.join('<p></p>')}</p>
        <button data-id=${book.id}>edit</button>
      </div>
      <br><br>`;

      document.querySelector("#book-container").innerHTML += bookMarkup;
    })
  }

  // Update
  function updateFetch(title, author, summary, quote) {
    console.log(title, author, summary, quote)
    fetch(endpoint, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title,
        author: author,
        summary: summary,
        quote_attributes: [
          {
            quote: quote
          }
        ]
      })
    })
    .then(response => response.json())
    .then(book => {
      console.log(book)
    })
  }




// data[4]["attributes"]["quotes"][0]["quote"]
// quote
// data[4]["attributes"]["quotes"][1]["quote"]
// quote


// for (const book of data) {
//   console.log(book.attributes.title);
//   for (const quote of book.attributes.quotes) {
//     console.log(quote.attributes.quote);
//   }
// }
