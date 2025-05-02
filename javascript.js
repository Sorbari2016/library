// JAVASCRIPT CODE 


// Book Array
const myLibrary = [];

// Book constructor
function Book(title, author, pages, readingStatus) {
    this.id = crypto.randomUUID(); // Unique ID
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatus; // can be true, false, or 'reading'
  
    // function
    this.info = function() {
      let statusMessage;
  
      if (this.readingStatus === true) {
        statusMessage = "already read";
      } else if (this.readingStatus === false) {
        statusMessage = "not read yet";
      } else if (this.readingStatus === "reading") {
        statusMessage = "currently reading";
      } else {
        statusMessage = "status unknown";
      }
  
      return `${this.title} by ${this.author}, ${this.pages} pages, ${statusMessage}`;
    };
  }



//   To create a new book instance and store in the empty array above; myLibrary

function addBookToLibrary(title, author, pages, readingStatus) { // addBookToLibrary function with param same as the BOok constructor
  const newBook = new Book(title, author, pages, readingStatus); // new object newBook made from the Book constructor.
  myLibrary.push(newBook);//Book instance created is then stored in the myLibrary arrary. 
}

addBookToLibrary("Atomic Habits", "James Clear",306,true); 

console.log(myLibrary);