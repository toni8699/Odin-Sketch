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
function getOpacity(color) {
  // Extract opacity from `rgba` format using a regex.
  const match = color.match(/rgba?\(0,\s*0,\s*0,\s*(\d?\.?\d+)\)/);
  return match ? parseFloat(match[1]) : 0;
}
let isMouseDown = false;
document.addEventListener("mousedown", () => {
  isMouseDown = true;
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
})
const initialColor ='rgb(0, 0, 0)';
cells.forEach((cell) => {
  cell.addEventListener("mousemove", () => {
    if (!isMouseDown) {
      return;
    }
    const currentColor = window.getComputedStyle(cell).backgroundColor;
    if (currentColor === "rgb(0, 0, 0)") {
      console.log(getOpacity(cell.style.backgroundColor));
      console.log('this branch 0');
      return;
    }
    if(!currentColor){
      console.log('this branch 1');
      cell.style.backgroundColor = "rgb(0, 0, 0,0.1)";
    }
    else{
      console.log('this branch 2');
      const newOpacity = getOpacity(cell.style.backgroundColor)+0.1;
      cell.style.backgroundColor = `rgb(0, 0, 0,${newOpacity})`;
      
    }
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
});