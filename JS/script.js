

let modal = document.querySelector('add-book__container');
let addbutton = document.getElementsByName('add-button');
let remButton = document.getElementsByName('remove-button');
let titleInp = document.getElementsByName('book-title');
let authorInp = document.getElementsByName('book-author');
let bookList = [];

function objBook (title, author) {
    let newBook = new Object();
    book.push(bookList);

    let index = bookList.length -1;

    bookList[index].title = title;
    bookList[index].author = author;
    booklist[index].index = index;
}

addEventListener.addbutton('click', () => {
    objBook(titleInp.value, authorInp.value);
})

