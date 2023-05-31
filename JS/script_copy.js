function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      // everything except Firefox
      (error.code === 22 ||
        // Firefox
        error.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        error.name === "QuotaExceededError" ||
        // Firefox
        error.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function printHTML(title, author) {
  bookShelf.insertAdjacentHTML(
    "beforeend",
    `
     <tr id="books-listed__book">
       <td id="book__title">"${title}"</td>
       <td id="book__author">by ${author}</td>
       <td class="text-end">
         <button type="button" class="book__remove-button btn btn-outline-primary rounded-pill">
           Remove
         </button>
       </td>
     </tr>
    `
  );

  Bookshelf.removeBook();
}

class Bookshelf {
  constructor() {
    this.bookList = () =>
      JSON.parse(localStorage.bookShelfData) ? 
      JSON.parse(localStorage.bookShelfData) : [];
  }

  addData(obj) {
    this.bookList.push(obj);
    localStorage.setItem("bookShelfData", JSON.stringify(bookList));
    printHTML(newBook.title, newBook.author);
  }

  addBook() {
    this.addButton = document.querySelector("#add-book__form");
    this.titleInp = document.querySelector("#add-book__title");
    this.authorInp = document.querySelector("#add-book__author");

    let newBook = {
      title: titleInp.value,
      author: authorInp.value,
    };

    this.addData(newBook);

    this.addButton.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addBook();
      addButton.reset();
    });
  }

  removeData(titleRemove) {
    bookList = bookList.filter((book) => book.title !== titleRemove);
    localStorage.setItem("bookShelfData", JSON.stringify(bookList));
    removeButtonArr = document.querySelectorAll(".book__remove-button");
  }

  removeBook() {
    this.removeButtonArr = () =>
      document.querySelectorAll(".book__remove-button") ? 
      document.querySelectorAll(".book__remove-button") : [];

    removeButtonArr.forEach((button) => {
      button.addEventListener("click", () => {
        this.removeData(
          button.parentNode.querySelector("#book__title").innerHTML
        );
        button.parentElement.remove();
      });
    });
  }
}

const bookshelf = new Bookshelf();



// class Bookshelf {
//   constructor() {
//     this.bookList = JSON.parse(localStorage.bookShelfData) || [];
//     this.addButton = document.querySelector("#add-book__form");
//     this.titleInp = document.querySelector("#add-book__title");
//     this.authorInp = document.querySelector("#add-book__author");

//     this.addButton.addEventListener("submit", this.handleAddBook.bind(this));

//     this.loadBooks();
//   }

//   handleAddBook(event) {
//     event.preventDefault();

//     const newBook = {
//       title: this.titleInp.value,
//       author: this.authorInp.value,
//     };

//     this.addData(newBook);
//     this.addButton.reset();
//   }

//   addData(book) {
//     this.bookList.push(book);
//     localStorage.setItem("bookShelfData", JSON.stringify(this.bookList));
//     this.printHTML(book);
//     this.removeButtonLoader();
//   }

//   loadBooks() {
//     this.bookList.forEach((book) => this.printHTML(book));
//     this.removeButtonLoader();
//   }

//   printHTML(book) {
//     const bookContainer = document.createElement("div");
//     bookContainer.id = "books-listed__book";
//     bookContainer.innerHTML = `
//       <p id="book__title">${book.title}</p>
//       <p id="book__author">${book.author}</p>
//       <button type="button" class="book__remove-button">Remove</button>
//       <hr />
//     `;

//     const removeButton = bookContainer.querySelector(".book__remove-button");
//     removeButton.addEventListener("click", () => {
//       this.removeBook(book.title);
//       bookContainer.remove();
//     });

//     this.bookShelfContainer.appendChild(bookContainer);
//   }

//   removeBook(title) {
//     this.bookList = this.bookList.filter((book) => book.title !== title);
//     localStorage.setItem("bookShelfData", JSON.stringify(this.bookList));
//   }

//   removeButtonLoader() {
//     const removeButtons = document.querySelectorAll(".book__remove-button");
//     removeButtons.forEach((button) => {
//       const title = button.parentNode.querySelector("#book__title").innerHTML;
//       button.addEventListener("click", () => {
//         this.removeBook(title);
//         button.parentElement.remove();
//       });
//     });
//   }
// }

// const bookshelf = new Bookshelf();
