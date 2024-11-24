const row = 16;
const col = 16;
const container = document.querySelector(".canvas");
const canvasSize =400;
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
console.log(getRGBAComponents('rgb(255,0,0)'));
let isMouseDown = false;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
const chosenColor = 'rgb(0,255,0)';

cells.forEach((cell) => {
  cell.addEventListener("mousemove", () => {
    if (!isMouseDown) return;

    // Get the current background color of the cell
    // Extract the RGBA components
    const { red, green, blue, alpha } = getRGBAComponents(chosenColor);
    let currentColor = cell.style.backgroundColor;
    console.log(currentColor);
    if (!currentColor) {
      cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.1)`;
    } else{
      currentColor = getRGBAComponents(currentColor);
      const newAlpha = currentColor.alpha + 0.1;
      cell.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${newAlpha})`;
    }
  });
});


const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});