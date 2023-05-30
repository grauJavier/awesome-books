// GLOBAL VARIABLES
let bookShelf = document.querySelector("#books-listed__container");
let addButton = document.querySelector("#add-book__form");
let titleInp = document.querySelector("#add-book__title");
let authorInp = document.querySelector("#add-book__author");
let bookList = JSON.parse(localStorage.bookShelfData);
let removeButtonArr = [];

// 1.0 LOCAL STORAGE
//   1.1 Testing for availability
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

  removeButtonArr = document.querySelectorAll('.book__remove-button');
}

// RELOAD
function reloadData() {
  let tempArr = JSON.parse(localStorage.bookShelfData);

  for (let i = 0; i < tempArr.length; i++) {
    printHTML(tempArr[i].title, tempArr[i].author);
  }

  removeButtonArr = document.querySelectorAll('.book__remove-button');
}

reloadData();

// 3.0 SAVE DATA
//   3.1 Function to save data
function saveData() {
  if (storageAvailable("localStorage")) {
    let newBook = {
      "title": titleInp.value,
      "author": authorInp.value
    }

    bookList.push(newBook);

    localStorage.setItem(
      "bookShelfData",
      JSON.stringify(bookList)
    );
  } else {
    console.log("ERROR: Localstorage not aviable.");
  }
}


//  3.2 Event listener to call saveData() and printHTML()
addButton.addEventListener("submit", function (event) {
  event.preventDefault();
  saveData();

  printHTML(titleInp.value, authorInp.value);
  addButton.reset();
});

//4.0 ERASE DATA

function eraseData(title) {
  bookList = bookList.filter(book, function() {
    book.title != title
  })

  localStorage.setItem(
    "bookShelfData",
    JSON.stringify(bookList)
  );

  removeButtonArr = document.querySelectorAll('.book__remove-button');
}

removeButtonArr.forEach((button) => {
  button.addEventListener('click', () => {

    console.log(button.querySelector('#book__title').innerHTML)
    button.parentElement.remove(); 

  //eraseData('#book__title')

  })
})