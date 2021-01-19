class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary;
    this.quotes = bookAttributes.quotes

    // this.quotes.forEach(function(quote) {
    //   console.log(quote.id, quote.quote)
    // })

    // console.log(this.quotes)
    // for each inside of here.
    Book.all.push(this)
    // console.log(this);
  }

  renderBookCard() {
    let html_string = ''
    html_string = html_string + `<div data-id=${this.id}>
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
  }

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


  // this.signatories.forEach(function(signatory){
  //     let message = `${this.closing[signatory]}, ${signatory}`
  //     console.log(message)
  // }, this)

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

      this.quotes.forEach(quote_info => {
        // need the data-id? ${this.id}??
        // quote${quote_info.id}
        // textarea id="input-quote${quote_info.id}
        html_string = html_string + `<textarea id="input-quote" name="quote${quote_info.id}" rows="5" cols="80">` + quote_info.quote + `</textarea><br><br>`

      //  html_string = html_string + `<textarea id="input-quote" name="quote" rows="5" cols="80">` + quote_info.quote + `</textarea><br><br>`
      });

      html_string = html_string + `<br><br>
      <input id='edit-button' type="submit" name="submit" value="Save Book" class="submit">

    </form>
    `;
    return html_string

  }
}

Book.all = [];
