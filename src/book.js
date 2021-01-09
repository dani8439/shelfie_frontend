class Book {
  constructor(id, bookAttributes) {
    // const quotes = []
    // book.attributes.quotes.forEach(quote_info => {
    //   quotes.push(quote_info.quote)
    // })
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary
    // this.quotes = bookAttributes.quotes
    Book.all.push(this)
  }

  renderBookCard() {
    return `
    <div data-id=${this.id}>
      <h2>${this.title}</h3>
      <h3>${this.author}</h3>
      <p><b>Summary:</b> ${this.summary}</p>

      <button data-id=${this.id} id="edit-button">edit</button>
    </div>
    <br><br>`

    // <p><b>Memorable Quotes:</b> ${quotes.join('<p></p>')}</p>
  }
}

Book.all = [];
