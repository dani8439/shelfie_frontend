class App {

  attachEventListeners() {
    document.querySelector('#book-container').addEventListener('click', e => {
      const id = e.target.dataset.id;
      const book = Book.findById(id);
      console.log('clicked');
      console.log(book);
    });
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

}
