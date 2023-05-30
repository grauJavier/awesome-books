// GLOBAL VARIABLES
const bookShelf = document.querySelector("#books-listed__container");
const addButton = document.querySelector("#add-book__form");
const titleInp = document.querySelector("#add-book__title");
const authorInp = document.querySelector("#add-book__author");
let bookList = [];
let removeButtonArr = [];

// 1.0 LOCAL STORAGE
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

// 2.0 PRINT HTML
function printHTML(title, author) {
  bookShelf.insertAdjacentHTML(
    "beforeend",
    `
     <div id="books-listed__book">
        <p id="book__title">${title}</p>
        <p id="book__author">${author}</p>
        <button type="button" class="book__remove-button">Remove</button>
        <hr />
      </div>
    `
  );

  removeButtonArr = document.querySelectorAll(".book__remove-button");
}

// 3.0 ERASE DATA
//   3.1 Erase data function
function eraseData(titleErase) {
  bookList = bookList.filter((book) => book.title !== titleErase);
  localStorage.setItem("bookShelfData", JSON.stringify(bookList));
  removeButtonArr = document.querySelectorAll(".book__remove-button");
}

//  3.2 Add listener to call eraseData() to each 'Remove' button
function removeButtonLoader() {
  removeButtonArr.forEach((button) => {
    button.addEventListener("click", () => {
      eraseData(button.parentNode.querySelector("#book__title").innerHTML);
      button.parentElement.remove();
    });
  });
}

// 4.0 SAVE DATA
//   4.1 Function to save data
function saveData() {
  if (storageAvailable("localStorage")) {
    const newBook = {
      title: titleInp.value,
      author: authorInp.value,
    };

    bookList.push(newBook);
    localStorage.setItem("bookShelfData", JSON.stringify(bookList));
  } else {
    console.log("ERROR: Localstorage not aviable.");
  }
}

//  4.2 Add listener to call saveData() and printHTML() in 'Add' button
addButton.addEventListener("submit", (event) => {
  event.preventDefault();
  saveData();
  printHTML(titleInp.value, authorInp.value);
  removeButtonLoader();
  addButton.reset();
});

// 5.0 RELOAD
//   5.1 Reload data function
function reloadData() {
  const tempArr = JSON.parse(localStorage.bookShelfData);

  for (let i = 0; i < tempArr.length; i + 1) {
    printHTML(tempArr[i].title, tempArr[i].author);
  }

  removeButtonArr = document.querySelectorAll(".book__remove-button");
}

//   5.2 Reload data if is NOT undefined
if (localStorage.bookShelfData !== undefined) {
  bookList = JSON.parse(localStorage.bookShelfData);
  removeButtonArr = document.querySelectorAll(".book__remove-button");
  reloadData();
  removeButtonLoader();
}
