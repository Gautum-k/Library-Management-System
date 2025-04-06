document.addEventListener('DOMContentLoaded', () => {
    showBooks();
  });
  
  document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const editingIndex = this.getAttribute('data-editing-index');
  
    if (!title || !author || !isbn) {
      alert('Please fill in all fields');
      return;
    }
  
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    const newBook = { title, author, isbn };
  
    if (editingIndex !== null) {
      books[editingIndex] = newBook;
      this.removeAttribute('data-editing-index');
      this.querySelector('button').textContent = 'Add Book';
    } else {
      books.push(newBook);
    }
  
    localStorage.setItem('books', JSON.stringify(books));
    this.reset();
    showBooks();
  });
  
  document.getElementById('search').addEventListener('input', showBooks);
  document.getElementById('sort').addEventListener('change', showBooks);
  
  function showBooks() {
    const list = document.querySelector('#book-list tbody');
    list.innerHTML = '';
  
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    const search = document.getElementById('search').value.toLowerCase();
    const sort = document.getElementById('sort').value;
  
    if (sort) {
      books.sort((a, b) => a[sort].localeCompare(b[sort]));
    }
  
    if (search) {
      books = books.filter(book =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
      );
    }
  
    books.forEach((book, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
          <button class="edit" onclick="editBook(${index})">Edit</button>
          <button class="delete" onclick="deleteBook(${index})">Delete</button>
        </td>
      `;
  
      list.appendChild(row);
    });
  }
  
  function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (confirm('Are you sure you want to delete this book?')) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      showBooks();
    }
  }
  
  function editBook(index) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books[index];
  
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('isbn').value = book.isbn;
  
    const form = document.getElementById('book-form');
    form.setAttribute('data-editing-index', index);
    form.querySelector('button').textContent = 'Update Book';
  }
  