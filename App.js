let form = document.querySelector("#form");
let Author = document.querySelector(".Author");
let Title = document.querySelector(".Title");
let msg = document.getElementById("msg");
let bookText = document.getElementById("book-text");
let containerbooks = document.querySelector(".container-books");
let container = document.querySelector(".container");
let list = document.querySelector(".list");
const addNew = document.querySelector(".addNew");
const contact = document.querySelector("#contact");
const displayContact = document.querySelector("#display_contact");
const displayBooks = document.querySelector("#display_list");
const displayForm = document.querySelector("#display_form");
const date = document.querySelector(".date");
class Book {
  constructor() {}

  static validateInputData(title, author) {
    if (title.length < 1 || author.length < 1) {
      return false;
    }
    return true;
  }

  save(title, author) {
    let books = [];
    if (localStorage.getItem("book") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));
      console.log(books);
    }
    let book = { text1: title, text2: author };
    books.push(book);
    localStorage.setItem("book", JSON.stringify(books));
  }

  static addBook(title, author) {
    const isValidInput = this.validateInputData(title, author);
    if (!isValidInput) console.log("Enter Valid Input");
    else {
      let book = new Book(title, author);
      book.save(title, author);
      this.renderBooks();
    }
  }

  static removeBook(title, author) {
    let books = [];

    if (localStorage.getItem("book") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));
    }
    books.forEach((book, index) => {
      if (book.text1 === title && book.text2 === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("book", JSON.stringify(books));
    this.renderBooks();
  }
  static renderBooks() {
    bookText.innerHTML = "";
    let books = [];
    if (localStorage.getItem("book") === null) {
      console.log("Not Data Found");
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("book"));
      console.log(books);
      books.forEach((book) => {
        console.log(book);
        bookText.innerHTML += `
            <div class="wrapper">
                <p>${book.text1}</p>
                <p>${book.text2}</p>
                <button onclick="deleteBook('${book.text1}', '${book.text2}')">Remove</button>
                </div>
            `;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", Book.renderBooks());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  Book.addBook(Title.value, Author.value);
  Title.value = "";
  Author.value = "";
});

function deleteBook(text1, text2) {
  Book.removeBook(text1, text2);
}

///this is new

contact.innerHTML = `<h2>
        Contact information
        </h2>

        <ul>
          <li>Our shiineali101@gmail.com</li>
          <li>Our Phone number:00252633141196</li>
          <li>Our address:150 street Hargeisa, Somalia</li>
        </ul>`;

function showOnlyContact() {
  contact.style.display = "block";
  container.style.display = "none";
  bookText.style.display = "none";
}

const showBooksOnly = () => {
  container.style.display = "none";
  bookText.style.display = "block";
  contact.style.display = "none";
  date.style.display = "none";
};
const showOnlyForm = () => {
  container.style.display = "block";
  bookText.style.display = "none";
  contact.style.display = "none";
  date.style.display = "none";
};

function init() {
  if (location.hash === "/#book-list") {
    showBooksOnly();
  } else if (location.hash === "#form") {
    showOnlyForm();
  } else if (location.hash === "#contact") {
    showOnlyContact();
  } else {
    showOnlyForm();
  }
}
window.document.addEventListener("DOMContentLoaded", init());
displayContact.addEventListener("click", showOnlyContact);
displayBooks.addEventListener("click", showBooksOnly);
displayForm.addEventListener("click", showOnlyForm);

function showDate() {
  date.innerHTML = `${new Date()}`;
}

setInterval(showDate, 1000);
