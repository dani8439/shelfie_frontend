class Adapter {
  constructor() {
    this.baseURL = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  fetchBooks() {
    return fetch(`${this.baseURL}/books`);
  }

  updateBook(id, body) {
    return this.patch(`${this.baseURL}/books/${id}`, body);
  }


  get(url) {
    return fetch(url).then(res => res.json());
  }

  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }
}
