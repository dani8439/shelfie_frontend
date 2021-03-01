class App {
  constructor() {
    this.adapter = new Adapter();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createBooks = this.createBooks.bind(this);
    this.addBooks = this.addBooks.bind(this);
  }


  attachEventListeners() {
    document.querySelector('#book-container').addEventListener('click', this.handleEditClick);
    document.querySelector('#update-book').addEventListener('submit', this.handleFormSubmit);
  }
    // document.querySelector('#update-book').addEventListener('submit', e => {
    //   e.preventDefault();
    //   console.log('clicked');
    //   const id = e.target.dataset.id;
    //   const book = Book.findById(id);
    //   const title = e.target.querySelector("#input-title").value;
    //   const author = e.target.querySelector("#input-author").value;
    //   const summary = e.target.querySelector("#input-summary").value;
    //   console.log(book);
    //   const quoteCount = e.target.querySelector("#quote_count").value;
    //   // goes in the loop as grabbing five.
    //   const newQuotes = [];
    //   for (let i=1; i <= quoteCount; i++) {
    //     // hash of data for the attributes.
    //     const quoteId = e.target.querySelector("#input-quote"+i).dataset.quoteid;
    //     const quoteValue = e.target.querySelector("#input-quote"+i).value;
    //     const quote = {
    //       id: quoteId,
    //       quote: quoteValue
    //     }
    //     newQuotes.push(quote)
    //   }
    //   console.log(newQuotes)
    //
    //   this.adapter.updateBook(book.id, title, author, summary, newQuotes).then(updatedBook => console.log(updatedBook));
    //
    // })

    createBooks(books) {
      books.forEach(book => {
        new Book(book);
      });
      this.addBooks();
    }

    addBooks() {
      document.querySelector('#book-container').innerHTML = '';
      Book.all.forEach(
        book => (document.querySelector('#book-container').innerHTML += book.renderBookCard())
      );
    }

    handleFormSubmit(e) {
      e.preventDefault();
      console.log('clicked');
      const id = e.target.dataset.id;
      const book = Book.findById(id);
      const title = e.target.querySelector("#input-title").value;
      const author = e.target.querySelector("#input-author").value;
      const summary = e.target.querySelector("#input-summary").value;
      console.log(book);
      const quoteCount = e.target.querySelector("#quote_count").value;
      // goes in the loop as grabbing five.
      const newQuotes = [];
      for (let i=1; i <= quoteCount; i++) {
        // hash of data for the attributes.
        const quoteId = e.target.querySelector("#input-quote"+i).dataset.quoteid;
        const quoteValue = e.target.querySelector("#input-quote"+i).value;
        const quote = {
          id: quoteId,
          quote: quoteValue
        }
        newQuotes.push(quote)
      }
      console.log(newQuotes)

      this.adapter.updateBook(book.id, title, author, summary, newQuotes).then(updatedBook => console.log(updatedBook));

    }

    handleEditClick(e) {
      const id = e.target.dataset.id;
      const book = Book.findById(id);
      document.querySelector('#update-book').innerHTML = book.renderUpdateForm();
    }
  }
