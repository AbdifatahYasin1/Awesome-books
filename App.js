let form = document.getElementById("form");
let Author = document.querySelector(".Author");
let Title = document.querySelector(".Title");
let msg = document.getElementById("msg");
let bookText = document.getElementById("book-text");
let containerbooks = document.querySelector(".container-books");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
});

let formValidation = () => {
  if (Title.value === "" && Author.value === "") {
    msg.innerHTML = "Please add new Book";
    console.log("failure");
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

let acceptData = () => {
  let books = [
    {
      book: ["text1"],
      book: ["text2"],
    },
  ];

  if (localStorage.getItem("book") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("book"));
    console.log(books);
  }
  let book = { text1: Title.value, text2: Author.value };
  books.push(book);
  localStorage.setItem("book", JSON.stringify(books));
  renderData();
};
document.addEventListener("DOMContentLoaded", renderData);

function renderData() {
  bookText.innerHTML = "";
  let books = [];
  if (localStorage.getItem("book") === null) {
    console.log("Not Data Found");
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("book"));
    console.log(books);
    books.forEach((book) => {
      bookText.innerHTML += `
        <p>${book.text1}</p>
        <p>${book.text2}</p>
        <button onclick="deleteBook('${book.text1}', '${book.text2}')">Remove</button>

      `;
    });

    Title.value = "";
    Author.value = "";
  }
}

function deleteBook(text1, text2) {
  let books = [];

  if (localStorage.getItem("book") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("book"));
  }
  books.forEach((book, index) => {
    if (book.text1 === text1 && book.text2 === text2) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem("book", JSON.stringify(books));
  renderData();
}
