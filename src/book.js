class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary;
    // this.quote_info
    this.quotes = bookAttributes.quotes
    // this.quotes = {
    //
    // }

    // this.quotes = {
    //   Book.all.forEach( arrowFunction => { })
    // }
    // console.log(this.quotes)
    // for each inside of here.
    Book.all.push(this)
    // console.log(this);
  }

  renderBookCard() {
    const quotes = []
    this.quotes.forEach(quote_info => {
      quotes.push(quote_info.quote)
    })
    return `
    <div data-id=${this.id}>
      <h2>${this.title}</h3>
      <h3>${this.author}</h3>
      <p><b>Summary:</b> ${this.summary}</p>
      <p><b>Memorable Quotes:</b> ${quotes.join('<p></p>')}</p>

      <button data-id=${this.id} id="edit-button">edit</button>
    </div>
    <br><br>`;
  }

  static findById(id) {
    return this.all.find(book => book.id === id);
  }

  // static renderQuotes(bookAttributes) {
  //   return bookAttributes.quotes
  // }


  renderUpdateForm() {
    const quotes = []
    this.quotes.forEach(quote_info => {
      quotes.push(quote_info.quote)
    })
    return `
    <form data-id=${this.id} >
      <h3>Edit a Book!</h3>

      <label>Title</label>
      <input id='input-title' type="text" name="title" value="${this.title}" class="input-text">
      <br><br>

      <label>Author</label>
      <input id='input-author' type="text" name="author" value="${this.author}" class="input-text">
      <br><br>

      <label>Summary</label>
      <textarea id="input-summary" name="summary" rows="8" cols="80" value="">${this.summary}</textarea>
      <br><br>

      <label>Quotes</label>
      <textarea id="input-quote" name="quote" rows="8" cols="80" value="">${quotes.join('<p></p>')}</textarea>
      <br><br>
      <input id='edit-button' type="submit" name="submit" value="Save Book" class="submit">

    </form>
    `;
  }
}

Book.all = [];
