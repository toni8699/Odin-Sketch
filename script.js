let row = 16;
let col = 16;
const input = document.querySelector("#size");
const container = document.querySelector(".canvas");
const canvasSize =450;
container.style.width = `${canvasSize}px`;
container.style.height = `${canvasSize}px`;
// container.style.border = "1px solid black";

const slider =document.querySelector(".slider");
slider.addEventListener("input", () => {
  row = slider.value;
  col = slider.value;
  renderCanvas(row,col);
});

//initial render
renderCanvas(row,col);
function DrawRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue})`;
}

function renderCanvas(row,col) {
  container.innerHTML = ''; // Clear the container
  for (let i = 0; i < row * col; i++) {
    const cell = createCell(row, col);
    container.appendChild(cell);
    handleMouseMove(cell);
  }
  cells = document.querySelectorAll(".cell"); // Update the cells variable
}
// Extract RGBA components from a color string.
function getRGBAComponents(color) {
  const match = color.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+),?\s*(\d?\.?\d+)?\)/);
  if (match) {
    return {
      red: parseInt(match[1], 10),
      green: parseInt(match[2], 10),
      blue: parseInt(match[3], 10),
      alpha: match[4] ? parseFloat(match[4]) : 1, // Default alpha to 1 if not present.
    };
  }
  // Default to no opacity (fully transparent black).
  return { red: 0, green: 0, blue: 0, alpha: 0 };
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16)
  } : null;
}


const colorPicker = document.querySelector('input[type="color"]');
let hex = "#000000";
let chosenColor = hexToRgb(hex);
let randomColor = false;

colorPicker.addEventListener("input", () => {
  randomColor = false;
  hex = colorPicker.value;
  chosenColor = hexToRgb(hex);
});
random.addEventListener("click", () => {
  randomColor = !randomColor;
});

function handleMouseMove(cell) {
  let isMouseDown = false;
  const random = document.querySelector("#random");
 
  document.addEventListener("mousedown", () => {
    isMouseDown = true;
  });
  
  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
  cell.addEventListener("mousemove", () => {
    if (!isMouseDown) return;
    if (randomColor) {
      cell.style.backgroundColor = DrawRandomColor();
    } else{
          DrawSpecificColor(chosenColor,cell);
        };
      });  
}


function DrawSpecificColor(chosenColor,cell) {
  const { red, green, blue } = chosenColor;
  let currentColor = cell.style.backgroundColor;
  if (!currentColor) {
    cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.1)`;
  } else {
    currentColor = getRGBAComponents(currentColor);
    const newAlpha = currentColor.alpha + 0.05;
    cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha})`;
  }
}
function createCell(row, col) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.width = `${canvasSize / row}px`;
  cell.style.height = `${canvasSize / col}px`;
  // cell.style.border = "1px solid black";
  return cell;
}

function drawCanvas(row, col) {
  container.innerHTML = ''; // Clear the container
  for (let i = 0; i < row * col; i++) {
    const cell = createCell(row, col);
    container.appendChild(cell);
    cell.addEventListener("mousemove", () => {
      // ...
    });
  }
  cells = document.querySelectorAll(".cell"); // Update the cells variable
}
cells.forEach((cell) => {
  handleMouseMove(cell);
});
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});