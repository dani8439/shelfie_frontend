class Book {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.summary = data.summary
    Book.all.push(this)
  }

  renderBookItem() {
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
