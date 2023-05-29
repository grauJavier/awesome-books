let modal = document.querySelector("#books-listed__table");
let addButton = document.querySelector("#add-book__form");
let remButton = document.querySelector("#remove-button");
let titleInp = document.querySelector("#book-title");
let authorInp = document.querySelector("#book-author");
let bookList = [];

function objBook(title, author) {
  let newBook = new Object();
  bookList.push(newBook);

  let i = bookList.length - 1;

  bookList[i].title = title;
  bookList[i].author = author;
  bookList[i].index = i;

  return i;
}

addButton.addEventListener("submit", function (e) {
  e.preventDefault();
  let index = objBook(titleInp.value, authorInp.value);

  modal.insertAdjacentHTML(
    "beforeend",
    `
        <tr>
            <td>${bookList[index].title}</td>
            <td>${bookList[index].author}</td>
            <td><button type="button" id="remove-button${bookList[index].index}">Remove</button></td>
        </tr>
    `);

    addButton.reset();

    console.log(bookList[index])
});
