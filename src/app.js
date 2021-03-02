class App {
  attachEventListeners() {
    document.querySelector('#book-container').addEventListener('click', e => {
      console.log('clicked');
      const id = e.target.dataset.id;
      const book = Book.findById(id);
      console.log(book);
    });
  }
}
