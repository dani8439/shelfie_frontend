class App {
  attachEventListeners() {
    document.querySelector('#update-book').addEventListener('submit', e => {
      console.log('clicked');
      e.preventDefault();
      const id = e.target.dataset.id;
      const book = Book.findById(id);
      const title = e.target.querySelector("#input-title").value;
      const author = e.target.querySelector("#input-author").value;
      const summary = e.target.querySelector("#input-summary").value;

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

      fetch(`http://localhost:3000/api/v1/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          title: title,
          author: author,
          summary: summary,
          quotes_attributes: newQuotes

        })
      })
      .then(res => res.json())
      .then(updatedBook => console.log(updatedBook))
    });
  }
}
