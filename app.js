// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

//  Show alert
UI.prototype.showAlert = function(message, className){
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
    // Show Alert
    this.showAlert('Book Removed', 'success');
  }
}

// Clear fields
UI.prototype.clearFields = function(){
  title.value = '';
  author.value = '';
  isbn.value = '';
}

// Local storage

UI.prototype.getBooks = function(){
  let books;
  if(localStorage.getItem('books') === null){
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

UI.prototype.displayBooks = function(){
  const books = ui.getBooks();
  books.forEach(function(book){
    const ui = new UI;
    // Add book to UI
    ui.addBookToList(book);
  });
}

UI.prototype.addBook = function(book){
  const books = ui.getBooks();

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

UI.prototype.removeBook = function(isbn){
  const books = ui.getBooks();

  books.forEach(function(book, index){
    if(book.isbn === isbn){
      books.splice(index, 1)
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}
// Instantite UI
const ui = new UI();

// DOM Load Event
document.addEventListener('DOMContentLoaded', ui.displayBooks());

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  
  // Instantiate book 
  const book = new Book(title, author, isbn);

  // Instantiate UI went here before i added LS

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    ui.addBook(book);

    // Clear fields
     ui.clearFields();
    //  Success alert
    ui.showAlert('Book Added!', 'success');
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
  // Instatiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  // Remove from LS
  ui.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  e.preventDefault();
});