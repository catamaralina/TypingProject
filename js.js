function addTextOnEnter(event) {
  if (event.key === 'Enter') {
    addText();
  }
}

function addText() {
  var userInput = document.getElementById("userInput").value;
  var displayDiv = document.getElementById("displayText");

  // Create a new paragraph element for the new input
  var newParagraph = document.createElement("p");

  // Process the input to make words between asterisks bold
  var formattedText = userInput.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

  // Set the inner HTML of the new paragraph to the formatted text
  newParagraph.innerHTML = formattedText;

  // Append the new paragraph to the display div
  displayDiv.appendChild(newParagraph);

  // Save the updated text to local storage
  localStorage.setItem("userInput", displayDiv.innerHTML);

  // Clear the input field after adding text
  document.getElementById("userInput").value = "";
}

function clearStoredText() {
  localStorage.removeItem("userInput");
  document.getElementById("displayText").innerHTML = "";
}

window.onload = function() {
  var savedInput = localStorage.getItem("userInput");
  if (savedInput) {
    document.getElementById("displayText").innerHTML = savedInput;
  }
};

document.getElementById("userInput").addEventListener("keypress", addTextOnEnter);

document.addEventListener('DOMContentLoaded', function() {
  // Get the link and content container
  var textLink = document.getElementById('text-link');
  var contentContainer = document.getElementById('content-container');

  // Add click event listener to the link
  textLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Fetch the content from a text file
    fetch('text.txt')
      .then(response => response.text())
      .then(data => {
        // Display the content in the content container
        contentContainer.textContent = data;
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching text:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get all file links
  var fileLinks = document.querySelectorAll('.file-link');
  var contentContainer = document.getElementById('content-container');

  // Add click event listener to each file link
  fileLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior

      var file = this.getAttribute('data-file');

      // Fetch the content from the selected file
      fetch(file)
        .then(response => response.text())
        .then(data => {
          // Split the text into paragraphs assuming each new line starts a new paragraph
          var paragraphs = data.split('\n'); // Adjust this if your file uses a different delimiter

          // Clear existing content
          contentContainer.innerHTML = '';

          // Create paragraphs and append to content container
          paragraphs.forEach(function(paragraphText) {
            var p = document.createElement('p');
            p.textContent = paragraphText.trim(); // Trim any leading/trailing whitespace
            contentContainer.appendChild(p);
          });
        })
        .catch(error => {
          // Handle errors
          console.error('Error fetching file:', error);
        });
    });
  });

  // Attach clearContent function to the clear button
  var clearButton = document.getElementById('clear-button');
  if (clearButton) {
    clearButton.addEventListener('click', clearContent);
  }

  // Define clearContent function
  function clearContent() {
    contentContainer.textContent = ''; // Clear the content container
  }
});
