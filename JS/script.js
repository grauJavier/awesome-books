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
    this.bookList = JSON.parse(localStorage.getItem('bookShelfData')) || [];
    this.removeButtonArr = document.querySelectorAll('.book__remove-button') || [];
    this.bookShelf = document.querySelector('#books-listed__body');
    this.addButton = document.querySelector('#add-book__form');
    this.titleInp = document.querySelector('#add-book__title');
    this.authorInp = document.querySelector('#add-book__author');
    this.textEmpty = document.querySelector('#books-listed__text-empty');

    this.addButton.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook();
      this.addButton.reset();
      this.emptyMessage();
    });
  }

  emptyMessage() {
    if (
      localStorage.bookShelfData === '[]'
      || localStorage.bookShelfData === undefined
    ) {
      this.textEmpty.classList.replace('d-none', 'd-block');
    } else {
      this.textEmpty.classList.replace('d-block', 'd-none');
    }
  }

  printHTML(title, author, bookID) {
    this.bookShelf.insertAdjacentHTML(
      'beforeend',
      `
       <tr id="books-listed__book">
         <td id="book__title">${title}</td>
         <td id="book__author">by ${author}</td>
         <td class="text-end">
           <button type="button" class="book__remove-button btn btn-outline-primary rounded-pill" book-id="${bookID}">
             Remove
           </button>
         </td>
       </tr>
      `,
    );
    this.removeBook();
  }

  addData(obj) {
    this.bookList = this.bookList.concat(obj);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.printHTML(obj.title, obj.author, obj.id);
  }

  addBook() {
    if (storageAvailable('localStorage')) {
      const newBook = {
        title: this.titleInp.value,
        author: this.authorInp.value,
        id: (`book${this.bookList.length}`),
      };

      this.addData(newBook);
    } else {
      console.log('ERROR: Localstorage not aviable.');
    }
  }

  removeData(bookID) {
    this.bookList = this.bookList.filter((book) => book.id !== bookID);
    localStorage.setItem('bookShelfData', JSON.stringify(this.bookList));
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');
  }

  removeBook() {
    this.removeButtonArr = document.querySelectorAll('.book__remove-button');

    this.removeButtonArr.forEach((button) => {
      button.addEventListener('click', () => {
        this.removeData(
          button.getAttribute('book-id'),
        );
        button.parentElement.parentNode.remove();
        this.emptyMessage();
      });
    });
  }

  loader() {
    this.emptyMessage();
    for (let i = 0; i < this.bookList.length; i += 1) {
      this.printHTML(this.bookList[i].title, this.bookList[i].author);
    }
  }
}

const bookshelf = new Bookshelf();
bookshelf.loader();
