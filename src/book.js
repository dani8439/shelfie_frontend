class Book {
  constructor(id, bookAttributes) {
    this.id = id;
    this.title = bookAttributes.title;
    this.author = bookAttributes.author;
    this.summary = bookAttributes.summary;
    this.quotes = bookAttributes.quotes

    // console.log(this.quotes)
    // for each inside of here.
    Book.all.push(this)
    // console.log(this);
  }

  renderBookCard() {
    let html_string = ''
    html_string = html_string + `
    <div class="card border-dark mb-3" style="max-width: 50rem;">
    <div class="card-header"></div>
      <div class="card-body" id="book${this.id}">
        <h2 class="card-title">${this.title}</h2>
        <h4 class="card-title">${this.author}</h4>
        <p class="card-text"><b>Summary:</b> ${this.summary}</p>
        <p class="card-text"><b>Memorable Quotes:</b></p>`;

        this.quotes.forEach(quote_info => {
          html_string = html_string + `<p>` + quote_info.quote + `</p>`
        });

        html_string = html_string + `<button data-id=${this.id} id="edit-button" class="btn btn-outline-secondary">edit</button>

        </div>
        <br><br>
      </div>
      </div>`;
      return html_string;

  }

  static findById(id) {
    return this.all.find(book => book.id === id);
  }

  // Book.all.forEach(book => (book.quotes.forEach(function(quote) { console.log( quote.id, quote.quote)})))
  // Book.all.forEach(book => book.quotes.forEach(function(quote) { console.log(book.title, quote.id, quote.quote)}))

  renderUpdateForm() {
    let html_string = ''
    html_string = html_string + `
    <form data-id=${this.id}>
    <fieldset>
      <legend>Edit A Book</legend>
      <div class="form-group row">
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="title" id='input-title' type="text" name="title" value="${this.title}" class="form-control">
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="author" id='input-author' type="text" name="author" value="${this.author}" class="form-control">
      </div>
      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea id='input-summary' type="text" name="summary" rows="3" value="" class="form-control">${this.summary}</textarea>
      </div>
      <div class="form-group">
        <label for="quotes">Quotes</label>`;

        let counter = 0
        this.quotes.forEach(quote_info => {
          counter +=1;
          html_string = html_string + `<textarea id="input-quote${counter}" name="quote${quote_info.id}" data-quoteid="${quote_info.id}" rows="3" class="form-control">` + quote_info.quote + `</textarea> <br>`
        });

        // act as a check to check quote_count and then for blank fields
        html_string = html_string + `<input id='quote_count' type="hidden" name="quote_count" value="${counter}">`
        html_string = html_string + `
        <input id='edit-button' type="submit" name="submit" value="Save Book" class="btn btn-secondary">


      </div>
    </fieldset>
    </form>
    `;

    return html_string
 }



  renderNewQuote() {
    let html_string = ''
    html_string = html_string + `
    <form data-id=${this.id}>
      <fieldset>
        <legend>Add A Quote</legend>

        <div class="form-group">
          <label for="quote">Quote</label>
          <textarea class="form-control" id="input-quote" name="quote" rows="3" value="" data-bookid="${this.id}"></textarea>
        </div>
        <button type="submit" id="save-quote" class="btn btn-secondary">Save Quote</button>
      </fieldset>
    </form>
    `;
    return html_string

  }
}

Book.all = [];
