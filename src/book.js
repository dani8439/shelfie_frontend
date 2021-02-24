class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary;
    this.quotes = bookAttributes.quotes

    // console.log(this.quotes)
    // for each inside of here.
    Book.all.push(this)
    // console.log(this);
  }

  renderBookCard() {
    let html_string = ''
    html_string = html_string + `<div data-id=${this.id} id="book${this.id}">
      <h2>${this.title}</h2>
      <h3>${this.author}</h3>
      <p><b>Summary:</b> ${this.summary}</p>
      <p><b>Memorable Quotes:</b></p>`;


      this.quotes.forEach(quote_info => {
        html_string = html_string + `<p>` + quote_info.quote + `</p>`
      });

      html_string = html_string + `<button data-id=${this.id} id="edit-button">edit</button>

      </div>
      <br><br>`;
      return html_string;

  }

  static findById(id) {
    return this.all.find(book => book.id === id);
    // parseInt(book.id) === id
  }

  // static renderQuotes(id, bookAttributes) {
  //   Book.all.quotes.forEach(function(quote) {
  //     if (Book.findById() === id) {
  //       console.log(quote.id, quote.quote)
  //     }
  //   })
  // }

  // static renderQuotes() {
  //   this.all.quotes.forEach(quote_info => {
  //     quote_info.quote
  //   })
  // }

  // static renderQuotes(bookAttributes) {
  //   for (const quotes in bookAttributes.quotes) {
  //     if (bookAttributes.quotes.hasOwnProperty(quote)) {
  //       renderQuote(bookAttributes.quotes[quote])
  //     }
  //   }
  // }

  // book.quotes.forEach(function(quote) {
  //   console.log(quote.id, quote.quote)
  // })

  // Book.all.forEach(book => (book.quotes.forEach(function(quote) { console.log( quote.id, quote.quote)})))
  // Book.all.forEach(book => book.quotes.forEach(function(quote) { console.log(book.title, quote.id, quote.quote)}))

  renderUpdateForm() {
    let html_string = ''
    html_string = html_string + `<form data-id=${this.id}>
      <h3>Edit a Book!</h3>

      <label>Title</label>
      <input id='input-title' type="text" name="title" value="${this.title}" class="input-text">
      <br><br>

      <label>Author</label>
      <input id='input-author' type="text" name="author" value="${this.author}" class="input-text">
      <br><br>

      <label>Summary:</label><br>
      <textarea id="input-summary" name="summary" rows="8" cols="80" value="">${this.summary}</textarea>
      <br><br>
      <label>Quotes:</label>
      <br>`;

      let counter = 0
      this.quotes.forEach(quote_info => {
        counter +=1;
        // need the data-id? ${this.id}??
        // quote${quote_info.id}
        html_string = html_string + `<textarea id="input-quote${counter}" name="quote${quote_info.id}" data-quoteid="${quote_info.id}" rows="5" cols="80">` + quote_info.quote + `</textarea><br><br>`

      //  html_string = html_string + `<textarea id="input-quote" name="quote" rows="5" cols="80">` + quote_info.quote + `</textarea><br><br>`
      });
      // act as a check to check quote_count and then for blank fields
      html_string = html_string + `<input id='quote_count' type="hidden" name="quote_count" value="${counter}">`
      html_string = html_string + `<br><br>
      <input id='edit-button' type="submit" name="submit" value="Save Book" class="submit">

    </form>
    `;
    return html_string

  }


  renderNewQuote() {
    let html_string = ''
    html_string = html_string + `<form data-id=${this.id}>
    <h3>Add a Quote!</h3>

    <label>Quote:</label><br>
    <textarea id="input-quote" name="quote" rows="8" cols="80" value="" data-bookid="${this.id}"></textarea>
    <br><br>

    <input id='save-quote' type="submit" name="submit" value="Save Quote" class="submit">

    </form>
    `;
    return html_string

  }
}

Book.all = [];
