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
