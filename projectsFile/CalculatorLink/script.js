let display = document.getElementById("display");
let clearButton = document.getElementById("clear");
let equalsButton = document.getElementById("equals");
let delButton = document.getElementById("delete");
function calculate(event) {
  if (event.target.tagName === "BUTTON") {
    let buttonText = event.target.textContent;
    if (buttonText === "=") {
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = "Error";
      }
    } else if (buttonText === "C") {
      display.value = "";
    } else if (buttonText === "Del") {
      let currentValue = display.value;
      display.value = currentValue.slice(0, -1);
    } else {
      display.value += buttonText;
    }
  }
}
clearButton.addEventListener("click", function() {
  display.value = "";
});
equalsButton.addEventListener("click", function() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
});