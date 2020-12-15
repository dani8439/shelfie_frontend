const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () => {
  fetch(endPoint)
  .then(response => response.json())
  .then(books => {
    console.log(books);
  })
})
