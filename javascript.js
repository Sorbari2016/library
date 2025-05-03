// JAVASCRIPT CODE 


// Book Array, empty; for storing book instances. 
const myLibrary = [];

// Book constructor;  tenplate for creating each book. 
function Book(title, author, pages, readingStatus) {
    this.id = crypto.randomUUID(); // Unique ID, randomly generated. 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatus; // can be true, false, or 'reading'
  
    // function to determine if book if already read, not read yet, or currently read. 
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
// We create a new function
function addBookToLibrary(title, author, pages, readingStatus) { // addBookToLibrary function with params same as the BOok constructor
  const newBook = new Book(title, author, pages, readingStatus); // new object newBook made from the Book constructor.
  myLibrary.push(newBook);//Book instance created is then stored in the myLibrary arrary. 
}

// Book instances, which will be stored in myLibrary. 
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "reading")
addBookToLibrary("Atomic Habits", "James Clear",306,true); 
addBookToLibrary("Purple Hibiscus", "Chimamanda Adichie", 345, true); 
addBookToLibrary("What it means when a man falls from the sky", "Lesley Nneka Arimah", 194, false); 
addBookToLibrary("Power Seed", "George & Manuella Izunwa", 47, "reading"); 


// TO DISPLAY EACH BOOK AS A CARD

function displayBooksAsCards() {
  const container = document.getElementById("libraryDisplay"); // To select the libraryDisplay ID in the HTML doc.
  container.innerHTML = ""; // Clear previous content
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "2rem";

// To loop through each book stored in the myLibrary array
  myLibrary.forEach(book => {  // loop through each book object
    const card = document.createElement("div"); //Create a div container
    card.style.border = "1px solid #ccc"; 
    card.style.borderRadius = "8px";
    card.style.padding = "1rem";
    card.style.width = "200px";
    card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

    const statusMessage = book.info().split(", ").pop(); 
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${statusMessage}</p>
    `;

    container.appendChild(card); // Make the div(card) a child of the container
  });
}

// To get the books displayed, we call
displayBooksAsCards();


// TO GET A FORM WHEN THE "NEW BOOK" button is clicked
const displayFormBtn = document.querySelector(".displayFormBtn"); // Select the HTML displayFormBtn. 
const bookForm = document.getElementById("bookForm"); // Select the form.

// Add event listener to the New Book button
displayFormBtn.addEventListener("click", () => {
  bookForm.style.display = bookForm.style.display === "none" ? "grid" : "none";
});


// Add event listener to the Submit button
bookForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get form values
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value);
  const readingStatusRaw = document.getElementById("readingStatus").value;

  // Convert string to correct type
  const readingStatus =
    readingStatusRaw === "true"
      ? true
      : readingStatusRaw === "false"
      ? false
      : "reading";

  // Create a new Book and add to library
  const newBook = new Book(title, author, pages, readingStatus);
  myLibrary.push(newBook);

  // Optional: reset form and hide it again
  bookForm.reset();
  bookForm.style.display = "none";

  // Optional: update display
  displayBooksAsCards(); // <-- only if you already have this function
});
