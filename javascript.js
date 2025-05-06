// JAVASCRIPT CODE  


// Book Array, empty; for storing book instances. 
const myLibrary = [];

// Book constructor;  template for creating each book. 
function Book(title, author, pages, readingStatus) {
    this.id = crypto.randomUUID(); // Unique ID, randomly generated. 
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readingStatus = readingStatus; // can be true, false, or 'reading'
  
    // function to determine if book if already read, not read yet, or currently read. 
    this.info = function() {
      let statusMessage; // variable not assigend, and can be reassigned. 
  
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

// Create function
function displayBooksAsCards() {
  const container = document.getElementById("libraryDisplay"); // To select the libraryDisplay ID in the HTML doc.
  container.innerHTML = ""; // Clear previous content
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "2rem";

  // To loop through each book stored in the myLibrary array, & their index. 
  myLibrary.forEach((book, index) => {  // loop through each book object with index
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
  
    // Create a container for the card buttons
    const cardButtonContainer = document.createElement("div"); // Create the div
    cardButtonContainer.classList.add("cardButtonContainer");  // Add the class
    
    //  Create Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.classList.add("removeBtn"); // Make removeBtn a class. 

    // Add Event listener to the removeBtn 
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Remove the book by its index
      displayBooksAsCards(); // Re-render the book cards, after the removal. 
    });

    // Create Change Read Status
    const changeReadStatus = document.createElement("button");
    changeReadStatus.textContent = "Δ Read status"; 
    changeReadStatus.classList.add("changeReadStatus"); 
  
    // Add Event listener to the Change Read Status button
    changeReadStatus.addEventListener("click", () => {
      // Create select dropdown
    const select = document.createElement("select");
    
    const options = [
      { label: "Already read", value: true },
      { label: "Not read yet", value: false },
      { label: "Currently reading", value: "reading" }
    ];

    // Loop through the options
    options.forEach(opt => {
      const option = document.createElement("option"); // Create an option element.
      option.textContent = opt.label; // The option texts should be the labels in the options variable.
      option.value = opt.value;
      // Mark current status as selected
      if (String(book.readingStatus) === String(opt.value)) {
        option.selected = true;
      }
      select.appendChild(option); // Attach option to the select element. 
    });

    // Replace the button with the dropdown temporarily
    changeReadStatus.replaceWith(select); // Replace the DOM element changeReadStatus with select. 

  // Add event listener to the select element
    select.addEventListener("change", () => {
      const newStatusValue = select.value;
      let parsedValue;

      if (newStatusValue === "true") {
        parsedValue = true;
      } else if (newStatusValue === "false") {
        parsedValue = false;
      } else {
        parsedValue = "reading";
      }
      book.setReadingStatus(parsedValue);
      displayBooksAsCards(); // Refresh UI
    });
  });


    cardButtonContainer.append(removeBtn, changeReadStatus); // Make removeBtn & ChangeReadStatus children of the cardButtonContainer.
    card.appendChild(cardButtonContainer); // Make cardButtonContainer child of card.
    container.appendChild(card); // Make card the child of container
  });
}

// Added a new method to the prototype of book (Book.prototype)
Book.prototype.setReadingStatus = function (newStatus) {
  const validStatuses = [true, false, "reading"];
  if (validStatuses.includes(newStatus) && this.readingStatus !== newStatus) {
    this.readingStatus = newStatus;
  }
};


// To get the books displayed, we call
displayBooksAsCards();


// TO GET A FORM WHEN THE "NEW BOOK" button is clicked
const displayFormBtn = document.querySelector(".displayFormBtn"); // Select the HTML displayFormBtn. 
const bookForm = document.getElementById("bookForm"); // Select the form element. 

// Add event listener to the New Book button
displayFormBtn.addEventListener("click", () => {
  bookForm.style.display = bookForm.style.display === "none" ? "grid" : "none";
});


// Add event listener to the Submit button
bookForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the information from submitting to a server, & reload page. 

  // Get form values
  const title = document.getElementById("title").value.trim(); // Select the input element with Id "title", collects the value provided in that input, & trim it. 
  const author = document.getElementById("author").value.trim(); // Same as above.
  const pages = parseInt(document.getElementById("pages").value); // Same as above. 
  const readingStatusRaw = document.getElementById("readingStatus").value; // Select the select element with the id "readingStatus", and collects the option selected. 

  // Convert string to correct type
  let readingStatus;
  if (readingStatusRaw === "true") {
    readingStatus = true;
  } else if (readingStatusRaw === "false") {
    readingStatus = false;
  } else {
    readingStatus = "reading";
  }

  // Create a new Book and add to library from the information provided in the form. 
  const newBook = new Book(title, author, pages, readingStatus);
  myLibrary.push(newBook);

  // Reset form and hide it again
  bookForm.reset();
  bookForm.style.display = "none";

  displayBooksAsCards(); 
});
