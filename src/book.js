class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary
    this.quotes = bookAttributes.quotes
    Book.all.push(this)
    console.log(this);
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
    <br><br>`
  }

  static findById(id) {
    return this.all.find(book => book.id === id);
  }
}

Book.all = [];
