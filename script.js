let row = 16;
let col = 16;
const input = document.querySelector("#size");
input.addEventListener("input", () => {
  console.log(input.value);
  row = input.value;
  col = input.value;
  renderCanvas(row,col); // Call the renderCanvas function to update the canvas
});


function renderCanvas(row,col) {
  container.innerHTML = ''; // Clear the container
  for (let i = 0; i < row * col; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
    cell.style.width = `${canvasSize / row - 2}px`;
    cell.style.height = `${canvasSize / col - 2}px`;
    cell.style.border = "1px solid black";
    handleMouseMove(cell);
  }
  cells = document.querySelectorAll(".cell"); // Update the cells variable
}
const container = document.querySelector(".canvas");
const canvasSize =430;
container.style.width = `${canvasSize}px`;
container.style.height = `${canvasSize}px`;
container.style.border = "1px solid black";
for (let i = 0; i < row*col; i++) {
    const cell= document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
    cell.style.width = `${canvasSize/row -2}px`;
    cell.style.height = `${canvasSize/col -2}px`;
    cell.style.border = "1px solid black";
}
const cells = document.querySelectorAll(".cell");

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

let isMouseDown = false;
let randomColor = false;
const random = document.querySelector("#random");
random.addEventListener("click", () => {
  randomColor = !randomColor;
});
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
const colorPicker = document.querySelector('input[type="color"]');
console.log(colorPicker); 
let hex = "#000000";
let chosenColor = hexToRgb(hex);
colorPicker.addEventListener("input", () => {
  randomColor = false;
  hex = colorPicker.value;
  chosenColor = hexToRgb(hex);
});

function handleMouseMove(cell) {
  cell.addEventListener("mousemove", () => {
    if (!isMouseDown) return;
    if (randomColor) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue})`;
    } else{
          // Get the current background color of the cell
          // Extract the RGBA components
          console.log(chosenColor);
          const { red, green, blue } = chosenColor;
          console.log(red, green, blue);
          let currentColor = cell.style.backgroundColor;
          console.log(currentColor);
          if (!currentColor) {
            cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.1)`;
          } else{
            currentColor = getRGBAComponents(currentColor);
            const newAlpha = currentColor.alpha + 0.1;
            cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha})`;
          }
        };
      });  
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