# Shelfie

A single page web application allowing a user to create a detailed summary of books they have read, and highlight favorite quotes. A user may edit any book they add to the database, as well as quotes, and save as many quotes as they wish. 

The app is built using a Rails API backend, and JavaScript, HTML, CSS, and Bootstrap for the frontend. The Rails API was created with a Postgres database.

# How to use it
The backend is located here: https://github.com/dani8439/shelfie_backend

1. Clone both repositories to your computer.
2. CD into `shelfie_backend`.
3. Run the following commands: `bundle install`
4. Run `rake db:create` to create the databse.
5. Run `rake db:seed` to seed the database.
6. Run `rails s` to start the server.
7. Open `localhost:3000/api/v1/books` in your browser.
8. CD into `shelfie_frontend`.
9. Open the `index.html` file in your browser. Shelfie will be ready for you to use and save your favorite books. 
