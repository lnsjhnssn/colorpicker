// Text Body Color Picker
const defaultColor = "#66c2f0";
const colorPicker = document.querySelector("#color-picker");
const backgroundHexInput = document.querySelector('[data-hex="background"]');
const headingHexInput = document.querySelector('[data-hex="heading"]');
const paragraphHexInput = document.querySelector('[data-hex="paragraph"]');
const copyAllButton = document.querySelector("#copy-all");
colorPicker.value = defaultColor;
colorPicker.addEventListener("input", updateAllParagraphs, false);
colorPicker.addEventListener("change", updateAllParagraphs, false);
colorPicker.select();

function updateFirstParagraph(event) {
  const p = document.querySelector("p");
  if (p) {
    p.style.color = event.target.value;
  }
  paragraphHexInput.value = event.target.value;
}
function updateAllParagraphs(event) {
  document.querySelectorAll("p").forEach((p) => {
    p.style.color = event.target.value;
  });
  paragraphHexInput.value = event.target.value;
}

// Heading Color Picker
const defaultHeadingColor = "#ffffff";
const headingColorPicker = document.querySelector("#heading-color-picker");
headingColorPicker.value = defaultHeadingColor;
headingColorPicker.addEventListener("input", updateAllHeadings, false);
headingColorPicker.addEventListener("change", updateAllHeadings, false);

function updateFirstHeading(event) {
  const h = document.querySelector("h1");
  if (h) {
    h.style.color = event.target.value;
  }
  // Update labels but exclude summary labels
  const label = document.querySelector("label:not(.summary-label)");
  if (label) {
    label.style.color = event.target.value;
  }
  headingHexInput.value = event.target.value;
}
function updateAllHeadings(event) {
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((h) => {
    h.style.color = event.target.value;
  });
  // Update labels but exclude summary labels
  document.querySelectorAll("label:not(.summary-label)").forEach((label) => {
    label.style.color = event.target.value;
  });
  headingHexInput.value = event.target.value;
}

// Background Color Picker
const defaultBackgroundColor = "#2e66d6";
const backgroundColorPicker = document.querySelector(
  "#background-color-picker"
);
backgroundColorPicker.value = defaultBackgroundColor;
backgroundColorPicker.addEventListener("input", updateBackground, false);
backgroundColorPicker.addEventListener("change", updateBackground, false);

function updateBackground(event) {
  document.body.style.backgroundColor = event.target.value;
  backgroundHexInput.value = event.target.value;
}

function copyAllHexValues(button) {
  const backgroundHex = backgroundHexInput.value.trim();
  const headingHex = headingHexInput.value.trim();
  const paragraphHex = paragraphHexInput.value.trim();
  const copyString = `Background: ${backgroundHex} | Headings: ${headingHex} | Paragraphs: ${paragraphHex}`;

  const showCopiedState = () => {
    button.classList.add("is-copied");
    if (button._copyTimeout) {
      clearTimeout(button._copyTimeout);
    }
    button._copyTimeout = setTimeout(() => {
      button.classList.remove("is-copied");
    }, 1600);
  };

  const fallbackCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = copyString;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showCopiedState();
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(copyString)
      .then(showCopiedState)
      .catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

// Validate and normalize hex input
function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

function handleHexInput(input, colorPicker, updateFunction) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.trim().toLowerCase();

    // Auto-add # if missing
    if (value.length > 0 && !value.startsWith("#")) {
      value = "#" + value;
      input.value = value;
    }

    // Validate and update
    if (isValidHex(value)) {
      colorPicker.value = value;
      updateFunction({ target: { value } });
      input.classList.remove("invalid");
    } else if (value.length === 7) {
      input.classList.add("invalid");
    }
  });

  input.addEventListener("blur", (e) => {
    const value = e.target.value.trim().toLowerCase();
    if (!isValidHex(value)) {
      // Revert to color picker value
      input.value = colorPicker.value;
      input.classList.remove("invalid");
    }
  });
}

// Wire up hex inputs
handleHexInput(backgroundHexInput, backgroundColorPicker, updateBackground);
handleHexInput(headingHexInput, headingColorPicker, updateAllHeadings);
handleHexInput(paragraphHexInput, colorPicker, updateAllParagraphs);

// Apply initial colors on page load
updateBackground({ target: { value: defaultBackgroundColor } });
updateAllHeadings({ target: { value: defaultHeadingColor } });
updateAllParagraphs({ target: { value: defaultColor } });

if (copyAllButton) {
  copyAllButton.addEventListener("click", () =>
    copyAllHexValues(copyAllButton)
  );
}
