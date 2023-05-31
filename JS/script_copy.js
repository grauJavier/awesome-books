function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException
      // everything except Firefox
      && (error.code === 22
        // Firefox
        || error.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || error.name === 'QuotaExceededError'
        // Firefox
        || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

class Bookshelf {
  constructor() {
    this.bookList = [];
    this.removeButtonArr = [];
    this.bookShelf = document.querySelector('#books-listed__body');
    this.addButton = document.querySelector('#add-book__form');
    this.titleInp = document.querySelector('#add-book__title');
    this.authorInp = document.querySelector('#add-book__author');

    if (localStorage.bookShelfData !== undefined) {
      this.bookList = JSON.parse(localStorage.getItem('bookShelfData'));
      this.removeButtonArr = document.querySelectorAll('.book__remove-button');
    }

    this.addButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
      this.addButton.reset();
    });
  }

  printHTML(title, author) {
    this.bookShelf.insertAdjacentHTML(
      'beforeend',
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
      `,
    );
    this.removeBook();
  }

  addData(obj) {
    this.bookList.push(obj);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.printHTML(obj.title, obj.author);
  }

  addBook() {
    const newBook = {
      title: this.titleInp.value,
      author: this.authorInp.value,
    };

    this.addData(newBook);
  }

  removeData(titleRemove) {
    this.bookList = this.bookList.filter((book) => book.title !== titleRemove);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');
  }

  removeBook() {
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');

    this.removeButtonArr.forEach((button) => {
      button.addEventListener('click', () => {
        this.removeData(
          button.parentNode.parentNode.querySelector('#book__title').innerHTML,
        );
        button.parentElement.parentNode.remove();
      });
    });
  }
}

const bookshelf = new Bookshelf();
