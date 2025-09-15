// Text Body Color Picker
const defaultColor = "#000000";
const colorPicker = document.querySelector("#color-picker");
const paragraphHexDisplay = document.querySelector("#paragraph-hex-display");
colorPicker.value = defaultColor;
colorPicker.addEventListener("input", updateFirstParagraph, false);
colorPicker.addEventListener("change", updateAllParagraphs, false);
colorPicker.select();

function updateFirstParagraph(event) {
  const p = document.querySelector("p");
  if (p) {
    p.style.color = event.target.value;
  }
  // Update hex display
  paragraphHexDisplay.textContent = event.target.value;
}
function updateAllParagraphs(event) {
  document.querySelectorAll("p").forEach((p) => {
    p.style.color = event.target.value;
  });
  // Update hex display
  paragraphHexDisplay.textContent = event.target.value;
}

// Heading Color Picker
const defaultHeadingColor = "#000000";
const headingColorPicker = document.querySelector("#heading-color-picker");
const headingHexDisplay = document.querySelector("#heading-hex-display");
headingColorPicker.value = defaultHeadingColor;
headingColorPicker.addEventListener("input", updateFirstHeading, false);
headingColorPicker.addEventListener("change", updateAllHeadings, false);

function updateFirstHeading(event) {
  const h = document.querySelector("h1");
  if (h) {
    h.style.color = event.target.value;
  }
  // Update hex display
  headingHexDisplay.textContent = event.target.value;
}
function updateAllHeadings(event) {
  document.querySelectorAll("h1, h2, h3, h4, h5, h6, label").forEach((h) => {
    h.style.color = event.target.value;
  });
  // Update hex display
  headingHexDisplay.textContent = event.target.value;
}

// Background Color Picker
const defaultBackgroundColor = "#ffffff";
const backgroundColorPicker = document.querySelector(
  "#background-color-picker"
);
const backgroundHexDisplay = document.querySelector("#background-hex-display");
backgroundColorPicker.value = defaultBackgroundColor;
backgroundColorPicker.addEventListener("input", updateBackground, false);
backgroundColorPicker.addEventListener("change", updateBackground, false);

function updateBackground(event) {
  document.body.style.backgroundColor = event.target.value;
  // Update hex display
  backgroundHexDisplay.textContent = event.target.value;
}
