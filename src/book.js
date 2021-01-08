class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary
    Book.all.push(this)
  }

  renderBookCard() {
    return `
    <li>
      <h3>${this.title}
      <button data-id=${this.id}>edit</button>
      </h3>
    </li>
    `
  }
}

Book.all = [];
