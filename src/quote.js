class Quote extends Book {
  constructor(book, id, quote) {
    super(book);
    this.id = id;
    this.quote = quote;

    Quote.all.push(this)
    console.log(this);
  }
}
